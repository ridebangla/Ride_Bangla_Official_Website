import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  limit as limitDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseDb } from "@/integrations/firebase/client";

export type WebsiteUpdate = {
  id: string;
  title: string;
  title_bn?: string | null;
  slug: string | null;
  excerpt: string | null;
  excerpt_bn?: string | null;
  body: string | null;
  body_bn?: string | null;
  category: string | null;
  media_type: string | null;
  image_url: string | null;
  video_url: string | null;
  external_url: string | null;
  published: boolean | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

function timestampToString(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }
  if (typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value.toISOString();
  }
  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    try {
      const date = value.toDate();
      return date instanceof Date && !Number.isNaN(date.getTime())
        ? date.toISOString()
        : null;
    } catch {
      return null;
    }
  }
  return null;
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function safePublicUrl(value: unknown): string | null {
  const candidate = stringOrNull(value);
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function normalizeUpdate(
  id: string,
  raw: Record<string, unknown>
): WebsiteUpdate {
  return {
    id,
    title:
      stringOrNull(raw.title_en) ||
      stringOrNull(raw.title) ||
      stringOrNull(raw.title_bn) ||
      "",
    title_bn: stringOrNull(raw.title_bn),
    slug: stringOrNull(raw.slug),
    excerpt: stringOrNull(raw.excerpt_en) || stringOrNull(raw.excerpt),
    excerpt_bn: stringOrNull(raw.excerpt_bn),
    body: stringOrNull(raw.body_en) || stringOrNull(raw.body),
    body_bn: stringOrNull(raw.body_bn),
    category: stringOrNull(raw.category),
    media_type: stringOrNull(raw.media_type),
    image_url: safePublicUrl(raw.image_url),
    video_url: safePublicUrl(raw.video_url),
    external_url: safePublicUrl(raw.external_url),
    published: raw.published === undefined ? true : Boolean(raw.published),
    published_at: timestampToString(raw.published_at),
    created_at: timestampToString(raw.created_at),
    updated_at: timestampToString(raw.updated_at),
  };
}

export async function getWebsiteUpdates(
  maxItems?: number
): Promise<WebsiteUpdate[]> {
  if (!firebaseDb) return [];

  try {
    const constraints = [
      where("published", "==", true),
      orderBy("published_at", "desc"),
    ];

    const snapshot = await getDocs(
      maxItems
        ? query(
            collection(firebaseDb, "website_updates"),
            ...constraints,
            limitDocs(maxItems)
          )
        : query(collection(firebaseDb, "website_updates"), ...constraints)
    );

    return snapshot.docs
      .map((doc) => normalizeUpdate(doc.id, doc.data()))
      .filter((item) => Boolean(item.title.trim() || item.title_bn?.trim()));
  } catch (primaryError) {
    // Fallback keeps the website usable while a composite index is deploying.
    try {
      const snapshot = await getDocs(
        query(
          collection(firebaseDb, "website_updates"),
          where("published", "==", true)
        )
      );
      const items = snapshot.docs
        .map((item) => normalizeUpdate(item.id, item.data()))
        .filter((item) => Boolean(item.title.trim() || item.title_bn?.trim()))
        .sort((a, b) => {
          const left = a.published_at ? Date.parse(a.published_at) : 0;
          const right = b.published_at ? Date.parse(b.published_at) : 0;
          return right - left;
        });
      return typeof maxItems === "number" ? items.slice(0, maxItems) : items;
    } catch (fallbackError) {
      console.warn("[Firebase] Could not load website_updates", fallbackError || primaryError);
      return [];
    }
  }
}

function stableDocumentId(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `email_${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

export async function saveWebsiteSubscriber(email: string) {
  if (!firebaseDb) {
    throw new Error("Subscription service is not configured.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("A valid email address is required.");
  }

  const subscriberRef = doc(firebaseDb, "website_subscribers", stableDocumentId(normalizedEmail));

  // Public clients are intentionally not allowed to read subscriber records.
  // Try the permitted update first; if the deterministic document does not
  // exist yet, create it. This avoids a public read that Firestore rules deny.
  try {
    await updateDoc(subscriberRef, {
      email: normalizedEmail,
      source: "home_latest_update",
      status: "active",
      updated_at: serverTimestamp(),
    });
    return;
  } catch (error) {
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String(error.code)
        : "";
    if (code && code !== "not-found") throw error;
  }

  await setDoc(subscriberRef, {
    email: normalizedEmail,
    source: "home_latest_update",
    status: "active",
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
}

export async function submitWebsiteContact(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: string;
}) {
  if (!firebaseDb) {
    throw new Error(
      "The contact form is temporarily unavailable. Please use the official email or WhatsApp support channel."
    );
  }

  const clean = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
    source: input.source.trim(),
  };

  if (clean.name.length < 2 || clean.name.length > 100) throw new Error("Invalid name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) throw new Error("Invalid email.");
  if (clean.phone.length > 30) throw new Error("Invalid phone number.");
  if (clean.subject.length < 2 || clean.subject.length > 180) throw new Error("Invalid subject.");
  if (clean.message.length < 5 || clean.message.length > 5000) throw new Error("Invalid message.");

  await addDoc(collection(firebaseDb, "website_contact_messages"), {
    ...clean,
    status: "new",
    created_at: serverTimestamp(),
  });
}

export async function countUpdateLikes(updateId: string) {
  if (!firebaseDb) return 0;

  try {
    const snapshot = await getDocs(
      query(
        collection(firebaseDb, "website_update_likes"),
        where("update_id", "==", updateId)
      )
    );
    return snapshot.size;
  } catch {
    return 0;
  }
}

export async function countUpdateComments(updateId: string) {
  if (!firebaseDb) return 0;

  try {
    const snapshot = await getDocs(
      query(
        collection(firebaseDb, "website_update_comments"),
        where("update_id", "==", updateId),
        where("status", "==", "approved")
      )
    );
    return snapshot.size;
  } catch {
    return 0;
  }
}

function getVisitorId() {
  if (typeof window === "undefined") return "server";

  const key = "ride_bangla_visitor_id";
  const generated =
    globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  try {
    const existing = window.localStorage.getItem(key);
    if (existing) return existing;
    window.localStorage.setItem(key, generated);
  } catch {
    // Browsers can block localStorage in private/restricted contexts. The
    // interaction remains functional for the current page without crashing.
  }

  return generated;
}

export async function likeUpdate(updateId: string) {
  if (!firebaseDb) throw new Error("Like system is not configured yet.");

  const normalizedUpdateId = updateId.trim();
  if (!normalizedUpdateId || normalizedUpdateId.length > 180) {
    throw new Error("Invalid update.");
  }

  const visitorId = getVisitorId();
  const likeRef = doc(
    firebaseDb,
    "website_update_likes",
    `${normalizedUpdateId}_${visitorId}`,
  );

  // A visitor can like an update only once. Repeated clicks remain a no-op
  // instead of attempting an update that Firestore rules correctly reject.
  if ((await getDoc(likeRef)).exists()) return;

  await setDoc(likeRef, {
    update_id: normalizedUpdateId,
    visitor_id: visitorId,
    created_at: serverTimestamp(),
  });
}

export async function submitUpdateComment(input: {
  updateId: string;
  name: string;
  email: string | null;
  comment: string;
}) {
  if (!firebaseDb) throw new Error("Comment system is not configured yet.");

  const updateId = input.updateId.trim();
  const name = input.name.trim();
  const email = input.email?.trim().toLowerCase() || null;
  const comment = input.comment.trim();

  if (!updateId) throw new Error("Invalid update.");
  if (name.length < 2 || name.length > 100) throw new Error("Invalid name.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Invalid email.");
  if (comment.length < 2 || comment.length > 2000) throw new Error("Invalid comment.");

  await addDoc(collection(firebaseDb, "website_update_comments"), {
    update_id: updateId,
    name,
    email,
    comment,
    status: "pending",
    created_at: serverTimestamp(),
  });
}
