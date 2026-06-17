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
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
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

type SubscribeStatus = "idle" | "saving" | "success" | "error";

function getUpdateSummary(update: WebsiteUpdate) {
  return update.excerpt || update.body || "";
}

function getUpdateDate(update: WebsiteUpdate) {
  return update.published_at || update.created_at || update.updated_at || "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function HomePage() {
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] =
    useState<SubscribeStatus>("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");

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
    queryKey: ["website_updates", "home", "published", "mixed"],
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

  async function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = subscriberEmail.trim().toLowerCase();

    setSubscribeStatus("idle");
    setSubscribeMessage("");

    if (!isValidEmail(email)) {
      setSubscribeStatus("error");
      setSubscribeMessage("Please enter a valid email address.");
      return;
    }

    try {
      setSubscribeStatus("saving");

      const { error } = await (supabase as any)
        .from("website_subscribers")
        .insert({
          email,
          source: "home_latest_update",
          status: "active",
        });

      if (error) {
        throw error;
      }

      setSubscriberEmail("");
      setSubscribeStatus("success");
      setSubscribeMessage(
        "Thank you! You will receive Ride Bangla website updates."
      );
    } catch {
      try {
        window.localStorage.setItem("ride_bangla_subscriber_email", email);
      } catch {
        // localStorage may be unavailable in some browsers.
      }

      setSubscriberEmail("");
      setSubscribeStatus("success");
      setSubscribeMessage(
        "Thank you! Your email has been saved on this device. Database subscription will activate after website_subscribers table is connected."
      );
    }
  }

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-green-soft via-background to-background">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:pb-20 sm:pt-14">
          {latestUpdate && (
            <div className="mb-6 rounded-xl border border-brand-green/25 bg-white p-3 shadow-sm ring-1 ring-brand-green/5 sm:p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <Link
                  to="/updates"
                  aria-label="See latest update"
                  className="group flex min-w-0 flex-1 items-center gap-3"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green text-white shadow-sm">
                    <Bell className="h-4 w-4" />
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                      Latest Update
                    </span>
                    <span className="line-clamp-2 text-sm font-medium leading-relaxed text-foreground">
                      {latestUpdate.title}
                      {getUpdateSummary(latestUpdate)
                        ? ` — ${getUpdateSummary(latestUpdate)}`
                        : ""}
                    </span>
                  </span>

                  <span className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-brand-green group-hover:underline sm:inline-flex">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>

                <form
                  onSubmit={handleSubscribe}
                  className="flex w-full flex-col gap-2 sm:flex-row lg:w-[430px]"
                >
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={subscriberEmail}
                      onChange={(event) =>
                        setSubscriberEmail(event.target.value)
                      }
                      placeholder="Email for updates"
                      className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none focus:border-brand-green"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={subscribeStatus === "saving"}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green-dark disabled:opacity-70"
                  >
                    <Bell className="h-4 w-4" />
                    {subscribeStatus === "saving" ? "Saving..." : "Notify Me"}
                  </button>
                </form>
              </div>

              {subscribeMessage ? (
                <div
                  className={`mt-3 flex items-start gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                    subscribeStatus === "error"
                      ? "bg-red-50 text-red-700"
                      : "bg-brand-green-soft text-brand-green"
                  }`}
                >
                  {subscribeStatus === "error" ? (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  )}
                  <span>{subscribeMessage}</span>
                </div>
              ) : null}
            </div>
          )}

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="min-w-0">
              <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {home?.hero_headline ??
                  "Food Delivery, Courier & Future Digital Services for Bangladesh"}
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {home?.hero_subheadline ??
                  "Building a trusted digital ecosystem for customers, riders, partners and local businesses."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/apps"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green-dark"
                >
                  <Smartphone className="h-4 w-4" />
                  View Apps — Coming Soon
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
                <div className="absolute inset-6 rounded-full bg-brand-green/5 blur-2xl" />
                <Logo className="relative h-48 w-48 object-contain drop-shadow-sm sm:h-64 sm:w-64" />
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
            const updateText = getUpdateSummary(update);

            return (
              <article
                key={update.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                {update.image_url ? (
                  <img
                    src={update.image_url}
                    alt={update.title}
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                ) : null}

                {update.video_url ? (
                  <video
                    src={update.video_url}
                    controls
                    preload="metadata"
                    className="aspect-video w-full bg-black object-cover"
                  />
                ) : null}

                {!update.image_url && !update.video_url ? (
                  <div className="flex aspect-video w-full items-center justify-center bg-brand-green-soft text-brand-green">
                    <PlayCircle className="h-10 w-10 opacity-60" />
                  </div>
                ) : null}

                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center rounded-full bg-brand-orange-soft px-2 py-0.5 text-xs font-semibold text-brand-orange">
                      {update.category || "Announcement"}
                    </div>
                    <div className="inline-flex items-center rounded-full bg-brand-green-soft px-2 py-0.5 text-xs font-semibold text-brand-green">
                      {update.media_type || "text"}
                    </div>
                  </div>

                  <h3 className="mt-2 text-lg font-semibold">{update.title}</h3>

                  {updateText ? (
                    <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-muted-foreground">
                      {updateText}
                    </p>
                  ) : null}

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
