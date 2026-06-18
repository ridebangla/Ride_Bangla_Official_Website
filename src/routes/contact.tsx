import { createFileRoute } from "@tanstack/react-router";
import {
  ExternalLink,
  Facebook,
  Globe,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const contacts = [
    {
      title: "Official Website",
      value: "ridebangla.bd",
      href: "https://ridebangla.bd",
      icon: Globe,
      type: "Open Website",
    },
    {
      title: "Official Email",
      value: "info@ridebangla.bd",
      href: "mailto:info@ridebangla.bd",
      icon: Mail,
      type: "Send Email",
    },
    {
      title: "Support Email",
      value: "support@ridebangla.bd",
      href: "mailto:support@ridebangla.bd",
      icon: Headphones,
      type: "Get Support",
    },
    {
      title: "Phone",
      value: "+8801309587749",
      href: "tel:+8801309587749",
      icon: Phone,
      type: "Call Now",
    },
    {
      title: "WhatsApp",
      value: "+8801309587749",
      href: "https://wa.me/8801309587749",
      icon: MessageCircle,
      type: "Chat on WhatsApp",
    },
    {
      title: "Facebook",
      value: "facebook.com/ridebangla",
      href: "https://facebook.com/ridebangla",
      icon: Facebook,
      type: "Follow Us",
    },
    {
      title: "Instagram",
      value: "instagram.com/ride.bangla_",
      href: "https://www.instagram.com/ride.bangla_",
      icon: Instagram,
      type: "Follow Us",
    },
    {
      title: "YouTube",
      value: "youtube.com/@ridebangla-0",
      href: "https://www.youtube.com/@ridebangla-0",
      icon: Youtube,
      type: "Subscribe",
    },
    {
      title: "Location",
      value: "Faridpur, Bangladesh",
      href: "https://www.google.com/maps/search/?api=1&query=Faridpur%2C%20Bangladesh",
      icon: MapPin,
      type: "View Map",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-50 via-white to-red-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-700">
            Contact Ride Bangla
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
            We are here to help
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            Connect with Ride Bangla through our official website, email,
            support, phone, WhatsApp, and social media channels.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                target={
                  item.href.startsWith("http") || item.href.startsWith("https")
                    ? "_blank"
                    : undefined
                }
                rel={
                  item.href.startsWith("http") || item.href.startsWith("https")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-300 transition group-hover:text-green-700" />
                </div>

                <h2 className="text-lg font-bold text-gray-950">
                  {item.title}
                </h2>
                <p className="mt-2 break-words text-sm font-medium text-gray-600">
                  {item.value}
                </p>
                <p className="mt-5 text-sm font-bold text-green-700">
                  {item.type}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gray-950 p-8 text-white shadow-xl sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
                Official Support
              </p>
              <h2 className="mt-3 text-3xl font-extrabold">
                Need help with Ride Bangla?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
                For service, partnership, rider, partner, support, or business
                communication, please contact us through our official channels
                only.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="mailto:support@ridebangla.bd"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-green-700"
              >
                <Mail className="h-5 w-5" />
                Email Support
              </a>

              <a
                href="https://wa.me/8801309587749"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
