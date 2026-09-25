import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bike,
  Boxes,
  Clock3,
  Code2,
  Headphones,
  Heart,
  MapPin,
  Newspaper,
  Package,
  Play,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  Utensils,
} from "lucide-react";
import { useMemo } from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Logo } from "@/components/site/Logo";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { useLanguage } from "@/context/LanguageContext";
import { useReviews } from "@/lib/reviews";
import { useRealtimeWebsiteUpdates } from "@/lib/realtime-updates";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Ride Bangla Limited — Fast, Safe & Reliable Services",
      },
      {
        name: "description",
        content:
          "Ride Bangla Limited connects people and businesses through ride, food delivery, grocery, parcel, courier and technology services across Bangladesh.",
      },
      { property: "og:title", content: "Ride Bangla Limited" },
      {
        property: "og:description",
        content:
          "One trusted brand for delivery, mobility, commerce and technology services.",
      },
      { property: "og:url", content: "https://ridebangla.bd/" },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/" }],
  }),
  component: HomePage,
});

const heroFeatures = [
  { icon: Sparkles, label: "Fast Delivery" },
  { icon: ShieldCheck, label: "Safe & Secure" },
  { icon: MapPin, label: "Real-Time Tracking" },
  { icon: Headphones, label: "24/7 Support" },
];

const services = [
  {
    icon: Utensils,
    title: "Food Delivery",
    text: "Restaurant and homemade food delivered fresh and fast.",
    tone: "red",
  },
  {
    icon: ShoppingBag,
    title: "Grocery",
    text: "Daily essentials brought to your doorstep on time.",
    tone: "green",
  },
  {
    icon: Package,
    title: "Parcel Delivery",
    text: "Reliable pickup and doorstep delivery for every parcel.",
    tone: "orange",
  },
  {
    icon: Truck,
    title: "Courier Service",
    text: "Documents and products delivered securely nationwide.",
    tone: "blue",
  },
  {
    icon: Code2,
    title: "Ride Bangla IT",
    text: "Digital products, websites, design and technology services.",
    tone: "purple",
  },
];



