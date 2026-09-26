import { useState } from "react";

const APP_LOGO_PATHS = {
  customer: "/assets/apps/customer.png",
  partner: "/assets/apps/partner.png",
  rider: "/assets/apps/rider.png",
  admin: "/assets/apps/admin-console.png",
  agent: "/assets/apps/agent.png",
  pay: "/assets/apps/pay.png",
} as const;

export type AppLogoKey = keyof typeof APP_LOGO_PATHS;

function resolveAppLogoKey(appName: string): AppLogoKey | null {
  const normalized = appName.trim().toLowerCase();

  if (normalized.includes("partner")) return "partner";
  if (normalized.includes("rider")) return "rider";
  if (normalized.includes("admin")) return "admin";
  if (normalized.includes("agent")) return "agent";
  if (normalized.includes("pay") || normalized.includes("wallet")) return "pay";
  if (normalized.includes("customer") || normalized === "ride bangla") return "customer";
  return null;
}

export function AppLogo({
  app,
  alt,
  className = "h-full w-full object-contain",
}: {
  app: AppLogoKey | string;
  alt: string;
  className?: string;
}) {
  const [failedPath, setFailedPath] = useState<string | null>(null);
  const key = app in APP_LOGO_PATHS ? (app as AppLogoKey) : resolveAppLogoKey(app);
  if (!key) return null;

  const src = APP_LOGO_PATHS[key];

  // A missing asset intentionally renders an empty logo slot. Do not replace it
  // with initials, a generic icon, placeholder artwork, or fabricated branding.
  if (failedPath === src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailedPath(src)}
    />
  );
}

export { APP_LOGO_PATHS, resolveAppLogoKey };
