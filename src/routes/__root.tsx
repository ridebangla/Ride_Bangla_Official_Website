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
import { LanguageProvider } from "../context/LanguageContext";
import { PageTranslator } from "../components/site/PageTranslator";

const siteUrl = "https://ridebangla.bd";
const logoUrl = `${siteUrl}/assets/logo.png`;
const faviconUrl = "/assets/favicon.png";
const appleTouchIconUrl = "/assets/icon-192.png";
const icon192Url = "/assets/icon-192.png";
const ogImageUrl = `${siteUrl}/assets/og-image.png`;

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
          "Ride Bangla is a Bangladesh-wide multi-service technology ecosystem — ride sharing, food delivery, courier delivery, homemade food, restaurant food, grocery, medicine, marketplace and professional digital services (app, website, graphic design, SEO, email and social media marketing) — with its head office in Faridpur, serving all 64 districts of Bangladesh.",
      },
      { name: "author", content: "Ride Bangla" },
      {
        property: "og:title",
        content: "Ride Bangla — Ride. Food. Delivery. Courier.",
      },
      {
        property: "og:description",
        content:
          "Ride sharing, food delivery, courier delivery, homemade food, restaurant food, grocery, medicine, marketplace and Ride Bangla Studio digital services — serving all 64 districts of Bangladesh.",
      },
      { property: "og:site_name", content: "Ride Bangla" },
      { property: "og:url", content: siteUrl },
      { name: "twitter:site", content: "@ridebangla" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Ride Bangla — Ride sharing, food, courier, marketplace and digital services",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Ride Bangla — Ride. Food. Delivery. Courier.",
      },
      {
        name: "twitter:description",
        content:
          "Ride sharing, food delivery, courier delivery, homemade food, restaurant food, grocery, medicine, marketplace and Ride Bangla Studio digital services — serving all 64 districts of Bangladesh.",
      },
      { name: "twitter:image", content: ogImageUrl },
      { name: "theme-color", content: "#16a34a" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Ride Bangla" },
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
      { rel: "canonical", href: siteUrl },
    ],
    scripts: [
      ...(import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT
        ? [{
            async: true,
            crossOrigin: "anonymous" as const,
            src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT}`,
          }]
        : []),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ride Bangla",
          url: siteUrl,
          logo: logoUrl,
          description:
            "Ride Bangla is a Bangladesh-wide multi-service technology ecosystem for ride sharing, food delivery, courier delivery, homemade food, restaurant food, grocery, medicine, marketplace and professional digital services (app, website, graphic design, SEO, email and social media marketing), headquartered in Faridpur and serving all 64 districts of Bangladesh.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Faridpur",
            addressCountry: "BD",
          },
          areaServed: {
            "@type": "Country",
            name: "Bangladesh",
          },
          knowsAbout: [
            "Ride Sharing",
            "Food Delivery",
            "Courier Delivery",
            "Homemade Food",
            "Restaurant Food",
            "Grocery Delivery",
            "Medicine Delivery",
            "Marketplace",
            "App Development",
            "Website Development",
            "Graphic Design",
            "SEO",
            "Email Marketing",
            "Social Media Marketing",
          ],
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
      <LanguageProvider>
        <PageTranslator />
        <Outlet />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
