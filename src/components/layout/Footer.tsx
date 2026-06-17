import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const officialFacebookUrl = "https://www.facebook.com/ridebangla";

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

  const facebookUrl = ci?.facebook_url || officialFacebookUrl;

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
              <Link
                to="/about"
                className="text-muted-foreground hover:text-brand-green"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-muted-foreground hover:text-brand-green"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/apps"
                className="text-muted-foreground hover:text-brand-green"
              >
                Apps
              </Link>
            </li>
            <li>
              <Link
                to="/updates"
                className="text-muted-foreground hover:text-brand-green"
              >
                Updates
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/help-center"
                className="text-muted-foreground hover:text-brand-green"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-brand-green"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-muted-foreground hover:text-brand-green"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-and-conditions"
                className="text-muted-foreground hover:text-brand-green"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/cookie-policy"
                className="text-muted-foreground hover:text-brand-green"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Connect</h3>

          <ul className="space-y-2 text-sm">
            {ci?.business_email && (
              <li>
                <a
                  href={`mailto:${ci.business_email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-brand-green"
                >
                  <Mail className="h-4 w-4" />
                  {ci.business_email}
                </a>
              </li>
            )}

            {ci?.phone && (
              <li>
                <a
                  href={`tel:${ci.phone}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-brand-green"
                >
                  <Phone className="h-4 w-4" />
                  {ci.phone}
                </a>
              </li>
            )}

            {ci?.address && (
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {ci.address}
              </li>
            )}
          </ul>

          <div className="mt-4 flex items-center gap-3">
            <a
              aria-label="Facebook"
              href={facebookUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-brand-green"
            >
              <FaFacebook className="h-5 w-5" />
            </a>

            {ci?.instagram_url && (
              <a
                aria-label="Instagram"
                href={ci.instagram_url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-brand-red"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            )}

            {ci?.youtube_url && (
              <a
                aria-label="YouTube"
                href={ci.youtube_url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-brand-red"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
            )}

            {ci?.whatsapp && (
              <a
                aria-label="WhatsApp"
                href={`https://wa.me/${ci.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-brand-green"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            )}
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
