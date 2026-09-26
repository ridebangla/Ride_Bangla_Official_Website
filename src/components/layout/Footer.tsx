import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaTiktok, FaLinkedin } from "react-icons/fa";
import { Loader2, Mail, Phone, Send } from "lucide-react";
import { saveWebsiteSubscriber } from "@/lib/website-data";

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
  tiktokUrl: "https://www.tiktok.com/@ridebangla0",
  address: "Faridpur, Bangladesh (Head Office) — Serving All 64 Districts of Bangladesh",
};

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Teams", to: "/our-teams" },
  { label: "Gallery", to: "/gallery" },
  { label: "Apps", to: "/apps" },
];

const supportLinks = [
  { label: "Help Center", to: "/help-center" },
  { label: "Blog / Updates", to: "/updates" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Contact Us", to: "/contact" },
  { label: "Delete Account & Data", to: "/delete-account" },
  { label: "Data Deletion", to: "/data-deletion" },
  { label: "Cookie Policy", to: "/cookie-policy" },
];

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm font-medium text-white/60 transition hover:text-emerald-300"
      >
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
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

  return (
    <footer className="mt-16 bg-[#04241b] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.3fr_.8fr_.8fr_1.1fr]">
        <div>
          <Link to="/" className="flex items-center gap-3" aria-label="Ride Bangla home">
            <Logo className="h-12 w-12 rounded-lg object-contain" />
            <div className="min-w-0">
              <span className="block text-lg font-extrabold leading-tight">
                Ride Bangla <span className="font-medium text-white/60">Limited</span>
              </span>
            </div>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">
            Ride Bangla is a Bangladesh digital services ecosystem for ride
            sharing, food delivery, courier delivery, marketplace services and
            professional IT solutions — one trusted brand, many services.
          </p>
          <div className="mt-6 space-y-2 text-sm text-white/60">
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
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Quick Links</h3>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((item) => (
              <FooterLink key={item.to} to={item.to} label={item.label} />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Support</h3>
          <ul className="mt-4 space-y-3">
            {supportLinks.map((item) => (
              <FooterLink key={item.to} to={item.to} label={item.label} />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Follow Us</h3>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            {[
              { label: "Facebook", href: facebookUrl, icon: <FaFacebook /> },
              { label: "YouTube", href: youtubeUrl, icon: <FaYoutube /> },
              { label: "Instagram", href: instagramUrl, icon: <FaInstagram /> },
              { label: "LinkedIn", href: officialContact.website, icon: <FaLinkedin /> },
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
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm text-white/80 transition hover:-translate-y-0.5 hover:bg-emerald-400 hover:text-[#04241b]"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <h3 className="mt-7 text-sm font-extrabold uppercase tracking-wider text-white">
            Subscribe to Our Newsletter
          </h3>
          <p className="mt-2 text-xs text-white/50">Get the latest updates, offers and news.</p>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (submitting) return;
              setSubscribeMessage(null);
              setSubmitting(true);
              try {
                await saveWebsiteSubscriber(email);
                setEmail("");
                setSubscribeMessage("Subscribed successfully.");
              } catch (error) {
                setSubscribeMessage(error instanceof Error ? error.message : "Could not subscribe right now.");
              } finally {
                setSubmitting(false);
              }
            }}
            className="mt-3 flex items-center overflow-hidden rounded-xl bg-white/10 pr-1.5"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              disabled={submitting}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-400 text-[#04241b] transition hover:bg-emerald-300 disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
          {subscribeMessage && <p className="mt-2 text-[10px] font-bold text-emerald-200">{subscribeMessage}</p>}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-center text-xs text-white/45 sm:flex-row sm:text-left">
          <span>© {new Date().getFullYear()} Ride Bangla Limited. All rights reserved.</span>
          <span>Build Together | Grow Together | Ride Bangla</span>
        </div>
      </div>
    </footer>
  );
}
