import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  ArrowRight,
  Utensils,
  Package,
  Smartphone,
  Wallet,
  Mail,
  CheckCircle2,
  AlertCircle,
  Store,
  ShieldCheck,
} from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Logo } from "@/components/site/Logo";
import { AppLogo, type AppLogoKey } from "@/components/site/AppLogo";
import { SafeMediaImage } from "@/components/site/SafeMediaImage";
import { saveWebsiteSubscriber } from "@/lib/website-data";
import { useRealtimeWebsiteUpdates } from "@/lib/realtime-updates";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Ride Bangla — Ride Sharing, Food, Courier, Marketplace & Digital Services Across Bangladesh",
      },
      {
        name: "description",
        content:
          "Ride Bangla is a multi-service technology ecosystem serving all 64 districts of Bangladesh — ride sharing, food delivery, courier delivery, homemade food, restaurant food, grocery, medicine, marketplace and professional digital services (app, website, graphic design, SEO, email and social media marketing).",
      },
      {
        property: "og:title",
        content: "Ride Bangla — Multi-Service Technology Ecosystem for Bangladesh",
      },
      {
        property: "og:description",
        content:
          "Ride sharing, food delivery, courier delivery, homemade food, restaurant food, grocery, medicine, marketplace and Ride Bangla Studio services — connected through one official ecosystem, serving all 64 districts of Bangladesh.",
      },
      { property: "og:url", content: "https://ridebangla.bd/" },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/" }],
  }),
  component: HomePage,
});

type WebsiteUpdate = import("@/lib/website-data").WebsiteUpdate;

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

function getYouTubeEmbedUrl(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    let videoId = "";

    if (host === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] || "";
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") videoId = url.searchParams.get("v") || "";
      if (url.pathname.startsWith("/shorts/")) videoId = url.pathname.split("/")[2] || "";
      if (url.pathname.startsWith("/embed/")) videoId = url.pathname.split("/")[2] || "";
    }

    return /^[A-Za-z0-9_-]{6,20}$/.test(videoId)
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : null;
  } catch {
    return null;
  }
}

