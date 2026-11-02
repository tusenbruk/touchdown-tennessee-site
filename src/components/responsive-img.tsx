import type { ImgHTMLAttributes } from "react";

/**
 * Width variants generated next to each original (see scripts/make-webp.sh).
 * The JPEG stays as `src` because carts and orders persisted in visitors'
 * localStorage reference it, and as the fallback for anything without srcset.
 */
const VARIANTS: { prefix: string; widths: number[] }[] = [
  { prefix: "/products/", widths: [600, 900] },
  { prefix: "/heroes/", widths: [800, 1600] },
];

/** "/products/tee.jpg" -> "/products/tee-600.webp 600w, /products/tee-900.webp 900w" */
export function webpSrcSet(src: string) {
  const rule = VARIANTS.find((v) => src.startsWith(v.prefix) && src.endsWith(".jpg"));
  if (!rule) return undefined;
  const base = src.slice(0, -".jpg".length);
  return rule.widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ");
}

/**
 * <img> with a WebP srcset when variants exist. Callers must still pass
 * `sizes`, `width` and `height` so the browser picks the right file and
 * reserves space (no layout shift).
 */
export function ResponsiveImg({
  src,
  alt,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  return <img src={src} srcSet={webpSrcSet(src)} alt={alt} {...rest} />;
}
