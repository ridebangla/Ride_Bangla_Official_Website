import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Bell,
  ArrowRight,
  Utensils,
  Package,
  Smartphone,
  Building2,
  Users,
  Wallet,
  Bike,
  PlayCircle,
} from "lucide-react";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Logo } from "@/components/site/Logo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Ride Bangla — Food Delivery, Courier & Digital Services for Bangladesh",
      },
      {
        name: "description",
        content:
          "Ride Bangla is building a trusted digital ecosystem for customers, riders, partners and local businesses across Bangladesh.",
      },
      {
        property: "og:title",
        content: "Ride Bangla — Food Delivery, Courier & Digital Services",
      },
      {
        property: "og:description",
        content:
          "Building a trusted digital ecosystem for Bangladesh. Founded in Faridpur.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

type HomeContent = {
  id?: string;
  hero_headline?: string | null;
  hero_subheadline?: string | null;
};

type WebsiteUpdate = {
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

function getUpdateMediaUrl(update: WebsiteUpdate) {
  if (update.media_type === "video") return update.video_url;
  if (update.media_type === "image") return update.image_url;
  return update.image_url || update.video_url || null;
}

function getUpdateSummary(update: WebsiteUpdate) {
  return update.excerpt || update.body || "";
}

function getUpdateDate(update: WebsiteUpdate) {
  return update.published_at || update.created_at || update.updated_at || "";
}

function HomePage() {
  const { data: home } = useQuery({
    queryKey: ["homepage_content", "safe"],
    retry: false,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_content")
        .select("id,hero_headline,hero_subheadline")
        .limit(1)
        .maybeSingle();

      if (error) return null;
      return data as HomeContent | null;
    },
  });

  const { data: updates } = useQuery({
    queryKey: ["website_updates", "home", "published"],
    retry: false,
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("website_updates")
        .select(
          "id,title,slug,excerpt,body,category,media_type,image_url,video_url,external_url,published,published_at,created_at,updated_at"
        )
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return (data ?? []) as WebsiteUpdate[];
    },
  });

  const latestUpdate = updates?.[0];

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-green-soft via-background to-background">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:pb-20 sm:pt-14">
          {latestUpdate && (
            <Link
              to="/updates"
              aria-label="See latest update"
              className="group mb-6 flex w-full items-center gap-3 rounded-xl border border-brand-green/25 bg-white px-3 py-2.5 shadow-sm ring-1 ring-brand-green/5 transition hover:border-brand-green/40 hover:shadow-md sm:px-4 sm:py-3"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green text-white shadow-sm">
                <Bell className="h-4 w-4" />
              </span>

              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Latest Update
                </span>
                <span className="line-clamp-1 text-sm font-medium text-foreground">
                  {latestUpdate.title}
                  {getUpdateSummary(latestUpdate)
                    ? ` — ${getUpdateSummary(latestUpdate)}`
                    : ""}
                </span>
              </span>

              <span className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-brand-green group-hover:underline sm:inline-flex">
                Read More <ArrowRight className="h-3.5 w-3.5" />
              </span>

              <ArrowRight className="h-4 w-4 shrink-0 text-brand-green sm:hidden" />
            </Link>
          )}

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {home?.hero_headline ??
                  "Food Delivery, Courier & Future Digital Services for Bangladesh"}
              </h1>

              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                {home?.hero_subheadline ??
                  "Building a trusted digital ecosystem for customers, riders, partners and local businesses."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white opacity-90 shadow-sm"
                >
                  <Smartphone className="h-4 w-4" />
                  Download App — Coming Soon
                </button>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative flex h-60 w-60 items-center justify-center sm:h-72 sm:w-72">
                <div className="absolute inset-6 rounded-full bg-brand-green/5 blur-2xl" />
                <Logo className="relative h-52 w-52 object-contain drop-shadow-sm sm:h-64 sm:w-64" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-border bg-soft-bg p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight">
            A digital ecosystem made in Bangladesh
          </h2>
          <p className="mt-3 text-muted-foreground">
            Ride Bangla is founded in Faridpur, Bangladesh, focused first on
            Food Delivery and Courier services, with future expansions into
            customer, rider, partner, agent and digital wallet products.
          </p>
          <Link
            to="/about"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
          >
            Read more about us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold tracking-tight">Our Services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ServicePreview
            icon={<Utensils className="h-6 w-6" />}
            title="Food Delivery"
            desc="Homemade food, cakes and restaurant meals delivered to your door."
          />
          <ServicePreview
            icon={<Package className="h-6 w-6" />}
            title="Courier Delivery"
            desc="Reliable parcel and document courier across cities."
          />
        </div>
        <Link
          to="/services"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
        >
          View all services <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold tracking-tight">Apps Ecosystem</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AppPreview
            icon={<Smartphone className="h-6 w-6" />}
            title="Ride Bangla"
            sub="Customer App"
          />
          <AppPreview
            icon={<Bike className="h-6 w-6" />}
            title="Ride Bangla Rider"
            sub="Rider App"
          />
          <AppPreview
            icon={<Building2 className="h-6 w-6" />}
            title="Ride Bangla Partner"
            sub="Partner App"
          />
          <AppPreview
            icon={<Users className="h-6 w-6" />}
            title="Ride Bangla Agent"
            sub="Agent App"
          />
          <AppPreview
            icon={<Wallet className="h-6 w-6" />}
            title="Ride Bangla Pay"
            sub="Digital Wallet"
          />
        </div>
        <Link
          to="/apps"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
        >
          Explore all apps <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest Updates</h2>
          <Link
            to="/updates"
            className="text-sm font-semibold text-brand-green hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(updates ?? []).map((update) => {
            const mediaUrl = getUpdateMediaUrl(update);

            return (
              <article
                key={update.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
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

                <div className="p-5">
                  <div className="inline-flex items-center rounded-full bg-brand-orange-soft px-2 py-0.5 text-xs font-semibold text-brand-orange">
                    {update.category || "Announcement"}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">
                    {update.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {getUpdateSummary(update)}
                  </p>
                  {getUpdateDate(update) && (
                    <time className="mt-3 block text-xs text-muted-foreground">
                      {new Date(getUpdateDate(update)).toLocaleDateString()}
                    </time>
                  )}
                </div>
              </article>
            );
          })}

          {updates && updates.length === 0 && (
            <p className="text-sm text-muted-foreground">No updates yet.</p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function ServicePreview({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green">
        {icon}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function AppPreview({
  icon,
  title,
  sub,
}: {
  icon: ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red-soft text-brand-red">
        {icon}
      </div>
      <h3 className="mt-3 text-base font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
