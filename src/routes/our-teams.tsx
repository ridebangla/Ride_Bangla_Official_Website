import { createFileRoute } from "@tanstack/react-router";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { leadership } from "@/lib/team-data";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/our-teams")({
  head: () => ({
    meta: [
      { title: "Our Teams — Ride Bangla" },
      {
        name: "description",
        content:
          "Meet the leadership team behind Ride Bangla — the founders and directors building Bangladesh's delivery, courier and technology ecosystem.",
      },
      { property: "og:title", content: "Our Teams — Ride Bangla" },
      {
        property: "og:description",
        content: "Meet the leadership team behind Ride Bangla.",
      },
      { property: "og:url", content: "https://ridebangla.bd/our-teams" },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/our-teams" }],
  }),
  component: OurTeamsPage,
});

function OurTeamsPage() {
  const { language } = useLanguage();

  return (
    <SiteLayout>
      <PageHeader
        title="Our Teams"
        subtitle="The founders and leaders building Ride Bangla's delivery, courier and technology ecosystem across Bangladesh."
      />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2">
          {leadership.map((member) => {
            const bio = member.bio[language];

            return (
              <article
                key={member.id}
                className="min-w-0 overflow-hidden rounded-[2rem] border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >
                <div className="flex min-w-0 flex-col items-start gap-5 sm:flex-row">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-brand-green-soft ring-2 ring-brand-green/20">
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <div className="min-w-0 w-full">
                    <h3 className="break-words text-xl font-bold">{member.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-brand-green">{member.title}</p>

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

                <p className="mt-5 break-words text-sm leading-7 text-muted-foreground">{bio}</p>
              </article>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
