import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { firebaseAuth, firebaseDb, googleAuthProvider } from "@/integrations/firebase/client";

export type Review = {
  id: string;
  uid: string;
  name: string;
  photo_url: string | null;
  rating: number;
  comment: string;
  created_at: string | null;
  updated_at: string | null;
};

const COLLECTION = "website_reviews";

function dateValue(value: unknown): string | null {
  if (!value) return null;
  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate: unknown }).toDate === "function"
  ) {
    try {
      const date = (value as { toDate: () => Date }).toDate();
      return Number.isNaN(date.getTime()) ? null : date.toISOString();
    } catch {
      return null;
    }
  }
  return null;
}

function safeHttpUrl(value: unknown): string | null {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function normalizeReview(item: QueryDocumentSnapshot<DocumentData>): Review {
  const raw = item.data() as Record<string, unknown>;
  const rating = typeof raw.rating === "number" ? Math.min(5, Math.max(1, Math.round(raw.rating))) : 0;
  return {
    id: item.id,
    uid: typeof raw.uid === "string" ? raw.uid : item.id,
    name: typeof raw.name === "string" ? raw.name.trim() : "",
    photo_url: safeHttpUrl(raw.photo_url),
    rating,
    comment: typeof raw.comment === "string" ? raw.comment.trim() : "",
    created_at: dateValue(raw.created_at),
    updated_at: dateValue(raw.updated_at),
  };
}

function sortByCreatedDate(items: Review[]) {
  return [...items].sort((a, b) => {
    const left = a.created_at ? Date.parse(a.created_at) : 0;
    const right = b.created_at ? Date.parse(b.created_at) : 0;
    return right - left;
  });
}

/** Realtime, public feed of approved (Google-verified) customer reviews. */
export function subscribeToReviews(
  callback: (reviews: Review[]) => void,
  maxItems = 24,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (!firebaseDb) {
    callback([]);
    return () => undefined;
  }

  let fallbackUnsubscribe: Unsubscribe | null = null;
  const primaryQuery = query(
    collection(firebaseDb, COLLECTION),
    where("status", "==", "approved"),
    orderBy("created_at", "desc"),
    limit(maxItems),
  );

  const primaryUnsubscribe = onSnapshot(
    primaryQuery,
    (snapshot) => callback(snapshot.docs.map(normalizeReview).filter((item) => item.name.length > 0 && item.comment.length > 0)),
    () => {
      // Keep the section working even before the composite index finishes deploying.
      const fallbackQuery = query(collection(firebaseDb!, COLLECTION), where("status", "==", "approved"));
      fallbackUnsubscribe = onSnapshot(
        fallbackQuery,
        (snapshot) =>
          callback(
            sortByCreatedDate(snapshot.docs.map(normalizeReview).filter((item) => item.name.length > 0 && item.comment.length > 0)).slice(
              0,
              maxItems,
            ),
          ),
        (fallbackError) => onError?.(fallbackError instanceof Error ? fallbackError : new Error("Could not load reviews.")),
      );
    },
  );

  return () => {
    primaryUnsubscribe();
    fallbackUnsubscribe?.();
  };
}

export function useReviews(maxItems = 24) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    return subscribeToReviews(
      (items) => {
        setReviews(items);
        setLoading(false);
      },
      maxItems,
      () => setLoading(false),
    );
  }, [maxItems]);

  const count = reviews.length;
  const average = count > 0 ? reviews.reduce((sum, item) => sum + item.rating, 0) / count : 0;

  return { reviews, loading, count, average };
}

/** Tracks the signed-in reviewer, if any. One real Google account = one review. */
export function useReviewAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!firebaseAuth) {
      setReady(true);
      return;
    }
    let cancelled = false;
    // Handle Google redirect sign-in return: getRedirectResult() completes
    // the sign-in and gives us the user. Its result must be USED, not discarded.
    getRedirectResult(firebaseAuth)
      .then((result) => {
        if (!cancelled && result?.user) {
          setUser(result.user);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    // Also listen for auth state changes (covers session restore + sign-out).
    const unsubscribe = onAuthStateChanged(firebaseAuth, (nextUser) => {
      if (!cancelled) {
        setUser(nextUser);
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return { user, ready };
}

export async function signInToReview(): Promise<void> {
  if (!firebaseAuth) throw new Error("Reviews are not available right now. Please try again shortly.");
  // Redirect flow (same as customer.ridebangla.bd which works reliably).
  // The page goes to Google and comes back; getRedirectResult() below
  // picks up the signed-in user on return.
  await signInWithRedirect(firebaseAuth, googleAuthProvider);
}

/** Call on page load: returns the user if they just came back from Google sign-in. */
export async function handleRedirectResult(): Promise<User | null> {
  if (!firebaseAuth) return null;
  try {
    const result = await getRedirectResult(firebaseAuth);
    return result ? result.user : null;
  } catch {
    return null;
  }
}

export async function signOutOfReviews(): Promise<void> {
  if (!firebaseAuth) return;
  await signOut(firebaseAuth);
}

/** Fetches the current user's own review (if any) so the form can prefill for editing. */
export async function getOwnReview(uid: string): Promise<Review | null> {
  if (!firebaseDb) return null;
  const snapshot = await getDoc(doc(firebaseDb, COLLECTION, uid));
  if (!snapshot.exists()) return null;
  return normalizeReview(snapshot as QueryDocumentSnapshot<DocumentData>);
}

/**
 * Creates or updates the signed-in user's review. The document id is always
 * their Firebase uid, so each real Google account can only ever have one
 * review on the site — no anonymous or duplicate fake entries.
 */
export async function submitReview(user: User, rating: number, comment: string): Promise<void> {
  if (!firebaseDb) throw new Error("Reviews are not available right now. Please try again shortly.");
  const reviewerName = user.displayName?.trim();
  const trimmedComment = comment.trim();
  if (!reviewerName) throw new Error("Your Google account name is required to publish a review.");
  if (rating < 1 || rating > 5) throw new Error("Please choose a star rating between 1 and 5.");
  if (trimmedComment.length < 2) throw new Error("Please write a short comment about your experience.");
  if (trimmedComment.length > 600) throw new Error("Please keep your review under 600 characters.");

  const ref = doc(firebaseDb, COLLECTION, user.uid);
  const existing = await getDoc(ref);

  await setDoc(
    ref,
    {
      uid: user.uid,
      name: reviewerName,
      photo_url: user.photoURL || null,
      rating: Math.round(rating),
      comment: trimmedComment,
      status: "approved",
      source: "google",
      created_at: existing.exists() ? existing.data().created_at : serverTimestamp(),
      updated_at: serverTimestamp(),
    },
    { merge: false },
  );
}
