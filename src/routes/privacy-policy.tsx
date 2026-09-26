import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Ride Bangla" },
      {
        name: "description",
        content:
          "How Ride Bangla collects, uses, stores and protects your personal information across our website and mobile apps.",
      },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/privacy-policy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHeader title="Privacy Policy" subtitle="Last updated: 31 July 2026" />

      <article className="prose prose-sm mx-auto max-w-3xl px-4 py-10 text-foreground">
        <h2 className="mt-0 text-lg font-semibold">1. Introduction</h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates
          the website at ridebangla.bd and the Ride Bangla mobile apps
          (Customer, Partner, Rider and related apps). This Privacy Policy
          explains what information we collect through the website and the
          apps, how we use it, how we protect it, who we share it with and
          how you can exercise your privacy rights or delete your account.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          2. Account and Profile Information
        </h2>
        <p className="text-sm text-muted-foreground">
          When you create a Ride Bangla account, we collect your name, phone
          number, email address, profile photo and a unique account
          identifier (Firebase UID). If you sign in with Google or Facebook,
          we receive the basic profile information those providers share
          with us (name, email, profile photo).
        </p>

        <h2 className="mt-6 text-lg font-semibold">3. Location Information</h2>
        <p className="text-sm text-muted-foreground">
          The Customer App requests precise and approximate foreground
          location access — only while you are actively using the app, never
          in the background. Location is used to detect your pickup point,
          book rides, calculate fares and distance, find nearby restaurants,
          pharmacies and shops, set delivery addresses, and show live
          tracking of your ride, food, courier or marketplace order.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          4. Order and Transaction Information
        </h2>
        <p className="text-sm text-muted-foreground">
          When you place a ride, food, courier or marketplace order, we
          collect and store the order details: pickup and drop-off
          addresses, receiver name and phone number, items ordered, order
          value, order status, and your order history. This information is
          shared with the rider or partner assigned to your order so they
          can complete the delivery or trip.
        </p>

        <h2 className="mt-6 text-lg font-semibold">5. Payment Information</h2>
        <p className="text-sm text-muted-foreground">
          We record the payment method you choose, the amount, transaction
          reference and payment status (pending, paid, failed, refunded).
          Sensitive mobile financial services or card credentials (such as
          your bKash, Nagad, Rocket or card PIN/OTP) are entered directly
          with the relevant licensed payment provider and are never received
          or stored by Ride Bangla.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          6. Photos, Attachments and Prescription Images
        </h2>
        <p className="text-sm text-muted-foreground">
          You may upload a profile photo, or attach photos or videos to a
          support request using your device&apos;s standard photo/file
          picker. For medicine orders, you may upload a prescription image
          so a pharmacy partner can verify and dispense your order safely.
          Prescription images are sensitive health-related data: access is
          limited to verifying and fulfilling that specific order, and these
          images are retained only as long as needed for order verification,
          dispute resolution and legal recordkeeping, after which they are
          deleted or securely archived.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          7. Messages, Ratings and Support Communication
        </h2>
        <p className="text-sm text-muted-foreground">
          When a rider is assigned to your order, an in-app chat between you
          and the rider is enabled so you can coordinate the delivery or
          trip. We also collect support messages, ratings, feedback, and any
          reports you submit about another user (including blocked-user
          records), so we can review conduct issues and keep the platform
          safe.
        </p>
        <p className="text-sm text-muted-foreground">
          Support inside the app is handled by a rules-based automated
          assistant, not a generative AI model, and is labelled
          &quot;Automated Support&quot; accordingly.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          8. Notifications and Device Information
        </h2>
        <p className="text-sm text-muted-foreground">
          To send you order updates and account notifications, we store a
          push-notification token tied to your device. We also collect basic
          app and device diagnostics (device model, OS version, app version)
          and crash reports through Firebase Crashlytics, so we can find and
          fix bugs.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          9. Website Technical Information
        </h2>
        <p className="text-sm text-muted-foreground">
          When you visit our website, we may also collect basic technical
          information such as IP address, device type, browser type, pages
          visited, referring pages, approximate location, date and time of
          visit, cookies and similar usage data.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          10. How We Use Information
        </h2>
        <p className="text-sm text-muted-foreground">
          We use the information above to create and manage your account,
          process and dispatch your orders, calculate fares and delivery
          fees, process payments, enable customer–rider communication, send
          order and account notifications, respond to support requests,
          improve our services, prevent fraud and misuse, maintain security,
          and comply with applicable legal obligations.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          11. What We Share, and With Whom
        </h2>
        <p className="text-sm text-muted-foreground">
          Order-relevant details (your name, phone number, pickup/drop
          address and order contents) are shared with the rider or partner
          fulfilling that specific order. We do not sell your personal
          information. We share information with the service providers
          below only as needed to operate Ride Bangla, and with authorities
          where required by law.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          12. Third-Party Service Providers
        </h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla uses the following categories of third-party
          processors, limited to the purpose noted:
        </p>
        <ul className="text-sm text-muted-foreground">
          <li>
            <strong>Firebase / Google Cloud</strong> — account
            authentication, database, cloud functions, storage, push
            notifications and crash reporting.
          </li>
          <li>
            <strong>Expo Push Service</strong> — delivering order and account
            push notifications to your device.
          </li>
          <li>
            <strong>Google Maps and Mapbox</strong> — maps, address search,
            distance and route calculation.
          </li>
          <li>
            <strong>Google Sign-In and Facebook Sign-In</strong> — optional
            social login.
          </li>
          <li>
            <strong>Enabled payment providers</strong> (such as bKash, Nagad,
            Rocket, SSLCommerz or card gateways, whichever are actually
            active on the released app) — processing your chosen payment
            method.
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          We only list a provider here, and in the app&apos;s Play Console
          Data Safety declaration, once it is actually active in the
          released app. The Ride Bangla apps do not currently include an
          advertising SDK or collect an Advertising ID.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          13. Data Collection Summary
        </h2>
        <p className="text-sm text-muted-foreground">
          Account, order and payment-status information is required to use
          Ride Bangla&apos;s core services and cannot be turned off while you
          use them. Location access, notification permission, and photo/file
          uploads are requested only when needed for a specific feature
          (booking, tracking, chat attachments, prescription upload) and can
          be declined, though doing so may limit that specific feature.
        </p>

        <h2 className="mt-6 text-lg font-semibold">14. Cookies</h2>
        <p className="text-sm text-muted-foreground">
          Our website may use cookies and similar technologies to keep the
          website working, remember preferences, improve performance and
          measure website traffic. You can control or delete cookies through
          your browser settings.
        </p>

        <h2 className="mt-6 text-lg font-semibold">15. Analytics</h2>
        <p className="text-sm text-muted-foreground">
          We may use analytics tools, on the website and in the apps, to
          understand how visitors and users interact with our services.
          Analytics information helps us improve content, performance and
          user experience, and is used in aggregated form where possible.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          16. Data Storage, Security and International Processing
        </h2>
        <p className="text-sm text-muted-foreground">
          We take reasonable technical and organizational steps — including
          role-based access control and encrypted transport — to protect
          personal information from unauthorized access, misuse, loss or
          alteration. However, no internet-based service can be guaranteed
          to be completely secure. Some of our technology providers (for
          example Firebase/Google Cloud) may store or process data outside
          Bangladesh; when this happens, we use trusted providers and
          reasonable safeguards appropriate for the information involved.
        </p>

        <h2 className="mt-6 text-lg font-semibold">17. Data Retention</h2>
        <p className="text-sm text-muted-foreground">
          We keep personal and order information only as long as necessary
          for providing the service, support, dispute resolution, security,
          legal/tax compliance or service improvement. Prescription images
          and payment logs are retained only for the periods described in
          sections 6 and 5 above. When information is no longer needed, we
          delete, anonymize or securely archive it, subject to any longer
          retention required by law.
        </p>

        <h2 className="mt-6 text-lg font-semibold">18. Children&apos;s Privacy</h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla&apos;s apps are intended for adult users (18+) and are
          not directed at children. We do not knowingly collect personal
          information from children without appropriate consent. If you
          believe a child has submitted personal information to us, please
          contact us so we can review and delete it where appropriate.
        </p>

        <h2 className="mt-6 text-lg font-semibold">19. Your Rights</h2>
        <p className="text-sm text-muted-foreground">
          Subject to applicable law, you may request access, correction,
          deletion or restriction of your personal information, and you may
          withdraw consent where processing is based on consent.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          20. Account and Data Deletion
        </h2>
        <p className="text-sm text-muted-foreground">
          You can permanently delete your account and associated data
          directly inside the Customer App (Account → Delete Account), which
          removes your profile, orders, wallet, notifications, payment logs
          and uploaded files, and deletes your login record. You can also
          request deletion, without using the app, at{" "}
          <a
            className="text-brand-green hover:underline"
            href="https://ridebangla.bd/delete-account"
          >
            ridebangla.bd/delete-account
          </a>{" "}
          or by emailing{" "}
          <a
            className="text-brand-green hover:underline"
            href="mailto:support@ridebangla.bd"
          >
            support@ridebangla.bd
          </a>
          . We will review and complete deletion requests within a
          reasonable time, except for records we are legally required to
          keep.
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          21. Changes to This Policy
        </h2>
        <p className="text-sm text-muted-foreground">
          We may update this Privacy Policy from time to time, including
          when new features or data processors are added to the apps. The
          updated version will be posted on this page with a revised
          &quot;Last updated&quot; date.
        </p>

        <h2 className="mt-6 text-lg font-semibold">22. Contact</h2>
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
