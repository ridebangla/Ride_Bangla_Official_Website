import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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
  User,
  Users,
  Utensils,
  Package,
  Store,
  Car,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { getTeamMembers } from "@/lib/website-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ride Bangla — Founded in Faridpur, Bangladesh" },
      {
        name: "description",
        content:
          "Ride Bangla is a Bangladesh-based technology company founded in Faridpur, focused on Food Delivery, Courier, Partner, Rider and Admin systems with future digital services.",
      },
      { property: "og:title", content: "About Ride Bangla" },
      {
        property: "og:description",
        content:
          "Founded in Faridpur. Food Delivery, Courier, Partner, Rider, Admin Console and future digital services for Bangladesh.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
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
    name: "MD Enamul Seddik",
    title: "Co-Founder & CEO",
    photo_url: "/assets/founder-enamul.png",
    facebook_url: "https://www.facebook.com/share/14iDKweDHqr/",
    instagram_url: "https://www.instagram.com/ena.mul_?igsh=eGNvNm10aDc0dWF6",
    sort_order: 1,
    bio:
      "MD Enamul Seddik is the Co-Founder & CEO of Ride Bangla and leads the company's product vision, technology direction and long-term strategy. From the earliest concept, he has been responsible for planning the platform architecture, designing the user experience and guiding the development of the Ride Bangla Customer App, Rider App, Partner App, Admin Console and official website. He has also led the overall business model, feature planning, service workflows and future roadmap for the Ride Bangla ecosystem. Starting from the ground up, his work has focused on building a reliable digital platform for Bangladesh that can grow from Food Delivery and Courier into a broader ecosystem of connected digital services while maintaining quality, consistency and a long-term vision.",
  },
  {
    id: "md-emon-seddik",
    name: "MD Emon Seddik",
    title: "Co-Founder",
    photo_url: null,
    facebook_url: "https://www.facebook.com/share/14gWYs5XrYE/",
    instagram_url: null,
    sort_order: 2,
    bio:
      "MD Emon Seddik is the Co-Founder of Ride Bangla and plays a key role in day-to-day operations. He works directly with customers and delivery activities through Facebook and WhatsApp, helping coordinate communications and operational tasks that keep the service running. While MD Enamul Seddik leads the platform's product, technology and business direction, MD Emon Seddik supports the operational side by helping maintain customer communication and delivery coordination as the company continues to grow.",
  },
];

function getSafePhotoUrl(member: TeamMember) {
  const name = member.name.toLowerCase();

  if (name.includes("enamul")) {
    return "/assets/founder-enamul.png";
  }

  return member.photo_url?.trim() || "";
}

function AboutPage() {
  const { data: team } = useQuery({
    queryKey: ["website_team_members"],
    queryFn: getTeamMembers,
  });

  const teamMembers = team && team.length > 0 ? team : fallbackLeadership;

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
              make Food Delivery, homemade food, restaurant meals, drinks,
              parcel delivery and document courier service easier for local
              customers, partners, riders and businesses.
            </p>

            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Our launch focus is Food Delivery and Courier. To run this system
              properly, Ride Bangla is being built with Customer App, Partner
              App, Rider App and Admin Console working together as one connected
              operational platform.
            </p>

            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Step by step, the same ecosystem will expand into Market, Ride
              Sharing, Wallet, Agent network and more future digital services
              for Bangladesh.
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
            body="Make daily Food Delivery and Courier services simple, reliable and accessible for customers, partners, riders and local businesses."
          />
          <ValueCard
            icon={<Eye className="h-6 w-6" />}
            title="Vision"
            body="A homegrown digital ecosystem where people can order food, send parcels, buy products and use future digital services from one trusted platform."
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
              What We Are Building
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              One ecosystem, multiple connected systems
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Ride Bangla is not only a website or a single app. It is being
              developed as a connected platform where Customer App, Partner App,
              Rider App and Admin Console work together to run Food Delivery and
              Courier operations.
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
              Roadmap
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Starting focused, growing step by step
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Ride Bangla will launch with the most important operational
              services first, then gradually expand into future services without
              breaking the existing system.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <RoadmapCard
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Now"
              body="Food Delivery and Courier with Customer, Partner, Rider and Admin systems."
            />
            <RoadmapCard
              icon={<Store className="h-6 w-6" />}
              title="Next"
              body="Market for groceries, medicine, essentials and other products."
            />
            <RoadmapCard
              icon={<Car className="h-6 w-6" />}
              title="Future"
              body="Ride Sharing and city transport solutions."
            />
            <RoadmapCard
              icon={<Rocket className="h-6 w-6" />}
              title="Growth"
              body="Ride Bangla Pay, Agent system and more digital services."
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
                      ) : (
                        <User className="h-11 w-11 text-brand-green" />
                      )}
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
          ) : (
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground sm:col-span-2">
              Leadership information will be updated soon.
            </div>
          )}
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
