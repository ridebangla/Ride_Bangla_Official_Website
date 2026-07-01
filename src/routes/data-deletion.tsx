import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";

const supportEmail = "support@ridebangla.bd";

export const Route = createFileRoute("/data-deletion")({
  head: () => ({
    meta: [
      { title: "Data Deletion Instructions — Ride Bangla" },
      {
        name: "description",
        content:
          "Instructions for Ride Bangla users to request deletion of personal data connected with Facebook Login or Ride Bangla account services.",
      },
    ],
    links: [{ rel: "canonical", href: "/data-deletion" }],
  }),
  component: DataDeletionPage,
});

function DataDeletionPage() {
  return (
    <SiteLayout>
      <PageHeader
        title="Data Deletion Instructions"
        subtitle="How to request deletion of your Ride Bangla account data"
      />

      <article className="prose prose-sm mx-auto max-w-3xl px-4 py-10 text-foreground">
        <h2 className="mt-0 text-lg font-semibold">Overview</h2>
        <p className="text-sm text-muted-foreground">
          If you have used Facebook Login or any Ride Bangla account service and
          would like to delete your personal data associated with your account,
          please follow the instructions below.
        </p>

        <div className="not-prose my-6 rounded-3xl border border-brand-green/20 bg-brand-green-soft p-5 shadow-sm">
          <h2 className="text-base font-extrabold text-brand-green">
            How to delete your data
          </h2>

          <div className="mt-4 space-y-4">
            <StepItem number="1">
              Open the <strong>Ride Bangla</strong> app on your device.
            </StepItem>

            <StepItem number="2">
              Go to <strong>Account → Settings → Delete Account</strong>.
            </StepItem>

            <StepItem number="3">
              Tap <strong>Delete My Account</strong> and confirm. Your personal
              profile information and account-related data will be reviewed and
              removed within <strong>30 days</strong>, subject to legal, security
              and transaction record requirements.
            </StepItem>

            <StepItem number="4">
              You may also revoke Ride Bangla&apos;s access from your Facebook
              account: <strong>Facebook → Settings → Apps and Websites → Ride Bangla → Remove</strong>.
            </StepItem>
          </div>
        </div>

        <h2 className="mt-6 text-lg font-semibold">Manual Data Deletion Request</h2>
        <p className="text-sm text-muted-foreground">
          If you cannot access the app or need help deleting your data, email us
          from the email address connected to your Ride Bangla account. Please
          include your name, phone number if available, and the login method you
          used.
        </p>

        <div className="not-prose my-5 rounded-3xl border border-orange-200 bg-orange-50 p-5">
          <h3 className="text-sm font-extrabold text-orange-700">Need help?</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Contact Ride Bangla Support at{" "}
            <a
              className="font-bold text-brand-green hover:underline"
              href={`mailto:${supportEmail}`}
            >
              {supportEmail}
            </a>
            .
          </p>
        </div>

        <h2 className="mt-6 text-lg font-semibold">Processing Time</h2>
        <p className="text-sm text-muted-foreground">
          Ride Bangla processes data deletion requests within 30 days after
          verification. Some records may be retained only where required for
          security, fraud prevention, dispute resolution, accounting, legal
          compliance, or completed transaction records.
        </p>

        <h2 className="mt-6 text-lg font-semibold">Privacy Policy</h2>
        <p className="text-sm text-muted-foreground">
          For more information about how Ride Bangla collects, uses and protects
          personal information, please read our{" "}
          <a className="text-brand-green hover:underline" href="/privacy-policy">
            Privacy Policy
          </a>
          .
        </p>
      </article>
    </SiteLayout>
  );
}

function StepItem({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-extrabold text-white">
        {number}
      </span>
      <p className="pt-1 text-sm leading-6 text-foreground">{children}</p>
    </div>
  );
}