function HomePage() {
  const { language, pick } = useLanguage();
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] =
    useState<SubscribeStatus>("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const { updates } = useRealtimeWebsiteUpdates(3);

  const latestUpdate = updates[0];

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = subscriberEmail.trim().toLowerCase();

    setSubscribeStatus("idle");
    setSubscribeMessage("");

    if (!isValidEmail(email)) {
      setSubscribeStatus("error");
      setSubscribeMessage(language === "bn" ? "সঠিক ইমেইল ঠিকানা লিখুন।" : "Please enter a valid email address.");
      return;
    }

    try {
      setSubscribeStatus("saving");

      await saveWebsiteSubscriber(email);

      setSubscriberEmail("");
      setSubscribeStatus("success");
      setSubscribeMessage(
        language === "bn" ? "ধন্যবাদ! আপনি Ride Bangla-এর ওয়েবসাইট আপডেট পাবেন।" : "Thank you! You will receive Ride Bangla website updates."
      );
    } catch {
      setSubscribeStatus("error");
      setSubscribeMessage(
        language === "bn"
          ? "এই মুহূর্তে সাবস্ক্রিপশন সংরক্ষণ করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।"
          : "Your subscription could not be saved right now. Please try again shortly."
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
                      {pick(latestUpdate.title, latestUpdate.title_bn)}
                      {(() => {
                        const summary = language === "bn"
                          ? latestUpdate.excerpt_bn || latestUpdate.body_bn || getUpdateSummary(latestUpdate)
                          : getUpdateSummary(latestUpdate);
                        return summary ? ` — ${summary}` : "";
                      })()}
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
                Ride Bangla official ecosystem
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {language === "bn"
                  ? "সারা বাংলাদেশের জন্য রাইড শেয়ারিং, ফুড, কুরিয়ার, মার্কেটপ্লেস ও ডিজিটাল সেবা"
                  : "Ride Sharing, Food, Courier, Marketplace & Digital Services — Across Bangladesh"}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                {language === "bn"
                  ? "Ride Bangla রাইড শেয়ারিং, ফুড ডেলিভারি (হোমমেড ও রেস্টুরেন্ট), কুরিয়ার ডেলিভারি, গ্রোসারি, মেডিসিন, মার্কেটপ্লেস এবং পেশাদার ডিজিটাল সেবার (অ্যাপ, ওয়েবসাইট, গ্রাফিক ডিজাইন, SEO, ইমেইল ও সোশ্যাল মিডিয়া মার্কেটিং) মাধ্যমে গ্রাহক, পার্টনার, রাইডার, এজেন্ট ও ব্যবসাকে এক প্ল্যাটফর্মে যুক্ত করে — ফরিদপুরে হেড অফিস, সেবা দেশের সবগুলো জেলায়।"
                  : "Ride Bangla connects customers, partners, riders, agents and businesses through ride sharing, food delivery (homemade & restaurant), courier delivery, grocery, medicine, marketplace and professional digital services (app, website, graphic design, SEO, email and social media marketing) — head office in Faridpur, service across all 64 districts of Bangladesh."}
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
            Ride Bangla has its head office in Faridpur, Bangladesh, and serves
            all 64 districts across the country. The ecosystem brings
            together Ride Sharing, Food Delivery (homemade & restaurant), Courier
            Delivery, Grocery, Medicine, Marketplace, Customer, Partner, Rider and
            Agent platforms, alongside Ride Bangla Studio for app, website,
            graphic design, SEO, email and social media marketing and other
            professional digital services.
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
          Ride Bangla brings mobility, delivery, commerce and professional digital
          services together through one connected company ecosystem, serving all
          64 districts of Bangladesh from its Faridpur head office.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ServicePreview
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Ride Sharing"
            desc="Technology-enabled transportation connecting customers and registered riders."
            status="Mobility"
          />
          <ServicePreview
            icon={<Utensils className="h-6 w-6" />}
            title="Food Delivery"
            desc="Homemade food, cakes, drinks and restaurant meals delivered through Ride Bangla."
            status="Delivery Service"
          />
          <ServicePreview
            icon={<Package className="h-6 w-6" />}
            title="Courier Delivery"
            desc="Reliable parcel, document and local delivery support for customers and businesses."
            status="Delivery Service"
          />
          <ServicePreview
            icon={<Store className="h-6 w-6" />}
            title="Market"
            desc="Groceries, medicine, essentials and all types of products in one marketplace."
            status="Marketplace"
          />
          <ServicePreview
            icon={<Smartphone className="h-6 w-6" />}
            title="Ride Bangla Studio"
            desc="App, website, graphic design, SEO, email and social media marketing services."
            status="Digital Services"
          />
          <ServicePreview
            icon={<Wallet className="h-6 w-6" />}
            title="Ride Bangla Pay"
            desc="Our own upcoming digital wallet and payment service for the ecosystem."
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
          Customer, Partner, Rider, Agent and administrative platforms support the
          connected Ride Bangla service ecosystem.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AppPreview
            app="customer"
            title="Ride Bangla"
            sub="Customer App"
            status="Core"
          />
          <AppPreview
            app="partner"
            title="Ride Bangla Partner"
            sub="Restaurant, home kitchen and merchant panel"
            status="Core"
          />
          <AppPreview
            app="rider"
            title="Ride Bangla Rider"
            sub="Rider and delivery management app"
            status="Core"
          />
          <AppPreview
            app="admin"
            title="Ride Bangla Admin Console"
            sub="Operations, partners, riders and system control"
            status="Core"
          />
          <AppPreview
            app="agent"
            title="Ride Bangla Agent"
            sub="Field support and local service network"
            status="Platform"
          />
          <AppPreview
            app="pay"
            title="Ride Bangla Pay"
            sub="Digital wallet and payment service"
            status="Marketplace"
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
            const updateTitle = pick(update.title, update.title_bn);
            const updateText =
              language === "bn"
                ? update.excerpt_bn || update.body_bn || getUpdateSummary(update)
                : getUpdateSummary(update);

            return (
              <article
                key={update.id}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition duration-300 hover:-translate-y-1 hover:border-brand-green/25 hover:shadow-xl"
              >
                {update.image_url ? (
                  <SafeMediaImage
                    src={update.image_url}
                    alt={updateTitle}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full object-cover"
                  />
                ) : null}

                {update.video_url ? (
                  getYouTubeEmbedUrl(update.video_url) ? (
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        src={getYouTubeEmbedUrl(update.video_url) ?? undefined}
                        title={updateTitle}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="h-full w-full border-0"
                      />
                    </div>
                  ) : (
                    <video
                      src={update.video_url}
                      controls
                      playsInline
                      preload="metadata"
                      className="aspect-video w-full bg-black object-contain"
                    />
                  )
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

                  <h3 className="mt-3 text-xl font-extrabold leading-snug">{updateTitle}</h3>

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
  app,
  title,
  sub,
  status,
}: {
  app: AppLogoKey;
  title: string;
  sub: string;
  status: string;
}) {
  return (
    <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-brand-green/25 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-border">
          <AppLogo app={app} alt={`${title} logo`} />
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
