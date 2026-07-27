import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Globe,
  Heart,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  Target,
  Users,
  Utensils,
  Package,
  Store,
  Car,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ride Bangla — Founded in Faridpur, Bangladesh" },
      {
        name: "description",
        content:
          "Ride Bangla is a Bangladesh-based multi-service technology company founded in Faridpur, covering ride sharing, food delivery, courier delivery, marketplace services and professional digital solutions.",
      },
      { property: "og:title", content: "About Ride Bangla" },
      {
        property: "og:description",
        content:
          "Founded in Faridpur, Ride Bangla connects mobility, delivery, marketplace and professional digital services across one official ecosystem.",
      },
      { property: "og:url", content: "https://ridebangla.bd/about" },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/about" }],
  }),
  component: AboutPage,
});

type TeamMember = {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  sort_order: number | null;
};

const fallbackLeadership: TeamMember[] = [
  {
    id: "md-enamul-seddik",
    name: "Enamul Seddik",
    title: "Co-Founder & CEO",
    photo_url: "/assets/leadership/enamul-seddik.png",
    facebook_url: "https://www.facebook.com/share/14iDKweDHqr/",
    instagram_url: "https://www.instagram.com/ena.mul_?igsh=eGNvNm10aDc0dWF6",
    sort_order: 1,
    bio:
      "Enamul Seddik is the Co-Founder & CEO of Ride Bangla and leads the company's product vision, technology direction and long-term strategy. From the earliest concept, he has been responsible for planning the platform architecture, designing the user experience and guiding the development of the Ride Bangla Customer, Partner, Rider, Agent and Admin Console and official website. He has also led the overall business model, feature planning, service workflows and future roadmap for the Ride Bangla ecosystem. Starting from the ground up, his work has focused on building a reliable connected digital platform for Bangladesh across ride sharing, food delivery, courier delivery, marketplace services and professional digital solutions while maintaining quality, consistency and a long-term vision.",
  },
  {
    id: "md-emon-seddik",
    name: "Emon Seddik",
    title: "Chairman & Co-Founder",
    photo_url: "/assets/leadership/emon-seddik.png",
    facebook_url: "https://www.facebook.com/share/14gWYs5XrYE/",
    instagram_url: null,
    sort_order: 2,
    bio:
      "Emon Seddik is the Chairman & Co-Founder of Ride Bangla. He oversees and coordinates the complete operational ecosystem, including Customer, Partner, Rider, Agent and organizational activities. He plays a central role in daily operations, communication, platform coordination, operational decisions and the continued growth of the company.",
  },
];

function getSafePhotoUrl(member: TeamMember) {
  const configuredPhoto = member.photo_url?.trim();
  if (configuredPhoto) return configuredPhoto;

  const name = member.name.toLowerCase();
  if (name.includes("enamul")) return "/assets/leadership/enamul-seddik.png";
  if (name.includes("emon")) return "/assets/leadership/emon-seddik.png";
  return "";
}

function normalizeLeaderIdentity(member: TeamMember) {
  const identity = `${member.id} ${member.name}`.toLowerCase();
  if (identity.includes("enamul")) return "enamul";
  if (identity.includes("emon")) return "emon";
  return identity.trim();
}

