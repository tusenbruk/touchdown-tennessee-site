import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { ResponsiveImg } from "@/components/responsive-img";
import { cn } from "@/lib/cn";

/**
 * A product image with real loading and error states.
 *
 * - Loading: a shimmer sits *behind* the image (class `img-skeleton`). The
 *   image is never hidden, so nothing breaks if JavaScript fails; once loaded
 *   the shimmer stops.
 * - Error: if the file 404s or is blocked, show a labelled placeholder instead
 *   of a broken-image icon.
 * - Images already cached or loaded before hydration never fire `onLoad`, so
 *   the effect checks `complete` on mount.
 */
export function FramedImage({
  src,
  alt,
  className,
  frameClassName,
  ...rest
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  src: string;
  alt: string;
  /** Classes for the wrapper (aspect ratio, background). */
  frameClassName?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    setState("loading");
    const img = ref.current;
    if (img?.complete) setState(img.naturalWidth > 0 ? "loaded" : "error");
  }, [src]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-bone",
        state === "loading" && "img-skeleton",
        frameClassName,
      )}
    >
      {state === "error" ? (
        <div
          role="img"
          aria-label={`${alt} (image unavailable)`}
          className="absolute inset-0 grid place-items-center p-4 text-center font-display text-xs uppercase tracking-[0.18em] text-muted"
        >
          Image unavailable
        </div>
      ) : (
        <ResponsiveImg
          ref={ref}
          src={src}
          alt={alt}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          className={className}
          {...rest}
        />
      )}
    </div>
  );
}
