import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, PlayCircle } from "lucide-react";
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

function getUpdateMediaUrl(update: UpdateItem) {
  if (update.media_type === "video") return update.video_url;
  if (update.media_type === "image") return update.image_url;
  return update.image_url || update.video_url || null;
}

function getUpdateText(update: UpdateItem) {
  return update.body || update.excerpt || "";
}

function getUpdateDate(update: UpdateItem) {
  return update.published_at || update.created_at || update.updated_at || "";
}

function UpdatesPage() {
  const { data: updates, isLoading, error } = useQuery({
    queryKey: ["website_updates", "published", "live"],
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

      <section className="mx-auto max-w-6xl px-4 py-10">
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {updates.map((update) => {
              const mediaUrl = getUpdateMediaUrl(update);
              const updateDate = getUpdateDate(update);

              return (
                <article
                  key={update.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
                >
                  {mediaUrl && update.media_type === "video" ? (
                    <video
                      src={mediaUrl}
                      controls
                      preload="metadata"
                      className="aspect-video w-full bg-black object-cover"
                    />
                  ) : mediaUrl ? (
                    <img
                      src={mediaUrl}
                      alt={update.title}
                      loading="lazy"
                      className="aspect-video w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-video w-full items-center justify-center bg-brand-green-soft text-brand-green">
                      <PlayCircle className="h-10 w-10 opacity-60" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="inline-flex w-fit items-center rounded-full bg-brand-orange-soft px-2 py-0.5 text-xs font-semibold text-brand-orange">
                      {update.category || "Announcement"}
                    </div>

                    <h2 className="mt-2 text-lg font-semibold">
                      {update.title}
                    </h2>

                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                      {getUpdateText(update)}
                    </p>

                    <div className="mt-auto pt-4">
                      {updateDate && (
                        <time className="block text-xs text-muted-foreground">
                          {new Date(updateDate).toLocaleDateString()}
                        </time>
                      )}

                      {update.external_url && (
                        <a
                          href={update.external_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
                        >
                          Learn more <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
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