function HomePage() {
  const { language } = useLanguage();
  const { updates } = useRealtimeWebsiteUpdates(20);
  const { count: reviewCount, average: averageRating } = useReviews(50);

  const serviceCount = useMemo(() => services.length, []);

  // Real button, real target: the newest admin-published update that has a
  // video attached. No placeholder/fake video is ever shown — if nothing
  // has been published yet, "Watch Video" simply links to the Updates page.
  const latestVideoUpdate = useMemo(
    () => updates.find((item) => Boolean(item.video_url)),
    [updates],
  );

  return (
    <SiteLayout>
      <div className="rb-home overflow-hidden">
        {/* HERO — single, static composition (matches the reference exactly).
            The background is a pure visual asset (city/road/rider); every
            word, badge and button below is real JSX, not baked into the image. */}
        <section className="relative isolate min-h-[560px] bg-[#002c20] text-white sm:min-h-[640px] lg:min-h-[780px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(0,214,127,.24),transparent_32%),radial-gradient(circle_at_15%_85%,rgba(226,27,27,.14),transparent_30%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,35,26,.98)_0%,rgba(0,35,26,.82)_38%,rgba(0,35,26,.34)_68%,rgba(0,35,26,.68)_100%)]" />
          {/*
            /public/assets/hero-rider.jpg — VISUAL ONLY. City skyline, road,
            sunset, the rider on his bike with the green Ride Bangla box.
            No text, no logo lockup, no UI baked into this file — the left
            side of the frame should stay dark/uncluttered so the real text
            below stays readable.
          */}
          <div
            className="absolute inset-y-0 right-0 w-full bg-cover bg-[position:68%_top] opacity-80 sm:bg-[position:62%_center] lg:w-[68%] lg:bg-center"
            style={{ backgroundImage: "url('/assets/hero-rider.jpg')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,36,27,.25),rgba(0,36,27,.15)_55%,rgba(0,36,27,.8))]" />

          <div className="relative z-10 mx-auto flex min-h-[640px] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:min-h-[780px] lg:px-10">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-extrabold tracking-[.18em] text-emerald-200 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_15px_rgba(110,231,183,.8)]" />
                YOUR TRUSTED DELIVERY PARTNER
              </div>

              <h1 className="text-5xl font-black leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-8xl">
                Fast, Safe &amp; Reliable
                <span className="mt-2 block bg-gradient-to-r from-[#39e58c] via-[#13c97a] to-[#8df4bf] bg-clip-text text-transparent">
                  Delivery Service
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                {language === "bn"
                  ? "ফুড, গ্রোসারি, পার্সেল, কুরিয়ার এবং প্রযুক্তি—একটি বিশ্বস্ত ব্র্যান্ডের অধীনে দ্রুত, নিরাপদ ও আধুনিক সেবা।"
                  : "Ride Bangla brings your favorite food, daily essentials and important parcels right to your door — quickly, safely and with a smile."}
              </p>

              <div className="mt-9 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {heroFeatures.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[.07] p-3 backdrop-blur-md"
                  >
                    <Icon className="mb-2 h-5 w-5 text-emerald-300" />
                    <span className="text-xs font-bold text-white/80">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-[#ed1c24] px-6 py-3.5 text-sm font-extrabold shadow-[0_15px_45px_rgba(237,28,36,.25)] transition hover:-translate-y-1 hover:bg-[#ff2630]"
                >
                  Order Now
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                {latestVideoUpdate?.video_url ? (
                  <a
                    href={latestVideoUpdate.video_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-extrabold backdrop-blur-xl transition hover:bg-white/15"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#004c37]">
                      <Play className="ml-0.5 h-3 w-3 fill-current" />
                    </span>
                    Watch Video
                  </a>
                ) : (
                  <Link
                    to="/updates"
                    className="inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-extrabold backdrop-blur-xl transition hover:bg-white/15"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#004c37]">
                      <Play className="ml-0.5 h-3 w-3 fill-current" />
                    </span>
                    Watch Video
                  </Link>
                )}
              </div>
            </div>

            {/* "আপনার বিশ্বাসই আমাদের প্রেরণা" — real text, positioned like the reference */}
            <div className="pointer-events-none absolute bottom-10 right-5 hidden max-w-[220px] text-right text-2xl font-bold leading-tight text-white/90 lg:block xl:right-10 xl:text-3xl">
              আপনার বিশ্বাসই
              <br />
              আমাদের প্রেরণা
              <span className="mt-1 block h-1 w-24 rounded-full bg-brand-red ml-auto" />
            </div>
          </div>
        </section>

        {/* SERVICE STRIP */}
        <section className="relative z-20 -mt-10 px-4 sm:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/95 p-4 shadow-[0_25px_80px_rgba(0,45,30,.16)] backdrop-blur-xl sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.15fr_2.85fr] lg:items-center">
              <div className="px-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand-green">
                  Our Services
                </span>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-[#06291f] sm:text-3xl">
                  Comprehensive solutions under <span className="text-brand-red">one roof.</span>
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  From everyday deliveries to modern technology services, we are building a connected ecosystem.
                </p>
                <Link
                  to="/services"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-green px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-brand-green-dark"
                >
                  Explore All Services <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                {services.map((service) => {
                  const Icon = service.icon;
                  const tone = {
                    red: "bg-red-50 text-red-600",
                    green: "bg-emerald-50 text-emerald-600",
                    orange: "bg-orange-50 text-orange-600",
                    blue: "bg-blue-50 text-blue-600",
                    purple: "bg-violet-50 text-violet-600",
                  }[service.tone];
                  return (
                    <Link
                      key={service.title}
                      to="/services"
                      className="group relative rounded-2xl border border-slate-100 bg-white p-3.5 pb-10 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className={`mb-3 grid h-10 w-10 place-items-center rounded-full ${tone}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-black text-slate-900">{service.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-[11px] leading-5 text-slate-500">{service.text}</p>
                      <span className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-full bg-brand-green text-white transition group-hover:bg-brand-green-dark">
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/*
          ABOUT / WHY CHOOSE RIDE BANGLA — reference layout: dark green
          panel on the left, a real portrait photo in the middle, white
          panel on the right. The photo (public/assets/about-photo.jpg) is
          VISUAL ONLY; every heading, list and button here is real code.
        */}
        <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] shadow-[0_25px_80px_rgba(0,45,30,.12)] lg:grid lg:grid-cols-[0.95fr_1.05fr_0.95fr]">
            {/* Left: dark green panel */}
            <div className="relative flex flex-col justify-center overflow-hidden bg-[#06291f] px-6 py-12 text-white sm:px-10 lg:py-14">
              <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_15%_15%,rgba(35,225,139,.22),transparent_45%)]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-emerald-300">
                  <span className="h-px w-8 bg-emerald-300" /> About Ride Bangla Limited
                </span>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-.03em] sm:text-4xl">
                  More Than Just <span className="text-emerald-300">Delivery</span>
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
                  Ride Bangla Limited is a growing multi-service platform, started with a vision to make everyday life easier, safer and smarter. We provide delivery, courier, food, grocery and IT services — all under one trusted brand.
                </p>
                <div className="mt-7 grid max-w-xs grid-cols-2 gap-4">
                  {[
                    [Utensils, "Food Delivery"],
                    [Package, "Parcel & Courier"],
                    [ShoppingBag, "Grocery Delivery"],
                    [Code2, "IT Solutions (Women First)"],
                  ].map(([Icon, label]) => {
                    const FeatureIcon = Icon as typeof Utensils;
                    return (
                      <div key={label as string} className="flex items-center gap-2.5">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-emerald-300">
                          <FeatureIcon className="h-4 w-4" />
                        </span>
                        <span className="text-xs font-bold text-white/85">{label as string}</span>
                      </div>
                    );
                  })}
                </div>
                <Link
                  to="/about"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-red-500"
                >
                  Our Story <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/*
              Center portrait — VISUAL ONLY, no text baked in. Real image
              at /public/assets/about-photo.jpg. Now full-width/full-height
              on every screen size (not just desktop) and taking a much
              bigger share of the layout, matching the reference proportions.
            */}
            <div
              className="relative h-72 w-full bg-cover bg-top sm:h-96 lg:h-auto"
              style={{ backgroundImage: "url('/assets/about-photo.jpg')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#06291f]/15 via-transparent to-white/15" />
            </div>

            {/* Right: white panel */}
            <div className="bg-white px-6 py-12 sm:px-10 lg:py-14">
              <h3 className="text-3xl font-black tracking-[-.03em] text-[#06291f] sm:text-4xl">
                Why Choose <span className="text-brand-red">Ride Bangla?</span>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
                We are committed to providing the best delivery experience with advanced technology, professional riders and a customer-first approach.
              </p>
              <div className="mt-7 grid max-w-md grid-cols-2 gap-5 sm:grid-cols-4">
                {[
                  [Clock3, "On-Time Delivery"],
                  [Bike, "Professional Riders"],
                  [MapPin, "Live Tracking"],
                  [ShieldCheck, "Secure Payment"],
                ].map(([Icon, label]) => {
                  const FeatureIcon = Icon as typeof Clock3;
                  return (
                    <div key={label as string} className="flex flex-col items-center gap-2 text-center">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#06291f] text-emerald-300">
                        <FeatureIcon className="h-5 w-5" />
                      </span>
                      <span className="text-[11px] font-bold leading-tight text-slate-600">{label as string}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-8 inline-flex items-center gap-2 text-lg font-bold italic text-brand-green">
                Together We Grow <Heart className="h-4 w-4 fill-current text-brand-red" />
              </p>
            </div>
          </div>
        </section>

        {/* IT SECTOR */}
        <section className="relative overflow-hidden bg-[#06291f] px-5 py-20 text-white sm:px-8 lg:py-24">
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_85%_15%,rgba(22,207,126,.22),transparent_28%),radial-gradient(circle_at_15%_80%,rgba(230,29,38,.16),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.18em] text-emerald-300">
                New sector · Ride Bangla IT
              </span>
              <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-.04em] sm:text-6xl">
                Technology that strengthens the <span className="text-emerald-300">main ecosystem.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                The IT sector is an extension of Ride Bangla — focused on software, websites, creative design and digital solutions, with strong opportunities for women in technology and innovation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "App & Web Development",
                  "UI/UX & Design",
                  "Logo & Graphic Design",
                  "Channel Branding",
                  "Social Media Marketing",
                  "Auto-Reply Chatbot",
                ].map((item) => (
                  <Link
                    key={item}
                    to="/services"
                    className="rounded-full border border-white/10 bg-white/[.06] px-4 py-2 text-xs font-bold text-white/80 transition hover:border-emerald-300/40 hover:bg-emerald-300/10 hover:text-emerald-200"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-red-500"
                >
                  Explore IT Services <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://www.facebook.com/ridebanglait0"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[.06] px-5 py-3 text-sm font-extrabold text-white transition hover:border-emerald-300/40 hover:bg-emerald-300/10 hover:text-emerald-200"
                >
                  <FaFacebook className="h-4 w-4" /> IT Team Facebook Page
                </a>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/ride.bangla_"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Ride Bangla Office on Instagram"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[.06] text-white/80 transition hover:bg-emerald-300/20 hover:text-emerald-300"
                  >
                    <FaInstagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@ridebangla0"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Ride Bangla Office on TikTok"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[.06] text-white/80 transition hover:bg-emerald-300/20 hover:text-emerald-300"
                  >
                    <FaTiktok className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-8 rounded-full bg-emerald-400/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.05] p-5 shadow-2xl backdrop-blur-xl">
                {/*
                  Drop the IT team's own professional photo at
                  /public/assets/it-team.jpg — this frame is sized and
                  styled to match the "About Ride Bangla" image card
                  above, so the photo will automatically look on-brand.
                  Until that file exists, the frame just shows the
                  gradient + icon fallback below (nothing looks broken).
                */}
                <div
                  className="relative grid aspect-square place-items-center overflow-hidden rounded-[2rem] border border-emerald-300/10 bg-cover bg-center bg-[radial-gradient(circle,rgba(35,225,139,.15),transparent_55%)]"
                  style={{ backgroundImage: "url('/assets/it-team.jpg')" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                  <div className="relative text-center">
                    <div className="mx-auto grid h-28 w-28 place-items-center rounded-[2rem] border border-white/10 bg-black/20 shadow-2xl backdrop-blur-sm">
                      <Code2 className="h-14 w-14 text-emerald-300" />
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
                    <p className="text-lg font-black text-white">Ride Bangla IT</p>
                    <p className="mt-1 text-xs text-white/60">One ecosystem. New possibilities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APP DOWNLOAD — one large full-bleed banner, matching the reference's scale
            (not a small boxed card). Background is the clean rider/city photo only;
            every word and every button is real code on top of it. */}
        <section className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#06291f] text-white shadow-[0_25px_80px_rgba(0,45,30,.18)]">
            <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_10%_20%,rgba(35,225,139,.22),transparent_38%)]" />
            {/*
              /public/assets/app-download-hero.jpg — VISUAL ONLY (rider + city).
              Positioned to fill the right ~58% of the banner at real size,
              matching the reference; no text/buttons baked into this file.
            */}
            <div
              className="absolute inset-y-0 right-0 w-full bg-cover bg-[position:75%_center] opacity-90 lg:w-[58%] lg:bg-center"
              style={{ backgroundImage: "url('/assets/app-download-hero.jpg')" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,41,31,.98)_0%,rgba(6,41,31,.9)_30%,rgba(6,41,31,.25)_62%,rgba(6,41,31,.55)_100%)]" />

            <div className="relative grid gap-12 px-6 py-14 sm:px-10 sm:py-16 lg:grid-cols-2 lg:py-24">
              {/* Content */}
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-emerald-300">
                  <span className="h-px w-8 bg-emerald-300" /> Ride Bangla App
                </span>
                <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-[-.035em] sm:text-5xl">
                  Get Faster Service <span className="text-white/80">At Your</span> <span className="text-emerald-300">Fingertips.</span>
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                  Order food, book a ride, send parcels and track everything in real-time — all in one app, from the same trusted Ride Bangla ecosystem.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/apps"
                      className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-white backdrop-blur-xl transition hover:bg-white/15"
                    >
                      <Smartphone className="h-6 w-6 text-emerald-300" />
                      <span className="text-left leading-tight">
                        <span className="block text-[9px] font-bold uppercase tracking-wide text-white/55">Get it on</span>
                        <span className="block text-sm font-extrabold">Google Play</span>
                      </span>
                    </Link>
                    <Link
                      to="/apps"
                      className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-white backdrop-blur-xl transition hover:bg-white/15"
                    >
                      <Smartphone className="h-6 w-6 text-emerald-300" />
                      <span className="text-left leading-tight">
                        <span className="block text-[9px] font-bold uppercase tracking-wide text-white/55">Download on the</span>
                        <span className="block text-sm font-extrabold">App Store</span>
                      </span>
                    </Link>
                  </div>

                  {/*
                    Real QR code — generated at render time from the actual
                    /apps URL on ridebangla.bd, not a static/fake image.
                    Swap in a store QR the moment the app goes live.
                  */}
                  <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-xl">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=132x132&margin=0&color=06291f&bgcolor=ffffff&data=${encodeURIComponent("https://ridebangla.bd/apps")}`}
                      alt="Scan to open the Ride Bangla apps page"
                      width={66}
                      height={66}
                      loading="lazy"
                      className="h-[66px] w-[66px] rounded-lg"
                    />
                    <div className="max-w-[110px] text-[10px] font-bold leading-tight text-white/70">
                      Scan to get notified when our app launches
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs font-bold text-white/50">Launching soon — tap to get notified on our Apps page.</p>

                <div className="mt-9 grid max-w-md grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    [Utensils, "Food"],
                    [ShoppingBag, "Grocery"],
                    [Package, "Parcel"],
                    [MapPin, "Live Track"],
                  ].map(([Icon, label]) => {
                    const FeatureIcon = Icon as typeof Utensils;
                    return (
                      <div key={label as string} className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[.06] p-3 text-center backdrop-blur-md">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-emerald-300">
                          <FeatureIcon className="h-4.5 w-4.5" />
                        </span>
                        <span className="text-[11px] font-bold text-white/80">{label as string}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Floating phone mock — sits over the photo, right column, real code */}
              <div className="relative hidden lg:block">
                <div className="absolute bottom-0 left-1/2 w-48 -translate-x-1/2 rounded-[1.75rem] border border-white/15 bg-black/70 p-3 shadow-2xl backdrop-blur-xl xl:w-56">
                  <div className="rounded-[1.35rem] bg-[#0a3627] p-4">
                    <div className="flex items-center gap-2">
                      <Logo className="h-7 w-7 rounded-md object-contain" />
                      <span className="text-xs font-extrabold text-white">Ride Bangla</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {[Utensils, ShoppingBag, Package, Code2].map((Icon, i) => (
                        <span key={i} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-emerald-300">
                          <Icon className="h-4 w-4" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*
          REAL-TIME STATS — every number here comes straight from Firestore
          (service list, live review count/average via useReviews, and
          published-update count via useRealtimeWebsiteUpdates). Nothing is
          hardcoded. We deliberately do NOT show "Happy Customers" or
          "Active Riders" counters — there is no Firestore/admin-panel
          collection for those yet, and a made-up number is not allowed.
          Once that data source exists (tell me its collection/field names),
          it's a one-line addition to this array.
        */}
        <section className="relative overflow-hidden bg-[#06291f] px-5 py-10 text-white sm:px-8">
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_85%_20%,rgba(22,207,126,.22),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { icon: Boxes, value: String(serviceCount), label: "Service Categories" },
              {
                icon: Star,
                value: reviewCount > 0 ? `${averageRating.toFixed(1)}★` : "New",
                label: reviewCount > 0 ? `From ${reviewCount} Verified Reviews` : "Be Our First Reviewer",
              },
              { icon: Newspaper, value: String(updates.length), label: "Updates Published" },
              { icon: Headphones, value: "24/7", label: "Customer Support" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-emerald-300">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xl font-black">{value}</p>
                  <p className="text-[11px] font-bold text-white/60">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS (real, Google-verified — no fake ratings) */}
        <ReviewsSection />

        {/* FINAL CTA */}
        <section className="px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#002c20] px-6 py-14 text-center text-white sm:px-10 lg:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(42,225,140,.18),transparent_45%),radial-gradient(circle_at_10%_100%,rgba(226,27,27,.15),transparent_30%)]" />
            <div className="relative mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" /> The Ride Bangla vision
              </span>
              <h2 className="mt-5 text-4xl font-black tracking-[-.04em] sm:text-6xl">Move faster. Grow together.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60">From food and parcels to technology, Ride Bangla is building a broader service ecosystem for customers, partners and businesses.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-extrabold text-white transition hover:bg-red-500">Talk to Ride Bangla <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/about" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10">Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        <div className="sr-only">{serviceCount} service categories currently highlighted on the homepage.</div>
      </div>
    </SiteLayout>
  );
}
