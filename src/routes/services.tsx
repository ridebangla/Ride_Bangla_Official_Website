import { createFileRoute } from "@tanstack/react-router";
import { Utensils, Package, Car, Store, Code2, ShoppingBasket, Pill, Palette, Search, Mail, ChefHat, UtensilsCrossed, Wallet, LayoutTemplate, Sparkles, Bot } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ride Bangla | Serving All 64 Districts of Bangladesh" },
      {
        name: "description",
        content:
          "Ride Bangla provides ride sharing, food delivery, courier delivery, homemade food, restaurant food, grocery, medicine, marketplace and professional digital services (app, website, graphic design, SEO, email and social media marketing) across all 64 districts of Bangladesh.",
      },
      { property: "og:title", content: "Services — Ride Bangla" },
      {
        property: "og:description",
        content:
          "Ride sharing, food delivery, courier, homemade food, restaurant food, grocery, medicine, marketplace and professional digital services — serving all of Bangladesh.",
      },
      { property: "og:url", content: "https://ridebangla.bd/services" },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/services" }],
  }),
  component: ServicesPage,
});

const services = [
  { icon: <Car className="h-6 w-6" />, title: "Ride Sharing", body: "Technology-enabled transportation services connecting customers and registered riders." },
  { icon: <ChefHat className="h-6 w-6" />, title: "Homemade Food", body: "Delivery of homemade meals, cakes and drinks from local home kitchens." },
  { icon: <UtensilsCrossed className="h-6 w-6" />, title: "Restaurant Food", body: "Delivery service for restaurant meals and prepared food from partner restaurants." },
  { icon: <Utensils className="h-6 w-6" />, title: "Food Delivery", body: "Delivery services for restaurants, home kitchens, food businesses, drinks and prepared meals." },
  { icon: <Package className="h-6 w-6" />, title: "Courier Delivery", body: "Parcel, document and local delivery support for individuals, merchants and businesses." },
  { icon: <Store className="h-6 w-6" />, title: "Marketplace", body: "A connected marketplace for groceries, daily essentials, medicine and other products." },
  { icon: <ShoppingBasket className="h-6 w-6" />, title: "Grocery & Essentials", body: "Digital access to groceries and everyday household products through participating partners." },
  { icon: <Pill className="h-6 w-6" />, title: "Medicine", body: "Marketplace support for medicine and health-related products through eligible businesses, subject to applicable requirements." },
  { icon: <Code2 className="h-6 w-6" />, title: "App & Web Development", body: "Professional mobile application and website development services through Ride Bangla Studio." },
  { icon: <LayoutTemplate className="h-6 w-6" />, title: "UI/UX Design", body: "User-friendly interface and experience design for apps, websites and digital products." },
  { icon: <Sparkles className="h-6 w-6" />, title: "Logo Design", body: "Custom logo and brand mark design for businesses, personal brands and channels." },
  { icon: <Palette className="h-6 w-6" />, title: "Graphic Design", body: "Branding, graphic design and visual identity services through Ride Bangla Studio." },
  {
    icon: (
      <span className="flex items-center gap-1 text-brand-green">
        <FaYoutube className="h-4 w-4" />
        <FaWhatsapp className="h-4 w-4" />
        <FaInstagram className="h-4 w-4" />
        <FaTiktok className="h-4 w-4" />
      </span>
    ),
    title: "Channel Logo & Branding",
    body: "Custom logo and profile branding design for YouTube, WhatsApp, Instagram and TikTok channels.",
  },
  { icon: <Search className="h-6 w-6" />, title: "SEO", body: "Search engine optimization services to help businesses get discovered online." },
  { icon: <Mail className="h-6 w-6" />, title: "Email Marketing", body: "Professional email marketing and business communication campaigns." },
  {
    icon: (
      <span className="flex items-center gap-1 text-brand-green">
        <FaFacebook className="h-4 w-4" />
        <FaYoutube className="h-4 w-4" />
        <FaInstagram className="h-4 w-4" />
        <FaTiktok className="h-4 w-4" />
      </span>
    ),
    title: "Social Media Marketing",
    body: "Facebook, YouTube, Instagram and TikTok marketing, content management and page growth.",
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "Auto-Reply Chatbot Setup",
    body: "Automated auto-reply message systems for Messenger and WhatsApp to handle customer messages instantly.",
  },
];

const futurePlans = [
  { icon: <Wallet className="h-6 w-6" />, title: "Ride Bangla Pay", body: "Our own upcoming digital wallet and payment service for customers, partners, riders and agents across the ecosystem." },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        title="Our Services"
        subtitle="Ride Bangla is a multi-service technology ecosystem serving customers, riders, partners, agents and businesses — head office in Faridpur, service across all 64 districts of Bangladesh."
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green">
                {service.icon}
              </div>
              <h2 className="mt-4 text-lg font-semibold">{service.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-brand-green/20 bg-brand-green-soft/40 p-6">
          <h2 className="text-xl font-bold">Ride Bangla Studio (IT & Digital Services)</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
            Ride Bangla Studio provides professional app development, website development, UI/UX design, logo design, graphic design, channel branding, SEO, email marketing, social media marketing and automated auto-reply chatbot setup — a women-first IT initiative within the Ride Bangla ecosystem.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "App & Web Development",
              "UI/UX Design",
              "Logo Design",
              "Graphic Design",
              "Channel Branding",
              "SEO",
              "Email Marketing",
              "Social Media Marketing",
              "Auto-Reply Chatbot",
            ].map((tag) => (
              <span key={tag} className="rounded-full border border-brand-green/20 bg-white px-3 py-1.5 text-xs font-bold text-brand-green">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href="https://studio.ridebangla.bd" target="_blank" rel="noreferrer noopener" className="inline-flex rounded-xl bg-brand-green px-4 py-3 text-sm font-semibold text-white">
              Visit studio.ridebangla.bd
            </a>
            <a
              href="https://www.instagram.com/ride.bangla_"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Ride Bangla Office on Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg text-brand-green shadow-sm ring-1 ring-brand-green/15 transition hover:-translate-y-1 hover:bg-brand-green hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@ridebangla0"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Ride Bangla Office on TikTok"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg text-brand-green shadow-sm ring-1 ring-brand-green/15 transition hover:-translate-y-1 hover:bg-brand-green hover:text-white"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-extrabold tracking-tight">Future Plans</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
            Additional products are planned as the ecosystem grows.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {futurePlans.map((item) => (
              <article key={item.title} className="rounded-2xl border border-dashed border-brand-green/30 bg-card p-6 shadow-sm">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
