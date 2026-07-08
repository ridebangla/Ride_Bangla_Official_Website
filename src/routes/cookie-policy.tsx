import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Ride Bangla" },
      {
        name: "description",
        content:
          "How Ride Bangla uses cookies and similar technologies on our website.",
      },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: CookiePage,
});

function CookiePage() {
  return (
    <SiteLayout>
      <PageHeader title="Cookie Policy" subtitle="Last updated: June 2026" />

      <article className="prose prose-sm mx-auto max-w-3xl px-4 py-10 text-foreground">
        <h2 className="mt-0 text-lg font-semibold">1. What Cookies Are</h2>
        <p className="text-sm text-muted-foreground">
          Cookies are small text files stored on your device by your browser
          when you visit a website. Cookies help websites work properly,
          remember preferences and understand how visitors use the site.
        </p>

        <h2 className="mt-6 text-lg font-semibold">2. How We Use Cookies</h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla may use cookies and similar technologies to keep the
          website secure, improve performance, understand website usage, remember
          preferences and support future advertising features.
        </p>

        <h2 className="mt-6 text-lg font-semibold">3. Cookie Categories</h2>
        <p className="text-sm text-muted-foreground">
          We may use the following categories of cookies:
        </p>
        <ul className="mt-2 text-sm text-muted-foreground">
          <li>Essential cookies for website functionality and security.</li>
          <li>
            Performance and analytics cookies to understand website usage.
          </li>
          <li>Preference cookies to remember user settings.</li>
          <li>
            Advertising cookies that may be used by Google AdSense and
            advertising partners.
          </li>
        </ul>

        <h2 className="mt-6 text-lg font-semibold">4. Essential Cookies</h2>
        <p className="text-sm text-muted-foreground">
          Essential cookies are needed for the website to operate safely and
          correctly. These may support page loading, security, form protection
          and basic website functionality.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          5. Analytics and Performance Cookies
        </h2>
        <p className="text-sm text-muted-foreground">
          We may use analytics or performance cookies to understand aggregated
          website traffic, page visits and general usage patterns. This helps us
          improve content, design and user experience.
        </p>

        <h2 className="mt-6 text-lg font-semibold">6. Third-Party Cookies</h2>
        <p className="text-sm text-muted-foreground">
          In the future, advertising partners, analytics providers, social media
          platforms or embedded services may set their own cookies on this
          website. These third parties have their own privacy policies and
          opt-out options.
        </p>

        <h2 className="mt-6 text-lg font-semibold">7. Google AdSense Cookies</h2>
        <p className="text-sm text-muted-foreground">
          Google may use cookies, web beacons and similar technologies to display
          relevant advertisements based on your visits to this and other
          websites. Advertising partners may collect certain information as
          described in their own privacy policies.
        </p>

        <h2 className="mt-6 text-lg font-semibold">8. Managing Cookies</h2>
        <p className="text-sm text-muted-foreground">
          You can control, block or delete cookies through your browser
          settings. Disabling cookies may affect some parts of the Ride Bangla
          website and may reduce website functionality.
        </p>

        <h2 className="mt-6 text-lg font-semibold">9. Account & Data Deletion</h2>
        <p className="text-sm text-muted-foreground">
          Cookies are separate from Ride Bangla app account data. To request
          deletion of your Ride Bangla account and associated personal data,
          visit{" "}
          <a className="text-brand-green hover:underline" href="/delete-account">
            Delete Account & Data
          </a>
          .
        </p>

        <h2 className="mt-6 text-lg font-semibold">10. Consent</h2>
        <p className="text-sm text-muted-foreground">
          By continuing to use the Ride Bangla website, you consent to the use
          of cookies as described in this Cookie Policy, unless cookies are
          disabled through your browser settings.
        </p>

        <h2 className="mt-6 text-lg font-semibold">11. Policy Updates</h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla may update this Cookie Policy from time to time. Any
          changes will be published on this page with an updated revision date.
        </p>

        <h2 className="mt-6 text-lg font-semibold">12. Contact</h2>
        <p className="text-sm text-muted-foreground">
          Questions about cookies? Email{" "}
          <a
            className="text-brand-green hover:underline"
            href="mailto:info@ridebangla.bd"
          >
            info@ridebangla.bd
          </a>{" "}
          or{" "}
          <a
            className="text-brand-green hover:underline"
            href="mailto:support@ridebangla.bd"
          >
            support@ridebangla.bd
          </a>
          .
        </p>
      </article>
    </SiteLayout>
  );
}
