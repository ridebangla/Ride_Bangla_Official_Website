import { useMemo, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Globe,
  Heart,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  Target,
  Users,
  Utensils,
  Package,
  Store,
  Car,
} from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { LeadershipCard } from "@/components/site/LeadershipCard";
import { leadership } from "@/lib/team-data";
import { OFFICIAL_CONTACT } from "@/lib/official-contact";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Ride Bangla — Serving All 64 Districts of Bangladesh",
      },
      {
        name: "description",
        content:
          "Ride Bangla is a Bangladesh-wide tech company headquartered in Faridpur, building a connected ecosystem for rides, delivery and digital services.",
      },
      {
        property: "og:title",
        content: "About Ride Bangla",
      },
      {
        property: "og:description",
        content:
          "Ride Bangla is a Bangladesh-wide technology company, headquartered in Faridpur, building a connected service, mobility, delivery, marketplace and digital ecosystem across all 64 districts of Bangladesh.",
      },
      {
        property: "og:url",
        content: "https://ridebangla.bd/about",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://ridebangla.bd/about",
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://ridebangla.bd/about",
      },
      {
        rel: "alternate",
        hreflang: "bn",
        href: "https://ridebangla.bd/about?lang=bn",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://ridebangla.bd/about",
      },
    ],
  }),
  component: AboutPage,
});

