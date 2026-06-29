import {
  addDoc,
  collection,
  getDocs,
  limit as limitDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { firebaseDb } from "@/integrations/firebase/client";

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

export type AppStatus = {
  id: string;
  app_name: string;
  app_type: string | null;
  description: string | null;
  status: string | null;
  apk_url?: string | null;
  play_store_url?: string | null;
  sort_order: number | null;
};

export type TeamMember = {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  sort_order: number | null;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sort_order: number | null;
};

export type ContactInfo = {
  business_email?: string | null;
  email?: string | null;
  support_email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
  youtube_url?: string | null;
  address?: string | null;
};

const fallbackApps: AppStatus[] = [
  {
    id: "customer-app",
    app_name: "Ride Bangla Customer App",
    app_type: "Customer App",
    description:
      "Customer app for Food Delivery, Courier, account, orders and future Ride Bangla services.",
    status: "Coming Soon",
    apk_url: null,
    play_store_url: null,
    sort_order: 1,
  },
  {
    id: "rider-app",
    app_name: "Ride Bangla Rider App",
    app_type: "Rider App",
    description:
      "Rider app for eligible delivery riders to receive, accept and complete Food and Courier orders.",
    status: "Coming Soon",
    apk_url: null,
    play_store_url: null,
    sort_order: 2,
  },
  {
    id: "partner-app",
    app_name: "Ride Bangla Partner App",
    app_type: "Partner App",
    description:
      "Partner app for restaurants, home kitchens and merchants to manage food items, products and orders.",
    status: "Coming Soon",
    apk_url: null,
    play_store_url: null,
    sort_order: 3,
  },
  {
    id: "agent-app",
    app_name: "Ride Bangla Agent App",
    app_type: "Agent App",
    description:
      "Agent system planned for local service support, customer onboarding and future field operations.",
    status: "Planned",
    apk_url: null,
    play_store_url: null,
    sort_order: 4,
  },
  {
    id: "pay-app",
    app_name: "Ride Bangla Pay",
    app_type: "Digital Wallet",
    description:
      "Future Ride Bangla digital wallet for ecosystem payments and broader financial services.",
    status: "Future",
    apk_url: null,
    play_store_url: null,
    sort_order: 5,
  },
];

const fallbackTeamMembers: TeamMember[] = [
  {
    id: "md-enamul-seddik",
    name: "MD Enamul Seddik",
    title: "Co-Founder & CEO",
    photo_url: "/assets/founder-enamul.png",
    facebook_url: "https://www.facebook.com/share/14iDKweDHqr/",
    instagram_url: "https://www.instagram.com/ena.mul_?igsh=eGNvNm10aDc0dWF6",
    sort_order: 1,
    bio:
      "MD Enamul Seddik is the Co-Founder & CEO of Ride Bangla and the main driving force behind the company’s digital ecosystem. From the earliest idea to the current platform, he has led the business concept, product planning, website direction, app workflow, customer experience and full ecosystem structure. The Ride Bangla Customer App, Rider App, Partner App, Admin Console, official website and future Ride Bangla Pay vision have all been shaped through his planning, technical direction, continuous effort and hands-on work. Starting from zero, he has worked to turn Ride Bangla from an idea into a real Bangladesh-based digital service platform focused on Food Delivery, Courier and future connected services.",
  },
  {
    id: "md-emon-seddik",
    name: "MD Emon Seddik",
    title: "Co-Founder",
    photo_url: null,
    facebook_url: "https://www.facebook.com/share/14gWYs5XrYE/",
    instagram_url: null,
    sort_order: 2,
    bio:
      "MD Emon Seddik is the Co-Founder of Ride Bangla and plays an important role in keeping the business active at the field and communication level. He supports daily operations through Facebook and WhatsApp, communicates with customers, helps coordinate delivery work and keeps the service moving through direct communication. While MD Enamul Seddik leads the app, website, business concept, product direction and ecosystem development, MD Emon Seddik supports the operational side and helps keep Ride Bangla running in real customer and delivery activities.",
  },
];

const fallbackFaqs: FaqItem[] = [
  {
    id: "faq-services",
    question: "What services will Ride Bangla launch first?",
    answer:
      "Ride Bangla will launch first with Food Delivery and Courier services. Market, Ride Bangla Pay, Agent system and other services are planned for the future.",
    sort_order: 1,
  },
  {
    id: "faq-rider",
    question: "How can I become a Ride Bangla rider?",
    answer:
      "Rider onboarding will be handled through the Ride Bangla Rider App and official support channels. Until public onboarding opens, contact Ride Bangla through WhatsApp or the Contact page.",
    sort_order: 2,
  },
  {
    id: "faq-partner",
    question: "How can a restaurant or home kitchen join Ride Bangla?",
    answer:
      "Restaurants, home kitchens and merchants can contact Ride Bangla through the official Contact page or WhatsApp. Partner management will later continue through the Partner App.",
    sort_order: 3,
  },
  {
    id: "faq-support",
    question: "Where can I get official support?",
    answer:
      "Use the official Contact page, support@ridebangla.bd or WhatsApp +880 1309-587749. For safety, use only Ride Bangla official channels.",
    sort_order: 4,
  },
];

function timestampToString(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate().toISOString();
  }
  return null;
}

