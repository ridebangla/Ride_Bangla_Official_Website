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
import logo from "../assets/ride-bangla-logo.png.asset.json";
import favicon32 from "../assets/favicon-32.png.asset.json";
import favicon16 from "../assets/favicon-16.png.asset.json";
import appleTouchIcon from "../assets/apple-touch-icon.png.asset.json";
import icon192 from "../assets/icon-192.png.asset.json";
import ogImage from "../assets/og-image.jpg.asset.json";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
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
          Something went wrong on our end. You can try refreshing or head back home.
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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ride Bangla — Ride. Food. Delivery. Courier." },
      { name: "description", content: "Ride Bangla is a Bangladesh-based technology company building a trusted ecosystem for food delivery, courier, and digital services." },
      { name: "author", content: "Ride Bangla" },
      { property: "og:title", content: "Ride Bangla — Ride. Food. Delivery. Courier." },
      { property: "og:description", content: "Food delivery, courier and future digital services for Bangladesh. Founded in Faridpur." },
      { property: "og:site_name", content: "Ride Bangla" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage.url },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Ride Bangla — Food delivery, courier and digital services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ride Bangla — Ride. Food. Delivery. Courier." },
      { name: "twitter:description", content: "Food delivery, courier and future digital services for Bangladesh. Founded in Faridpur." },
      { name: "twitter:image", content: ogImage.url },
      { name: "theme-color", content: "#16a34a" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Ride Bangla" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", sizes: "32x32", href: favicon32.url },
      { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16.url },
      { rel: "apple-touch-icon", sizes: "180x180", href: appleTouchIcon.url },
      { rel: "icon", type: "image/png", sizes: "192x192", href: icon192.url },
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
          logo: logo.url,
          address: { "@type": "PostalAddress", addressLocality: "Faridpur", addressCountry: "BD" },
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
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
