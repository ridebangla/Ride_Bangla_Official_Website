import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Code2,
  Headphones,
  MapPin,
  Package,
  Play,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Utensils,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useReviews, type Review } from "@/lib/reviews";
import { useRealtimeWebsiteUpdates } from "@/lib/realtime-updates";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ride Bangla Limited — Fast, Safe & Reliable Services" },
      {
        name: "description",
        content:
          "Ride Bangla Limited connects people and businesses through ride, food delivery, grocery, parcel, courier and technology services across Bangladesh.",
      },
      { property: "og:title", content: "Ride Bangla Limited" },
      {
        property: "og:description",
        content: "One trusted brand for delivery, mobility, commerce and technology services.",
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
] as const;

/** These are the permanent service categories represented by the reference design. */
const services = [
  {
    icon: Utensils,
    title: "Food Delivery",
    text: "Restaurant and homemade food delivered fresh and fast.",
    tone: "red",
  },
  {
    icon: ShoppingBag,
    title: "Grocery Delivery",
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
    text: "Documents and products delivered securely.",
    tone: "blue",
  },
  {
    icon: Code2,
    title: "Ride Bangla IT",
    text: "Digital products, websites, design and technology services.",
    tone: "purple",
  },
] as const;

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rb-review-card rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        {review.photo_url ? (
          <img
            src={review.photo_url}
            alt={review.name}
            referrerPolicy="no-referrer"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
          />
        ) : (
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#eaf7ef] text-sm font-black text-[#0b7a3b]">
            {review.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase())
              .join("") || "R"}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-sm font-black text-[#06291f]">{review.name}</h3>
          <div className="mt-1 flex gap-0.5 text-[#f5b301]" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className={`h-3 w-3 ${index < review.rating ? "fill-current" : "text-slate-200"}`} />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-4 text-xs leading-5 text-slate-600">{review.comment}</p>
      <span className="mt-3 inline-flex rounded-full bg-[#eaf7ef] px-2.5 py-1 text-[9px] font-extrabold text-[#0b7a3b]">
        Verified Google Account
      </span>
    </article>
  );
}

