import { createFileRoute } from "@tanstack/react-router";
import { Globe2 } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { OFFICIAL_PLATFORMS } from "@/lib/official-platforms";

export const Route = createFileRoute("/apps")({
  head: () => ({
    meta: [
      { title: "Apps & Platforms — Ride Bangla Ecosystem" },
      {
        name: "description",
        content:
          "Official Ride Bangla customer, partner, rider, agent and studio platforms, application information and verified download links.",
      },
      { property: "og:title", content: "Apps & Platforms — Ride Bangla" },
      {
        property: "og:description",
        content: "Official platforms and applications in the Ride Bangla ecosystem.",
      },
      { property: "og:url", content: "https://ridebangla.bd/apps" },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/apps" }],
  }),
  component: AppsPage,
});

function AppsPage() {
  return (
    <SiteLayout>
      <PageHeader
        title="Ride Bangla Apps & Platforms"
        subtitle="Official access points for customers, partners, riders, agents, studio services and verified Ride Bangla applications."
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Official Platforms</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Use these verified Ride Bangla web addresses to access each part of the ecosystem.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICIAL_PLATFORMS.map((platform) => (
              <a
                key={platform.key}
                href={platform.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{platform.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {platform.description}
                    </p>
                  </div>
                  <Globe2 className="h-5 w-5 shrink-0 text-brand-green" />
                </div>
                <p className="mt-4 break-all text-xs font-semibold text-brand-green">
                  {platform.url.replace("https://", "")}
                </p>
              </a>
            ))}
          </div>
        </div>

      </section>
    </SiteLayout>
  );
}
