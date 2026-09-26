import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Code2,
  Headphones,
  MapPin,
  Package,
  Pill,
  Play,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Star,
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
        content:
          "One trusted brand for mobility, delivery, commerce and technology services.",
      },
      { property: "og:url", content: "https://ridebangla.bd/" },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/" }],
  }),
  component: HomePage,
});

const serviceCards = [
  {
    icon: Smartphone,
    title: "Ride Service",
    text: "Mobility services through the official Ride Bangla platform.",
    tone: "red",
  },
  {
    icon: Utensils,
    title: "Food Delivery",
    text: "Restaurant and home-kitchen food delivery.",
    tone: "green",
  },
  {
    icon: Pill,
    title: "Medicine",
    text: "Medicine and everyday marketplace services.",
    tone: "orange",
  },
  {
    icon: Package,
    title: "Parcel & Courier",
    text: "Parcel, document and local courier delivery.",
    tone: "blue",
  },
  {
    icon: Code2,
    title: "Ride Bangla IT",
    text: "Web, design, digital and technology services.",
    tone: "purple",
  },
] as const;

const toneClasses = {
  red: "bg-[#fff0f1] text-[#ed1c24]",
  green: "bg-[#e8f8ef] text-[#08783b]",
  orange: "bg-[#fff3e8] text-[#ef7d13]",
  blue: "bg-[#edf5ff] text-[#2563eb]",
  purple: "bg-[#f3efff] text-[#7041d8]",
} as const;

