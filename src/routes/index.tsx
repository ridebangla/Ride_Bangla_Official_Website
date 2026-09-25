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
  Package,
  Play,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
  Utensils,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Logo } from "@/components/site/Logo";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Ride Bangla Limited — Fast, Safe & Reliable Delivery Service",
      },
      {
        name: "description",
        content:
          "Ride Bangla brings your favorite food, daily essentials and important parcels right to your door — quickly, safely and with a smile.",
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

/* Shared brand tones so the hero, about panel and stats strip all use the
   exact same deep forest green requested for the redesign. */
const BRAND_DARK = "#0A3921";
const BRAND_DARK_DEEP = "#062615";

const heroBadges = [
  { icon: Zap, label: "Fast Delivery" },
  { icon: ShieldCheck, label: "Safe & Secure" },
  { icon: MapPin, label: "Real-Time Tracking" },
  { icon: Headphones, label: "24/7 Support" },
];

const services = [
  {
    icon: Utensils,
    title: "Food Delivery",
    text: "Your favorite food, fresh & hot",
    tone: "red",
  },
  {
    icon: ShoppingBag,
    title: "Grocery Delivery",
    text: "Daily essentials, on time",
    tone: "green",
  },
  {
    icon: Package,
    title: "Parcel Delivery",
    text: "Small or big, we deliver",
    tone: "orange",
  },
  {
    icon: Truck,
    title: "Courier Service",
    text: "Documents & products, safely delivered",
    tone: "blue",
  },
  {
    icon: Code2,
    title: "Ride Bangla IT",
    text: "Women First IT Company",
    tone: "purple",
  },
];

const toneStyles: Record<string, string> = {
  red: "bg-red-50 text-red-600",
  green: "bg-emerald-50 text-emerald-600",
  orange: "bg-orange-50 text-orange-600",
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-violet-50 text-violet-600",
};

const aboutServiceIcons = [
  { icon: Utensils, label: "Food Delivery" },
  { icon: Package, label: "Parcel & Courier" },
  { icon: ShoppingBag, label: "Grocery Delivery" },
  { icon: Code2, label: "IT Solutions (Women First)" },
];

const whyChooseUs = [
  { icon: Clock3, label: "On-Time Delivery" },
  { icon: Bike, label: "Professional Riders" },
  { icon: MapPin, label: "Live Tracking" },
  { icon: WalletCards, label: "Secure Payment" },
];

const trustItems = [
  { icon: Users, value: "20K+", label: "Happy Customers" },
  { icon: Bike, value: "500+", label: "Active Riders" },
  { icon: Boxes, value: "50+", label: "Service Categories" },
  { icon: Clock3, value: "24/7", label: "Customer Support" },
];

const appFeatures = [
  { icon: Utensils, label: "Food" },
  { icon: ShoppingBag, label: "Grocery" },
  { icon: Package, label: "Parcel" },
  { icon: MapPin, label: "Live Track" },
];

/** Shared gradient classes so every red-to-orange CTA in the page matches exactly. */
const gradientButton =
  "inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#ff3d2e] to-[#ff8a1e] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_15px_35px_rgba(255,61,46,.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,61,46,.45)]";

function HomePage() {
  const { language } = useLanguage();
  const [aboutImgBroken, setAboutImgBroken] = useState(false);
  const [qrImgBroken, setQrImgBroken] = useState(false);

  return (
    <SiteLayout>
      <div className="rb-home overflow-hidden">
        {/* ============================= HERO ============================= */}
        <section
          className="relative isolate min-h-[600px] text-white sm:min-h-[660px] lg:min-h-[760px]"
          style={{ backgroundColor: BRAND_DARK }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(16,220,140,.22),transparent_34%),radial-gradient(circle_at_10%_90%,rgba(255,61,46,.14),transparent_30%)]" />
          <div
            className="absolute inset-y-0 right-0 w-full bg-cover bg-[position:68%_top] opacity-85 sm:bg-[position:62%_center] lg:w-[64%] lg:bg-center"
            style={{ backgroundImage: "url('/assets/hero-rider.jpg')" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(90deg, ${BRAND_DARK} 0%, rgba(10,57,33,.86) 40%, rgba(10,57,33,.3) 68%, rgba(10,57,33,.7) 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,38,21,.2),transparent_45%,rgba(6,38,21,.85))]" />

          <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl flex-col justify-center px-5 pb-20 pt-32 sm:px-8 lg:min-h-[760px] lg:px-10 lg:pt-28">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[.14em] text-emerald-300">
                <ArrowRight className="h-3.5 w-3.5 -rotate-45 text-brand-red" />
                Your Trusted Delivery Partner
              </div>

              <h1 className="text-4xl font-black leading-[1.05] tracking-[-.03em] sm:text-5xl lg:text-6xl">
                Fast, Safe &amp; Reliable
                <span className="mt-1 block bg-gradient-to-r from-[#39e58c] via-[#13c97a] to-[#8df4bf] bg-clip-text text-transparent">
                  Delivery Service
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/75 sm:text-base sm:leading-8">
                {language === "bn"
                  ? "রাইড বাংলা আপনার প্রিয় খাবার, প্রতিদিনের প্রয়োজনীয় জিনিস এবং গুরুত্বপূর্ণ পার্সেল দ্রুত, নিরাপদে এবং হাসিমুখে আপনার দোরগোড়ায় পৌঁছে দেয়।"
                  : "Ride Bangla brings your favorite food, daily essentials and important parcels right to your door — quickly, safely and with a smile."}
              </p>

              <div className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
                {heroBadges.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 text-white/90">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-bold leading-tight text-white/85">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link to="/services" className={gradientButton}>
                  Order Now <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/10"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-white/60">
                    <Play className="ml-0.5 h-3 w-3 fill-current" />
                  </span>
                  Watch Video
                </button>
              </div>
            </div>

            {/* Curved Bangla badge over the rider photo, bottom-right */}
            <div className="pointer-events-none absolute bottom-10 right-5 hidden text-right sm:right-8 md:block lg:right-12">
              <p className="font-serif text-2xl italic leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.45)] lg:text-3xl">
                আপনার বিশ্বাসই
                <br />
                আমাদের প্রেরণা
              </p>
              <svg viewBox="0 0 200 14" className="ml-auto mt-1 h-3 w-40 text-brand-red" aria-hidden="true">
                <path d="M2 10 C 50 -2, 150 14, 198 4" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Bottom curve into the services strip */}
          <svg
            className="absolute -bottom-px left-0 z-10 block h-10 w-full text-white sm:h-14"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" fill="currentColor" />
          </svg>
        </section>

        {/* ============================= SERVICES ============================= */}
        <section className="relative bg-white px-5 pb-16 pt-10 sm:px-8 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_2.4fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.18em] text-brand-red">
                  <ArrowRight className="h-3.5 w-3.5 -rotate-45" /> Our Services
                </span>
                <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#0A3921] sm:text-4xl">
                  Comprehensive Solutions <br className="hidden sm:block" />
                  Under <span className="text-brand-red">One Roof</span>
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  From food to parcel, groceries to IT solutions — we make your life easier, faster and better.
                </p>
                <Link
                  to="/services"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-3 text-xs font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
                >
                  Explore All Services <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.title}
                      to="/services"
                      className="group relative rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
                    >
                      <div className={`mb-3 grid h-12 w-12 place-items-center rounded-full ${toneStyles[service.tone]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-black text-slate-900">{service.title}</h3>
                      <p className="mt-1 pr-6 text-[11px] leading-5 text-slate-500">{service.text}</p>
                      <span className="absolute bottom-4 right-4 grid h-7 w-7 place-items-center rounded-full bg-emerald-50 text-brand-green transition group-hover:bg-brand-green group-hover:text-white">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============================= ABOUT ============================= */}
        <section className="px-5 sm:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] shadow-[0_25px_70px_rgba(0,45,30,.12)] lg:rounded-[2.5rem]">
            <div className="relative grid lg:grid-cols-2">
              {/* Left dark panel */}
              <div
                className="relative overflow-hidden px-6 py-12 text-white sm:px-10 sm:py-14 lg:pr-28"
                style={{ backgroundColor: BRAND_DARK }}
              >
                <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_85%_20%,rgba(16,220,140,.16),transparent_35%)]" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.18em] text-brand-red">
                    <ArrowRight className="h-3.5 w-3.5 -rotate-45" /> About Ride Bangla Limited
                  </span>
                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                    More Than Just <span className="text-emerald-300">Delivery</span>
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
                    Ride Bangla Limited is a growing multi-service platform, started with a vision to make everyday
                    life easier, safer and smarter. We provide delivery, courier, food, grocery and IT services —
                    all under one trusted brand.
                  </p>

                  <div className="mt-7 grid max-w-md grid-cols-4 gap-3">
                    {aboutServiceIcons.map(({ icon: Icon, label }) => (
                      <div key={label} className="text-center">
                        <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-white/10 text-emerald-300">
                          <Icon className="h-5 w-5" />
                        </span>
                        <p className="mt-2 text-[10px] font-bold leading-tight text-white/70">{label}</p>
                      </div>
                    ))}
                  </div>

                  <Link to="/about" className={`${gradientButton} mt-8 px-5 py-3 text-xs`}>
                    Our Story <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right white panel */}
              <div className="relative bg-white px-6 py-12 sm:px-10 sm:py-14 lg:pl-28">
                <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
                  Why Choose <span className="text-brand-green">Ride</span> <span className="text-brand-red">Bangla?</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
                  We are committed to providing the best delivery experience with advanced technology, professional
                  riders and a customer-first approach.
                </p>

                <div className="mt-8 grid max-w-md grid-cols-4 gap-3">
                  {whyChooseUs.map(({ icon: Icon, label }) => (
                    <div key={label} className="text-center">
                      <span
                        className="mx-auto grid h-12 w-12 place-items-center rounded-full text-white"
                        style={{ backgroundColor: BRAND_DARK }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="mt-2 text-[10px] font-bold leading-tight text-slate-600">{label}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-9 flex items-center gap-2 font-serif text-xl italic text-slate-700">
                  Together We Grow <Heart className="h-4 w-4 fill-brand-red text-brand-red" />
                </p>
              </div>

              {/* Center portrait — bridges both panels. Replace
                  /public/assets/about-photo.jpg with your own representative
                  photo (a rider, a team member, or a customer) to complete
                  this section; a soft placeholder shows until you do. */}
              <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[300px] -translate-x-1/2 lg:block">
                <div className="relative h-full w-full overflow-hidden shadow-2xl">
                  {aboutImgBroken ? (
                    <div
                      className="grid h-full w-full place-items-center"
                      style={{ backgroundColor: BRAND_DARK_DEEP }}
                    >
                      <Users className="h-16 w-16 text-white/25" />
                    </div>
                  ) : (
                    <img
                      src="/assets/about-photo.jpg"
                      alt="Ride Bangla team"
                      className="h-full w-full object-cover"
                      onError={() => setAboutImgBroken(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================= STATS STRIP ============================= */}
        <section className="px-5 pt-16 sm:px-8 lg:pt-20">
          <div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] text-white"
            style={{ backgroundColor: BRAND_DARK }}
          >
            <div
              className="absolute inset-y-0 right-0 hidden w-[38%] bg-cover bg-center opacity-25 sm:block"
              style={{ backgroundImage: "url('/assets/hero-rider.jpg')" }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundImage: `linear-gradient(90deg, ${BRAND_DARK} 55%, rgba(10,57,33,.35) 100%)` }}
            />
            <div className="relative flex flex-col gap-6 px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="grid grid-cols-2 gap-6 sm:flex sm:flex-wrap sm:items-center sm:gap-10">
                {trustItems.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-lg font-black leading-none">{value}</p>
                      <p className="mt-1 text-[11px] font-bold text-white/60">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-left lg:text-right">
                <p className="font-serif text-xl italic text-white">Ride Bangla</p>
                <p className="text-xs font-bold text-emerald-300">Your Journey, Our Priority</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================= APP DOWNLOAD ============================= */}
        <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:py-20">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_10%,rgba(16,185,129,.06),transparent_30%),radial-gradient(circle_at_92%_90%,rgba(255,61,46,.05),transparent_30%)]" />
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.3fr_.9fr]">
              {/* Phone mockup */}
              <div className="order-2 flex justify-center lg:order-1">
                <div className="relative w-44 rounded-[2rem] border-4 border-[#0A3921] bg-[#0A3921] p-2 shadow-2xl sm:w-52">
                  <div className="overflow-hidden rounded-[1.4rem] bg-white">
                    <div className="flex items-center gap-2 bg-[#0A3921] px-3 py-3">
                      <Logo className="h-6 w-6 rounded-md object-contain" />
                      <span className="text-[10px] font-extrabold text-white">Ride Bangla</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-3">
                      {[Utensils, ShoppingBag, Package, Code2].map((Icon, i) => (
                        <span
                          key={i}
                          className="grid aspect-square place-items-center rounded-xl bg-emerald-50 text-brand-green"
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 text-center lg:order-2 lg:text-left">
                <h2 className="text-3xl font-black leading-tight tracking-[-.02em] text-[#0A3921] sm:text-4xl">
                  Download <span className="text-brand-red">Ride</span> <span className="text-brand-green">Bangla</span> App
                </h2>
                <p className="mt-2 text-lg font-bold text-slate-700">Get Faster Service at Your Fingertips</p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 lg:mx-0">
                  Order food, book a ride, send parcels, track in real-time and more — all in one app.
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    to="/apps"
                    className="inline-flex items-center gap-2.5 rounded-xl bg-black px-4 py-2.5 text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    <Smartphone className="h-5 w-5" />
                    <span className="text-left leading-tight">
                      <span className="block text-[8px] font-bold uppercase tracking-wide text-white/60">Get it on</span>
                      <span className="block text-xs font-extrabold">Google Play</span>
                    </span>
                  </Link>
                  <Link
                    to="/apps"
                    className="inline-flex items-center gap-2.5 rounded-xl bg-black px-4 py-2.5 text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    <Smartphone className="h-5 w-5" />
                    <span className="text-left leading-tight">
                      <span className="block text-[8px] font-bold uppercase tracking-wide text-white/60">Download on the</span>
                      <span className="block text-xs font-extrabold">App Store</span>
                    </span>
                  </Link>
                </div>
                <p className="mt-3 text-xs font-bold text-slate-400">Launching soon — tap to get notified on our Apps page.</p>

                <div className="mx-auto mt-8 grid max-w-md grid-cols-4 gap-2.5 lg:mx-0">
                  {appFeatures.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5 rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-sm"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-brand-green">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[10px] font-bold text-slate-600">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR code */}
              <div className="order-3 flex justify-center lg:justify-end">
                <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-lg">
                  <p className="mb-2 text-[11px] font-extrabold text-slate-700">Scan to Download Our App</p>
                  <div className="mx-auto grid h-32 w-32 place-items-center overflow-hidden rounded-xl bg-slate-50">
                    {qrImgBroken ? (
                      <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-0.5 p-2">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <span
                            key={i}
                            className={`${[0, 1, 3, 5, 6, 8, 12, 16, 18, 19, 21, 23].includes(i) ? "bg-[#0A3921]" : "bg-transparent"} rounded-[1px]`}
                          />
                        ))}
                      </div>
                    ) : (
                      <img
                        src="/assets/app-qr.png"
                        alt="Scan to download the Ride Bangla app"
                        className="h-full w-full object-contain"
                        onError={() => setQrImgBroken(true)}
                      />
                    )}
                  </div>
                  <p className="mt-2 text-[10px] font-bold text-slate-400">Fast • Secure • Easy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================= TESTIMONIALS ============================= */}
        <div className="bg-[#f7faf8]">
          <ReviewsSection />
        </div>
      </div>
    </SiteLayout>
  );
}
