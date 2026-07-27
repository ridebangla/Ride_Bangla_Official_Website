import { useEffect, useState, type ImgHTMLAttributes } from "react";

type SafeMediaImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

/**
 * Hides remote media cleanly when a valid HTTPS URL later becomes unavailable.
 * This prevents broken-image browser artwork from appearing on the production site.
 */
export function SafeMediaImage({ src, alt, onError, ...props }: SafeMediaImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) return null;

  return (
    <img
      {...props}
      src={src}
      alt={alt ?? ""}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}
