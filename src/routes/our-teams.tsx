import { useMemo, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bike, Handshake, Users2, ChevronLeft, ChevronRight, Code2, Store, Briefcase, Truck, Crown } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { LeadershipCard } from "@/components/site/LeadershipCard";
import { leadership } from "@/lib/team-data";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/our-teams")({
  head: () => ({
    meta: [
      { title: "Our Teams — Ride Bangla Leadership, Riders & IT Team" },
      {
        name: "description",
        content:
          "Meet the leadership team behind Ride Bangla — the founders and directors building Bangladesh's delivery, courier and technology ecosystem.",
      },
      { property: "og:title", content: "Our Teams — Ride Bangla" },
      {
        property: "og:description",
        content: "Meet the leadership team behind Ride Bangla.",
      },
      { property: "og:url", content: "https://ridebangla.bd/our-teams" },
    ],
    links: [
      { rel: "canonical", href: "https://ridebangla.bd/our-teams" },
      { rel: "alternate", hreflang: "en", href: "https://ridebangla.bd/our-teams" },
      { rel: "alternate", hreflang: "bn", href: "https://ridebangla.bd/our-teams?lang=bn" },
      { rel: "alternate", hreflang: "x-default", href: "https://ridebangla.bd/our-teams" },
    ],
  }),
  component: OurTeamsPage,
});

