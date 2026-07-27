import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Facebook,
  Globe,
  Headphones,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Youtube,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { submitWebsiteContact } from "@/lib/website-data";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ride Bangla" },
      {
        name: "description",
        content:
          "Contact Ride Bangla through official website, email, phone, WhatsApp and social media channels.",
      },
      { property: "og:title", content: "Contact — Ride Bangla" },
      {
        property: "og:description",
        content:
          "Official Ride Bangla support for customers, riders, partners and businesses.",
      },
      { property: "og:url", content: "https://ridebangla.bd/contact" },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/contact" }],
  }),
  component: ContactPage,
});

type FormValues = {
  name: string;
  phone: string;
  email: string;
  department: string;
  subject: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  department: "General Support",
  subject: "",
  message: "",
};

function ContactPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [formError, setFormError] = useState("");
  const businessEmail = "info@ridebangla.bd";
  const supportEmail = "support@ridebangla.bd";
  const phone = "+8801309587749";
  const whatsapp = "8801309587749";
  const address = "Faridpur, Bangladesh";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

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
      value: businessEmail,
      href: `mailto:${businessEmail}`,
      icon: Mail,
      type: "Send Email",
    },
    {
      title: "Support Email",
      value: supportEmail,
      href: `mailto:${supportEmail}`,
      icon: Headphones,
      type: "Get Support",
    },
    {
      title: "Phone",
      value: phone,
      href: `tel:${phone.replace(/[^+0-9]/g, "")}`,
      icon: Phone,
      type: "Call Now",
    },
    {
      title: "WhatsApp",
      value: phone,
      href: `https://wa.me/${whatsapp}`,
      icon: MessageCircle,
      type: "Chat on WhatsApp",
      highlight: true,
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
      value: address,
      href: mapUrl,
      icon: MapPin,
      type: "View Map",
    },
  ];

  const submitMessage = useMutation({
    mutationFn: async (input: FormValues) => {
      const cleanName = input.name.trim();
      const cleanEmail = input.email.trim();
      const cleanMessage = input.message.trim();

      if (!cleanName || !cleanEmail || !cleanMessage) {
        throw new Error("Please fill in your name, email and message.");
      }

      const finalSubject = `${input.department}: ${
        input.subject.trim() || "Contact message"
      }`;

      await submitWebsiteContact({
        name: cleanName,
        email: cleanEmail,
        phone: input.phone.trim(),
        subject: finalSubject,
        message: cleanMessage,
        source: "Contact Page",
      });
    },
    onSuccess: () => {
      setValues(initialValues);
      setFormError("");
    },
    onError: (error) => {
      setFormError(
        error instanceof Error
          ? error.message
          : "Could not send message. Please try again."
      );
    },
  });

  const updateValue = (key: keyof FormValues, value: string) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    submitMessage.mutate(values);
  };

  return (
    <SiteLayout>
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-green-50 via-white to-red-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white p-2 shadow-sm ring-1 ring-green-100">
              <Logo className="h-full w-full object-contain" />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-700">
              Contact Ride Bangla
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
              We are here to help
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
              Connect with Ride Bangla through our official website, email,
              support, phone, WhatsApp and social media channels.
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
                  className={`group rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                    item.highlight
                      ? "border-green-200 bg-gradient-to-br from-green-600 to-green-700 text-white"
                      : "border-gray-100 bg-white hover:border-green-200"
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                        item.highlight
                          ? "bg-white/15 text-white group-hover:bg-white group-hover:text-green-700"
                          : "bg-green-50 text-green-700 group-hover:bg-green-700 group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <ExternalLink
                      className={`h-5 w-5 transition ${
                        item.highlight
                          ? "text-white/70 group-hover:text-white"
                          : "text-gray-300 group-hover:text-green-700"
                      }`}
                    />
                  </div>

                  <h2
                    className={`text-lg font-bold ${
                      item.highlight ? "text-white" : "text-gray-950"
                    }`}
                  >
                    {item.title}
                  </h2>
                  <p
                    className={`mt-2 break-words text-sm font-medium ${
                      item.highlight ? "text-white/85" : "text-gray-600"
                    }`}
                  >
                    {item.value}
                  </p>
                  <p
                    className={`mt-5 text-sm font-bold ${
                      item.highlight ? "text-white" : "text-green-700"
                    }`}
                  >
                    {item.type}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-green-100 bg-green-50 p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-700">
                Send Message
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-950">
                Contact our support team
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                Fill out this form and your message will go directly to the Ride
                Bangla admin support team.
              </p>

              <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                  <div>
                    <p className="text-sm font-bold text-gray-950">
                      Official response channels
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Support team can review your message from the admin panel
                      and contact you by email, phone or WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                  <div>
                    <p className="text-sm font-bold text-gray-950">
                      Support routing
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Messages are routed to the appropriate Ride Bangla support,
                      operations, partnership or technical team based on the
                      selected department and subject.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/help-center"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-green-200 bg-white px-5 py-3 text-sm font-bold text-green-700 shadow-sm transition hover:bg-green-700 hover:text-white"
              >
                <Headphones className="h-5 w-5" />
                Browse Help Center
              </Link>
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" required>
                  <input
                    value={values.name}
                    onChange={(event) => updateValue("name", event.target.value)}
                    placeholder="Your full name"
                    className={inputClass}
                    maxLength={120}
                  />
                </Field>

                <Field label="Phone / WhatsApp">
                  <input
                    value={values.phone}
                    onChange={(event) => updateValue("phone", event.target.value)}
                    placeholder="+880 1XXX-XXXXXX"
                    className={inputClass}
                    maxLength={40}
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Email" required>
                  <input
                    type="email"
                    value={values.email}
                    onChange={(event) => updateValue("email", event.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                    maxLength={255}
                  />
                </Field>

                <Field label="Department">
                  <select
                    value={values.department}
                    onChange={(event) =>
                      updateValue("department", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option>General Support</option>
                    <option>Food Delivery</option>
                    <option>Courier Service</option>
                    <option>Rider Support</option>
                    <option>Partner Support</option>
                    <option>Business Partnership</option>
                    <option>Technical Issue</option>
                    <option>Website / App Issue</option>
                  </select>
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Subject">
                  <input
                    value={values.subject}
                    onChange={(event) =>
                      updateValue("subject", event.target.value)
                    }
                    placeholder="How can we help?"
                    className={inputClass}
                    maxLength={200}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Message" required>
                  <textarea
                    value={values.message}
                    onChange={(event) =>
                      updateValue("message", event.target.value)
                    }
                    placeholder="Write your message here..."
                    className={`${inputClass} min-h-36 resize-y`}
                    maxLength={4000}
                  />
                </Field>
              </div>

              {formError && (
                <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {formError}
                </p>
              )}

              {submitMessage.isSuccess && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Message sent successfully. Our support team will contact you
                    as soon as possible.
                  </span>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={submitMessage.isPending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 disabled:opacity-60 sm:w-auto"
                >
                  {submitMessage.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  {submitMessage.isPending ? "Sending..." : "Send Message"}
                </button>

                <Link
                  to="/help-center"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-bold text-gray-950 transition hover:border-green-200 hover:text-green-700 sm:w-auto"
                >
                  <Headphones className="h-5 w-5" />
                  Browse Help Center
                </Link>
              </div>
            </form>
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
                  For Food Delivery, Courier, partnership, rider, partner,
                  support or business communication, please contact us through
                  our official channels only.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-green-700"
                >
                  <Mail className="h-5 w-5" />
                  Email Support
                </a>

                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
                >
                  <MessageCircle className="h-6 w-6" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-gray-950">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </span>
      {children}
    </label>
  );
}
