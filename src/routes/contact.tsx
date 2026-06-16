import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

const SOURCES = [
  "Contact Page",
  "Help Center",
  "WhatsApp",
  "Partner Inquiry",
  "Rider Inquiry",
] as const;

type Source = (typeof SOURCES)[number];

const searchSchema = z.object({
  source: z.enum(SOURCES).optional(),
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Required").max(4000),
  source: z.enum(SOURCES),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contact Ride Bangla — Support & Inquiries" },
      {
        name: "description",
        content:
          "Reach the Ride Bangla team for support, partnership and rider inquiries. Based in Faridpur, Bangladesh.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { source: initialSource } = useSearch({ from: "/contact" });

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    source: (initialSource ?? "Contact Page") as Source,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = useMutation({
    mutationFn: async (input: typeof values) => {
      const parsed = formSchema.parse(input);

      const { error } = await supabase
        .from("website_contact_messages" as never)
        .insert({
          name: parsed.name,
          email: parsed.email,
          phone: parsed.phone || null,
          subject: parsed.subject || null,
          message: parsed.message,
          source: parsed.source,
          status: "New",
        } as never);

      if (error) {
        console.error("[Contact] Submit failed:", error);
        throw error;
      }
    },
  });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const result = formSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    submit.mutate(values);
  };

  return (
    <SiteLayout>
      <PageHeader
        title="Contact Ride Bangla"
        subtitle="We're here to help. Send us a message and our team will get back to you."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-4 md:col-span-1">
          <ContactDetail
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value="info@ridebangla.bd"
            href="mailto:info@ridebangla.bd"
          />
          <ContactDetail
            icon={<Mail className="h-4 w-4" />}
            label="Support"
            value="support@ridebangla.bd"
            href="mailto:support@ridebangla.bd"
          />
          <ContactDetail
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value="+880 1309-587749"
            href="tel:+8801309587749"
          />
          <ContactDetail
            icon={<MapPin className="h-4 w-4" />}
            label="Address"
            value="Faridpur, Bangladesh"
          />
        </div>

        <div className="md:col-span-2">
          {submit.isSuccess ? (
            <div className="flex items-start gap-3 rounded-xl border border-brand-green/30 bg-brand-green-soft p-6">
              <CheckCircle2 className="mt-0.5 h-6 w-6 text-brand-green" />
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Message sent
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Thank you. Our team will reply as soon as possible.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="grid gap-5 rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <Field label="Source" htmlFor="source">
                <select
                  id="source"
                  value={values.source}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      source: event.target.value as Source,
                    }))
                  }
                  className={inputCls}
                >
                  {SOURCES.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" htmlFor="name" error={errors.name} required>
                  <input
                    id="name"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    className={inputCls}
                    maxLength={120}
                    required
                  />
                </Field>

                <Field label="Phone" htmlFor="phone">
                  <input
                    id="phone"
                    placeholder="+880 1XXX-XXXXXX"
                    value={values.phone}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                    className={inputCls}
                    maxLength={40}
                  />
                </Field>
              </div>

              <Field label="Email" htmlFor="email" error={errors.email} required>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className={inputCls}
                  maxLength={255}
                  required
                />
              </Field>

              <Field label="Subject" htmlFor="subject">
                <input
                  id="subject"
                  placeholder="How can we help?"
                  value={values.subject}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      subject: event.target.value,
                    }))
                  }
                  className={inputCls}
                  maxLength={200}
                />
              </Field>

              <Field
                label="Message"
                htmlFor="message"
                error={errors.message}
                required
              >
                <textarea
                  id="message"
                  placeholder="Write your message here…"
                  value={values.message}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  className={`${inputCls} min-h-32 resize-y`}
                  maxLength={4000}
                  required
                />
              </Field>

              {submit.isError && (
                <p className="text-sm text-brand-red">
                  Could not send. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={submit.isPending}
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-green-dark disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {submit.isPending ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-brand-green focus:ring-2 focus:ring-brand-green/25";

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-brand-red">*</span>}
      </span>
      {children}
      {error && <span className="text-xs text-brand-red">{error}</span>}
    </label>
  );
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand-green-soft text-brand-green">
        {icon}
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );

  return href ? <a href={href}>{body}</a> : body;
}
