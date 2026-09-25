import { useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Quote, ChevronDown } from "lucide-react";

export type LeadershipMember = {
  id: string;
  name: string;
  title: string;
  photo_url: string;
  facebook_url: string | null;
  instagram_url: string | null;
  bio: { en: string; bn: string };
};

const readMoreLabel = { en: "Read full bio", bn: "সম্পূর্ণ পড়ুন" };
const readLessLabel = { en: "Show less", bn: "সংক্ষিপ্ত করুন" };

export function LeadershipCard({
  member,
  language,
}: {
  member: LeadershipMember;
  language: "en" | "bn";
}) {
  const [expanded, setExpanded] = useState(false);
  const bio = member.bio[language];

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
      {/* Decorative gradient ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 ring-2 ring-brand-green/30 transition duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-col sm:flex-row">
        {/* Photo panel */}
        <div className="relative h-64 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[13rem]">
          <img
            src={member.photo_url}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent sm:bg-gradient-to-r sm:from-black/0 sm:via-black/0 sm:to-black/10" />

          {/* Social icons */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 sm:bottom-3 sm:left-3">
            {member.facebook_url ? (
              <a
                aria-label={`${member.name} on Facebook`}
                href={member.facebook_url}
                target="_blank"
                rel="noreferrer noopener"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-[#1877F2] shadow-md backdrop-blur transition hover:scale-110"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
            ) : null}
            {member.instagram_url ? (
              <a
                aria-label={`${member.name} on Instagram`}
                href={member.instagram_url}
                target="_blank"
                rel="noreferrer noopener"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-brand-red shadow-md backdrop-blur transition hover:scale-110"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        {/* Content panel */}
        <div className="relative flex min-w-0 flex-1 flex-col p-6 sm:p-7">
          <Quote className="h-7 w-7 shrink-0 fill-brand-green-soft text-brand-green-soft" />

          <h3 className="mt-2 break-words text-xl font-extrabold tracking-tight text-foreground">
            {member.name}
          </h3>

          <span className="mt-1 inline-flex w-fit items-center rounded-full bg-brand-green-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-green">
            {member.title}
          </span>

          <p
            className={`mt-4 break-words text-sm leading-7 text-muted-foreground ${
              expanded ? "" : "line-clamp-4"
            }`}
          >
            {bio}
          </p>

          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-bold text-brand-green transition hover:text-brand-green-dark"
          >
            {expanded ? readLessLabel[language] : readMoreLabel[language]}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
