import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle2,
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
  Youtube,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
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

      const { error } = await (supabase as any).rpc("submit_website_contact", {
        p_name: cleanName,
        p_email: cleanEmail,
        p_phone: input.phone.trim(),
        p_subject: finalSubject,
        p_message: cleanMessage,
        p_source: "Contact Page",
      });

      if (error) {
        throw new Error(error.message || "Could not send message.");
      }
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
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
              <p className="text-sm font-bold text-gray-950">
                Official response channels
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Support team can review your message from the admin panel and
                contact you by email, phone or WhatsApp.
              </p>
            </div>
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
                  <option>Ride Service</option>
                  <option>Food Delivery</option>
                  <option>Courier Service</option>
                  <option>Rider Support</option>
                  <option>Partner Support</option>
                  <option>Business Partnership</option>
                  <option>Technical Issue</option>
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

            <button
              type="submit"
              disabled={submitMessage.isPending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 disabled:opacity-60 sm:w-auto"
            >
              {submitMessage.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              {submitMessage.isPending ? "Sending..." : "Send Message"}
            </button>
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
