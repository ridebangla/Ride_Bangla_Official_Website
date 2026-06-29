import {
  addDoc,
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { firebaseDb, isFirebaseConfigured } from "@/integrations/firebase/client";

export type HomeContent = {
  id?: string;
  hero_headline?: string | null;
  hero_subheadline?: string | null;
};

export type WebsiteUpdate = {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  body: string | null;
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

function cleanString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function toDateString(value: unknown): string | null {
  if (!value) return null;

  if (typeof value === "string") return value;

  if (value instanceof Date) return value.toISOString();

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  ) {
    try {
      return (value as { toDate: () => Date }).toDate().toISOString();
    } catch {
      return null;
    }
  }

  return null;
}

function normalizeUpdate(doc: QueryDocumentSnapshot<DocumentData>): WebsiteUpdate {
  const data = doc.data();
  const imageUrl =
    cleanString(data.image_url) ||
    cleanString(data.imageUrl) ||
    cleanString(data.cover_image_url) ||
    cleanString(data.coverImageUrl) ||
    null;
  const videoUrl =
    cleanString(data.video_url) || cleanString(data.videoUrl) || null;
  const mediaType =
    cleanString(data.media_type) ||
    cleanString(data.mediaType) ||
    (videoUrl ? "video" : imageUrl ? "image" : "text");

  return {
    id: doc.id,
    title: cleanString(data.title) || "Ride Bangla Update",
    slug: cleanString(data.slug),
    excerpt: cleanString(data.excerpt),
    body:
      cleanString(data.body) ||
      cleanString(data.description) ||
      cleanString(data.text) ||
      null,
    category: cleanString(data.category),
    media_type: mediaType,
    image_url: imageUrl,
    video_url: videoUrl,
    external_url:
      cleanString(data.external_url) || cleanString(data.externalUrl) || null,
    published:
      typeof data.published === "boolean"
        ? data.published
        : typeof data.is_published === "boolean"
          ? data.is_published
          : true,
    published_at: toDateString(data.published_at || data.publishedAt),
    created_at: toDateString(data.created_at || data.createdAt),
    updated_at: toDateString(data.updated_at || data.updatedAt),
  };
}

function getSortDate(update: WebsiteUpdate) {
  return Date.parse(
    update.published_at || update.created_at || update.updated_at || ""
  );
}

export async function getHomeContent(): Promise<HomeContent | null> {
  if (!isFirebaseConfigured) return null;

  const snapshot = await getDocs(query(collection(firebaseDb, "homepage_content"), limit(1)));
  const doc = snapshot.docs[0];

  if (!doc) return null;

  const data = doc.data();

  return {
    id: doc.id,
    hero_headline: cleanString(data.hero_headline) || cleanString(data.heroHeadline),
    hero_subheadline:
      cleanString(data.hero_subheadline) || cleanString(data.heroSubheadline),
  };
}

export async function getPublishedWebsiteUpdates(
  maxItems = 30
): Promise<WebsiteUpdate[]> {
  if (!isFirebaseConfigured) return [];

  try {
    const snapshot = await getDocs(
      query(
        collection(firebaseDb, "website_updates"),
        where("published", "==", true),
        orderBy("published_at", "desc"),
        limit(maxItems)
      )
    );

    return snapshot.docs.map(normalizeUpdate);
  } catch {
    const snapshot = await getDocs(collection(firebaseDb, "website_updates"));

    return snapshot.docs
      .map(normalizeUpdate)
      .filter((update) => update.published !== false)
      .sort((a, b) => getSortDate(b) - getSortDate(a))
      .slice(0, maxItems);
  }
}

export async function addWebsiteSubscriber(email: string, source: string) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }

  await addDoc(collection(firebaseDb, "website_subscribers"), {
    email,
    source,
    status: "active",
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
}

export async function getWebsiteUpdateLikeCount(updateId: string) {
  if (!isFirebaseConfigured) return 0;

  const snapshot = await getCountFromServer(
    query(collection(firebaseDb, "website_update_likes"), where("update_id", "==", updateId))
  );

  return snapshot.data().count;
}

export async function getWebsiteUpdateCommentCount(updateId: string) {
  if (!isFirebaseConfigured) return 0;

  const snapshot = await getCountFromServer(
    query(
      collection(firebaseDb, "website_update_comments"),
      where("update_id", "==", updateId),
      where("status", "==", "approved")
    )
  );

  return snapshot.data().count;
}

export async function addWebsiteUpdateLike(updateId: string) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }

  await addDoc(collection(firebaseDb, "website_update_likes"), {
    update_id: updateId,
    created_at: serverTimestamp(),
  });
}

export async function addWebsiteUpdateComment(input: {
  updateId: string;
  name: string;
  email: string | null;
  comment: string;
}) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }

  await addDoc(collection(firebaseDb, "website_update_comments"), {
    update_id: input.updateId,
    name: input.name,
    email: input.email,
    comment: input.comment,
    status: "pending",
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
}
