import { createFileRoute } from "@tanstack/react-router";
import { Utensils, Package, Car, ShoppingBasket, Pill } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ride Bangla" },
      { name: "description", content: "Food delivery and courier services available now. Ride sharing, grocery and medicine delivery coming soon." },
      { property: "og:title", content: "Services — Ride Bangla" },
      { property: "og:description", content: "Food delivery, courier, and more coming soon across Bangladesh." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader title="Our Services" subtitle="What Ride Bangla offers today and what's coming next." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-bold">Available Now</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ServiceCard icon={<Utensils className="h-6 w-6" />} title="Food Delivery" body="Order homemade food, cakes, and meals from local restaurants and home kitchens." />
          <ServiceCard icon={<Package className="h-6 w-6" />} title="Courier Delivery" body="Parcel and document courier service across cities in Bangladesh." />
        </div>
        <h2 className="mt-10 text-xl font-bold">Coming Soon</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <ServiceCard icon={<Car className="h-6 w-6" />} title="Ride Sharing" body="Safe, affordable rides across your city." soon />
          <ServiceCard icon={<ShoppingBasket className="h-6 w-6" />} title="Grocery Delivery" body="Fresh groceries delivered fast." soon />
          <ServiceCard icon={<Pill className="h-6 w-6" />} title="Medicine Delivery" body="On-demand medicine when you need it most." soon />
        </div>
      </section>
    </SiteLayout>
  );
}

function ServiceCard({ icon, title, body, soon }: { icon: React.ReactNode; title: string; body: string; soon?: boolean }) {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-6">
      {soon && <span className="absolute right-4 top-4 rounded-full bg-brand-orange-soft px-2.5 py-0.5 text-xs font-semibold text-brand-orange">Coming Soon</span>}
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${soon ? "bg-brand-orange-soft text-brand-orange" : "bg-brand-green-soft text-brand-green"}`}>{icon}</div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}