import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Ride Bangla" },
      {
        name: "description",
        content:
          "How Ride Bangla uses cookies and similar technologies on the ridebangla.bd website.",
      },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/cookie-policy" }],
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <SiteLayout>
      <PageHeader title="Cookie Policy" subtitle="Last updated: 31 July 2026" />

      <article className="prose prose-sm mx-auto max-w-3xl px-4 py-10 text-foreground">
        <h2 className="mt-0 text-lg font-semibold">1. What Are Cookies</h2>
        <p className="text-sm text-muted-foreground">
          Cookies are small text files that a website stores on your device
          when you visit it. They help the site remember your preferences,
          keep you signed in and understand how the site is used, so we can
          keep improving it.
        </p>

        <h2 className="mt-6 text-lg font-semibold">2. How We Use Cookies</h2>
        <p className="text-sm text-muted-foreground">
          The Ride Bangla website (ridebangla.bd) uses cookies and similar
          technologies to: keep the site secure and working correctly,
          remember your language preference (English/Bangla), understand
          which pages are visited and how the site performs, and measure
          overall website traffic in aggregate form.
        </p>

        <h2 className="mt-6 text-lg font-semibold">3. Types of Cookies We Use</h2>
        <ul className="text-sm text-muted-foreground">
          <li>
            <strong>Essential cookies</strong> — required for basic site
            functionality, such as navigation and security. The site will not
            work properly without these.
          </li>
          <li>
            <strong>Preference cookies</strong> — remember choices you make,
            such as your selected language.
          </li>
          <li>
            <strong>Analytics cookies</strong> — help us understand how
            visitors use the website so we can improve content and
            performance.
          </li>
        </ul>

        <h2 className="mt-6 text-lg font-semibold">4. Third-Party Cookies</h2>
        <p className="text-sm text-muted-foreground">
          Some cookies may be set by trusted third-party services we use to
          operate the website (for example, hosting, analytics and Firebase
          infrastructure). These providers only use the information for the
          purpose of delivering their service to us.
        </p>

        <h2 className="mt-6 text-lg font-semibold">5. Managing Cookies</h2>
        <p className="text-sm text-muted-foreground">
          Most web browsers let you control cookies through their settings,
          including blocking or deleting them. Please note that disabling
          essential cookies may affect how parts of the website work.
        </p>

        <h2 className="mt-6 text-lg font-semibold">6. Changes to This Policy</h2>
        <p className="text-sm text-muted-foreground">
          We may update this Cookie Policy from time to time. The updated
          version will be posted on this page with a revised &quot;Last
          updated&quot; date.
        </p>

        <h2 className="mt-6 text-lg font-semibold">7. Contact</h2>
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
