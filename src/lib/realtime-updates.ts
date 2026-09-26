import { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { firebaseDb } from "@/integrations/firebase/client";
import type { WebsiteUpdate } from "@/lib/website-data";

function dateValue(value: unknown): string | null {
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


function safePublicUrl(value: unknown): string | null {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function normalizeUpdate(item: QueryDocumentSnapshot<DocumentData>): WebsiteUpdate {
  const raw = item.data() as Record<string, unknown>;
  return {
    id: item.id,
    title:
      typeof (raw.title_en || raw.title || raw.title_bn) === "string"
        ? String(raw.title_en || raw.title || raw.title_bn).trim()
        : "",
    title_bn: typeof raw.title_bn === "string" ? raw.title_bn.trim() || null : null,
    slug: typeof raw.slug === "string" ? raw.slug : null,
    excerpt: typeof (raw.excerpt_en || raw.excerpt) === "string" ? String(raw.excerpt_en || raw.excerpt) : null,
    excerpt_bn: typeof raw.excerpt_bn === "string" ? raw.excerpt_bn : null,
    body: typeof (raw.body_en || raw.body) === "string" ? String(raw.body_en || raw.body) : null,
    body_bn: typeof raw.body_bn === "string" ? raw.body_bn : null,
    category: typeof raw.category === "string" ? raw.category : null,
    media_type: typeof raw.media_type === "string" ? raw.media_type : null,
    image_url: safePublicUrl(raw.image_url),
    video_url: safePublicUrl(raw.video_url),
    external_url: safePublicUrl(raw.external_url),
    published: true,
    published_at: dateValue(raw.published_at),
    created_at: dateValue(raw.created_at),
    updated_at: dateValue(raw.updated_at),
  };
}

function sortByPublishedDate(items: WebsiteUpdate[]) {
  return [...items].sort((a, b) => {
    const left = a.published_at ? Date.parse(a.published_at) : 0;
    const right = b.published_at ? Date.parse(b.published_at) : 0;
    return right - left;
  });
}

export function subscribeToWebsiteUpdates(
  callback: (updates: WebsiteUpdate[]) => void,
  maxItems = 8,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (!firebaseDb) {
    callback([]);
    return () => undefined;
  }

  let fallbackUnsubscribe: Unsubscribe | null = null;
  const primaryQuery = query(
    collection(firebaseDb, "website_updates"),
    where("published", "==", true),
    orderBy("published_at", "desc"),
    limit(maxItems),
  );

  const primaryUnsubscribe = onSnapshot(
    primaryQuery,
    (snapshot) => callback(snapshot.docs.map(normalizeUpdate).filter((item) => Boolean(item.title.trim() || item.title_bn?.trim()))),
    (primaryError) => {
      // Keep the public website working even before the composite index finishes deploying.
      const fallbackQuery = query(
        collection(firebaseDb!, "website_updates"),
        where("published", "==", true),
      );
      fallbackUnsubscribe = onSnapshot(
        fallbackQuery,
        (snapshot) => callback(sortByPublishedDate(snapshot.docs.map(normalizeUpdate).filter((item) => Boolean(item.title.trim() || item.title_bn?.trim()))).slice(0, maxItems)),
        (fallbackError) => onError?.(fallbackError instanceof Error ? fallbackError : primaryError),
      );
    },
  );

  return () => {
    primaryUnsubscribe();
    fallbackUnsubscribe?.();
  };
}


export function subscribeToUpdateLikeCount(
  updateId: string,
  callback: (count: number) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (!firebaseDb || !updateId) {
    callback(0);
    return () => undefined;
  }

  return onSnapshot(
    query(
      collection(firebaseDb, "website_update_likes"),
      where("update_id", "==", updateId),
    ),
    (snapshot) => callback(snapshot.size),
    (error) => onError?.(error instanceof Error ? error : new Error("Could not load like count.")),
  );
}

export function subscribeToApprovedCommentCount(
  updateId: string,
  callback: (count: number) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (!firebaseDb || !updateId) {
    callback(0);
    return () => undefined;
  }

  return onSnapshot(
    query(
      collection(firebaseDb, "website_update_comments"),
      where("update_id", "==", updateId),
      where("status", "==", "approved"),
    ),
    (snapshot) => callback(snapshot.size),
    (error) => onError?.(error instanceof Error ? error : new Error("Could not load comment count.")),
  );
}

export function useRealtimeWebsiteUpdates(maxItems = 20) {
  const [updates, setUpdates] = useState<WebsiteUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToWebsiteUpdates(
      (items) => {
        setUpdates(items);
        setLoading(false);
        setError(null);
      },
      maxItems,
      (nextError) => {
        setError(nextError);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [maxItems]);

  return { updates, loading, error };
}