const copy = {
  en: {
    headerTitle: "Our Teams",
    headerSubtitle:
      "The founders and leaders building Ride Bangla's delivery, courier and technology ecosystem across Bangladesh.",
    headerEyebrow: "Leadership",
    riderEyebrow: "Rider Team",
    riderTitle: "The riders behind every delivery",
    riderBody:
      "Hundreds of riders across Bangladesh keep Ride Bangla moving — on time, every time.",
    riderAlt: "Ride Bangla rider team",
    itEyebrow: "IT Team",
    itTitle: "The tech team behind Ride Bangla",
    itBody:
      "Our IT team builds and maintains the Ride Bangla platforms — websites, apps and digital solutions.",
    itAlt: "Ride Bangla IT team",
    leadershipEyebrow: "Leadership Team",
    leadershipTitle: "The leaders guiding Ride Bangla",
    leadershipBody:
      "Our leadership team sets the vision and direction for Ride Bangla's growth across Bangladesh.",
    leadershipAlt: "Ride Bangla leadership team",
    partnersEyebrow: "Our Partners",
    partnersTitle: "Partners who grow with us",
    partnersBody:
      "Restaurants, home kitchens, pharmacies and businesses partner with Ride Bangla to reach more customers.",
    partnersAlt: "Ride Bangla partners team",
    partnerCatEyebrow: "Partner Categories",
    partnerCatTitle: "Every category, one platform",
    partnerCatBody:
      "From home kitchens to restaurants, medicine to IT partners — all working together to build a smarter Bangladesh.",
    partnerCatAlt: "Ride Bangla partner categories",
    officeEyebrow: "Office Team",
    officeTitle: "The team behind the operations",
    officeBody:
      "Our office team keeps everything running smoothly — support, coordination and customer care.",
    officeAlt: "Ride Bangla office team",
    deliveryEyebrow: "Delivery Team",
    deliveryTitle: "Fast and reliable deliveries",
    deliveryBody:
      "Our delivery team ensures every parcel reaches its destination safely and on time.",
    deliveryAlt: "Ride Bangla delivery team",
    moreEyebrow: "More Teams",
    partnerAgentTitle: "Partner & Agent Teams",
    partnerTitle: "Partner Team",
    agentTitle: "Agent Team",
    comingSoon: "Photos and updates coming soon.",
  },
  bn: {
    headerTitle: "আমাদের টিমগুলো",
    headerSubtitle:
      "বাংলাদেশ জুড়ে Ride Bangla-এর ডেলিভারি, কুরিয়ার ও প্রযুক্তি ইকোসিস্টেম গড়ে তোলা প্রতিষ্ঠাতা ও নেতৃবৃন্দ।",
    headerEyebrow: "নেতৃত্ব",
    riderEyebrow: "রাইডার টিম",
    riderTitle: "প্রতিটি ডেলিভারির পেছনে থাকা রাইডাররা",
    riderBody:
      "সারা বাংলাদেশের শত শত রাইডার Ride Bangla-কে সচল রেখেছেন — সবসময়, সঠিক সময়ে।",
    riderAlt: "Ride Bangla রাইডার টিম",
    itEyebrow: "আইটি টিম",
    itTitle: "Ride Bangla-এর পেছনে থাকা টেক টিম",
    itBody:
      "আমাদের আইটি টিম Ride Bangla-এর প্ল্যাটফর্মগুলো তৈরি ও রক্ষণাবেক্ষণ করে — ওয়েবসাইট, অ্যাপ ও ডিজিটাল সলিউশন।",
    itAlt: "Ride Bangla আইটি টিম",
    leadershipEyebrow: "লিডারশিপ টিম",
    leadershipTitle: "Ride Bangla-কে এগিয়ে নেওয়া নেতৃবৃন্দ",
    leadershipBody:
      "আমাদের লিডারশিপ টিম বাংলাদেশ জুড়ে Ride Bangla-এর প্রবৃদ্ধির দিকনির্দেশনা দেয়।",
    leadershipAlt: "Ride Bangla লিডারশিপ টিম",
    partnersEyebrow: "আমাদের পার্টনার",
    partnersTitle: "যারা আমাদের সাথে বেড়ে ওঠে",
    partnersBody:
      "রেস্টুরেন্ট, হোম কিচেন, ফার্মেসি ও ব্যবসা প্রতিষ্ঠান Ride Bangla-এর সাথে যুক্ত হয়ে আরও গ্রাহকের কাছে পৌঁছায়।",
    partnersAlt: "Ride Bangla পার্টনার টিম",
    partnerCatEyebrow: "পার্টনার ক্যাটাগরি",
    partnerCatTitle: "প্রতিটি ক্যাটাগরি, এক প্ল্যাটফর্ম",
    partnerCatBody:
      "হোম কিচেন থেকে রেস্টুরেন্ট, ওষুধ থেকে আইটি পার্টনার — সবাই মিলে গড়ে তুলছে স্মার্ট বাংলাদেশ।",
    partnerCatAlt: "Ride Bangla পার্টনার ক্যাটাগরি",
    officeEyebrow: "অফিস টিম",
    officeTitle: "কার্যক্রমের পেছনে থাকা টিম",
    officeBody:
      "আমাদের অফিস টিম সবকিছু সুচারুভাবে চালায় — সাপোর্ট, সমন্বয় ও গ্রাহক সেবা।",
    officeAlt: "Ride Bangla অফিস টিম",
    deliveryEyebrow: "ডেলিভারি টিম",
    deliveryTitle: "দ্রুত ও নির্ভরযোগ্য ডেলিভারি",
    deliveryBody:
      "আমাদের ডেলিভারি টিম নিশ্চিত করে প্রতিটি পার্সেল নিরাপদে ও সময়মতো গন্তব্যে পৌঁছায়।",
    deliveryAlt: "Ride Bangla ডেলিভারি টিম",
    moreEyebrow: "আরও টিম",
    partnerAgentTitle: "পার্টনার ও এজেন্ট টিমগুলো",
    partnerTitle: "পার্টনার টিম",
    agentTitle: "এজেন্ট টিম",
    comingSoon: "ছবি ও আপডেট শীঘ্রই আসছে।",
  },
} as const;

type TeamSlide = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: React.ReactNode;
};

