import { cn } from "@/lib/cn";

export function PrimaryMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/primary-orange.png"
      alt="Touchdown Tennessee"
      className={cn("h-9 w-auto object-contain outline-none sm:h-11", className)}
    />
  );
}

export function TdtMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/tdt-mark.png"
      alt="Touchdown Tennessee"
      className={cn("h-9 w-auto object-contain outline-none sm:h-11", className)}
    />
  );
}

export function BrandStamp({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return <img src={src} alt={alt} className={cn("w-auto object-contain outline-none", className)} />;
}
