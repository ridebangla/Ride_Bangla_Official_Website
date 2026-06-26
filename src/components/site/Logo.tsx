const logoSrc = "/assets/logo.png?v=20260626-transparent";

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