function TeamPhotoSlider({ slides }: { slides: TeamSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  // Preload every slide image on mount so autoplay never lands on a
  // blank/loading frame (this was why the last photo appeared "missing").
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, [slides]);

  // Autoplay: 5s per slide. Timer restarts on every slide change (auto or
  // manual) and pauses while the user hovers/touches the slider.
  useEffect(() => {
    if (total <= 1 || paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total, paused, index]);

  const goTo = (i: number) => setIndex(((i % total) + total) % total);
  const slide = slides[index];

  return (
    <div
      className="select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Text block — keyed so it softly fades on every slide change.
          Min-heights keep the copy swap from shifting the photo below. */}
      <div key={index} className="rb-slide-text">
        <div className="flex h-5 items-center gap-2 text-brand-green">
          {slide.icon}
          <p className="text-xs font-black uppercase tracking-[.18em]">{slide.eyebrow}</p>
        </div>
        <h2 className="mt-2 min-h-[4rem] text-2xl font-black text-[#06291f] sm:min-h-[2.75rem] sm:text-3xl">
          {slide.title}
        </h2>
        <p className="mt-2 min-h-[3.75rem] max-w-2xl text-sm text-slate-600">{slide.body}</p>
      </div>
      {/* Photo stage — fixed 3:2 aspect ratio so the layout never jumps.
          All slides stay mounted and crossfade (opacity) with a slow
          cinematic zoom on the active photo. */}
      <div className="relative mt-6 aspect-[3/2] overflow-hidden rounded-3xl bg-[#06291f]/5 shadow-[0_24px_70px_rgba(0,42,28,.12)]">
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            draggable={false}
            aria-hidden={i === index ? undefined : true}
            style={{ transition: "opacity 1s ease-in-out, transform 6s linear" }}
            className={`absolute inset-0 h-full w-full object-cover ${
              i === index ? "scale-[1.06] opacity-100" : "scale-100 opacity-0"
            }`}
          />
        ))}
        {total > 1 && (
          <>
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Previous team photo"
              className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Next team photo"
              className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${s.title}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function OurTeamsPage() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  return (
    <SiteLayout>
      <PageHeader
        title={t.headerTitle}
        subtitle={t.headerSubtitle}
        eyebrow={t.headerEyebrow}
        icon={Users2}
        bgImage="/assets/pages/our-teams-header.jpg"
      />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {leadership.map((member) => (
            <LeadershipCard key={member.id} member={member} language={language} />
          ))}
        </div>
      </section>

      {/* Team Photos Slider — Rider, IT, Leadership, Partners, Office & Delivery teams */}
      <section className="bg-[#f4faf6] px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <TeamPhotoSlider
            slides={[
              {
                src: "/assets/pages/rider-team.jpg",
                alt: t.riderAlt,
                eyebrow: t.riderEyebrow,
                title: t.riderTitle,
                body: t.riderBody,
                icon: <Bike className="h-5 w-5" />,
              },
              {
                src: "/assets/pages/it-team.jpg",
                alt: t.itAlt,
                eyebrow: t.itEyebrow,
                title: t.itTitle,
                body: t.itBody,
                icon: <Code2 className="h-5 w-5" />,
              },
              {
                src: "/assets/teams/leadership-group.webp",
                alt: t.leadershipAlt,
                eyebrow: t.leadershipEyebrow,
                title: t.leadershipTitle,
                body: t.leadershipBody,
                icon: <Crown className="h-5 w-5" />,
              },
              {
                src: "/assets/teams/partners-team.webp",
                alt: t.partnersAlt,
                eyebrow: t.partnersEyebrow,
                title: t.partnersTitle,
                body: t.partnersBody,
                icon: <Handshake className="h-5 w-5" />,
              },
              {
                src: "/assets/teams/partner-categories.webp",
                alt: t.partnerCatAlt,
                eyebrow: t.partnerCatEyebrow,
                title: t.partnerCatTitle,
                body: t.partnerCatBody,
                icon: <Store className="h-5 w-5" />,
              },
              {
                src: "/assets/teams/office-team.webp",
                alt: t.officeAlt,
                eyebrow: t.officeEyebrow,
                title: t.officeTitle,
                body: t.officeBody,
                icon: <Briefcase className="h-5 w-5" />,
              },
              {
                src: "/assets/teams/delivery-team.webp",
                alt: t.deliveryAlt,
                eyebrow: t.deliveryEyebrow,
                title: t.deliveryTitle,
                body: t.deliveryBody,
                icon: <Truck className="h-5 w-5" />,
              },
            ]}
          />
        </div>
      </section>

      {/* Partner & Agent Teams — reserved slots, to be filled once photos/updates are provided */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 text-brand-green">
            <Handshake className="h-5 w-5" />
            <p className="text-xs font-black uppercase tracking-[.18em]">{t.moreEyebrow}</p>
          </div>
          <h2 className="mt-2 text-2xl font-black text-[#06291f] sm:text-3xl">{t.partnerAgentTitle}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-brand-green/25 bg-[#f4faf6] p-8 text-center">
              <Handshake className="h-8 w-8 text-brand-green/50" />
              <p className="mt-3 text-sm font-bold text-[#06291f]">{t.partnerTitle}</p>
              <p className="mt-1 text-xs text-slate-500">{t.comingSoon}</p>
            </div>
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-brand-green/25 bg-[#f4faf6] p-8 text-center">
              <Users2 className="h-8 w-8 text-brand-green/50" />
              <p className="mt-3 text-sm font-bold text-[#06291f]">{t.agentTitle}</p>
              <p className="mt-1 text-xs text-slate-500">{t.comingSoon}</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
