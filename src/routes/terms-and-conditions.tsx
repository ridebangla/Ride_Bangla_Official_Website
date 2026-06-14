import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Ride Bangla" },
      { name: "description", content: "The terms and conditions that govern your use of the Ride Bangla website and services." },
    ],
    links: [{ rel: "canonical", href: "/terms-and-conditions" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <PageHeader title="Terms & Conditions" subtitle="Last updated: June 2026" />
      <article className="prose prose-sm mx-auto max-w-3xl px-4 py-10 text-foreground">
        <h2 className="mt-0 text-lg font-semibold">1. Acceptance of Terms</h2>
        <p className="text-sm text-muted-foreground">By accessing or using the Ride Bangla website, you agree to these Terms & Conditions. If you do not agree, please do not use the site.</p>

        <h2 className="mt-6 text-lg font-semibold">2. Use of the Website</h2>
        <p className="text-sm text-muted-foreground">You agree to use this website lawfully and only for its intended purpose. You may not attempt to disrupt the service, scrape content automatically, or misuse our forms.</p>

        <h2 className="mt-6 text-lg font-semibold">3. Content & Intellectual Property</h2>
        <p className="text-sm text-muted-foreground">All Ride Bangla branding, logos, text and images are the property of Ride Bangla unless otherwise stated. You may not reproduce them without written permission.</p>

        <h2 className="mt-6 text-lg font-semibold">4. Services</h2>
        <p className="text-sm text-muted-foreground">Our food delivery, courier and future apps are subject to separate in-app terms. Availability and features may change as the platform evolves.</p>

        <h2 className="mt-6 text-lg font-semibold">5. Limitation of Liability</h2>
        <p className="text-sm text-muted-foreground">The website is provided "as is". To the extent allowed by law, Ride Bangla is not liable for any indirect or consequential damages arising from use of the site.</p>

        <h2 className="mt-6 text-lg font-semibold">6. Changes</h2>
        <p className="text-sm text-muted-foreground">We may update these terms from time to time. Continued use of the website constitutes acceptance of the updated terms.</p>

        <h2 className="mt-6 text-lg font-semibold">7. Contact</h2>
        <p className="text-sm text-muted-foreground">Questions about these terms? Email <a className="text-brand-green hover:underline" href="mailto:info@ridebangla.bd">info@ridebangla.bd</a>.</p>
      </article>
    </SiteLayout>
  );
}