import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Globe2 } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { OFFICIAL_PLATFORMS } from "@/lib/official-platforms";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/apps")({
  head: () => ({
    meta: [
      { title: "Ride Bangla Apps — Customer, Rider, Partner & Agent" },
      {
        name: "description",
        content:
          "Official Ride Bangla customer, partner, rider, agent and IT Team platforms, application information and verified download links.",
      },
      { property: "og:title", content: "Apps & Platforms — Ride Bangla" },
      {
        property: "og:description",
        content: "Official platforms and applications in the Ride Bangla ecosystem.",
      },
      { property: "og:url", content: "https://ridebangla.bd/apps" },
    ],
    links: [
      { rel: "canonical", href: "https://ridebangla.bd/apps" },
      { rel: "alternate", hreflang: "en", href: "https://ridebangla.bd/apps" },
      { rel: "alternate", hreflang: "bn", href: "https://ridebangla.bd/apps?lang=bn" },
      { rel: "alternate", hreflang: "x-default", href: "https://ridebangla.bd/apps" },
    ],
  }),
  component: AppsPage,
});

const copy = {
  en: {
    headerTitle: "Ride Bangla Apps & Platforms",
    headerSubtitle:
      "Official access points for customers, partners, riders, agents, IT Team services and verified Ride Bangla applications.",
    sectionTitle: "Official Platforms",
    sectionBody:
      "Use these verified Ride Bangla web addresses to access each part of the ecosystem.",
  },
  bn: {
    headerTitle: "Ride Bangla অ্যাপস ও প্ল্যাটফর্মসমূহ",
    headerSubtitle:
      "গ্রাহক, পার্টনার, রাইডার, এজেন্ট, IT Team সেবা এবং যাচাইকৃত Ride Bangla অ্যাপ্লিকেশনের অফিসিয়াল মাধ্যম।",
    sectionTitle: "অফিসিয়াল প্ল্যাটফর্মসমূহ",
    sectionBody:
      "ইকোসিস্টেমের প্রতিটি অংশে প্রবেশ করতে এই যাচাইকৃত Ride Bangla ওয়েব ঠিকানাগুলো ব্যবহার করুন।",
  },
} as const;

function AppsPage() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  return (
    <SiteLayout>
      <PageHeader
        title={t.headerTitle}
        subtitle={t.headerSubtitle}
        bgImage="/assets/pages/apps-header.jpg"
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight">{t.sectionTitle}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {t.sectionBody}
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
                    <h3 className="font-semibold text-foreground">{language === "bn" ? platform.name_bn : platform.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {language === "bn" ? platform.description_bn : platform.description}
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
