import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  Headphones,
  MapPin,
  Package,
  Play,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
  Utensils,
} from "lucide-react";
import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { useLanguage } from "@/context/LanguageContext";
import { useReviews } from "@/lib/reviews";
import { useRealtimeWebsiteUpdates } from "@/lib/realtime-updates";
import { usePublicStats } from "@/lib/public-stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ride Bangla Limited — Fast, Safe & Reliable Services" },
      {
        name: "description",
        content:
          "Ride Bangla Limited connects customers and businesses through mobility, food, grocery, medicine, parcel, courier and technology services.",
      },
      { property: "og:title", content: "Ride Bangla Limited" },
      {
        property: "og:description",
        content: "One trusted brand for mobility, delivery, commerce and technology services.",
      },
      { property: "og:url", content: "https://ridebangla.bd/" },
    ],
    links: [
      { rel: "canonical", href: "https://ridebangla.bd/" },
      { rel: "alternate", hreflang: "en", href: "https://ridebangla.bd/" },
      { rel: "alternate", hreflang: "bn", href: "https://ridebangla.bd/?lang=bn" },
      { rel: "alternate", hreflang: "x-default", href: "https://ridebangla.bd/" },
    ],
  }),
  component: HomePage,
});

const copy = {
  en: {
    // Hero
    heroBadge: "Your Trusted Delivery Partner",
    heroHeadingA: "Fast, Safe & Reliable",
    heroHeadingB: "Delivery Service",
    heroSub:
      "Ride Bangla brings your favorite food, daily essentials and important parcels right to your door — quickly, safely and with a smile.",
    trust1a: "Fast",
    trust1b: "Delivery",
    trust2a: "Safe &",
    trust2b: "Secure",
    trust3a: "Real-Time",
    trust3b: "Tracking",
    trust4a: "24/7",
    trust4b: "Support",
    orderNow: "Order Now",
    watchVideo: "Watch Video",
    float1: "Your",
    float2: "Trust Is",
    float3: "Our",
    float4: "Inspiration",
    // Services
    servicesLabel: "Our Services",
    servicesHeadingA: "Comprehensive Solutions",
    servicesHeadingB: "Under",
    servicesHeadingAccent: "One Roof",
    servicesDesc:
      "From food to parcel, groceries to IT solutions — we make your life easier, faster and better.",
    exploreServices: "Explore All Services",
    serviceCardTitles: [
      "Food Delivery",
      "Grocery Delivery",
      "Parcel Delivery",
      "Courier Service",
      "Ride Bangla IT",
    ],
    serviceCardTexts: [
      "Your favorite food, fresh & hot.",
      "Daily essentials on time.",
      "Small or big, we deliver.",
      "Documents & products safely delivered.",
      "Women first IT Company.",
    ],
    // About
    aboutLabel: "About Ride Bangla Limited",
    aboutHeadingA: "More Than Just",
    aboutHeadingAccent: "Delivery",
    aboutBody:
      "Ride Bangla Limited is a growing multi-service platform, started with a vision to make everyday life easier, safer and smarter. We provide delivery, courier, food, grocery and IT services — all under one trusted brand.",
    tag1: "Food Delivery",
    tag2: "Parcel & Courier",
    tag3: "Grocery Delivery",
    tag4: "IT Solutions",
    ourStory: "Our Story",
    whyLabel: "Why Choose",
    whyHeadingA: "Ride",
    whyHeadingAccent: "Bangla?",
    whyBody:
      "We are committed to providing the best delivery experience with advanced technology, professional riders and a customer-first approach.",
    why1a: "On-Time",
    why1b: "Delivery",
    why2a: "Professional",
    why2b: "Riders",
    why3a: "Live",
    why3b: "Tracking",
    why4a: "Secure",
    why4b: "Payment",
    taglineA: "Together",
    taglineB: "We Grow",
    // Stats
    statHappy: "Happy Customers",
    statRiders: "Active Riders",
    statCategories: "Service Categories",
    statSupport: "Customer Support",
    // App
    appLabelA: "Download",
    appLabelB: "App",
    appHeadingA: "Get Faster Service at Your",
    appHeadingAccent: "Fingertips",
    appBody:
      "Order food, book a ride, send parcels, track in real-time and more — all in one app.",
    appComingSoon: "Mobile App — Coming Soon",
  },
  bn: {
    // Hero
    heroBadge: "আপনার বিশ্বস্ত ডেলিভারি পার্টনার",
    heroHeadingA: "দ্রুত, নিরাপদ ও নির্ভরযোগ্য",
    heroHeadingB: "ডেলিভারি সার্ভিস",
    heroSub:
      "ফুড, গ্রোসারি, মেডিসিন, পার্সেল ও প্রযুক্তি সেবা—দ্রুত, নিরাপদ ও বিশ্বস্তভাবে।",
    trust1a: "দ্রুত",
    trust1b: "ডেলিভারি",
    trust2a: "নিরাপদ ও",
    trust2b: "সুরক্ষিত",
    trust3a: "রিয়েল-টাইম",
    trust3b: "ট্র্যাকিং",
    trust4a: "২৪/৭",
    trust4b: "সাপোর্ট",
    orderNow: "এখনই অর্ডার করুন",
    watchVideo: "ভিডিও দেখুন",
    float1: "আপনার",
    float2: "বিশ্বাসই",
    float3: "আমাদের",
    float4: "প্রেরণা",
    // Services
    servicesLabel: "আমাদের সেবাসমূহ",
    servicesHeadingA: "সব ধরনের সেবা",
    servicesHeadingB: "",
    servicesHeadingAccent: "এক ছাদের নিচে",
    servicesDesc:
      "ফুড থেকে পার্সেল, গ্রোসারি থেকে IT সলিউশন — আমরা আপনার জীবনকে সহজ, দ্রুত ও উন্নত করি।",
    exploreServices: "সব সেবা দেখুন",
    serviceCardTitles: [
      "ফুড ডেলিভারি",
      "গ্রোসারি ডেলিভারি",
      "পার্সেল ডেলিভারি",
      "কুরিয়ার সার্ভিস",
      "রাইড বাংলা IT",
    ],
    serviceCardTexts: [
      "আপনার প্রিয় খাবার, তাজা ও গরম।",
      "দৈনন্দিন প্রয়োজনীয় পণ্য সময়মতো।",
      "ছোট বা বড়, আমরা পৌঁছে দিই।",
      "ডকুমেন্ট ও পণ্য নিরাপদে ডেলিভারি।",
      "নারী-অগ্রাধিকার IT কোম্পানি।",
    ],
    // About
    aboutLabel: "Ride Bangla Limited সম্পর্কে",
    aboutHeadingA: "শুধু ডেলিভারি",
    aboutHeadingAccent: "এর চেয়েও বেশি",
    aboutBody:
      "Ride Bangla Limited একটি ক্রমবর্ধমান মাল্টি-সার্ভিস প্ল্যাটফর্ম, যা দৈনন্দিন জীবনকে সহজ, নিরাপদ ও স্মার্ট করার স্বপ্ন নিয়ে শুরু হয়েছে। আমরা ডেলিভারি, কুরিয়ার, ফুড, গ্রোসারি ও IT সেবা দিই — সব এক বিশ্বস্ত ব্র্যান্ডের অধীনে।",
    tag1: "ফুড ডেলিভারি",
    tag2: "পার্সেল ও কুরিয়ার",
    tag3: "গ্রোসারি ডেলিভারি",
    tag4: "IT সলিউশন",
    ourStory: "আমাদের গল্প",
    whyLabel: "কেন বেছে নেবেন",
    whyHeadingA: "রাইড",
    whyHeadingAccent: "বাংলা?",
    whyBody:
      "উন্নত প্রযুক্তি, পেশাদার রাইডার ও কাস্টমার-ফার্স্ট দৃষ্টিভঙ্গি নিয়ে সেরা ডেলিভারি অভিজ্ঞতা দেওয়ার জন্য আমরা প্রতিশ্রুতিবদ্ধ।",
    why1a: "সময়মতো",
    why1b: "ডেলিভারি",
    why2a: "পেশাদার",
    why2b: "রাইডার",
    why3a: "লাইভ",
    why3b: "ট্র্যাকিং",
    why4a: "নিরাপদ",
    why4b: "পেমেন্ট",
    taglineA: "একসাথে",
    taglineB: "এগিয়ে যাই",
    // Stats
    statHappy: "সন্তুষ্ট কাস্টমার",
    statRiders: "সক্রিয় রাইডার",
    statCategories: "সেবার ক্যাটাগরি",
    statSupport: "কাস্টমার সাপোর্ট",
    // App
    appLabelA: "ডাউনলোড করুন",
    appLabelB: "অ্যাপ",
    appHeadingA: "আপনার হাতের মুঠোয়",
    appHeadingAccent: "দ্রুততর সেবা",
    appBody:
      "ফুড অর্ডার করুন, রাইড বুক করুন, পার্সেল পাঠান, রিয়েল-টাইমে ট্র্যাক করুন আরও অনেক কিছু — সব এক অ্যাপে।",
    appComingSoon: "মোবাইল অ্যাপ — শীঘ্রই আসছে",
  },
};

