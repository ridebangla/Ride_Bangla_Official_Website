import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ImageIcon, PlayCircle } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title: "Ride Bangla Updates — Latest News & Announcements" },
      {
        name: "description",
        content:
          "Latest news, product updates and announcements from Ride Bangla.",
      },
    ],
    links: [{ rel: "canonical", href: "/updates" }],
  }),
  component: UpdatesPage,
});

type UpdateItem = {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  body: string | null;
  category: string | null;
  media_type: string | null;
  image_url: string | null;
  video_url: string | null;
  external_url: string | null;
  published: boolean | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

function getUpdateText(update: UpdateItem) {
  return update.body || update.excerpt || "";
}

function getUpdateDate(update: UpdateItem) {
  return update.published_at || update.created_at || update.updated_at || "";
}

function UpdatesPage() {
  const { data: updates, isLoading, error } = useQuery({
    queryKey: ["website_updates", "published", "full"],
    retry: false,
    staleTime: 0,
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("website_updates")
        .select(
          "id,title,slug,excerpt,body,category,media_type,image_url,video_url,external_url,published,published_at,created_at,updated_at"
        )
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) {
        throw new Error(error.message || "Could not load website updates.");
      }

      return (data ?? []) as UpdateItem[];
    },
  });

  return (
    <SiteLayout>
      <PageHeader
        title="Updates"
        subtitle="News and product announcements from the Ride Bangla team."
      />

      <section className="mx-auto max-w-5xl px-4 py-10">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">
            Loading latest updates...
          </p>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              Updates could not be loaded.
            </p>
            <p className="mt-1 text-xs text-red-600">
              {(error as Error).message}
            </p>
          </div>
        ) : !updates || updates.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No updates yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-8">
            {updates.map((update) => {
              const updateDate = getUpdateDate(update);
              const updateText = getUpdateText(update);
              const hasImage = Boolean(update.image_url);
              const hasVideo = Boolean(update.video_url);
              const hasAnyMedia = hasImage || hasVideo;

              return (
                <article
                  key={update.id}
                  className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
                >
                  {hasAnyMedia ? (
                    <div className="space-y-4 bg-black/[0.03] p-3 sm:p-4">
                      {hasImage ? (
                        <div className="overflow-hidden rounded-2xl bg-white">
                          <img
                            src={update.image_url || ""}
                            alt={update.title}
                            loading="lazy"
                            className="h-auto max-h-[780px] min-h-[220px] w-full object-contain"
                          />
                        </div>
                      ) : null}

                      {hasVideo ? (
                        <div className="overflow-hidden rounded-2xl bg-black">
                          <video
                            src={update.video_url || ""}
                            controls
                            playsInline
                            preload="metadata"
                            className="h-auto max-h-[780px] min-h-[260px] w-full bg-black object-contain"
                          >
                            Your browser does not support video playback.
                          </video>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="flex min-h-[260px] w-full items-center justify-center bg-brand-green-soft text-brand-green">
                      {update.media_type === "image" ? (
                        <ImageIcon className="h-14 w-14 opacity-60" />
                      ) : (
                        <PlayCircle className="h-14 w-14 opacity-60" />
                      )}
                    </div>
                  )}

                  <div className="p-5 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-semibold text-brand-orange">
                        {update.category || "Announcement"}
                      </span>

                      <span className="rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green">
                        {hasImage && hasVideo
                          ? "image + video"
                          : hasVideo
                            ? "video"
                            : hasImage
                              ? "image"
                              : update.media_type || "text"}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold leading-snug text-foreground">
                      {update.title}
                    </h2>

                    {updateText ? (
                      <div className="mt-4 whitespace-pre-line break-words text-base leading-8 text-muted-foreground">
                        {updateText}
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      {updateDate ? (
                        <time className="text-xs font-medium text-muted-foreground">
                          {new Date(updateDate).toLocaleDateString()}
                        </time>
                      ) : (
                        <span />
                      )}

                      {update.external_url ? (
                        <a
                          href={update.external_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
                        >
                          Learn more <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </div>
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
