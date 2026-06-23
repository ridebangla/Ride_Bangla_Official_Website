import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Ride Bangla" },
      {
        name: "description",
        content:
          "The terms and conditions that govern your use of the Ride Bangla website and services.",
      },
    ],
    links: [{ rel: "canonical", href: "/terms-and-conditions" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <PageHeader
        title="Terms & Conditions"
        subtitle="Last updated: June 2026"
      />

      <article className="prose prose-sm mx-auto max-w-3xl px-4 py-10 text-foreground">
        <h2 className="mt-0 text-lg font-semibold">1. Acceptance of Terms</h2>
        <p className="text-sm text-muted-foreground">
          By accessing or using the Ride Bangla website, apps, forms, content or
          digital services, you agree to these Terms & Conditions. If you do not
          agree, please do not use our website or services.
        </p>

        <h2 className="mt-6 text-lg font-semibold">2. About Ride Bangla</h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla is a Bangladesh-based digital service platform founded in
          Faridpur, Bangladesh. Our current operational focus is Food Delivery
          and Courier services, supported by Customer, Partner, Rider and Admin
          systems. Other services such as Market, Ride Sharing, Wallet and Agent
          services may be introduced gradually.
        </p>

        <h2 className="mt-6 text-lg font-semibold">3. Use of the Website</h2>
        <p className="text-sm text-muted-foreground">
          You agree to use this website lawfully, respectfully and only for its
          intended purpose. You must not attempt to disrupt the service, misuse
          forms, submit false information, scrape content automatically, upload
          harmful content or interfere with website security.
        </p>

        <h2 className="mt-6 text-lg font-semibold">4. Website Information</h2>
        <p className="text-sm text-muted-foreground">
          We try to keep information accurate and updated, but website content,
          service availability, app availability, features, prices, offers,
          policies and launch timelines may change without prior notice.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          5. Services and App Availability
        </h2>
        <p className="text-sm text-muted-foreground">
          Food Delivery and Courier services may depend on location, partner
          availability, rider availability, business hours, weather, traffic,
          operational capacity and other practical conditions. Future services
          displayed on the website may be marked as Coming Soon and may not be
          available immediately.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          6. Partner, Rider and Business Requests
        </h2>
        <p className="text-sm text-muted-foreground">
          Submitting a rider, partner, business or support request does not
          guarantee approval, onboarding or service activation. Ride Bangla may
          review, accept, reject or request additional information according to
          internal policies and operational requirements.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          7. User Submitted Information
        </h2>
        <p className="text-sm text-muted-foreground">
          You are responsible for ensuring that information you submit through
          forms, messages, comments or support requests is accurate, lawful and
          does not violate another person&apos;s rights. We may remove or ignore
          abusive, misleading, spam or unlawful submissions.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          8. Comments and Public Interaction
        </h2>
        <p className="text-sm text-muted-foreground">
          If comments, likes or public interaction features are available, Ride
          Bangla may moderate, approve, reject or remove content that is spam,
          abusive, misleading, illegal, promotional or harmful to users,
          partners, riders or the company.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          9. Content and Intellectual Property
        </h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla branding, logos, names, text, graphics, photos, videos,
          website design and other content are owned by Ride Bangla or used with
          permission unless otherwise stated. You may not copy, reproduce,
          modify, sell, publish or use our content or brand assets without prior
          written permission.
        </p>

        <h2 className="mt-6 text-lg font-semibold">10. Third-Party Links</h2>
        <p className="text-sm text-muted-foreground">
          Our website may contain links to third-party websites, social media
          pages, maps, payment providers, app stores or advertising partners. We
          are not responsible for the content, privacy practices, accuracy or
          policies of third-party websites.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          11. Advertising and Sponsored Content
        </h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla may display advertisements, sponsored content or
          third-party ad services such as Google AdSense in the future. Ads do
          not mean Ride Bangla endorses every advertiser, product or service.
          Advertising partners may have their own terms and privacy policies.
        </p>

        <h2 className="mt-6 text-lg font-semibold">12. No Guarantee</h2>
        <p className="text-sm text-muted-foreground">
          The website is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis. We do not guarantee that the website will always
          be uninterrupted, error-free, secure or available at all times.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          13. Limitation of Liability
        </h2>
        <p className="text-sm text-muted-foreground">
          To the maximum extent permitted by applicable law, Ride Bangla is not
          liable for indirect, incidental, special, consequential or business
          losses arising from use of the website, inability to use the website,
          third-party links, delayed updates or information errors.
        </p>

        <h2 className="mt-6 text-lg font-semibold">14. Privacy</h2>
        <p className="text-sm text-muted-foreground">
          Your use of our website and services is also governed by our Privacy
          Policy and Cookie Policy. Please review those pages to understand how
          we collect, use and protect information.
        </p>

        <h2 className="mt-6 text-lg font-semibold">15. Changes to Terms</h2>
        <p className="text-sm text-muted-foreground">
          We may update these Terms & Conditions from time to time. The updated
          version will be posted on this page with a revised &quot;Last
          updated&quot; date. Continued use of the website means you accept the
          updated terms.
        </p>

        <h2 className="mt-6 text-lg font-semibold">16. Governing Law</h2>
        <p className="text-sm text-muted-foreground">
          These Terms & Conditions are intended to be governed by the applicable
          laws of Bangladesh. Any dispute should first be resolved through
          official communication with Ride Bangla.
        </p>

        <h2 className="mt-6 text-lg font-semibold">17. Contact</h2>
        <p className="text-sm text-muted-foreground">
          Questions about these terms? Contact Ride Bangla, Faridpur,
          Bangladesh ·{" "}
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
