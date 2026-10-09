import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { Loader2, Mail, Phone, Send } from "lucide-react";
import { saveWebsiteSubscriber } from "@/lib/website-data";
import { OFFICIAL_CONTACT } from "@/lib/official-contact";
import { useLanguage } from "@/context/LanguageContext";

const officialContact = OFFICIAL_CONTACT;

const copy = {
  en: {
    home: "Ride Bangla home",
    description:
      "Ride Bangla is a Bangladesh digital services ecosystem for ride sharing, food delivery, courier delivery, marketplace services and professional IT solutions — one trusted brand, many services.",
    quickLinks: "Quick Links",
    support: "Support",
    followUs: "Follow Us",
    newsletter: "Subscribe to Our Newsletter",
    newsletterBody: "Get the latest updates, offers and news.",
    emailPlaceholder: "Enter your email address",
    subscribe: "Subscribe",
    subscribed: "Subscribed successfully.",
    subscribeFail: "Could not subscribe right now.",
    rights: "All rights reserved.",
    tagline: "Build Together | Grow Together | Ride Bangla",
    links: {
      home: "Home",
      about: "About Us",
      services: "Services",
      ourTeams: "Our Teams",
      gallery: "Gallery",
      apps: "Apps",
      helpCenter: "Help Center",
      updates: "Blog / Updates",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      contact: "Contact Us",
      deleteAccount: "Delete Account & Data",
      dataDeletion: "Data Deletion",
      cookie: "Cookie Policy",
    },
  },
  bn: {
    home: "Ride Bangla হোম",
    description:
      "Ride Bangla রাইড শেয়ারিং, ফুড ডেলিভারি, কুরিয়ার ডেলিভারি, মার্কেটপ্লেস সেবা এবং পেশাদার IT সলিউশনের জন্য বাংলাদেশের ডিজিটাল সার্ভিস ইকোসিস্টেম — একটি বিশ্বস্ত ব্র্যান্ড, অনেক সেবা।",
    quickLinks: "দ্রুত লিংক",
    support: "সহায়তা",
    followUs: "ফলো করুন",
    newsletter: "আমাদের নিউজলেটার সাবস্ক্রাইব করুন",
    newsletterBody: "সর্বশেষ আপডেট, অফার ও খবর পান।",
    emailPlaceholder: "আপনার ইমেইল ঠিকানা লিখুন",
    subscribe: "সাবস্ক্রাইব",
    subscribed: "সফলভাবে সাবস্ক্রাইব হয়েছে।",
    subscribeFail: "এই মুহূর্তে সাবস্ক্রাইব করা যাচ্ছে না।",
    rights: "সর্বস্বত্ব সংরক্ষিত।",
    tagline: "একসাথে গড়ি | একসাথে বাড়ি | Ride Bangla",
    links: {
      home: "হোম",
      about: "আমাদের সম্পর্কে",
      services: "সেবাসমূহ",
      ourTeams: "আমাদের টিম",
      gallery: "গ্যালারি",
      apps: "অ্যাপস",
      helpCenter: "সহায়তা কেন্দ্র",
      updates: "ব্লগ / আপডেট",
      terms: "শর্তাবলী",
      privacy: "গোপনীয়তা নীতি",
      contact: "যোগাযোগ",
      deleteAccount: "অ্যাকাউন্ট ও ডেটা মুছুন",
      dataDeletion: "ডেটা ডিলিশন",
      cookie: "কুকি নীতি",
    },
  },
} as const;

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link
        to={to}
        className="text-[10px] font-medium text-white/60 transition hover:text-emerald-300"
      >
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState<string | null>(null);
  const businessEmail = officialContact.businessEmail;
  const supportEmail = officialContact.supportEmail;
  const phone = officialContact.phone;
  const phoneLabel = officialContact.phoneLabel;
  const whatsapp = officialContact.whatsapp;
  const facebookUrl = officialContact.facebookUrl;
  const instagramUrl = officialContact.instagramUrl;
  const youtubeUrl = officialContact.youtubeUrl;
  const tiktokUrl = officialContact.tiktokUrl;

  const quickLinks = [
    { label: t.links.home, to: "/" },
    { label: t.links.about, to: "/about" },
    { label: t.links.services, to: "/services" },
    { label: t.links.ourTeams, to: "/our-teams" },
    { label: t.links.gallery, to: "/gallery" },
    { label: t.links.apps, to: "/apps" },
  ];

  const supportLinks = [
    { label: t.links.helpCenter, to: "/help-center" },
    { label: t.links.updates, to: "/updates" },
    { label: t.links.terms, to: "/terms-and-conditions" },
    { label: t.links.privacy, to: "/privacy-policy" },
    { label: t.links.contact, to: "/contact" },
    { label: t.links.deleteAccount, to: "/delete-account" },
    { label: t.links.dataDeletion, to: "/data-deletion" },
    { label: t.links.cookie, to: "/cookie-policy" },
  ];

  return (
    <footer
      className="mt-0 bg-[#04241b] bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/assets/home/footer-bg.jpg')", backgroundSize: "cover" }}
    >
      <div className="mx-auto grid w-full max-w-7xl gap-7 px-5 py-7 sm:px-8 lg:grid-cols-[1.2fr_.8fr_.8fr_1.2fr] lg:gap-6 lg:py-8">
        <div>
          <Link to="/" className="flex items-center gap-3" aria-label={t.home}>
            <img src="/logo.png" alt="Ride Bangla Limited" className="h-11 w-auto max-w-[190px] object-contain" />
          </Link>
          <p className="mt-2 max-w-sm text-[10px] leading-4 text-white/50">
            {t.description}
          </p>
          <div className="mt-3 space-y-1 text-[10px] text-white/55">
            <a href={`mailto:${businessEmail}`} className="flex items-center gap-2 transition hover:text-emerald-300">
              <Mail className="h-4 w-4 shrink-0" /> {businessEmail}
            </a>
            <a href={`mailto:${supportEmail}`} className="flex items-center gap-2 transition hover:text-emerald-300">
              <Mail className="h-4 w-4 shrink-0" /> {supportEmail}
            </a>
            <a href={`tel:${phone.replace(/[^+0-9]/g, "")}`} className="flex items-center gap-2 transition hover:text-emerald-300">
              <Phone className="h-4 w-4 shrink-0" /> {phoneLabel}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-white">{t.quickLinks}</h3>
          <ul className="mt-2 space-y-1.5">
            {quickLinks.map((item) => (
              <FooterLink key={item.to} to={item.to} label={item.label} />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-white">{t.support}</h3>
          <ul className="mt-2 space-y-1.5">
            {supportLinks.map((item) => (
              <FooterLink key={item.to} to={item.to} label={item.label} />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-white">{t.followUs}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {[
              { label: "Facebook", href: facebookUrl, icon: <FaFacebook /> },
              { label: "YouTube", href: youtubeUrl, icon: <FaYoutube /> },
              { label: "Instagram", href: instagramUrl, icon: <FaInstagram /> },
              { label: "TikTok", href: tiktokUrl, icon: <FaTiktok /> },
              {
                label: "WhatsApp",
                href: `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`,
                icon: <FaWhatsapp />,
              },
            ].map((social) => (
              <a
                key={social.label}
                aria-label={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-sm text-white/80 transition hover:-translate-y-0.5 hover:bg-emerald-400 hover:text-[#04241b]"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <h3 className="mt-4 text-[10px] font-extrabold uppercase tracking-wider text-white">
            {t.newsletter}
          </h3>
          <p className="mt-1 text-[9px] text-white/50">{t.newsletterBody}</p>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (submitting) return;
              setSubscribeMessage(null);
              setSubmitting(true);
              try {
                await saveWebsiteSubscriber(email);
                setEmail("");
                setSubscribeMessage(t.subscribed);
              } catch (error) {
                setSubscribeMessage(error instanceof Error ? error.message : t.subscribeFail);
              } finally {
                setSubmitting(false);
              }
            }}
            className="mt-2 flex items-center overflow-hidden rounded-lg bg-white/10 pr-1"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full bg-transparent px-3 py-2 text-[10px] text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              aria-label={t.subscribe}
              disabled={submitting}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-400 text-[#04241b] transition hover:bg-emerald-300 disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
          {subscribeMessage && <p className="mt-2 text-[10px] font-bold text-emerald-200">{subscribeMessage}</p>}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-5 py-3 text-center text-[9px] text-white/45 sm:flex-row sm:text-left">
          <span>© {new Date().getFullYear()} Ride Bangla Limited. {t.rights}</span>
          <span>{t.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
