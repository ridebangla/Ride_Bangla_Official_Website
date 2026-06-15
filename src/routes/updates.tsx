import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title: "Ride Bangla Updates — Latest News & Announcements" },
      { name: "description", content: "Latest news, product updates and announcements from Ride Bangla." },
    ],
    links: [{ rel: "canonical", href: "/updates" }],
  }),
  component: UpdatesPage,
});

function UpdatesPage() {
  const { data: updates } = useQuery({
    queryKey: ["updates", "all"],
    queryFn: async () =>
      (await supabase
        .from("updates")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })).data ?? [],
  });

  return (
    <SiteLayout>
      <PageHeader title="Updates" subtitle="News and product announcements from the Ride Bangla team." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        {!updates || updates.length === 0 ? (
          <p className="text-sm text-muted-foreground">No updates yet. Check back soon.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {updates.map((u) => (
              <article key={u.id} className="overflow-hidden rounded-xl border border-border bg-card">
                {u.media_url && u.media_type === "video" ? (
                  <video src={u.media_url} controls className="aspect-video w-full bg-black object-cover" />
                ) : (u.media_url || u.cover_image_url) ? (
                  <img src={(u.media_url ?? u.cover_image_url) as string} alt={u.title} loading="lazy" className="aspect-video w-full object-cover" />
                ) : null}
                <div className="p-5">
                  <div className="inline-flex items-center rounded-full bg-brand-orange-soft px-2 py-0.5 text-xs font-semibold text-brand-orange">{u.category}</div>
                  <h2 className="mt-2 text-lg font-semibold">{u.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{u.excerpt ?? u.description}</p>
                  <time className="mt-3 block text-xs text-muted-foreground">{new Date(u.published_at).toLocaleDateString()}</time>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}