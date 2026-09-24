import { createFileRoute, Link } from "@tanstack/react-router";
import { ImageOff, Loader2 } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { useRealtimeWebsiteUpdates } from "@/lib/realtime-updates";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Ride Bangla" },
      {
        name: "description",
        content:
          "Photos from Ride Bangla riders, deliveries and team moments, shared through official Ride Bangla updates.",
      },
      { property: "og:title", content: "Gallery — Ride Bangla" },
      {
        property: "og:description",
        content: "Photos from Ride Bangla riders, deliveries and team moments.",
      },
      { property: "og:url", content: "https://ridebangla.bd/gallery" },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { pick } = useLanguage();
  const { updates, loading, error } = useRealtimeWebsiteUpdates(60);
  const photos = updates.filter((item) => Boolean(item.image_url));

  return (
    <SiteLayout>
      <PageHeader
        title="Gallery"
        subtitle="Real moments from Ride Bangla — riders, deliveries and the team — shared through our official updates."
      />
      <section className="mx-auto max-w-6xl px-4 py-14">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading gallery…
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Could not load the gallery right now. Please try again later.
          </div>
        ) : photos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            <ImageOff className="mx-auto mb-3 h-8 w-8 text-muted-foreground/60" />
            No gallery photos have been published yet. New photos shared from the
            {" "}
            <Link to="/updates" className="font-semibold text-brand-green hover:underline">
              Updates
            </Link>
            {" "}
            feed will appear here automatically.
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
