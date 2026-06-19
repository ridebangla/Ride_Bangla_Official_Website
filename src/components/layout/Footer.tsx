import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

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
        <div>
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="Ride Bangla home"
          >
            <Logo className="h-10 w-10 object-contain" />
            <span className="text-base font-bold">Ride Bangla</span>
          </Link>

          <p className="mt-3 text-sm text-muted-foreground">
            Ride. Food. Delivery. Courier.
            <br />
            Building a trusted digital ecosystem for Bangladesh.
          </p>
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

          <div className="mt-4 flex items-center gap-4">
            <a
              aria-label="Facebook"
              href={facebookUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-brand-green"
            >
              <FaFacebook className="h-5 w-5" />
            </a>

            <a
              aria-label="Instagram"
              href={instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-brand-red"
            >
              <FaInstagram className="h-5 w-5" />
            </a>

            <a
              aria-label="YouTube"
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-brand-red"
            >
              <FaYoutube className="h-5 w-5" />
            </a>

            <a
              aria-label="WhatsApp"
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-brand-green"
            >
              <FaWhatsapp className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-muted-foreground">
          © 2026 Ride Bangla. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
