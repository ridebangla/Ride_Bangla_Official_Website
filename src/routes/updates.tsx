import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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
  description: string;
  excerpt: string | null;
  category: string | null;
  media_url: string | null;
  media_type: string | null;
  cover_image_url: string | null;
  published_at: string;
  is_published: boolean | null;
};

function UpdatesPage() {
  const { data: updates } = useQuery({
    queryKey: ["updates", "all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("updates")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

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
        {!updates || updates.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No updates yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {updates.map((update) => (
              <article
                key={update.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                {update.media_url && update.media_type === "video" ? (
                  <video
                    src={update.media_url}
                    controls
                    className="aspect-video w-full bg-black object-cover"
                  />
                ) : update.media_url || update.cover_image_url ? (
                  <img
                    src={(update.media_url ??
                      update.cover_image_url) as string}
                    alt={update.title}
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                ) : null}

                <div className="p-5">
                  <div className="inline-flex items-center rounded-full bg-brand-orange-soft px-2 py-0.5 text-xs font-semibold text-brand-orange">
                    {update.category ?? "Announcement"}
                  </div>

                  <h2 className="mt-2 text-lg font-semibold">
                    {update.title}
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {update.excerpt ?? update.description}
                  </p>

                  <time className="mt-3 block text-xs text-muted-foreground">
                    {new Date(update.published_at).toLocaleDateString()}
                  </time>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
