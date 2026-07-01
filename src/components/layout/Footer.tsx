import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Logo } from "@/components/site/Logo";
import { getContactInfo } from "@/lib/website-data";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Headphones,
  ShieldCheck,
  ArrowRight,
  Link2,
  LifeBuoy,
} from "lucide-react";

const officialContact = {
  website: "https://ridebangla.bd",
  websiteLabel: "ridebangla.bd",
  businessEmail: "info@ridebangla.bd",
  supportEmail: "support@ridebangla.bd",
  phone: "+8801309587749",
  phoneLabel: "+880 1309-587749",
  whatsapp: "8801309587749",
  facebookUrl: "https://www.facebook.com/ridebangla",
  instagramUrl: "https://www.instagram.com/ride.bangla_",
  youtubeUrl: "https://www.youtube.com/@ridebangla-0",
  address: "Faridpur, Bangladesh",
};

const quickLinks = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Apps", to: "/apps" },
  { label: "Updates", to: "/updates" },
];

const supportLinks = [
  { label: "Help Center", to: "/help-center" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
  { label: "Data Deletion", to: "/data-deletion" },
  { label: "Cookie Policy", to: "/cookie-policy" },
];

function FooterCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-[230px] flex-col rounded-3xl border border-border/80 bg-background/95 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-brand-green/25 hover:shadow-xl">
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-green-soft text-brand-green shadow-sm">
          {icon}
        </span>
        <div>
          <h3 className="text-xl font-extrabold leading-tight text-foreground">
            {title}
          </h3>
          <span className="mt-2 block h-1 w-10 rounded-full bg-brand-green" />
        </div>
      </div>
      {children}
    </div>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link
        to={to}
        className="group flex items-center justify-between rounded-2xl px-3 py-3 text-base font-semibold text-muted-foreground transition hover:bg-brand-green-soft hover:text-brand-green"
      >
        <span>{label}</span>
        <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
      </Link>
    </li>
  );
}

export function Footer() {
  const { data: ci } = useQuery({
    queryKey: ["contact_info"],
    queryFn: getContactInfo,
  });

  const businessEmail =
    ci?.business_email || ci?.email || officialContact.businessEmail;
  const supportEmail = ci?.support_email || officialContact.supportEmail;
  const phone = ci?.phone || officialContact.phone;
  const phoneLabel = ci?.phone || officialContact.phoneLabel;
  const whatsapp = ci?.whatsapp || officialContact.whatsapp;
  const facebookUrl = ci?.facebook_url || officialContact.facebookUrl;
  const instagramUrl = ci?.instagram_url || officialContact.instagramUrl;
  const youtubeUrl = ci?.youtube_url || officialContact.youtubeUrl;
  const address = ci?.address || officialContact.address;

  return (
    <footer className="mt-16 border-t border-brand-green/10 bg-gradient-to-b from-brand-green-soft via-background to-background">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.15fr]">
        <div className="flex h-full min-h-[230px] flex-col rounded-3xl border border-border/80 bg-background/95 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-brand-green/25 hover:shadow-xl">
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Ride Bangla home"
          >
            <Logo className="h-14 w-14 object-contain drop-shadow-sm" />
            <div className="min-w-0">
              <span className="block text-xl font-extrabold leading-tight text-foreground">
                Ride Bangla
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
                Bangladesh Digital Ecosystem
              </span>
            </div>
          </Link>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Ride Bangla is building Bangladesh&apos;s trusted digital ecosystem
            for Food Delivery, Courier Services, customers, partners, riders and
            future digital solutions.
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-soft px-3 py-1.5 text-xs font-bold text-brand-green">
              <ShieldCheck className="h-3.5 w-3.5" />
              Food Active
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-soft px-3 py-1.5 text-xs font-bold text-brand-green">
              <ShieldCheck className="h-3.5 w-3.5" />
              Courier Active
            </span>
          </div>
        </div>

        <FooterCard icon={<Link2 className="h-5 w-5" />} title="Quick Links">
          <ul className="space-y-1">
            {quickLinks.map((item) => (
              <FooterLink key={item.to} to={item.to} label={item.label} />
            ))}
          </ul>
        </FooterCard>

        <FooterCard icon={<LifeBuoy className="h-5 w-5" />} title="Support">
          <ul className="space-y-1">
            {supportLinks.map((item) => (
              <FooterLink key={item.to} to={item.to} label={item.label} />
            ))}
          </ul>

          <Link
            to="/help-center"
            className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-green px-4 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-lg"
          >
            <Headphones className="h-4 w-4" />
            Get Help
          </Link>
        </FooterCard>

        <FooterCard icon={<Globe className="h-5 w-5" />} title="Connect">
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href={officialContact.website}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 break-all text-muted-foreground transition hover:text-brand-green"
              >
                <Globe className="h-4 w-4 shrink-0" />
                {officialContact.websiteLabel}
              </a>
            </li>

            <li>
              <a
                href={`mailto:${businessEmail}`}
                className="flex items-center gap-2 break-all text-muted-foreground transition hover:text-brand-green"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {businessEmail}
              </a>
            </li>

            <li>
              <a
                href={`mailto:${supportEmail}`}
                className="flex items-center gap-2 break-all text-muted-foreground transition hover:text-brand-green"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {supportEmail}
              </a>
            </li>

            <li>
              <a
                href={`tel:${phone.replace(/[^+0-9]/g, "")}`}
                className="flex items-center gap-2 text-muted-foreground transition hover:text-brand-green"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {phoneLabel}
              </a>
            </li>

            <li className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              {address}
            </li>
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
            {[
              { label: "Facebook", href: facebookUrl, icon: <FaFacebook /> },
              { label: "Instagram", href: instagramUrl, icon: <FaInstagram /> },
              { label: "YouTube", href: youtubeUrl, icon: <FaYoutube /> },
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-soft text-lg text-brand-green shadow-sm ring-1 ring-brand-green/15 transition hover:-translate-y-1 hover:bg-brand-green hover:text-white hover:shadow-md"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </FooterCard>
      </div>

      <div className="border-t border-border bg-background/95">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <span>© 2026 Ride Bangla. All rights reserved.</span>
          <span>Founded in Faridpur, Bangladesh.</span>
        </div>
      </div>
    </footer>
  );
      }