const copy = {
  en: {
    headerTitle: "About Ride Bangla",
    headerSubtitle:
      "A Bangladesh-wide technology company building a trusted digital service ecosystem, headquartered in Faridpur and serving all 64 districts.",
    headerEyebrow: "About Ride Bangla",
    language: "বাংলা",
    founded: "Head Office in Faridpur — Serving All of Bangladesh",
    heroTitle:
      "Building a trusted digital ecosystem for everyday services across Bangladesh.",
    p1:
      "Ride Bangla is a Bangladesh-wide technology initiative, headquartered in Faridpur, focused on building a connected ecosystem across ride sharing, food delivery, courier delivery, homemade food, restaurant food, grocery, medicine, marketplace services and professional digital solutions.",
    p2:
      "The ecosystem is designed to connect customers, partners, riders, agents and internal teams through dedicated digital platforms, supported by the official Ride Bangla website and centralized operational systems.",
    p3:
      "Ride Bangla's operations are anchored by its Faridpur head office, with food and courier delivery activity coordinated through its official Facebook page and WhatsApp groups while dedicated customer, rider, partner and agent applications are being developed for nationwide service.",
    contact: "Contact Us",
    viewApps: "View Apps",
    origin: "Origin",
    originValue: "Faridpur, Bangladesh",
    website: "Website",
    email: "Email",
    phone: "Phone / WhatsApp",
    mission: "Mission",
    missionBody:
      "Make mobility, delivery, commerce and digital services more reliable and accessible while creating sustainable opportunities for customers, partners, riders, agents and businesses.",
    vision: "Vision",
    visionBody:
      "Build a homegrown technology ecosystem that connects everyday services and expands from a strong Faridpur head-office model into a wider Bangladesh-wide network across all 64 districts.",
    values: "Core Values",
    valuesBody:
      "Trust, transparency, accountability, safety, local service, professionalism, respect and responsible long-term growth.",
    connected: "Connected Ecosystem",
    connectedTitle: "One ecosystem, multiple connected systems",
    connectedBody:
      "Ride Bangla is not only a website or a single app. It is a connected company ecosystem where Customer, Partner, Rider, Agent and Admin systems support mobility, delivery, marketplace and digital services.",
    food: "Food Delivery",
    foodBody:
      "Food, homemade meals, cakes, drinks and restaurant products from local partners.",
    courier: "Courier Service",
    courierBody:
      "Parcel, document and local delivery services for everyday customer and business needs.",
    partnerRider: "Partner & Rider",
    partnerRiderBody:
      "Dedicated systems for restaurants, home kitchens, merchants, delivery riders and operational participants.",
    admin: "Admin Console",
    adminBody:
      "Central operational control for customers, partners, riders, agents, services, support and platform configuration.",
    service: "Service Ecosystem",
    serviceTitle: "Multiple services, one connected company",
    serviceBody:
      "Ride Bangla brings its service divisions and operational platforms together under one official brand while maintaining clear responsibilities across customers, partners, riders, agents and internal teams.",
    delivery: "Delivery",
    deliveryBody:
      "Ride Sharing, Food Delivery, Courier Delivery and marketplace services supported by connected customer, partner, rider, agent and administrative systems.",
    marketplace: "Marketplace",
    marketplaceBody:
      "Groceries, medicine, everyday essentials and other products through the Ride Bangla marketplace direction.",
    mobility: "Mobility",
    mobilityBody:
      "Ride Sharing and transport services connected with the wider Ride Bangla ecosystem.",
    technology: "Technology",
    technologyBody:
      "Ride Bangla IT Team, app and website development, graphics and other professional digital services.",
    leadership: "Leadership",
    leadershipTitle: "Meet the team behind Ride Bangla",
    leadershipBlurb:
      "The people responsible for shaping Ride Bangla's direction, culture and service ecosystem.",
    official: "Official Communication",
    officialTitle: "Contact Ride Bangla through official channels only.",
    officialBody:
      "For business, partnership, rider, partner, customer support or website-related communication, please use Ride Bangla's official contact information.",
    whatsapp: "WhatsApp / Phone",
  },
  bn: {
    headerTitle: "Ride Bangla সম্পর্কে",
    headerSubtitle:
      "ফরিদপুরে হেড অফিস নিয়ে সারা বাংলাদেশের জন্য একটি নির্ভরযোগ্য ডিজিটাল সার্ভিস ইকোসিস্টেম গড়ে তোলার উদ্যোগ — সব ৬৪ জেলায় সেবা প্রদান।",
    headerEyebrow: "রাইড বাংলা",
    language: "English",
    founded: "ফরিদপুরে হেড অফিস — সারা বাংলাদেশে সেবা",
    heroTitle:
      "সারা বাংলাদেশের দৈনন্দিন সেবার জন্য একটি নির্ভরযোগ্য ডিজিটাল ইকোসিস্টেম গড়ে তোলা।",
    p1:
      "Ride Bangla একটি বাংলাদেশ-ব্যাপী প্রযুক্তি উদ্যোগ, যার হেড অফিস ফরিদপুরে, লক্ষ্য Ride Sharing, Food Delivery, Courier Delivery, Homemade Food, Restaurant Food, Grocery, Medicine, Marketplace Services এবং Professional Digital Solutions-কে একটি সংযুক্ত ইকোসিস্টেমের মধ্যে নিয়ে আসা।",
    p2:
      "এই ইকোসিস্টেমের মাধ্যমে Customer, Partner, Rider, Agent এবং অভ্যন্তরীণ টিমগুলোকে পৃথক ডিজিটাল প্ল্যাটফর্মের মাধ্যমে সংযুক্ত করার পরিকল্পনা রয়েছে, যার সঙ্গে অফিসিয়াল Ride Bangla ওয়েবসাইট ও কেন্দ্রীয় অপারেশনাল সিস্টেম যুক্ত থাকবে।",
    p3:
      "Ride Bangla-এর কার্যক্রমের কেন্দ্র ফরিদপুর হেড অফিস। বর্তমানে অফিসিয়াল Facebook Page ও WhatsApp Groups-এর মাধ্যমে Food এবং Courier Delivery কার্যক্রম সমন্বয় করা হচ্ছে এবং সারা বাংলাদেশে সেবা দেওয়ার জন্য Customer, Rider, Partner ও Agent-এর পৃথক অ্যাপ্লিকেশন উন্নয়নাধীন।",
    contact: "যোগাযোগ করুন",
    viewApps: "অ্যাপগুলো দেখুন",
    origin: "উৎপত্তি",
    originValue: "ফরিদপুর, বাংলাদেশ",
    website: "ওয়েবসাইট",
    email: "ইমেইল",
    phone: "ফোন / WhatsApp",
    mission: "মিশন",
    missionBody:
      "Mobility, Delivery, Commerce এবং Digital Services-কে আরও নির্ভরযোগ্য ও সহজলভ্য করা এবং Customer, Partner, Rider, Agent ও ব্যবসাগুলোর জন্য টেকসই সুযোগ তৈরি করা।",
    vision: "ভিশন",
    visionBody:
      "একটি দেশীয় প্রযুক্তি ইকোসিস্টেম তৈরি করা, যা দৈনন্দিন সেবাগুলোকে সংযুক্ত করবে এবং শক্তিশালী ফরিদপুর হেড-অফিস মডেল থেকে সব ৬৪ জেলা জুড়ে বিস্তৃত হবে।",
    values: "মূল মূল্যবোধ",
    valuesBody:
      "বিশ্বাস, স্বচ্ছতা, জবাবদিহিতা, নিরাপত্তা, স্থানীয় সেবা, পেশাদারিত্ব, সম্মান এবং দায়িত্বশীল দীর্ঘমেয়াদি প্রবৃদ্ধি।",
    connected: "সংযুক্ত ইকোসিস্টেম",
    connectedTitle: "একটি ইকোসিস্টেম, একাধিক সংযুক্ত সিস্টেম",
    connectedBody:
      "Ride Bangla শুধু একটি ওয়েবসাইট বা একক অ্যাপ নয়। এটি একটি সংযুক্ত কোম্পানি ইকোসিস্টেম, যেখানে Customer, Partner, Rider, Agent এবং Admin সিস্টেম Mobility, Delivery, Marketplace ও Digital Services পরিচালনায় সহায়তা করে।",
    food: "ফুড ডেলিভারি",
    foodBody:
      "স্থানীয় Partnerদের মাধ্যমে খাবার, ঘরোয়া খাবার, কেক, পানীয় ও রেস্টুরেন্টের পণ্য।",
    courier: "কুরিয়ার সার্ভিস",
    courierBody:
      "দৈনন্দিন গ্রাহক ও ব্যবসায়িক প্রয়োজনে Parcel, Document এবং স্থানীয় Delivery Service।",
    partnerRider: "পার্টনার ও রাইডার",
    partnerRiderBody:
      "Restaurant, Home Kitchen, Merchant, Delivery Rider এবং অপারেশনাল অংশগ্রহণকারীদের জন্য পৃথক সিস্টেম।",
    admin: "অ্যাডমিন কনসোল",
    adminBody:
      "Customer, Partner, Rider, Agent, Service, Support এবং Platform Configuration-এর কেন্দ্রীয় অপারেশনাল নিয়ন্ত্রণ।",
    service: "সার্ভিস ইকোসিস্টেম",
    serviceTitle: "একাধিক সেবা, একটি সংযুক্ত কোম্পানি",
    serviceBody:
      "Ride Bangla তার বিভিন্ন Service Division ও Operational Platform-কে একটি অফিসিয়াল ব্র্যান্ডের অধীনে একত্রিত করছে এবং Customer, Partner, Rider, Agent ও Internal Team-এর দায়িত্বগুলো পরিষ্কারভাবে বজায় রাখছে।",
    delivery: "ডেলিভারি",
    deliveryBody:
      "Ride Sharing, Food Delivery, Courier Delivery এবং Marketplace Services-এর জন্য Customer, Partner, Rider, Agent ও Administrative Systems-এর সমন্বিত কাঠামো।",
    marketplace: "মার্কেটপ্লেস",
    marketplaceBody:
      "Ride Bangla Marketplace-এর মাধ্যমে Grocery, Medicine, Everyday Essentials এবং অন্যান্য পণ্যের সেবা।",
    mobility: "মোবিলিটি",
    mobilityBody:
      "Ride Sharing ও Transport Services, যা Ride Bangla-এর বৃহত্তর ইকোসিস্টেমের সঙ্গে সংযুক্ত।",
    technology: "প্রযুক্তি",
    technologyBody:
      "Ride Bangla IT Team, App ও Website Development, Graphics এবং অন্যান্য Professional Digital Services।",
    leadership: "লিডারশিপ",
    leadershipTitle: "Ride Bangla-এর নেতৃত্বে যারা",
    leadershipBlurb:
      "যারা Ride Bangla-এর দিকনির্দেশনা, সংস্কৃতি ও সেবা ইকোসিস্টেম গঠনের দায়িত্বে রয়েছেন।",
    official: "অফিসিয়াল যোগাযোগ",
    officialTitle: "শুধুমাত্র অফিসিয়াল চ্যানেলের মাধ্যমে Ride Bangla-এর সঙ্গে যোগাযোগ করুন।",
    officialBody:
      "Business, Partnership, Rider, Partner, Customer Support অথবা Website-related যোগাযোগের জন্য Ride Bangla-এর অফিসিয়াল যোগাযোগের তথ্য ব্যবহার করুন।",
    whatsapp: "WhatsApp / ফোন",
  },
} as const;

