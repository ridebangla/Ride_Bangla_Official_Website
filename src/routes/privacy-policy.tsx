import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Ride Bangla" },
      {
        name: "description",
        content:
          "How Ride Bangla collects, uses, stores and protects your personal information.",
      },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/privacy-policy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHeader title="Privacy Policy" subtitle="Last updated: June 2026" />

      <article className="prose prose-sm mx-auto max-w-3xl px-4 py-10 text-foreground">
        <h2 className="mt-0 text-lg font-semibold">1. Introduction</h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates
          the website and digital services available at ridebangla.bd. This
          Privacy Policy explains what information we collect, how we use it,
          how we protect it and how you can contact us about your personal
          information.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          2. Information We Collect
        </h2>
        <p className="text-sm text-muted-foreground">
          When you contact us through our website forms, support forms or other
          official communication channels, we may collect your name, email
          address, phone number, department, subject, message and any other
          information you choose to provide.
        </p>
        <p className="text-sm text-muted-foreground">
          We may also collect basic technical information such as IP address,
          device type, browser type, pages visited, referring pages, approximate
          location, date and time of visit, cookies and similar usage data.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          3. How We Use Information
        </h2>
        <p className="text-sm text-muted-foreground">
          We use collected information to respond to your inquiries, provide
          customer support, manage rider, partner and business requests, improve
          our website and services, prevent misuse, maintain security and comply
          with applicable legal obligations.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          4. Contact Form and Support Data
        </h2>
        <p className="text-sm text-muted-foreground">
          Information submitted through contact or support forms is used only to
          review your request and respond through official Ride Bangla channels,
          including email, phone or WhatsApp. We do not sell your contact form
          information to third parties.
        </p>

        <h2 className="mt-6 text-lg font-semibold">5. Cookies</h2>
        <p className="text-sm text-muted-foreground">
          We may use cookies and similar technologies to keep the website
          working, remember preferences, improve performance, measure website
          traffic and support advertising features. You can control or delete
          cookies through your browser settings.
        </p>

        <h2 className="mt-6 text-lg font-semibold">6. Analytics</h2>
        <p className="text-sm text-muted-foreground">
          We may use analytics tools to understand how visitors use our website.
          Analytics information helps us improve content, performance and user
          experience. Where possible, analytics data is used in aggregated form.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          7. Advertising and Google AdSense
        </h2>
        <p className="text-sm text-muted-foreground">
          In the future, we may display advertisements through Google AdSense or
          other advertising partners. Third-party vendors, including Google, may
          use cookies to serve ads based on your prior visits to our website or
          other websites.
        </p>
        <p className="text-sm text-muted-foreground">
          Google and its partners may place and read cookies on your browser, or
          use web beacons, IP addresses and similar technologies to collect
          information as a result of ad serving. You may opt out of personalized
          advertising by visiting Google Ads Settings or by adjusting your
          browser and cookie preferences.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          8. Third-Party Service Providers
        </h2>
        <p className="text-sm text-muted-foreground">
          We may use trusted third-party service providers for hosting,
          database, email, analytics, security, storage, support and advertising.
          These providers may process information only as needed to operate,
          secure and improve Ride Bangla services.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          9. Data Storage and Security
        </h2>
        <p className="text-sm text-muted-foreground">
          We take reasonable technical and organizational steps to protect
          personal information from unauthorized access, misuse, loss or
          alteration. However, no internet-based service can be guaranteed to be
          completely secure.
        </p>

        <h2 className="mt-6 text-lg font-semibold">10. Data Retention</h2>
        <p className="text-sm text-muted-foreground">
          We keep personal information only as long as necessary for support,
          business communication, security, legal compliance or service
          improvement. When information is no longer needed, we may delete,
          anonymize or securely archive it.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          11. International Processing
        </h2>
        <p className="text-sm text-muted-foreground">
          Some of our technology providers may store or process data outside
          Bangladesh. When this happens, we aim to use trusted providers and
          reasonable safeguards appropriate for the information being processed.
        </p>

        <h2 className="mt-6 text-lg font-semibold">12. Children&apos;s Privacy</h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla services are not intended to collect personal information
          from children without appropriate consent. If you believe a child has
          submitted personal information to us, please contact us so we can
          review and delete it where appropriate.
        </p>

        <h2 className="mt-6 text-lg font-semibold">13. Your Rights</h2>
        <p className="text-sm text-muted-foreground">
          Subject to applicable law, you may request access, correction,
          deletion or restriction of your personal information. You may also
          withdraw consent where processing is based on consent.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          14. Data Deletion Requests
        </h2>
        <p className="text-sm text-muted-foreground">
          To request deletion of your data or to exercise privacy rights, email{" "}
          <a
            className="text-brand-green hover:underline"
            href="mailto:support@ridebangla.bd"
          >
            support@ridebangla.bd
          </a>
          . We will review and respond within a reasonable time.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          15. Changes to This Policy
        </h2>
        <p className="text-sm text-muted-foreground">
          We may update this Privacy Policy from time to time. The updated
          version will be posted on this page with a revised &quot;Last
          updated&quot; date.
        </p>

        <h2 className="mt-6 text-lg font-semibold">16. Contact</h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla, Faridpur, Bangladesh ·{" "}
          <a
            className="text-brand-green hover:underline"
            href="mailto:info@ridebangla.bd"
          >
            info@ridebangla.bd
          </a>{" "}
          ·{" "}
          <a
            className="text-brand-green hover:underline"
            href="mailto:support@ridebangla.bd"
          >
            support@ridebangla.bd
          </a>
        </p>
      </article>
    </SiteLayout>
  );
}
