import { useState } from "react";
import { FaFacebook, FaInstagram, FaWeixin, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { BadgeCheck, Check, ChevronDown } from "lucide-react";

export type LeadershipMember = {
  id: string;
  name: string;
  title: string;
  photo_url: string;
  facebook_url: string | null;
  instagram_url: string | null;
  x_url: string | null;
  whatsapp_number?: string | null;
  wechat_id?: string | null;
  bio?: { en: string; bn: string };
};

function toWhatsAppLink(number: string) {
  const digits = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}`;
}

export function LeadershipCard({
  member,
  language,
}: {
  member: LeadershipMember;
  language: "en" | "bn";
}) {
  const [expanded, setExpanded] = useState(false);
  const [wechatCopied, setWechatCopied] = useState(false);
  const bio = member.bio ? (language === "bn" ? member.bio.bn : member.bio.en) : null;
  const hasSocial = Boolean(
    member.facebook_url || member.instagram_url || member.x_url || member.whatsapp_number || member.wechat_id,
  );

  const copyWeChatId = async () => {
    if (!member.wechat_id) return;
    try {
      await navigator.clipboard.writeText(member.wechat_id);
      setWechatCopied(true);
      window.setTimeout(() => setWechatCopied(false), 2000);
    } catch {
      setWechatCopied(false);
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-[#d9e8df] bg-[#fbfdfb] p-7 text-center shadow-[0_24px_70px_rgba(0,42,28,.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_34px_90px_rgba(0,42,28,.14)] sm:p-9">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-red via-brand-green to-emerald-300" />
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-brand-green/5 blur-2xl transition group-hover:bg-brand-green/10" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-brand-red/5 blur-2xl" />

      <div className="relative mx-auto">
        <div className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-brand-green via-emerald-400 to-brand-red p-[3px] shadow-[0_14px_34px_rgba(0,42,28,.20)] sm:h-36 sm:w-36">
          <div className="h-full w-full overflow-hidden rounded-full border-4 border-white bg-[#082c21]">
            <img
              src={member.photo_url}
              alt={member.name}
              loading="lazy"
              className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.05]"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
        <span className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-brand-green text-white shadow-md sm:bottom-2 sm:right-2">
          <BadgeCheck className="h-4 w-4" />
        </span>
      </div>

      <p className="relative mt-5 inline-flex w-fit items-center gap-1.5 self-center rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-brand-green-dark">
        Leadership
      </p>
      <h3 className="relative mt-2 text-2xl font-black tracking-tight text-[#06291f] sm:text-[28px]">
        {member.name}
      </h3>
      <p className="relative mt-1 text-sm font-bold text-brand-red">{member.title}</p>

      {bio ? (
        <div className="relative mt-4 text-left">
          <p
            className={`text-[13px] leading-6 text-slate-600 sm:text-sm sm:leading-7 ${
              expanded ? "" : "line-clamp-4"
            }`}
          >
            {bio}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-black text-brand-green transition hover:text-brand-green-dark"
          >
            {expanded
              ? language === "bn"
                ? "সংক্ষেপে দেখুন"
                : "Show less"
              : language === "bn"
                ? "আরও পড়ুন"
                : "Read full bio"}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      ) : null}

      {hasSocial ? (
        <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-[#e5efe9] pt-5">
          {member.whatsapp_number ? (
            <a
              aria-label={`${member.name} on WhatsApp`}
              href={toWhatsAppLink(member.whatsapp_number)}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#d9e8df] bg-white text-brand-green-dark transition hover:scale-105 hover:border-transparent hover:bg-[#25D366] hover:text-white"
            >
              <FaWhatsapp className="h-4 w-4" />
            </a>
          ) : null}
          {member.facebook_url ? (
            <a
              aria-label={`${member.name} on Facebook`}
              href={member.facebook_url}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#d9e8df] bg-white text-brand-green-dark transition hover:scale-105 hover:border-transparent hover:bg-[#1877F2] hover:text-white"
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
              className="grid h-9 w-9 place-items-center rounded-full border border-[#d9e8df] bg-white text-brand-green-dark transition hover:scale-105 hover:border-transparent hover:bg-[#E1306C] hover:text-white"
            >
              <FaInstagram className="h-4 w-4" />
            </a>
          ) : null}
          {member.x_url ? (
            <a
              aria-label={`${member.name} on X`}
              href={member.x_url}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#d9e8df] bg-white text-brand-green-dark transition hover:scale-105 hover:border-transparent hover:bg-black hover:text-white"
            >
              <FaXTwitter className="h-4 w-4" />
            </a>
          ) : null}
          {member.wechat_id ? (
            <button
              type="button"
              aria-label={`Copy ${member.name}'s WeChat ID`}
              onClick={copyWeChatId}
              title={wechatCopied ? "WeChat ID copied" : `WeChat: ${member.wechat_id}`}
              className="grid h-9 w-9 place-items-center rounded-full border border-[#d9e8df] bg-white text-brand-green-dark transition hover:scale-105 hover:border-transparent hover:bg-[#07C160] hover:text-white"
            >
              {wechatCopied ? <Check className="h-4 w-4" /> : <FaWeixin className="h-4 w-4" />}
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
