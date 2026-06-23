import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin, Globe, Headphones, ShieldCheck } from "lucide-react";

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

export function Footer() {
  const { data: ci } = useQuery({
    queryKey: ["contact_info"],
    queryFn: async () =>
      (
        await supabase
          .from("contact_info")
          .select("*")
          .limit(1)
          .maybeSingle()
      ).data,
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
    <footer className="mt-16 border-t border-border bg-soft-bg">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Ride Bangla home"
          >
            <Logo className="h-12 w-12 object-contain drop-shadow-sm" />
            <div className="min-w-0">
              <span className="block text-lg font-bold leading-tight text-foreground">
                Ride Bangla
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-green">
                Bangladesh Digital Ecosystem
              </span>
            </div>
          </Link>

          <p className="mt-4 max-w-sm text-base leading-7 text-muted-foreground">
            Ride Bangla is building Bangladesh&apos;s trusted digital ecosystem
            for Food Delivery, Courier Services, customers, partners, riders and
            future digital solutions.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green">
              <ShieldCheck className="h-3.5 w-3.5" />
              Food Active
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green">
              <ShieldCheck className="h-3.5 w-3.5" />
              Courier Active
            </span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-brand-green">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-muted-foreground hover:text-brand-green">
                Services
              </Link>
            </li>
            <li>
              <Link to="/apps" className="text-muted-foreground hover:text-brand-green">
                Apps
              </Link>
            </li>
            <li>
              <Link to="/updates" className="text-muted-foreground hover:text-brand-green">
                Updates
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/help-center" className="text-muted-foreground hover:text-brand-green">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-brand-green">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-brand-green">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="text-muted-foreground hover:text-brand-green">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/cookie-policy" className="text-muted-foreground hover:text-brand-green">
                Cookie Policy
              </Link>
            </li>
          </ul>

          <Link
            to="/help-center"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-brand-green/20 bg-background px-3 py-2 text-sm font-semibold text-brand-green shadow-sm transition hover:bg-brand-green-soft"
          >
            <Headphones className="h-4 w-4" />
            Get Help
          </Link>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Connect</h3>

          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={officialContact.website}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-muted-foreground hover:text-brand-green"
              >
                <Globe className="h-4 w-4" />
                {officialContact.websiteLabel}
              </a>
            </li>

            <li>
              <a
                href={`mailto:${businessEmail}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-brand-green"
              >
                <Mail className="h-4 w-4" />
                {businessEmail}
              </a>
            </li>

            <li>
              <a
                href={`mailto:${supportEmail}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-brand-green"
              >
                <Mail className="h-4 w-4" />
                {supportEmail}
              </a>
            </li>

            <li>
              <a
                href={`tel:${phone.replace(/[^+0-9]/g, "")}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-brand-green"
              >
                <Phone className="h-4 w-4" />
                {phoneLabel}
              </a>
            </li>

            <li className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {address}
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-3">
            <a
              aria-label="Facebook"
              href={facebookUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:text-brand-green hover:shadow-md"
            >
              <FaFacebook className="h-5 w-5" />
            </a>

            <a
              aria-label="Instagram"
              href={instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:text-brand-red hover:shadow-md"
            >
              <FaInstagram className="h-5 w-5" />
            </a>

            <a
              aria-label="YouTube"
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:text-brand-red hover:shadow-md"
            >
              <FaYoutube className="h-5 w-5" />
            </a>

            <a
              aria-label="WhatsApp"
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:text-brand-green hover:shadow-md"
            >
              <FaWhatsapp className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <span>© 2026 Ride Bangla. All rights reserved.</span>
          <span>Founded in Faridpur, Bangladesh.</span>
        </div>
      </div>
    </footer>
  );
}
