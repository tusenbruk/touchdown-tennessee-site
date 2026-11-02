import { cn } from "@/lib/cn";

// The house marks are 360x243 SVGs; declaring the intrinsic size lets the
// browser reserve space before the file arrives (no layout shift).
const MARK_W = 360;
const MARK_H = 243;

export function PrimaryMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/house-mark-ink.svg"
      alt="Touchdown Tennessee"
      width={MARK_W}
      height={MARK_H}
      className={cn("h-9 w-auto object-contain outline-none sm:h-11", className)}
    />
  );
}

export function TdtMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/house-mark-ink.svg"
      alt="Touchdown Tennessee"
      width={MARK_W}
      height={MARK_H}
      className={cn("h-9 w-auto object-contain outline-none sm:h-11", className)}
    />
  );
}

export function BrandStamp({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  /** Above-the-fold marks load eagerly; everything else is lazy. */
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("w-auto object-contain outline-none", className)}
    />
  );
}
