import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Ride Bangla" },
      { name: "description", content: "How Ride Bangla collects, uses and protects your personal information." },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHeader title="Privacy Policy" subtitle="Last updated: June 2026" />
      <article className="prose prose-sm mx-auto max-w-3xl px-4 py-10 text-foreground">
        <h2 className="mt-0 text-lg font-semibold">1. Introduction</h2>
        <p className="text-sm text-muted-foreground">Ride Bangla ("we", "us") operates the website and services available at ridebangla.bd. This policy explains what information we collect, why we collect it and how we protect it.</p>

        <h2 className="mt-6 text-lg font-semibold">2. Information We Collect</h2>
        <p className="text-sm text-muted-foreground">When you contact us through our website forms, we collect the information you provide: name, email, phone number, subject and message. We also collect basic technical information such as IP address, browser type and pages visited via cookies and analytics.</p>

        <h2 className="mt-6 text-lg font-semibold">3. Cookies</h2>
        <p className="text-sm text-muted-foreground">We use first-party cookies to keep the site working and to understand how it is used. See our Cookie Policy for details.</p>

        <h2 className="mt-6 text-lg font-semibold">4. Analytics</h2>
        <p className="text-sm text-muted-foreground">We may use privacy-respecting analytics to measure aggregated traffic and improve our content. Analytics data does not identify individual users.</p>

        <h2 className="mt-6 text-lg font-semibold">5. Advertising Partners</h2>
        <p className="text-sm text-muted-foreground">In the future we may display advertising from third-party partners such as Google AdSense. These partners may use cookies to serve ads based on your prior visits to our or other websites. You can opt out of personalised advertising at any time through your browser or the partner's opt-out page.</p>

        <h2 className="mt-6 text-lg font-semibold">6. Third-Party Services</h2>
        <p className="text-sm text-muted-foreground">We use trusted infrastructure providers (hosting, database, email) to operate our services. These providers process data only on our behalf.</p>

        <h2 className="mt-6 text-lg font-semibold">7. How We Use Contact Form Data</h2>
        <p className="text-sm text-muted-foreground">We use information from contact and support forms solely to respond to your inquiry. We do not sell or share this information with third parties for marketing.</p>

        <h2 className="mt-6 text-lg font-semibold">8. Your Rights</h2>
        <p className="text-sm text-muted-foreground">You have the right to access, correct or request deletion of your personal data, and to withdraw consent at any time.</p>

        <h2 className="mt-6 text-lg font-semibold">9. Data Deletion Requests</h2>
        <p className="text-sm text-muted-foreground">To request deletion of your data or to exercise any other right, email <a className="text-brand-green hover:underline" href="mailto:support@ridebangla.bd">support@ridebangla.bd</a>. We will respond within a reasonable time.</p>

        <h2 className="mt-6 text-lg font-semibold">10. Contact</h2>
        <p className="text-sm text-muted-foreground">Ride Bangla, Faridpur, Bangladesh · <a className="text-brand-green hover:underline" href="mailto:info@ridebangla.bd">info@ridebangla.bd</a></p>
      </article>
    </SiteLayout>
  );
}