type ServiceCardMeta = {
  image: string;
  icon: typeof Smartphone;
  tone: string;
  imageFit?: "cover" | "contain";
};

const serviceCardMeta: ServiceCardMeta[] = [
  {
    image: "/assets/home/service-food.jpg",
    icon: Utensils,
    tone: "bg-[#ed1c24]",
  },
  {
    image: "/assets/home/service-grocery.jpg",
    icon: ShoppingBag,
    tone: "bg-[#0b7a3b]",
  },
  {
    image: "/assets/home/service-parcel.jpg",
    icon: Package,
    tone: "bg-[#ef7d13]",
  },
  {
    image: "/assets/home/service-courier.jpg",
    icon: Package,
    tone: "bg-[#2563eb]",
  },
  {
    image: "/assets/home/service-it.jpg",
    icon: Code2,
    tone: "bg-[#7041d8]",
  },
];

function displayStat(value: number | null, suffix = "") {
  if (value === null) return "—";
  return `${new Intl.NumberFormat("en-US").format(value)}${suffix}`;
}

function HomePage() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);
  const { updates } = useRealtimeWebsiteUpdates(20);
  const { count: reviewCount, average: averageRating } = useReviews(24);
  const publicStats = usePublicStats();

  const latestVideo = useMemo(
    () => updates.find((item) => Boolean(item.video_url))?.video_url ?? null,
    [updates],
  );

  const trustPoints = [
    [Truck, t.trust1a, t.trust1b],
    [ShieldCheck, t.trust2a, t.trust2b],
    [MapPin, t.trust3a, t.trust3b],
    [Headphones, t.trust4a, t.trust4b],
  ] as const;

  const serviceCards = serviceCardMeta.map((meta, i) => ({
    ...meta,
    title: t.serviceCardTitles[i],
    text: t.serviceCardTexts[i],
  }));

  const whyPoints = [
    [Truck, t.why1a, t.why1b],
    [ShieldCheck, t.why2a, t.why2b],
    [MapPin, t.why3a, t.why3b],
    [CheckCircle2, t.why4a, t.why4b],
  ] as const;

  const stats = [
    { icon: CheckCircle2, value: displayStat(publicStats.happyCustomers, "+"), label: t.statHappy },
    { icon: Truck, value: displayStat(publicStats.activeRiders, "+"), label: t.statRiders },
    { icon: ShoppingBag, value: displayStat(publicStats.serviceCategories, "+"), label: t.statCategories },
    { icon: Headphones, value: publicStats.supportLabel ?? "—", label: t.statSupport },
  ] as const;

  return (
    <div className="rb-home min-h-screen bg-white text-[#06291f]">
      <Header overlay />

      <main>
        <section className="rb-home-section rb-hero-section relative overflow-hidden">
          <img src="/assets/home/hero-bg.jpg" alt="" aria-hidden="true" className="rb-bg-image" />
          <div className="rb-hero-shade" />
          <div className="rb-section-inner relative h-full px-5 sm:px-8 lg:px-10">
            <div className="flex h-full items-center pt-20 sm:pt-16 lg:pt-14">
              <div className="max-w-[540px] text-white">
                <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#63e39d] sm:text-xs">
                  {t.heroBadge}
                </p>
                <h1 className="mt-2 text-[31px] font-black leading-[.96] tracking-[-.045em] sm:text-5xl lg:text-[58px]">
                  {t.heroHeadingA}
                  <span className="mt-1 block text-[#16d982]">{t.heroHeadingB}</span>
                </h1>
                <p className="mt-3 max-w-[470px] text-[11px] leading-5 text-white/90 sm:text-xs sm:leading-5">
                  {t.heroSub}
                </p>
                <div className="mt-4 grid max-w-[430px] grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4 sm:gap-3">
                  {trustPoints.map(([Icon, top, bottom]) => (
                    <div key={`${top}-${bottom}`} className="flex items-center gap-2">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/70 bg-black/10">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[8px] font-black leading-tight sm:text-[9px]">
                        {top}
                        <br />
                        {bottom}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2.5">
                  <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-[#ed1c24] px-5 py-2.5 text-[10px] font-black text-white shadow-lg">
                    {t.orderNow} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  {latestVideo ? (
                    <a href={latestVideo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-black/15 px-4 py-2 text-[10px] font-black text-white">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#08783b]"><Play className="ml-0.5 h-3 w-3 fill-current" /></span>
                      {t.watchVideo}
                    </a>
                  ) : (
                    <Link to="/updates" className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-black/15 px-4 py-2 text-[10px] font-black text-white">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#08783b]"><Play className="ml-0.5 h-3 w-3 fill-current" /></span>
                      {t.watchVideo}
                    </Link>
                  )}
                </div>
              </div>

              <div className="pointer-events-none absolute right-5 top-[55%] hidden -translate-y-1/2 rotate-[-3deg] text-right text-[24px] font-black leading-[1.05] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,.65)] xl:block">
                {t.float1}<br />{t.float2}<br />{t.float3}<br />{t.float4}
                <span className="mt-1 block text-4xl leading-none text-[#ed1c24]">⌁</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rb-home-section rb-services-section relative overflow-hidden">
          <picture aria-hidden="true">
            <source media="(max-width: 767px)" srcSet="/assets/home/services-bg-mobile.jpg" />
            <img src="/assets/home/services-bg.jpg" alt="" aria-hidden="true" className="rb-bg-image" />
          </picture>
          <div className="rb-section-inner relative grid h-full grid-cols-1 gap-3 px-5 py-5 sm:px-8 lg:grid-cols-[270px_1fr] lg:gap-5 lg:px-10 lg:py-6">
            <div className="flex flex-col justify-center rounded-2xl bg-white/80 p-3 backdrop-blur-sm lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
              <p className="text-[9px] font-black uppercase tracking-[.16em] text-[#0b7a3b]">{t.servicesLabel}</p>
              <h2 className="mt-1 text-[25px] font-black leading-[.98] tracking-[-.03em] sm:text-[29px]">
                {t.servicesHeadingA}<br />{t.servicesHeadingB} <span className="text-[#ed1c24]">{t.servicesHeadingAccent}</span>
              </h2>
              <p className="mt-2 max-w-[260px] text-[9px] leading-4 text-slate-600 sm:text-[10px]">
                {t.servicesDesc}
              </p>
              <Link to="/services" className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#0b7a3b] px-4 py-2 text-[9px] font-black text-white">
                {t.exploreServices} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 self-center sm:grid-cols-3 xl:grid-cols-5">
              {serviceCards.map((service) => {
                const Icon = service.icon;
                return (
                  <Link key={service.title} to="/services" className="group flex min-h-[122px] flex-col overflow-hidden rounded-xl border border-white/80 bg-white/90 shadow-[0_7px_18px_rgba(0,0,0,.08)]">
                    <div
                      className={`h-[52px] shrink-0 overflow-hidden sm:h-[58px] ${
                        service.imageFit === "contain" ? "bg-white p-1" : ""
                      }`}
                    >
                      <img
                        src={service.image}
                        alt=""
                        className={`h-full w-full transition duration-300 group-hover:scale-105 ${
                          service.imageFit === "contain" ? "object-contain" : "object-cover"
                        }`}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${service.tone} text-white`}><Icon className="h-3 w-3" /></span>
                        <h3 className="text-[9px] font-black leading-tight text-slate-900 sm:text-[10px]">{service.title}</h3>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[7px] leading-3 text-slate-500 sm:text-[8px]">{service.text}</p>
                      <span className="mt-auto flex items-center justify-end pt-1 text-[8px] font-black text-[#0b7a3b]"><ChevronRight className="h-3 w-3" /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rb-home-section rb-about-section relative overflow-hidden">
          <img src="/assets/home/about-bg.jpg" alt="" aria-hidden="true" className="rb-bg-image" />
          {/* Mobile-only dark overlay: the desktop artwork's dark area is cropped away
              by object-fit:cover on small screens, leaving white text unreadable. */}
          <div aria-hidden="true" className="absolute inset-0 bg-[#052b1e]/80 lg:hidden" />
          <div className="rb-section-inner relative grid h-full grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center px-5 py-5 sm:px-8 lg:px-10">
              <p className="text-[9px] font-black uppercase tracking-[.16em] text-[#63e39d]">{t.aboutLabel}</p>
              <h2 className="mt-1 text-3xl font-black leading-[.92] text-white sm:text-4xl">
                {t.aboutHeadingA}<br /><span className="text-[#16d982]">{t.aboutHeadingAccent}</span>
              </h2>
              <p className="mt-2 max-w-[390px] text-[9px] leading-4 text-white/85 sm:text-[10px] sm:leading-5">
                {t.aboutBody}
              </p>
              <div className="mt-3 flex gap-2 text-white">
                {[t.tag1, t.tag2, t.tag3, t.tag4].map((item) => (
                  <span key={item} className="text-center text-[7px] font-black leading-3 sm:text-[8px]">{item}</span>
                ))}
              </div>
              <Link to="/about" className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#ed1c24] px-4 py-2 text-[9px] font-black text-white">{t.ourStory} <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="flex flex-col justify-center bg-white/92 px-5 py-5 sm:px-8 lg:px-10">
              <p className="text-[9px] font-black uppercase tracking-[.16em] text-[#0b7a3b]">{t.whyLabel}</p>
              <h2 className="mt-0 text-3xl font-black leading-none sm:text-4xl">{t.whyHeadingA} <span className="text-[#0b7a3b]">{t.whyHeadingAccent}</span></h2>
              <p className="mt-2 max-w-[430px] text-[9px] leading-4 text-slate-600 sm:text-[10px] sm:leading-5">{t.whyBody}</p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {whyPoints.map(([Icon, a, b]) => (
                  <div key={`${a}-${b}`} className="text-center"><span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-[#e5f6ec] text-[#08783b]"><Icon className="h-4 w-4" /></span><p className="mt-1 text-[7px] font-black text-slate-900 sm:text-[8px]">{a as string}</p><p className="text-[7px] font-bold text-slate-500 sm:text-[8px]">{b as string}</p></div>
                ))}
              </div>
              <div className="mt-2 text-right text-lg font-black italic text-[#08783b]">{t.taglineA} <span className="text-[#ed1c24]">{t.taglineB}</span><span className="text-[#ed1c24]">♡</span></div>
            </div>
          </div>
        </section>

        <section className="rb-home-section rb-stats-section relative overflow-hidden">
          <picture aria-hidden="true">
            <source media="(max-width: 767px)" srcSet="/assets/home/stats-bg-mobile.jpg" />
            <img src="/assets/home/stats-bg.jpg" alt="" aria-hidden="true" className="rb-bg-image" />
          </picture>
          <div className="rb-section-inner relative grid h-full grid-cols-2 px-5 py-3 sm:grid-cols-4 sm:px-8 lg:px-10">
            {stats.map(({ icon: Icon, value, label }, index) => (
              <div key={label} className={`flex items-center justify-center gap-2 px-2 ${index < 3 ? "border-r border-white/20" : ""}`}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/25 bg-black/20 text-white"><Icon className="h-4 w-4" /></span>
                <div><p className="text-base font-black text-white sm:text-lg">{value}</p><p className="text-[7px] font-bold leading-tight text-white/80 sm:text-[8px]">{label}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="rb-home-section rb-app-section relative overflow-hidden">
          <picture aria-hidden="true">
            <source media="(max-width: 767px)" srcSet="/assets/home/app-bg-mobile.jpg" />
            <img src="/assets/home/app-bg.jpg" alt="" aria-hidden="true" className="rb-bg-image" />
          </picture>
          <div className="rb-section-inner relative flex h-full items-center px-5 py-4 sm:px-8 lg:pl-[330px] lg:pr-10">
            <div className="max-w-[470px] rounded-2xl bg-white/92 p-3 shadow-[0_10px_30px_rgba(0,0,0,.12)] backdrop-blur-sm sm:p-4">
              <p className="text-[9px] font-black uppercase tracking-[.16em] text-[#0b7a3b]">{t.appLabelA} <span className="text-[#0b7a3b]">Ride</span> <span className="text-[#ed1c24]">Bangla</span> {t.appLabelB}</p>
              <h2 className="mt-1 text-2xl font-black leading-tight sm:text-3xl">{t.appHeadingA} <span className="text-[#0b7a3b]">{t.appHeadingAccent}</span></h2>
              <p className="mt-1 max-w-[390px] text-[8px] leading-4 text-slate-600 sm:text-[9px]">{t.appBody}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-[#0b7a3b]/20 bg-white/90 px-3 py-1.5 text-[8px] font-black text-[#0b7a3b] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ed1c24]" /> {t.appComingSoon}
              </div>
            </div>
          </div>
        </section>

        <ReviewsSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
