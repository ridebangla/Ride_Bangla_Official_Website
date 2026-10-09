import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ImageOff, Loader2 } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { useRealtimeWebsiteUpdates } from "@/lib/realtime-updates";
import { useLanguage } from "@/context/LanguageContext";

const copy = {
  en: {
    headerTitle: "Gallery",
    headerSubtitle:
      "Real moments from Ride Bangla — riders, deliveries and the team — shared through our official updates.",
    loadingGallery: "Loading gallery…",
    loadError: "Could not load the gallery right now. Please try again later.",
    emptyPrefix:
      "No gallery photos have been published yet. New photos shared from the ",
    updatesLink: "Updates",
    emptySuffix: " feed will appear here automatically.",
  },
  bn: {
    headerTitle: "গ্যালারি",
    headerSubtitle:
      "Ride Bangla-এর আসল মুহূর্ত — রাইডার, ডেলিভারি ও আমাদের টিম — অফিসিয়াল আপডেটের মাধ্যমে শেয়ার করা।",
    loadingGallery: "গ্যালারি লোড হচ্ছে…",
    loadError:
      "এই মুহূর্তে গ্যালারি লোড করা যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
    emptyPrefix:
      "এখনো গ্যালারিতে কোনো ছবি প্রকাশ করা হয়নি। ",
    updatesLink: "Updates",
    emptySuffix: " ফিড থেকে শেয়ার করা নতুন ছবি এখানে স্বয়ংক্রিয়ভাবে দেখা যাবে।",
  },
};

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Ride Bangla Gallery — Riders, Deliveries & Team Moments" },
      {
        name: "description",
        content:
          "Browse photos of Ride Bangla riders, food deliveries, courier moments and team events across Bangladesh, shared through official Ride Bangla updates.",
      },
      { property: "og:title", content: "Gallery — Ride Bangla" },
      {
        property: "og:description",
        content: "Photos from Ride Bangla riders, deliveries and team moments.",
      },
      { property: "og:url", content: "https://ridebangla.bd/gallery" },
    ],
    links: [
      { rel: "canonical", href: "https://ridebangla.bd/gallery" },
      { rel: "alternate", hreflang: "en", href: "https://ridebangla.bd/gallery" },
      { rel: "alternate", hreflang: "bn", href: "https://ridebangla.bd/gallery?lang=bn" },
      { rel: "alternate", hreflang: "x-default", href: "https://ridebangla.bd/gallery" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { language, pick } = useLanguage();
  const t = useMemo(() => copy[language], [language]);
  const { updates, loading, error } = useRealtimeWebsiteUpdates(60);
  const photos = updates.filter((item) => Boolean(item.image_url));

  return (
    <SiteLayout>
      <PageHeader
        title={t.headerTitle}
        subtitle={t.headerSubtitle}
      />
      <section className="mx-auto max-w-6xl px-4 py-14">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> {t.loadingGallery}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            {t.loadError}
          </div>
        ) : photos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            <ImageOff className="mx-auto mb-3 h-8 w-8 text-muted-foreground/60" />
            {t.emptyPrefix}
            <Link to="/updates" className="font-semibold text-brand-green hover:underline">
              {t.updatesLink}
            </Link>
            {t.emptySuffix}
          </div>
        ) : (
          <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
            {photos.map((item) => (
              <Link
                key={item.id}
                to="/updates"
                className="group block break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={item.image_url ?? undefined}
                  alt={pick(item.title, item.title_bn) || "Ride Bangla"}
                  loading="lazy"
                  className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                {(item.title || item.title_bn) && (
                  <p className="line-clamp-1 px-3 py-2 text-xs font-semibold text-slate-700">
                    {pick(item.title, item.title_bn)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
