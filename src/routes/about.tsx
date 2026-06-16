import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Target, Eye, Heart, User } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ride Bangla — Founded in Faridpur, Bangladesh" },
      {
        name: "description",
        content:
          "Ride Bangla is a Bangladesh-based technology company founded in Faridpur, focused on food delivery, courier and future digital services.",
      },
      { property: "og:title", content: "About Ride Bangla" },
      {
        property: "og:description",
        content:
          "Founded in Faridpur. Food delivery, courier and future digital services for Bangladesh.",
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
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("website_team_members")
        .select(
          "id, name, title, bio, photo_url, facebook_url, instagram_url, sort_order"
        )
        .order("sort_order", { ascending: true });

      if (error) throw error;

      return (data ?? []) as TeamMember[];
    },
  });

  return (
    <SiteLayout>
      <PageHeader
        title="About Ride Bangla"
        subtitle="A Bangladesh-based technology company building a trusted digital ecosystem from Faridpur."
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-base leading-relaxed text-muted-foreground">
          Ride Bangla is founded in Faridpur, Bangladesh, and currently focuses
          on food delivery, homemade food, cakes, restaurants, parcel delivery,
          and document courier service. Our mission is to empower local riders,
          partners and communities by providing reliable, locally-built digital
          services for everyday needs.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <ValueCard
            icon={<Target className="h-6 w-6" />}
            title="Mission"
            body="Make daily food and parcel delivery simple, reliable and accessible across Bangladesh."
          />
          <ValueCard
            icon={<Eye className="h-6 w-6" />}
            title="Vision"
            body="A homegrown digital ecosystem connecting customers, riders, partners and local businesses nationwide."
          />
          <ValueCard
            icon={<Heart className="h-6 w-6" />}
            title="Core Values"
            body="Trust, transparency, locally-led service and respect for every rider, partner and customer we serve."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold tracking-tight">Leadership</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {(team ?? []).map((member) => {
            const photoUrl = getSafePhotoUrl(member);

            return (
              <article
                key={member.id}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-green-soft ring-2 ring-brand-green/20">
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
                      <User className="h-10 w-10 text-brand-green" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm font-medium text-brand-green">
                      {member.title}
                    </p>
                  </div>
                </div>

                {member.bio ? (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                ) : null}

                <div className="mt-4 flex items-center gap-3">
                  {member.facebook_url ? (
                    <a
                      aria-label={`${member.name} on Facebook`}
                      href={member.facebook_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-muted-foreground hover:text-brand-green"
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
                      className="text-muted-foreground hover:text-brand-red"
                    >
                      <FaInstagram className="h-5 w-5" />
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
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
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green">
        {icon}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
                }