function AboutPage() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  return (
    <SiteLayout>
      <PageHeader
        title={t.headerTitle}
        subtitle={t.headerSubtitle}
        eyebrow={t.headerEyebrow}
        icon={Heart}
        bgImage="/assets/pages/services-banner.jpg"
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green">
              {t.founded}
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.heroTitle}
            </h2>

            <p className="mt-5 text-base leading-8 text-muted-foreground">
              {t.p1}
            </p>

            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {t.p2}
            </p>

            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {t.p3}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green/90"
              >
                {t.contact}
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/apps"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-green hover:text-brand-green"
              >
                {t.viewApps}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
            <div className="grid gap-4">
              <InfoRow
                icon={<MapPin className="h-5 w-5" />}
                label={t.origin}
                value={t.originValue}
              />
              <InfoRow
                icon={<Globe className="h-5 w-5" />}
                label={t.website}
                value="ridebangla.bd"
                href="https://ridebangla.bd"
              />
              <InfoRow
                icon={<Mail className="h-5 w-5" />}
                label={t.email}
                value="info@ridebangla.bd"
                href="mailto:info@ridebangla.bd"
              />
              <InfoRow
                icon={<Phone className="h-5 w-5" />}
                label={t.phone}
                value={OFFICIAL_CONTACT.phoneLabel}
                href={`https://wa.me/${OFFICIAL_CONTACT.whatsapp}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <ValueCard
            icon={<Target className="h-6 w-6" />}
            title={t.mission}
            body={t.missionBody}
          />
          <ValueCard
            icon={<Eye className="h-6 w-6" />}
            title={t.vision}
            body={t.visionBody}
          />
          <ValueCard
            icon={<Heart className="h-6 w-6" />}
            title={t.values}
            body={t.valuesBody}
          />
        </div>
      </section>

      <section className="bg-muted/30 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green">
              {t.connected}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              {t.connectedTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {t.connectedBody}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Utensils className="h-6 w-6" />}
              title={t.food}
              body={t.foodBody}
            />
            <FeatureCard
              icon={<Package className="h-6 w-6" />}
              title={t.courier}
              body={t.courierBody}
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title={t.partnerRider}
              body={t.partnerRiderBody}
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title={t.admin}
              body={t.adminBody}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green">
              {t.service}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              {t.serviceTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {t.serviceBody}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <RoadmapCard
              icon={<CheckCircle2 className="h-6 w-6" />}
              title={t.delivery}
              body={t.deliveryBody}
            />
            <RoadmapCard
              icon={<Store className="h-6 w-6" />}
              title={t.marketplace}
              body={t.marketplaceBody}
            />
            <RoadmapCard
              icon={<Car className="h-6 w-6" />}
              title={t.mobility}
              body={t.mobilityBody}
            />
            <RoadmapCard
              icon={<Rocket className="h-6 w-6" />}
              title={t.technology}
              body={t.technologyBody}
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f5faf7] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.38em] text-brand-red">{t.leadership}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#06291f] sm:text-5xl">{t.leadershipTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {t.leadershipBlurb}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-7 md:grid-cols-2">
            {leadership.map((member) => (
              <LeadershipCard key={member.id} member={member} language={language} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-[2rem] bg-foreground p-8 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-300">
                {t.official}
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                {t.officialTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                {t.officialBody}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@ridebangla.bd"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-foreground transition hover:bg-white/90"
              >
                <Mail className="h-5 w-5" />
                info@ridebangla.bd
              </a>

              <a
                href={`https://wa.me/${OFFICIAL_CONTACT.whatsapp}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-green px-5 py-4 text-sm font-bold text-white transition hover:bg-brand-green/90"
              >
                <Phone className="h-5 w-5" />
                {t.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ValueCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function RoadmapCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition hover:border-brand-green/40">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-bold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {content}
    </a>
  );
}
