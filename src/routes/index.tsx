import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bike,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Code2,
  Headphones,
  MapPin,
  Package,
  Play,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Truck,
  Utensils,
  Users,
  WalletCards,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Logo } from "@/components/site/Logo";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { useLanguage } from "@/context/LanguageContext";

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

const slides = [
  {
    eyebrow: "YOUR TRUSTED DELIVERY PARTNER",
    title: "Fast, Safe & Reliable",
    accent: "Delivery Service",
    description:
      "Food, groceries, parcels and everyday essentials — delivered with care, speed and real-time visibility.",
    cta: "Explore Services",
    href: "/services",
    stat: "24/7",
    statLabel: "Customer Support",
  },
  {
    eyebrow: "BUILT FOR MODERN BANGLADESH",
    title: "One Brand. Many Solutions.",
    accent: "One Roof.",
    description:
      "Ride Bangla is growing from a delivery platform into a connected ecosystem for customers, riders, merchants and businesses.",
    cta: "About Ride Bangla",
    href: "/about",
    stat: "64",
    statLabel: "District Vision",
  },
  {
    eyebrow: "OUR NEXT CHAPTER",
    title: "Technology That Moves",
    accent: "People & Business",
    description:
      "Our emerging IT sector brings software, design and digital solutions into the same trusted Ride Bangla ecosystem.",
    cta: "Discover Our Apps",
    href: "/apps",
    stat: "01",
    statLabel: "Connected Ecosystem",
  },
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

const trustItems = [
  { icon: Users, value: "20K+", label: "Happy Customers" },
  { icon: Bike, value: "500+", label: "Active Riders" },
  { icon: Boxes, value: "50+", label: "Service Categories" },
  { icon: Clock3, value: "24/7", label: "Customer Support" },
];

function HomePage() {
  const { language } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const slide = slides[activeSlide];

  const serviceCount = useMemo(() => services.length, []);

  return (
    <SiteLayout>
      <div className="rb-home overflow-hidden">
        {/* HERO */}
        <section
          className="relative isolate min-h-[560px] bg-[#002c20] text-white sm:min-h-[640px] lg:min-h-[780px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(0,214,127,.24),transparent_32%),radial-gradient(circle_at_15%_85%,rgba(226,27,27,.14),transparent_30%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,35,26,.98)_0%,rgba(0,35,26,.82)_38%,rgba(0,35,26,.34)_68%,rgba(0,35,26,.68)_100%)]" />
          {/* Mobile/tablet: background-position shifted so the rider stays inside the frame instead of being cropped out by bg-cover. Desktop: centered, image only covers the right 68% strip. */}
          <div
            className="absolute inset-y-0 right-0 w-full bg-cover bg-[position:68%_top] opacity-80 sm:bg-[position:62%_center] lg:w-[68%] lg:bg-center"
            style={{ backgroundImage: "url('/assets/hero-rider.jpg')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,36,27,.25),rgba(0,36,27,.15)_55%,rgba(0,36,27,.8))]" />

          <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-5 pb-24 pt-28 sm:px-8 lg:min-h-[780px] lg:px-10">
            <div key={activeSlide} className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-extrabold tracking-[.18em] text-emerald-200 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_15px_rgba(110,231,183,.8)]" />
                {slide.eyebrow}
              </div>

              <h1 className="text-5xl font-black leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-8xl">
                {slide.title}
                <span className="mt-2 block bg-gradient-to-r from-[#39e58c] via-[#13c97a] to-[#8df4bf] bg-clip-text text-transparent">
                  {slide.accent}
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                {language === "bn"
                  ? "ফুড, গ্রোসারি, পার্সেল, কুরিয়ার এবং প্রযুক্তি—একটি বিশ্বস্ত ব্র্যান্ডের অধীনে দ্রুত, নিরাপদ ও আধুনিক সেবা।"
                  : slide.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={slide.href as "/services" | "/about" | "/apps"}
                  className="group inline-flex items-center gap-3 rounded-2xl bg-[#ed1c24] px-6 py-3.5 text-sm font-extrabold shadow-[0_15px_45px_rgba(237,28,36,.25)] transition hover:-translate-y-1 hover:bg-[#ff2630]"
                >
                  {slide.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-extrabold backdrop-blur-xl transition hover:bg-white/15"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#004c37]">
                    <Play className="ml-0.5 h-3 w-3 fill-current" />
                  </span>
                  Watch Story
                </button>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  [ShieldCheck, "Safe & Secure"],
                  [MapPin, "Live Tracking"],
                  [Headphones, "24/7 Support"],
                  [Sparkles, "Fast Service"],
                ].map(([Icon, label]) => {
                  const ServiceIcon = Icon as typeof ShieldCheck;
                  return (
                    <div
                      key={label as string}
                      className="rounded-2xl border border-white/10 bg-white/[.07] p-3 backdrop-blur-md"
                    >
                      <ServiceIcon className="mb-2 h-5 w-5 text-emerald-300" />
                      <span className="text-xs font-bold text-white/80">
                        {label as string}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute bottom-8 right-5 hidden w-64 lg:block xl:right-10">
              <div className="rounded-[2rem] border border-white/15 bg-black/30 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Logo className="h-8 w-8 rounded-lg object-contain" />
                    <div>
                      <p className="text-xs font-extrabold">Ride Bangla</p>
                      <p className="text-[10px] text-white/50">Limited</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[9px] font-bold text-emerald-300">
                    LIVE
                  </span>
                </div>
                <div className="py-5">
                  <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="text-white/55">Service network</span>
                    <span className="font-bold text-emerald-300">Growing</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-emerald-500 to-lime-300" />
                  </div>
                </div>
                <div key={activeSlide} className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black">{slide.stat}</p>
                    <p className="text-[10px] text-white/50">{slide.statLabel}</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pb-6 sm:px-8 lg:px-10">
              <div className="flex items-center gap-2">
                {slides.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`Show slide ${index + 1}`}
                    onClick={() => setActiveSlide(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      activeSlide === index ? "w-12 bg-white" : "w-5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/20 backdrop-blur-xl transition hover:bg-white/10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/20 backdrop-blur-xl transition hover:bg-white/10"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
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
                      className="group rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-black text-slate-900">{service.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-[11px] leading-5 text-slate-500">{service.text}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-extrabold text-brand-green">
                        Learn more <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/*
          ABOUT
          Note: the founder/leadership photo card that used to sit here was
          removed on purpose — that photo already lives on the Our Teams /
          leadership page, so we don't need to repeat it on the homepage.
          This is now a single, centered text block; the IT team's own
          banner (with its own photo) is the very next section below.
        */}
        <section className="bg-[#f7faf8] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-brand-green">
              <span className="h-px w-8 bg-brand-green" /> About Ride Bangla Limited <span className="h-px w-8 bg-brand-green" />
            </span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-.035em] text-[#06291f] sm:text-5xl">
              More than just <span className="text-brand-green">delivery.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Ride Bangla is growing as a multi-service platform where delivery, mobility, commerce and technology can work together under one trusted identity.
            </p>
            <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
              {[
                [Utensils, "Food & Essentials", "Convenient everyday delivery"],
                [Package, "Parcel & Courier", "Secure movement of products"],
                [Code2, "IT & Digital", "Technology built for growth"],
                [Users, "People First", "Customers, riders & partners"],
              ].map(([Icon, title, text]) => {
                const FeatureIcon = Icon as typeof Utensils;
                return (
                  <div key={title as string} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm">
                    <div className="flex gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-brand-green">
                        <FeatureIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-sm font-black text-slate-900">{title as string}</h3>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{text as string}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#06291f] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-green"
            >
              Discover Our Story <ArrowRight className="h-4 w-4" />
            </Link>
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

        {/* APP DOWNLOAD (home-only rich version) */}
        <section className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_10%,rgba(16,185,129,.07),transparent_30%),radial-gradient(circle_at_92%_90%,rgba(237,28,36,.06),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
            {/* Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-emerald-400/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] bg-[#06291f] p-5 shadow-2xl sm:p-6">
                <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_15%,rgba(35,225,139,.2),transparent_32%)]" />
                {/*
                  Drop your own app-download photo at
                  /public/assets/app-download-hero.jpg (rider with the
                  delivery box works well, matching the reference design).
                  This frame is a dedicated slot — separate from the hero
                  banner image — sized and styled to match the other
                  image cards on this page.
                */}
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-cover bg-center"
                  style={{ backgroundImage: "url('/assets/app-download-hero.jpg')" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06291f] via-[#06291f]/10 to-transparent" />
                </div>

                {/* Floating phone mock */}
                <div className="absolute -bottom-7 -left-3 w-36 rounded-[1.5rem] border border-white/15 bg-black/70 p-2.5 shadow-2xl backdrop-blur-xl sm:-left-7 sm:w-44">
                  <div className="rounded-[1.1rem] bg-[#0a3627] p-3.5">
                    <div className="flex items-center gap-2">
                      <Logo className="h-6 w-6 rounded-md object-contain" />
                      <span className="text-[10px] font-extrabold text-white">Ride Bangla</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-1.5">
                      {[Utensils, ShoppingBag, Package, Code2].map((Icon, i) => (
                        <span key={i} className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-emerald-300">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-brand-green">
                <span className="h-px w-8 bg-brand-green" /> Ride Bangla App
              </span>
              <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-[-.035em] text-[#06291f] sm:text-5xl">
                Get Faster Service <span className="text-brand-red">At Your</span> <span className="text-brand-green">Fingertips.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                Order food, book a ride, send parcels and track everything in real-time — all in one app, from the same trusted Ride Bangla ecosystem.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/apps"
                  className="inline-flex items-center gap-3 rounded-2xl bg-[#06291f] px-5 py-3 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-black"
                >
                  <Smartphone className="h-6 w-6 text-emerald-300" />
                  <span className="text-left leading-tight">
                    <span className="block text-[9px] font-bold uppercase tracking-wide text-white/55">Get it on</span>
                    <span className="block text-sm font-extrabold">Google Play</span>
                  </span>
                </Link>
                <Link
                  to="/apps"
                  className="inline-flex items-center gap-3 rounded-2xl bg-[#06291f] px-5 py-3 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-black"
                >
                  <Smartphone className="h-6 w-6 text-emerald-300" />
                  <span className="text-left leading-tight">
                    <span className="block text-[9px] font-bold uppercase tracking-wide text-white/55">Download on the</span>
                    <span className="block text-sm font-extrabold">App Store</span>
                  </span>
                </Link>
              </div>
              <p className="mt-4 text-xs font-bold text-slate-400">Launching soon — tap to get notified on our Apps page.</p>

              <div className="mt-9 grid max-w-md grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  [Utensils, "Food"],
                  [ShoppingBag, "Grocery"],
                  [Package, "Parcel"],
                  [MapPin, "Live Track"],
                ].map(([Icon, label]) => {
                  const FeatureIcon = Icon as typeof Utensils;
                  return (
                    <div key={label as string} className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-sm">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-brand-green">
                        <FeatureIcon className="h-4.5 w-4.5" />
                      </span>
                      <span className="text-[11px] font-bold text-slate-600">{label as string}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* TRUST / STATS */}
        <section className="relative -mt-px overflow-hidden bg-white px-5 py-7 sm:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,45,30,.08)] sm:grid-cols-4">
            {trustItems.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 border-b border-slate-100 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-brand-green">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xl font-black text-slate-900">{value}</p>
                  <p className="text-[11px] font-bold text-slate-500">{label}</p>
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