function HomePage() {
  const { language } = useLanguage();
  const { updates } = useRealtimeWebsiteUpdates(20);
  const { count: reviewCount, average: averageRating } = useReviews(24);

  const latestVideo = useMemo(
    () => updates.find((item) => Boolean(item.video_url))?.video_url ?? null,
    [updates],
  );

  const stats = [
    {
      icon: Smartphone,
      value: String(serviceCards.length),
      label: "Service Categories",
    },
    {
      icon: Star,
      value: reviewCount > 0 ? averageRating.toFixed(1) : "—",
      label: reviewCount > 0 ? `${reviewCount} Google Reviews` : "Google Reviews",
    },
    {
      icon: MapPin,
      value: String(updates.length),
      label: "Published Updates",
    },
    {
      icon: Headphones,
      value: "24/7",
      label: "Customer Support",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-white text-[#06291f]">
      <Header />

      <main className="overflow-hidden">
        {/* HERO: visual background is an asset; all readable copy and controls stay in HTML. */}
        <section className="relative min-h-[600px] sm:min-h-[660px] lg:min-h-[700px]">
          <img
            src="/assets/hero-rider.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003b2a]/95 via-[#003b2a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003b2a]/25 via-transparent to-[#003b2a]/35" />

          <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-5 pb-16 pt-28 sm:min-h-[660px] sm:px-8 lg:min-h-[700px] lg:px-10">
            <div className="max-w-[610px] text-white">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#63e39d]">
                Your Trusted Delivery Partner
              </p>

              <h1 className="mt-3 text-[44px] font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[68px]">
                Fast, Safe &amp; Reliable
                <span className="mt-2 block text-[#16d982]">
                  Delivery Service
                </span>
              </h1>

              <p className="mt-5 max-w-[520px] text-sm leading-6 text-white/85 sm:text-base">
                {language === "bn"
                  ? "ফুড, গ্রোসারি, মেডিসিন, পার্সেল ও অন্যান্য সেবা—দ্রুত, নিরাপদ ও বিশ্বস্তভাবে।"
                  : "Ride Bangla connects customers and businesses with reliable mobility, delivery and digital services."}
              </p>

              <div className="mt-6 grid max-w-[520px] grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  [ShieldCheck, "Safe & Secure"],
                  [Truck, "Fast Delivery"],
                  [MapPin, "Real-Time Tracking"],
                  [Headphones, "24/7 Support"],
                ].map(([Icon, label]) => (
                  <div key={label as string} className="flex items-center gap-2">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/45 bg-black/10 backdrop-blur">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[10px] font-extrabold leading-tight sm:text-[11px]">
                      {label as string}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 rounded-full bg-[#ed1c24] px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#d8171f]"
                >
                  Order Now
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {latestVideo ? (
                  <a
                    href={latestVideo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-black/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#075e2e]">
                      <Play className="ml-0.5 h-3 w-3 fill-current" />
                    </span>
                    Watch Video
                  </a>
                ) : (
                  <Link
                    to="/updates"
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-black/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#075e2e]">
                      <Play className="ml-0.5 h-3 w-3 fill-current" />
                    </span>
                    Watch Video
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES: the background asset supplies the premium visual treatment; cards are live HTML. */}
        <section className="relative z-10 -mt-8 px-4 sm:-mt-10 sm:px-8">
          <div
            className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/70 bg-white/95 shadow-[0_24px_70px_rgba(0,45,30,.16)] backdrop-blur"
            style={{
              backgroundImage: "url('/assets/02_ridebangla_services_background.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.05fr_3fr] lg:items-center lg:p-8">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0b7a3b]">
                  Our Services
                </p>
                <h2 className="mt-2 text-[27px] font-black leading-[1.02] sm:text-[31px]">
                  Comprehensive Solutions
                  <br />
                  Under <span className="text-[#ed1c24]">One Roof</span>
                </h2>
                <p className="mt-3 max-w-sm text-xs leading-5 text-slate-500">
                  Mobility, food, medicine, parcel, courier and technology services through one trusted brand.
                </p>
                <Link
                  to="/services"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0b7a3b] px-5 py-2.5 text-xs font-extrabold text-white shadow-md transition hover:bg-[#075e2e]"
                >
                  Explore All Services
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                {serviceCards.map(({ icon: Icon, title, text, tone }) => (
                  <Link
                    key={title}
                    to="/services"
                    className="group relative min-h-[165px] rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-[0_8px_25px_rgba(0,0,0,.07)] transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className={`grid h-10 w-10 place-items-center rounded-full ${toneClasses[tone]}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-[13px] font-black">{title}</h3>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
                    <span className="absolute bottom-3 right-3 grid h-6 w-6 place-items-center rounded-full bg-[#0b7a3b] text-white">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT / WHY CHOOSE: image is background art; text is real HTML. */}
        <section className="px-4 py-8 sm:px-8 sm:py-10">
          <div
            className="relative mx-auto min-h-[430px] max-w-7xl overflow-hidden rounded-[28px] shadow-[0_22px_65px_rgba(0,45,30,.13)] sm:min-h-[480px]"
            style={{
              backgroundImage: "url('/assets/03_ridebangla_about_background.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="grid min-h-[430px] grid-cols-1 sm:min-h-[480px] lg:grid-cols-2">
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#5ee7a1]">
                  About Ride Bangla Limited
                </p>
                <h2 className="mt-2 text-4xl font-black leading-[0.95] text-white sm:text-5xl">
                  More Than Just
                  <span className="block text-[#16d982]">Delivery</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
                  Ride Bangla is building a connected service ecosystem for customers, partners, riders, agents and businesses.
                </p>

                <div className="mt-6 grid max-w-md grid-cols-4 gap-2 text-center text-[9px] font-extrabold text-white">
                  {[
                    ["Ride", Smartphone],
                    ["Food", Utensils],
                    ["Parcel", Package],
                    ["IT", Code2],
                  ].map(([label, Icon]) => (
                    <div key={label as string} className="rounded-xl bg-black/15 p-2 backdrop-blur-sm">
                      <Icon className="mx-auto mb-1 h-5 w-5" />
                      {label as string}
                    </div>
                  ))}
                </div>

                <Link
                  to="/about"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#ed1c24] px-5 py-2.5 text-xs font-extrabold text-white"
                >
                  Our Story
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="flex flex-col justify-center bg-white/90 p-7 sm:p-10 lg:p-12">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#0b7a3b]">
                  Why Choose
                </p>
                <h2 className="mt-1 text-4xl font-black leading-none">
                  Ride <span className="text-[#16a56a]">Bangla?</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
                  A connected service ecosystem built around reliable support, professional operations and customer-first technology.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ["On-Time", "Delivery", Truck],
                    ["Professional", "Service", ShieldCheck],
                    ["Live", "Tracking", MapPin],
                    ["Secure", "Support", Headphones],
                  ].map(([a, b, Icon]) => (
                    <div key={a as string} className="text-center">
                      <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#e7f7ee] text-[#08783b]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="mt-2 text-[10px] font-black">{a as string}</p>
                      <p className="text-[10px] font-bold text-slate-500">{b as string}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 text-right text-2xl font-black italic text-[#08783b]">
                  Together <span className="text-[#ed1c24]">We Grow</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REAL FIREBASE-DERIVED PUBLIC METRICS — no fabricated 20K+/500+ numbers. */}
        <section className="relative overflow-hidden bg-[#03261d] px-5 py-7 text-white sm:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(22,217,130,.20),transparent_34%)]" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 border-white/10 sm:justify-center sm:border-r last:border-0">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-[#5ee7a1]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xl font-black">{value}</p>
                  <p className="text-[10px] font-bold text-white/60">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* APP DOWNLOAD: background image + HTML copy/links. */}
        <section className="px-4 py-8 sm:px-8 sm:py-10">
          <div
            className="relative mx-auto min-h-[330px] max-w-7xl overflow-hidden rounded-[28px] shadow-[0_20px_60px_rgba(0,45,30,.13)] sm:min-h-[390px]"
            style={{
              backgroundImage: "url('/assets/04_ridebangla_app_stats_background.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10 flex min-h-[330px] items-center px-6 sm:min-h-[390px] sm:px-10 lg:px-16">
              <div className="max-w-[530px]">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#08783b]">
                  Ride Bangla App
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
                  Download <span className="text-[#08783b]">Ride Bangla</span> App
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  Get faster access to Ride Bangla services at your fingertips.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/apps"
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-extrabold text-white shadow-md"
                  >
                    <span className="text-base">▶</span>
                    Google Play
                  </Link>
                  <Link
                    to="/apps"
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-extrabold text-white shadow-md"
                  >
                    <span className="text-base"></span>
                    App Store
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/apps"
              aria-label="Open Ride Bangla Apps"
              className="absolute inset-y-0 right-0 w-[30%] min-w-[150px]"
            />
          </div>
        </section>

        {/* REVIEWS: existing component uses Google sign-in + Firebase and allows one review per Google UID. */}
        <ReviewsSection />

        <section className="px-5 pb-10 sm:px-8">
          <div className="mx-auto max-w-7xl rounded-[28px] bg-[#06291f] px-6 py-8 text-center text-white">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#5ee7a1]">
              Ride Bangla Limited
            </p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Together We Grow</h2>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#ed1c24] px-5 py-3 text-xs font-extrabold"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-extrabold"
              >
                Our Story
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
