const logoSrc = "/assets/logo.webp?v=20260911-optimized";

export function Logo({
  className = "h-10 w-auto",
  alt = "Ride Bangla",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src={logoSrc}
      alt={alt}
      className={className}
      loading="eager"
      style={{ backgroundColor: "transparent" }}
    />
  );
}

export const logoUrl = logoSrc;
