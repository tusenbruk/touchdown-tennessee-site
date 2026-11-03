import { cn } from "@/lib/cn";

// Archived from src/components/brand-mark.tsx. Byte-for-byte the same output as
// PrimaryMark; nothing imported it.
const MARK_W = 360;
const MARK_H = 243;

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