function AboutPage() {
  const teamMembers = fallbackLeadership;

  return (
    <SiteLayout>
      <PageHeader
        title="About Ride Bangla"
        subtitle="A Bangladesh-based technology company building a trusted digital service ecosystem from Faridpur."
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green">
              Founded in Faridpur
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Building a trusted digital ecosystem for everyday services in
              Bangladesh.
            </h2>

            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Ride Bangla is founded in Faridpur, Bangladesh, with a mission to
              connect ride sharing, food delivery, courier delivery, marketplace
              services and professional digital solutions for customers, partners,
              riders, agents and businesses.
            </p>

            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The company operates as one connected ecosystem through Customer,
              Partner, Rider, Agent and administrative platforms, supported by
              the official Ride Bangla website and shared operational services.
            </p>

            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Ride Bangla also includes marketplace services for groceries,
              everyday essentials and medicine, while Ride Bangla Studio provides
              app development, website development, graphics and related digital services.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green/90"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/apps"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-green hover:text-brand-green"
              >
                View Apps
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
            <div className="grid gap-4">
              <InfoRow
                icon={<MapPin className="h-5 w-5" />}
                label="Origin"
                value="Faridpur, Bangladesh"
              />
              <InfoRow
                icon={<Globe className="h-5 w-5" />}
                label="Website"
                value="ridebangla.bd"
                href="https://ridebangla.bd"
              />
              <InfoRow
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value="info@ridebangla.bd"
                href="mailto:info@ridebangla.bd"
              />
              <InfoRow
                icon={<Phone className="h-5 w-5" />}
                label="Phone / WhatsApp"
                value="+8801309587749"
                href="https://wa.me/8801309587749"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <ValueCard
            icon={<Target className="h-6 w-6" />}
            title="Mission"
            body="Make mobility, delivery, commerce and digital services reliable and accessible for customers, partners, riders, agents and businesses."
          />
          <ValueCard
            icon={<Eye className="h-6 w-6" />}
            title="Vision"
            body="A homegrown technology ecosystem where people can travel, order food, send parcels, buy essential products and access professional digital services."
          />
          <ValueCard
            icon={<Heart className="h-6 w-6" />}
            title="Core Values"
            body="Trust, transparency, local service, accountability, safety and respect for every customer, rider, partner and team member."
          />
        </div>
      </section>

      <section className="bg-muted/30 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green">
              Connected Ecosystem
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              One ecosystem, multiple connected systems
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Ride Bangla is not only a website or a single app. It is a connected
              company ecosystem where Customer, Partner, Rider, Agent and Admin
              systems support mobility, delivery, marketplace and digital services.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Utensils className="h-6 w-6" />}
              title="Food Delivery"
              body="Homemade food, cakes, drinks and restaurant meals from local partners."
            />
            <FeatureCard
              icon={<Package className="h-6 w-6" />}
              title="Courier Service"
              body="Parcel, document and local delivery service for daily needs."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Partner & Rider"
              body="Separate systems for restaurants, home kitchens, merchants and riders."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Admin Console"
              body="Central operation control for services, partners, riders and platform updates."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green">
              Service Ecosystem
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Multiple services, one connected company
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Ride Bangla combines its operational platforms and service divisions
              under one official brand while preserving the responsibilities and
              workflows of each customer, partner, rider, agent and internal team.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <RoadmapCard
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Delivery"
              body="Ride Sharing, Food Delivery, Courier Delivery and Marketplace services supported by connected customer, partner, rider, agent and administrative systems."
            />
            <RoadmapCard
              icon={<Store className="h-6 w-6" />}
              title="Marketplace"
              body="Groceries, medicine, everyday essentials and other products through the Ride Bangla market section."
            />
            <RoadmapCard
              icon={<Car className="h-6 w-6" />}
              title="Mobility"
              body="Ride Sharing and transport services connected with the wider Ride Bangla ecosystem."
            />
            <RoadmapCard
              icon={<Rocket className="h-6 w-6" />}
              title="Technology"
              body="Ride Bangla Studio, Agent operations and supporting digital products and services."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green">
              Leadership
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Meet the team behind Ride Bangla
            </h2>
          </div>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => {
              const photoUrl = getSafePhotoUrl(member);

              return (
                <article
                  key={member.id}
                  className="rounded-[2rem] border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-brand-green-soft ring-2 ring-brand-green/20">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={member.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-brand-green">
                        {member.title}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        {member.facebook_url ? (
                          <a
                            aria-label={`${member.name} on Facebook`}
                            href={member.facebook_url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="rounded-full bg-muted p-2 text-muted-foreground transition hover:text-brand-green"
                          >
                            <FaFacebook className="h-5 w-5" />
                          </a>
                        ) : null}

                        {member.instagram_url ? (
                          <a
                            aria-label={`${member.name} on Instagram`}
                            href={member.instagram_url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="rounded-full bg-muted p-2 text-muted-foreground transition hover:text-brand-red"
                          >
                            <FaInstagram className="h-5 w-5" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {member.bio ? (
                    <p className="mt-5 text-sm leading-7 text-muted-foreground">
                      {member.bio}
                    </p>
                  ) : null}
                </article>
              );
            })
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-[2rem] bg-foreground p-8 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-300">
                Official Communication
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Contact Ride Bangla through official channels only.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                For business, partnership, rider, partner, customer support or
                website-related communication, please use Ride Bangla official
                contact information.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@ridebangla.bd"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-foreground transition hover:bg-white/90"
              >
                <Mail className="h-5 w-5" />
                info@ridebangla.bd
              </a>

              <a
                href="https://wa.me/8801309587749"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-green px-5 py-4 text-sm font-bold text-white transition hover:bg-brand-green/90"
              >
                <Phone className="h-5 w-5" />
                WhatsApp / Phone
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ValueCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function RoadmapCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition hover:border-brand-green/40">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-bold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {content}
    </a>
  );
  }
