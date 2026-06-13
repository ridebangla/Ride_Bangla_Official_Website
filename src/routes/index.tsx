import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bell, ArrowRight, Utensils, Package, Smartphone, Building2, Users, Wallet, Bike } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Logo } from "@/components/site/Logo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ride Bangla — Food Delivery, Courier & Digital Services for Bangladesh" },
      { name: "description", content: "Ride Bangla is building a trusted digital ecosystem for customers, riders, partners and local businesses across Bangladesh." },
      { property: "og:title", content: "Ride Bangla — Food Delivery, Courier & Digital Services" },
      { property: "og:description", content: "Building a trusted digital ecosystem for Bangladesh. Founded in Faridpur." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: home } = useQuery({
    queryKey: ["homepage_content"],
    queryFn: async () => (await supabase.from("homepage_content").select("*").limit(1).maybeSingle()).data,
  });
  const { data: updates } = useQuery({
    queryKey: ["updates", "home"],
    queryFn: async () => (await supabase.from("updates").select("*").eq("is_published", true).order("published_at", { ascending: false }).limit(3)).data ?? [],
  });

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-green-soft via-background to-background">
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:pt-14 sm:pb-20">
          {home?.latest_update_text && (
            <Link
              to="/updates"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green-soft px-4 py-2 text-sm font-medium text-brand-green-dark transition hover:bg-brand-green/10"
            >
              <Bell className="h-4 w-4 text-brand-green" />
              <span className="line-clamp-1">{home.latest_update_text}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {home?.hero_headline ?? "Food Delivery, Courier & Future Digital Services for Bangladesh"}
              </h1>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                {home?.hero_subheadline ?? "Building a trusted digital ecosystem for customers, riders, partners and local businesses."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white opacity-90 shadow-sm"
                >
                  <Smartphone className="h-4 w-4" /> Download App — Coming Soon
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
              <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-border">
                <Logo className="h-48 w-48 object-contain sm:h-60 sm:w-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-border bg-soft-bg p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight">A digital ecosystem made in Bangladesh</h2>
          <p className="mt-3 text-muted-foreground">
            Ride Bangla is founded in Faridpur, Bangladesh, focused first on Food Delivery and Courier services, with future expansions
            into customer, rider, partner, agent and digital wallet products.
          </p>
          <Link to="/about" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline">
            Read more about us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold tracking-tight">Our Services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ServicePreview icon={<Utensils className="h-6 w-6" />} title="Food Delivery" desc="Homemade food, cakes and restaurant meals delivered to your door." />
          <ServicePreview icon={<Package className="h-6 w-6" />} title="Courier Delivery" desc="Reliable parcel and document courier across cities." />
        </div>
        <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline">
          View all services <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Apps preview */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold tracking-tight">Apps Ecosystem</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AppPreview icon={<Smartphone className="h-6 w-6" />} title="Ride Bangla" sub="Customer App" />
          <AppPreview icon={<Bike className="h-6 w-6" />} title="Ride Bangla Rider" sub="Rider App" />
          <AppPreview icon={<Building2 className="h-6 w-6" />} title="Ride Bangla Partner" sub="Partner App" />
          <AppPreview icon={<Users className="h-6 w-6" />} title="Ride Bangla Agent" sub="Agent App" />
          <AppPreview icon={<Wallet className="h-6 w-6" />} title="Ride Bangla Pay" sub="Digital Wallet" />
        </div>
        <Link to="/apps" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline">
          Explore all apps <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Updates */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest Updates</h2>
          <Link to="/updates" className="text-sm font-semibold text-brand-green hover:underline">View all</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(updates ?? []).map((u) => (
            <article key={u.id} className="rounded-xl border border-border bg-card p-5">
              <div className="inline-flex items-center rounded-full bg-brand-orange-soft px-2 py-0.5 text-xs font-semibold text-brand-orange">{u.category}</div>
              <h3 className="mt-2 text-lg font-semibold">{u.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{u.description}</p>
              <time className="mt-3 block text-xs text-muted-foreground">{new Date(u.published_at).toLocaleDateString()}</time>
            </article>
          ))}
          {updates && updates.length === 0 && <p className="text-sm text-muted-foreground">No updates yet.</p>}
        </div>
      </section>
    </SiteLayout>
  );
}

function ServicePreview({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green">{icon}</div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function AppPreview({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red-soft text-brand-red">{icon}</div>
      <h3 className="mt-3 text-base font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
