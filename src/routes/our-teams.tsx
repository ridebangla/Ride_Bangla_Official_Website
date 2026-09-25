import { createFileRoute } from "@tanstack/react-router";
import { Users2 } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { LeadershipCard } from "@/components/site/LeadershipCard";
import { leadership } from "@/lib/team-data";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/our-teams")({
  head: () => ({
    meta: [
      { title: "Our Teams — Ride Bangla" },
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
    links: [{ rel: "canonical", href: "https://ridebangla.bd/our-teams" }],
  }),
  component: OurTeamsPage,
});

function OurTeamsPage() {
  const { language } = useLanguage();

  return (
    <SiteLayout>
      <PageHeader
        title="Our Teams"
        subtitle="The founders and leaders building Ride Bangla's delivery, courier and technology ecosystem across Bangladesh."
        eyebrow="Leadership"
        icon={Users2}
      />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {leadership.map((member) => (
            <LeadershipCard key={member.id} member={member} language={language} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
