import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Ride Bangla" },
      { name: "description", content: "How Ride Bangla uses cookies and similar technologies on our website." },
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
        <h2 className="mt-0 text-lg font-semibold">What Cookies Are</h2>
        <p className="text-sm text-muted-foreground">Cookies are small text files stored on your device by your browser when you visit a website.</p>

        <h2 className="mt-6 text-lg font-semibold">How We Use Cookies</h2>
        <p className="text-sm text-muted-foreground">We use essential cookies to keep the site secure and working, and analytics cookies to understand aggregated usage and improve our content.</p>

        <h2 className="mt-6 text-lg font-semibold">Third-Party Cookies</h2>
        <p className="text-sm text-muted-foreground">In the future, advertising partners (such as Google AdSense) and analytics providers may set their own cookies on this site. These partners have their own privacy policies and opt-out options.</p>

        <h2 className="mt-6 text-lg font-semibold">Managing Cookies</h2>
        <p className="text-sm text-muted-foreground">You can control or delete cookies through your browser settings. Disabling cookies may affect parts of the site.</p>

        <h2 className="mt-6 text-lg font-semibold">Contact</h2>
        <p className="text-sm text-muted-foreground">Questions about cookies? Email <a className="text-brand-green hover:underline" href="mailto:info@ridebangla.bd">info@ridebangla.bd</a>.</p>
      </article>
    </SiteLayout>
  );
}