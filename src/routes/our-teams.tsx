import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bike, Handshake, Users2 } from "lucide-react";
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
    moreEyebrow: "আরও টিম",
    partnerAgentTitle: "পার্টনার ও এজেন্ট টিমগুলো",
    partnerTitle: "পার্টনার টিম",
    agentTitle: "এজেন্ট টিম",
    comingSoon: "ছবি ও আপডেট শীঘ্রই আসছে।",
  },
} as const;

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
      />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {leadership.map((member) => (
            <LeadershipCard key={member.id} member={member} language={language} />
          ))}
        </div>
      </section>

      {/* Rider Team */}
      <section className="bg-[#f4faf6] px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 text-brand-green">
            <Bike className="h-5 w-5" />
            <p className="text-xs font-black uppercase tracking-[.18em]">{t.riderEyebrow}</p>
          </div>
          <h2 className="mt-2 text-2xl font-black text-[#06291f] sm:text-3xl">{t.riderTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            {t.riderBody}
          </p>
          <div className="mt-6 overflow-hidden rounded-3xl shadow-[0_24px_70px_rgba(0,42,28,.12)]">
            <img src="/assets/pages/rider-team.jpg" alt={t.riderAlt} className="h-full w-full object-cover" />
          </div>
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
