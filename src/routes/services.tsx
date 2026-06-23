import { createFileRoute } from "@tanstack/react-router";
import { Utensils, Package, Car, Store } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ride Bangla" },
      {
        name: "description",
        content:
          "Food Delivery and Courier services are active focus areas for Ride Bangla. Market and Ride Sharing are coming soon.",
      },
      { property: "og:title", content: "Services — Ride Bangla" },
      {
        property: "og:description",
        content:
          "Food Delivery, Courier, Market and future digital services across Bangladesh.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        title="Our Services"
        subtitle="Ride Bangla is starting with Food Delivery and Courier, while keeping Market and Ride Sharing ready for future growth."
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-bold">Available Now</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ServiceCard
            icon={<Utensils className="h-6 w-6" />}
            title="Food Delivery"
            body="Order homemade food, cakes, drinks and restaurant meals from local restaurants and home kitchens."
            status="Active Focus"
          />

          <ServiceCard
            icon={<Package className="h-6 w-6" />}
            title="Courier Delivery"
            body="Parcel, document and local delivery support for customers, partners and businesses."
            status="Active"
          />
        </div>

        <h2 className="mt-10 text-xl font-bold">Coming Soon</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ServiceCard
            icon={<Store className="h-6 w-6" />}
            title="Market"
            body="Groceries, medicine, daily essentials and all types of products in one future marketplace."
            status="Coming Soon"
            soon
          />

          <ServiceCard
            icon={<Car className="h-6 w-6" />}
            title="Ride Sharing"
            body="Safe and affordable ride sharing service for future city transport."
            status="Coming Soon"
            soon
          />
        </div>
      </section>
    </SiteLayout>
  );
}

function ServiceCard({
  icon,
  title,
  body,
  status,
  soon,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  status: string;
  soon?: boolean;
}) {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <span
        className={`absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          soon
            ? "bg-brand-orange-soft text-brand-orange"
            : "bg-brand-green-soft text-brand-green"
        }`}
      >
        {status}
      </span>

      <div
        className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${
          soon
            ? "bg-brand-orange-soft text-brand-orange"
            : "bg-brand-green-soft text-brand-green"
        }`}
      >
        {icon}
      </div>

      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}
