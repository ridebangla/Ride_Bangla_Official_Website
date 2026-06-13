import logo from "@/assets/ride-bangla-logo.png.asset.json";

export function Logo({ className = "h-10 w-auto", alt = "Ride Bangla" }: { className?: string; alt?: string }) {
  return <img src={logo.url} alt={alt} className={className} loading="eager" />;
}

export const logoUrl = logo.url;