function normalizeUpdate(
  id: string,
  raw: Record<string, unknown>
): WebsiteUpdate {
  return {
    id,
    title: String(raw.title || "Ride Bangla Update"),
    slug: (raw.slug as string | null) ?? null,
    excerpt: (raw.excerpt as string | null) ?? null,
    body: (raw.body as string | null) ?? null,
    category: (raw.category as string | null) ?? null,
    media_type: (raw.media_type as string | null) ?? null,
    image_url: (raw.image_url as string | null) ?? null,
    video_url: (raw.video_url as string | null) ?? null,
    external_url: (raw.external_url as string | null) ?? null,
    published: raw.published === undefined ? true : Boolean(raw.published),
    published_at: timestampToString(raw.published_at),
    created_at: timestampToString(raw.created_at),
    updated_at: timestampToString(raw.updated_at),
  };
}

async function getCollectionDocs<T>(
  collectionName: string,
  queryBuilder: () => ReturnType<typeof query>,
  fallback: T[]
) {
  if (!firebaseDb) return fallback;

  try {
    const snapshot = await getDocs(queryBuilder());
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];

    return docs.length > 0 ? docs : fallback;
  } catch (error) {
    console.warn(`[Firebase] Could not load ${collectionName}`, error);
    return fallback;
  }
}

export async function getHomeContent(): Promise<HomeContent | null> {
  if (!firebaseDb) return null;

  try {
    const snapshot = await getDocs(
      query(collection(firebaseDb, "homepage_content"), limitDocs(1))
    );
    const doc = snapshot.docs[0];
    if (!doc) return null;
    return { id: doc.id, ...doc.data() } as HomeContent;
  } catch (error) {
    console.warn("[Firebase] Could not load homepage_content", error);
    return null;
  }
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

    return snapshot.docs.map((doc) => normalizeUpdate(doc.id, doc.data()));
  } catch (error) {
    console.warn("[Firebase] Could not load website_updates", error);
    return [];
  }
}

export async function saveWebsiteSubscriber(email: string) {
  if (!firebaseDb) return;

  await addDoc(collection(firebaseDb, "website_subscribers"), {
    email,
    source: "home_latest_update",
    status: "active",
    created_at: serverTimestamp(),
  });
}

export async function getAppStatus(): Promise<AppStatus[]> {
  return getCollectionDocs<AppStatus>(
    "website_app_status",
    () =>
      query(
        collection(firebaseDb!, "website_app_status"),
        orderBy("sort_order", "asc")
      ),
    fallbackApps
  );
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const members = await getCollectionDocs<TeamMember>(
    "website_team_members",
    () =>
      query(
        collection(firebaseDb!, "website_team_members"),
        orderBy("sort_order", "asc")
      ),
    fallbackTeamMembers
  );

  return members.length > 0 ? members : fallbackTeamMembers;
}

export async function getFaqs(): Promise<FaqItem[]> {
  const faqs = await getCollectionDocs<FaqItem>(
    "faqs",
    () => query(collection(firebaseDb!, "faqs"), orderBy("sort_order", "asc")),
    fallbackFaqs
  );

  return faqs.length > 0 ? faqs : fallbackFaqs;
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
      "Contact system is not configured yet. Please use WhatsApp or email support@ridebangla.bd."
    );
  }

  await addDoc(collection(firebaseDb, "website_contact_messages"), {
    ...input,
    status: "new",
    created_at: serverTimestamp(),
  });
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  if (!firebaseDb) return null;

  try {
    const snapshot = await getDocs(
      query(collection(firebaseDb, "contact_info"), limitDocs(1))
    );
    const doc = snapshot.docs[0];
    if (!doc) return null;
    return { id: doc.id, ...doc.data() } as ContactInfo;
  } catch (error) {
    console.warn("[Firebase] Could not load contact_info", error);
    return null;
  }
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

export async function likeUpdate(updateId: string) {
  if (!firebaseDb) throw new Error("Like system is not configured yet.");

  await addDoc(collection(firebaseDb, "website_update_likes"), {
    update_id: updateId,
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

  await addDoc(collection(firebaseDb, "website_update_comments"), {
    update_id: input.updateId,
    name: input.name,
    email: input.email,
    comment: input.comment,
    status: "pending",
    created_at: serverTimestamp(),
  });
    }
