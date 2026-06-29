import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Smartphone,
  Building2,
  Users,
  Wallet,
  Download,
  Bike,
  ExternalLink,
} from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { getAppStatus } from "@/lib/website-data";
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

type AppStatus = {
  id: string;
  app_name: string;
  app_type: string | null;
  description: string | null;
  status: string | null;
  apk_url?: string | null;
  play_store_url?: string | null;
  sort_order: number | null;
};

function AppImageIcon({ src, alt, fallback }: { src: string; alt: string; fallback: ReactNode }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full rounded-2xl object-contain"
      loading="lazy"
      onError={(event) => {
        event.currentTarget.style.display = "none";
      }}
    />
  );
}

function getIcon(appName: string) {
  const normalized = appName.toLowerCase();

  if (normalized.includes("rider")) {
    return (
      <AppImageIcon
        src="/assets/app-rider.png"
        alt="Ride Bangla Rider App"
        fallback={<Bike className="h-9 w-9" />}
      />
    );
  }

  if (normalized.includes("partner")) return <Building2 className="h-9 w-9" />;
  if (normalized.includes("agent")) return <Users className="h-9 w-9" />;
  if (normalized.includes("pay") || normalized.includes("wallet")) {
    return <Wallet className="h-9 w-9" />;
  }

  return (
    <AppImageIcon
      src="/assets/app-customer.png"
      alt="Ride Bangla Customer App"
      fallback={<Smartphone className="h-9 w-9" />}
    />
  );
}

function AppsPage() {
  const { data: apps, isLoading, error } = useQuery({
    queryKey: ["website_app_status"],
    retry: false,
    queryFn: getAppStatus,
  });

  return (
    <SiteLayout>
      <PageHeader
        title="The Ride Bangla Apps Ecosystem"
        subtitle="One unified ecosystem for customers, riders, partners, agents — and our future digital wallet."
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading apps...</p>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              Apps could not be loaded.
            </p>
            <p className="mt-1 text-xs text-red-600">
              {(error as Error).message}
            </p>
          </div>
        ) : !apps || apps.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            App list will be available soon.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => {
              const hasApk = Boolean(app.apk_url);
              const hasPlayStore = Boolean(app.play_store_url);

              return (
                <article
                  key={app.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green to-brand-green-dark p-2.5 text-white shadow-lg">
                      {getIcon(app.app_name)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold leading-tight">
                        {app.app_name}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {app.app_type || "Ride Bangla App"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {app.description ||
                      "This Ride Bangla app is being prepared for launch."}
                  </p>

                  <div className="mt-4">
                    <span className="inline-flex items-center rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-semibold text-brand-orange">
                      {app.status || "Coming Soon"}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-col gap-2.5">
                    {hasApk ? (
                      <a
                        href={app.apk_url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-3 py-3 text-sm font-semibold text-white"
                      >
                        <Download className="h-4 w-4" />
                        Download APK
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-brand-green px-3 py-3 text-sm font-semibold text-white opacity-70"
                      >
                        <Download className="h-4 w-4" />
                        Download APK — Coming Soon
                      </button>
                    )}

                    {hasPlayStore ? (
                      <a
                        href={app.play_store_url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
                      >
                        <FaGooglePlay className="h-4 w-4" />
                        Get it on Google Play
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-sm font-semibold text-foreground opacity-70"
                      >
                        <FaGooglePlay className="h-4 w-4" />
                        Get it on Google Play — Coming Soon
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
