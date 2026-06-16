export function Logo({
  className = "h-10 w-auto",
  alt = "Ride Bangla",
}: {
  className?: string;
  alt?: string;
}) {
  return <img src="/assets/logo.png" alt={alt} className={className} loading="eager" />;
}

export const logoUrl = "/assets/logo.png";
