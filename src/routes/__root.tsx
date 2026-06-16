import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const logoUrl = "/assets/logo.png";
const faviconUrl = "/assets/favicon.png";
const appleTouchIconUrl = "/assets/favicon.png";
const icon192Url = "/assets/favicon.png";
const ogImageUrl = "/assets/og-image.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ride Bangla — Ride. Food. Delivery. Courier." },
      {
        name: "description",
        content:
          "Ride Bangla is a Bangladesh-based technology company building a trusted ecosystem for food delivery, courier, and digital services.",
      },
      { name: "author", content: "Ride Bangla" },
      {
        property: "og:title",
        content: "Ride Bangla — Ride. Food. Delivery. Courier.",
      },
      {
        property: "og:description",
        content:
          "Food delivery, courier and future digital services for Bangladesh. Founded in Faridpur.",
      },
      { property: "og:site_name", content: "Ride Bangla" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Ride Bangla — Food delivery, courier and digital services",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Ride Bangla — Ride. Food. Delivery. Courier.",
      },
      {
        name: "twitter:description",
        content:
          "Food delivery, courier and future digital services for Bangladesh. Founded in Faridpur.",
      },
      { name: "twitter:image", content: ogImageUrl },
      { name: "theme-color", content: "#16a34a" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Ride Bangla" },
      { property: "og:title", content: "Ride Bangla — Ride. Food. Delivery. Courier." },
      { name: "twitter:title", content: "Ride Bangla — Ride. Food. Delivery. Courier." },
      { name: "description", content: "Ride Bangla's official corporate website showcases its digital ecosystem for food delivery, courier services, and future digital solutions." },
      { property: "og:description", content: "Ride Bangla's official corporate website showcases its digital ecosystem for food delivery, courier services, and future digital solutions." },
      { name: "twitter:description", content: "Ride Bangla's official corporate website showcases its digital ecosystem for food delivery, courier services, and future digital solutions." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/UjMiqyOujLMBOrHswCxjXUWgDxI3/social-images/social-1781587152060-1000099104.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/UjMiqyOujLMBOrHswCxjXUWgDxI3/social-images/social-1781587152060-1000099104.webp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: faviconUrl,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: faviconUrl,
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: appleTouchIconUrl,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: icon192Url,
      },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ride Bangla",
          url: "/",
          logo: logoUrl,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Faridpur",
            addressCountry: "BD",
          },
          sameAs: [
            "https://facebook.com/ridebangla",
            "https://www.instagram.com/ride.bangla_",
            "https://www.youtube.com/@ridebangla-0",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