function HomePage() {
  const { language } = useLanguage();
  const { updates } = useRealtimeWebsiteUpdates(20);
  const { reviews, count: reviewCount, average: averageRating, loading: reviewsLoading } = useReviews(20);
  const [reviewPage, setReviewPage] = useState(0);

  const latestVideoUpdate = useMemo(
    () => updates.find((item) => Boolean(item.video_url)),
    [updates],
  );

  const visibleReviews = useMemo(() => {
    if (reviews.length <= 4) return reviews;
    const start = (reviewPage * 4) % reviews.length;
    return Array.from({ length: Math.min(4, reviews.length) }, (_, index) => reviews[(start + index) % reviews.length]);
  }, [reviews, reviewPage]);

  useEffect(() => {
    if (reviews.length <= 4) return;
    const timer = window.setInterval(() => setReviewPage((value) => value + 1), 7000);
    return () => window.clearInterval(timer);
  }, [reviews.length]);

  const stats = [
    { icon: Boxes, value: String(services.length), label: "Service Categories" },
    {
      icon: Star,
      value: reviewCount > 0 ? `${averageRating.toFixed(1)}★` : "—",
      label: reviewCount > 0 ? `${reviewCount} Verified Reviews` : "Verified Reviews",
    },
    { icon: Sparkles, value: String(updates.length), label: "Published Updates" },
    { icon: Headphones, value: "24/7", label: "Customer Support" },
  ] as const;

  return (
    <SiteLayout overlayHeader hideGlobalAppBanner>
      <div className="rb-home overflow-hidden bg-white">
        {/* HERO — the supplied hero banner is the exact visual background. */}
        <section className="rb-reference-hero relative isolate min-h-[620px] overflow-hidden text-white sm:min-h-[690px] lg:min-h-[720px]">
          <img
            src="/assets/hero-rider.jpg"
            alt="Ride Bangla rider on a city road"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,39,28,.94)_0%,rgba(0,39,28,.82)_30%,rgba(0,39,28,.18)_65%,rgba(0,39,28,.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,39,28,.22),transparent_35%,rgba(0,39,28,.36))]" />

          <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-5 pb-16 pt-32 sm:min-h-[690px] sm:px-8 lg:min-h-[720px] lg:px-10">
            <div className="max-w-[600px]">
              <p className="text-[11px] font-extrabold uppercase tracking-[.12em] text-[#62e49d]">Your Trusted Delivery Partner</p>
              <h1 className="mt-3 text-5xl font-black leading-[.98] tracking-[-.04em] sm:text-6xl lg:text-[68px]">
                Fast, Safe &amp; Reliable
                <span className="mt-2 block text-[#16d982]">Delivery Service</span>
              </h1>
              <p className="mt-5 max-w-[510px] text-sm leading-6 text-white/85 sm:text-base">
                {language === "bn"
                  ? "ফুড, গ্রোসারি, পার্সেল ও গুরুত্বপূর্ণ ডেলিভারি—দ্রুত, নিরাপদ ও বিশ্বস্ত সেবায় আপনার দরজায়।"
                  : "Ride Bangla brings your favorite food, daily essentials and important parcels right to your door — quickly, safely and with a smile."}
              </p>

              <div className="mt-6 grid max-w-[510px] grid-cols-2 gap-3 sm:grid-cols-4">
                {heroFeatures.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-white">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/40 bg-black/15 backdrop-blur-sm">
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                    <span className="text-[10px] font-bold leading-tight sm:text-[11px]">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 rounded-full bg-[#ed1c24] px-6 py-3 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(237,28,36,.28)] transition hover:bg-[#d8171f]"
                >
                  Order Now <ArrowRight className="h-4 w-4" />
                </Link>
                {latestVideoUpdate?.video_url ? (
                  <a
                    href={latestVideoUpdate.video_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-black/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-white/15"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#075e2e]"><Play className="ml-0.5 h-3 w-3 fill-current" /></span>
                    Watch Video
                  </a>
                ) : (
                  <Link
                    to="/updates"
                    className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-black/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-white/15"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#075e2e]"><Play className="ml-0.5 h-3 w-3 fill-current" /></span>
                    Watch Video
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES — white floating card row, matching the reference. */}
        <section className="relative z-20 -mt-7 px-4 sm:-mt-10 sm:px-8">
          <div className="mx-auto max-w-7xl rounded-[1.7rem] bg-white p-5 shadow-[0_20px_55px_rgba(0,45,30,.14)] sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_2.95fr] lg:items-center">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#0b7a3b]">Our Services</span>
                <h2 className="mt-2 text-2xl font-black leading-tight text-[#06291f] sm:text-[30px]">
                  Comprehensive Solutions<br />Under <span className="text-[#ed1c24]">One Roof</span>
                </h2>
                <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                  From food to parcel, groceries to IT solutions — we make your life easier, faster and better.
                </p>
                <Link
                  to="/services"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0b7a3b] px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#075e2e]"
                >
                  Explore All Services <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                {services.map((service) => {
                  const Icon = service.icon;
                  const tone = {
                    red: "bg-[#fff1f1] text-[#ed1c24]",
                    green: "bg-[#eaf7ef] text-[#0b7a3b]",
                    orange: "bg-[#fff4ec] text-[#f97316]",
                    blue: "bg-[#eff6ff] text-[#2563eb]",
                    purple: "bg-[#f5f3ff] text-[#7c3aed]",
                  }[service.tone];
                  return (
                    <Link key={service.title} to="/services" className="group relative rounded-2xl border border-slate-100 bg-white p-3.5 pb-9 shadow-[0_5px_20px_rgba(0,0,0,.05)] transition hover:-translate-y-1 hover:shadow-lg">
                      <div className={`mb-3 grid h-10 w-10 place-items-center rounded-full ${tone}`}><Icon className="h-5 w-5" /></div>
                      <h3 className="text-[13px] font-black text-[#06291f]">{service.title}</h3>
                      <p className="mt-1 text-[10px] leading-4 text-slate-500">{service.text}</p>
                      <span className="absolute bottom-3 right-3 grid h-6 w-6 place-items-center rounded-full bg-[#0b7a3b] text-white"><ArrowRight className="h-3 w-3" /></span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT — exact supplied banner, displayed without cropping. */}
        <section className="px-4 py-8 sm:px-8 sm:py-10 lg:py-12">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.7rem] shadow-[0_20px_65px_rgba(0,45,30,.13)]">
            <img src="/assets/about-photo.jpg" alt="About Ride Bangla Limited and why customers choose Ride Bangla" className="block h-auto w-full" />
            <Link to="/about" aria-label="Open Ride Bangla story" className="absolute left-[3%] top-[76%] h-[11%] w-[16%] rounded-full" />
          </div>
        </section>

        {/* REAL-TIME STATS — no fabricated customer/rider numbers. */}
        <section className="relative overflow-hidden bg-[#04241b] px-5 py-7 text-white sm:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(22,207,126,.2),transparent_35%)]" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 border-r border-white/10 last:border-0 sm:justify-center">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-[#5ee7a1]"><Icon className="h-5 w-5" /></span>
                <div><p className="text-xl font-black">{value}</p><p className="text-[10px] font-bold text-white/60">{label}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* APP DOWNLOAD — exact supplied banner with responsive aspect ratio. */}
        <section className="px-4 py-8 sm:px-8 sm:py-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.7rem] shadow-[0_20px_65px_rgba(0,45,30,.13)]">
            <img src="/assets/app-download-hero.jpg" alt="Ride Bangla app download banner" className="block h-auto w-full" />
            <Link to="/apps" aria-label="Open Ride Bangla Apps page" className="absolute left-[22%] top-[70%] h-[16%] w-[31%]" />
            <Link to="/apps" aria-label="Open Ride Bangla Apps page" className="absolute left-[39%] top-[70%] h-[16%] w-[17%]" />
          </div>
        </section>

        {/* REVIEWS — exclusively real Firebase reviews. */}
        <section className="px-5 pb-12 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5">
              <h2 className="text-2xl font-black text-[#06291f] sm:text-3xl">What Our Customers Say</h2>
              <p className="mt-1 text-xs text-slate-500">Real people. Real experiences.</p>
            </div>

            {reviewsLoading ? (
              <div className="grid min-h-36 place-items-center rounded-2xl border border-slate-100 bg-slate-50 text-sm text-slate-400">Loading verified reviews…</div>
            ) : visibleReviews.length > 0 ? (
              <div className="relative">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {visibleReviews.map((review) => <ReviewCard key={review.id} review={review} />)}
                </div>
                {reviews.length > 4 && (
                  <>
                    <button type="button" onClick={() => setReviewPage((value) => Math.max(0, value - 1))} aria-label="Previous reviews" className="absolute -left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#0b7a3b] text-white shadow-lg sm:-left-5"><ChevronLeft className="h-4 w-4" /></button>
                    <button type="button" onClick={() => setReviewPage((value) => value + 1)} aria-label="Next reviews" className="absolute -right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#0b7a3b] text-white shadow-lg sm:-right-5"><ChevronRight className="h-4 w-4" /></button>
                  </>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#b7dfc8] bg-[#f5fbf7] p-8 text-center text-sm text-slate-500">
                No verified customer reviews have been published yet.
              </div>
            )}

            {reviews.length > 4 && (
              <div className="mt-5 flex justify-center gap-1.5">
                {Array.from({ length: Math.ceil(reviews.length / 4) }).map((_, index) => (
                  <button key={index} type="button" onClick={() => setReviewPage(index)} aria-label={`Review page ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === reviewPage % Math.ceil(reviews.length / 4) ? "w-6 bg-[#0b7a3b]" : "w-1.5 bg-slate-300"}`} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FINAL CTA keeps the reference's green/red visual language. */}
        <section className="px-5 pb-12 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-7xl rounded-[1.7rem] bg-[#06291f] px-6 py-10 text-center text-white sm:px-10">
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#5ee7a1]">Ride Bangla Limited</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Together We Grow</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/65">Connect with Ride Bangla for services, partnerships and support.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#ed1c24] px-5 py-3 text-xs font-extrabold text-white">Contact Us <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs font-extrabold text-white">Our Story <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>

        <div className="sr-only">Ride Bangla homepage with real-time Firebase reviews and published website updates.</div>
      </div>
    </SiteLayout>
  );
}
