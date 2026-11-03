import type { ImgHTMLAttributes, Ref } from "react";
import { webpSrcSet } from "@/lib/image";

/**
 * <img> with a WebP srcset when variants exist. Callers must still pass
 * `sizes`, `width` and `height` so the browser picks the right file and
 * reserves space (no layout shift).
 */
export function ResponsiveImg({
  src,
  alt,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  ref?: Ref<HTMLImageElement>;
}) {
  return <img src={src} srcSet={webpSrcSet(src)} alt={alt} {...rest} />;
}
