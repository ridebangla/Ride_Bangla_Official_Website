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
  Store,
  ShieldCheck,
  Settings,
} from "lucide-react";
import type { FormEvent, ReactNode } from "react";
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
          "Ride Bangla is building a trusted digital ecosystem for customers, partners, riders and local businesses across Bangladesh.",
      },
      {
        property: "og:title",
        content: "Ride Bangla — Food Delivery, Courier & Digital Services",
      },
      {
        property: "og:description",
        content:
          "Food Delivery and Courier services first, with Partner, Rider and Admin systems working together for Bangladesh.",
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

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
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

      if (error) throw error;

      setSubscriberEmail("");
      setSubscribeStatus("success");
      setSubscribeMessage(
        "Thank you! You will receive Ride Bangla website updates."
      );
    } catch {
      try {
        window.localStorage.setItem("ride_bangla_subscriber_email", email);
      } catch {}

      setSubscriberEmail("");
      setSubscribeStatus("success");
      setSubscribeMessage(
        "Thank you! Your email has been saved on this device. Database subscription will activate after website_subscribers table is connected."
      );
    }
  }

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-brand-green/10 bg-gradient-to-b from-brand-green-soft via-background to-background">
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-8 sm:pb-20 sm:pt-14">
          {latestUpdate && (
            <div className="mb-8 rounded-3xl border border-brand-green/20 bg-background/95 p-3 shadow-lg ring-1 ring-brand-green/5 sm:p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <Link
                  to="/updates"
                  aria-label="See latest update"
                  className="group flex min-w-0 flex-1 items-center gap-3"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white shadow-sm">
                    <Bell className="h-4 w-4" />
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                      Latest Update
                    </span>
                    <span className="line-clamp-2 text-sm font-semibold leading-relaxed text-foreground">
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
                      className="h-11 w-full rounded-2xl border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={subscribeStatus === "saving"}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-green px-4 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-lg disabled:opacity-70"
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

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="min-w-0">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-background px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-brand-green shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5" />
                Food & Courier launch system
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {home?.hero_headline ??
                  "Food Delivery, Courier & a Trusted Digital Ecosystem for Bangladesh"}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                {home?.hero_subheadline ??
                  "Ride Bangla connects customers, food partners, riders and admin operations in one growing platform. Starting with Food Delivery and Courier, built for future digital services across Bangladesh."}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/apps"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-lg"
                >
                  <Smartphone className="h-4 w-4" />
                  Explore Our Apps
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-5 py-3 text-sm font-bold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-secondary hover:shadow-md"
                >
                  View Services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative flex h-60 w-60 items-center justify-center rounded-full border border-brand-green/10 bg-background/70 shadow-xl sm:h-80 sm:w-80">
                <div className="absolute inset-6 rounded-full bg-brand-green/10 blur-2xl" />
                <Logo className="relative h-48 w-48 object-contain drop-shadow-md sm:h-64 sm:w-64" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-brand-green/15 bg-gradient-to-br from-brand-green-soft to-background p-6 shadow-lg sm:p-8">
          <h2 className="text-3xl font-extrabold tracking-tight">
            A digital ecosystem made in Bangladesh
          </h2>
          <p className="mt-3 max-w-4xl text-base leading-7 text-muted-foreground">
            Ride Bangla is founded in Faridpur, Bangladesh. Our current focus is
            Food Delivery and Courier services, powered by Customer, Partner,
            Rider and Admin systems working together. Market, Ride Sharing,
            Wallet and more services will be developed step by step in the same
            ecosystem.
          </p>
          <Link
            to="/about"
            className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:underline"
          >
            Read more about us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <h2 className="text-3xl font-extrabold tracking-tight">Our Services</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
          We are launching with the services needed most right now, while keeping
          the platform ready for future growth.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ServicePreview
            icon={<Utensils className="h-6 w-6" />}
            title="Food Delivery"
            desc="Homemade food, cakes, drinks and restaurant meals delivered through Ride Bangla."
            status="Active Focus"
          />
          <ServicePreview
            icon={<Package className="h-6 w-6" />}
            title="Courier Delivery"
            desc="Reliable parcel, document and local delivery support for customers and businesses."
            status="Active"
          />
          <ServicePreview
            icon={<Store className="h-6 w-6" />}
            title="Market"
            desc="Groceries, medicine, essentials and all types of products in one marketplace."
            status="Coming Soon"
          />
        </div>

        <Link
          to="/services"
          className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:underline"
        >
          View all services <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <h2 className="text-3xl font-extrabold tracking-tight">Apps Ecosystem</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
          Customer App, Partner App, Rider App and Admin Console are the core
          systems needed to run Food Delivery and Courier operations.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AppPreview
            icon={<Smartphone className="h-6 w-6" />}
            title="Ride Bangla"
            sub="Customer App"
            status="Core"
          />
          <AppPreview
            icon={<Building2 className="h-6 w-6" />}
            title="Ride Bangla Partner"
            sub="Restaurant, home kitchen and merchant panel"
            status="Core"
          />
          <AppPreview
            icon={<Bike className="h-6 w-6" />}
            title="Ride Bangla Rider"
            sub="Rider and delivery management app"
            status="Core"
          />
          <AppPreview
            icon={<Settings className="h-6 w-6" />}
            title="Ride Bangla Admin Console"
            sub="Operations, partners, riders and system control"
            status="Core"
          />
          <AppPreview
            icon={<Users className="h-6 w-6" />}
            title="Ride Bangla Agent"
            sub="Future field support and local service network"
            status="Future"
          />
          <AppPreview
            icon={<Wallet className="h-6 w-6" />}
            title="Ride Bangla Pay"
            sub="Future digital wallet and payment service"
            status="Coming Soon"
          />
        </div>

        <Link
          to="/apps"
          className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:underline"
        >
          Explore all apps <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Latest Updates</h2>
          <Link
            to="/updates"
            className="shrink-0 rounded-full bg-brand-green-soft px-4 py-2 text-sm font-bold text-brand-green transition hover:bg-brand-green hover:text-white"
          >
            View all
          </Link>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(updates ?? []).map((update) => {
            const updateText = getUpdateSummary(update);

            return (
              <article
                key={update.id}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition duration-300 hover:-translate-y-1 hover:border-brand-green/25 hover:shadow-xl"
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

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center rounded-full bg-brand-orange-soft px-2 py-0.5 text-xs font-semibold text-brand-orange">
                      {update.category || "Announcement"}
                    </div>
                    <div className="inline-flex items-center rounded-full bg-brand-green-soft px-2 py-0.5 text-xs font-semibold text-brand-green">
                      {update.media_type || "text"}
                    </div>
                  </div>

                  <h3 className="mt-3 text-xl font-extrabold leading-snug">{update.title}</h3>

                  {updateText ? (
                    <p className="mt-3 line-clamp-4 whitespace-pre-line break-words text-sm leading-7 text-muted-foreground">
                      {updateText}
                    </p>
                  ) : null}

                  {getUpdateDate(update) && (
                    <time className="mt-auto block pt-4 text-xs font-medium text-muted-foreground">
                      {new Date(getUpdateDate(update)).toLocaleDateString()}
                    </time>
                  )}
                </div>
              </article>
            );
          })}

          {updates && updates.length === 0 && (
            <p className="rounded-3xl border border-dashed border-border bg-soft-bg p-6 text-sm font-medium text-muted-foreground">No updates yet.</p>
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
  status,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  status: string;
}) {
  return (
    <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-brand-green/25 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-soft text-brand-green shadow-sm">
          {icon}
        </div>
        <span className="rounded-full bg-brand-green-soft px-3 py-1 text-[11px] font-bold text-brand-green">
          {status}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-extrabold">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{desc}</p>
    </div>
  );
}

function AppPreview({
  icon,
  title,
  sub,
  status,
}: {
  icon: ReactNode;
  title: string;
  sub: string;
  status: string;
}) {
  return (
    <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-brand-green/25 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-border">
            <Logo className="h-9 w-9 object-contain" />
          </div>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-red-soft text-brand-red">
            {icon}
          </div>
        </div>

        <span className="rounded-full bg-brand-green-soft px-3 py-1 text-[11px] font-bold text-brand-green">
          {status}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{sub}</p>
    </div>
  );
}
