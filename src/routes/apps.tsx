import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Smartphone,
  Building2,
  Users,
  Wallet,
  Download,
} from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import type { ReactNode } from "react";

export const Route = createFileRoute("/apps")({
  head: () => ({
    meta: [
      { title: "Apps — Ride Bangla Ecosystem" },
      {
        name: "description",
        content:
          "Ride Bangla Customer, Rider, Partner, Agent and Pay apps — coming soon.",
      },
      { property: "og:title", content: "Apps — Ride Bangla" },
      { property: "og:description", content: "The Ride Bangla apps ecosystem." },
      { property: "og:url", content: "/apps" },
    ],
    links: [{ rel: "canonical", href: "/apps" }],
  }),
  component: AppsPage,
});

const ICONS: Record<string, ReactNode> = {
  "Ride Bangla": (
    <img
      src="/assets/app-customer.png"
      alt="Ride Bangla"
      className="h-10 w-10 object-contain"
      loading="lazy"
    />
  ),
  "Ride Bangla Rider": (
    <img
      src="/assets/app-rider.png"
      alt="Ride Bangla Rider"
      className="h-10 w-10 object-contain"
      loading="lazy"
    />
  ),
  "Ride Bangla Partner": <Building2 className="h-8 w-8" />,
  "Ride Bangla Agent": <Users className="h-8 w-8" />,
  "Ride Bangla Pay": <Wallet className="h-8 w-8" />,
};

function AppsPage() {
  const { data: apps } = useQuery({
    queryKey: ["app_status"],
    queryFn: async () =>
      (
        await supabase
          .from("app_status")
          .select("*")
          .order("sort_order")
      ).data ?? [],
  });

  return (
    <SiteLayout>
      <PageHeader
        title="The Ride Bangla Apps Ecosystem"
        subtitle="One unified ecosystem for customers, riders, partners, agents — and our future digital wallet."
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(apps ?? []).map((app) => (
            <article
              key={app.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-3">
                <div className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-green to-brand-green-dark p-2 text-white shadow-md">
                  {ICONS[app.app_name] ?? (
                    <Smartphone className="h-8 w-8" />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-tight">
                    {app.app_name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {app.app_type}
                  </p>
                </div>
              </div>

              <p className="mt-3 flex-1 text-sm text-muted-foreground">
                {app.description}
              </p>

              <div className="mt-3">
                <span className="inline-flex items-center rounded-full bg-brand-orange-soft px-2.5 py-0.5 text-xs font-semibold text-brand-orange">
                  {app.status}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-3 py-2 text-sm font-semibold text-white opacity-90"
                >
                  <Download className="h-4 w-4" />
                  Download APK — Coming Soon
                </button>

                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground"
                >
                  <FaGooglePlay className="h-4 w-4" />
                  Get it on Google Play — Coming Soon
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
