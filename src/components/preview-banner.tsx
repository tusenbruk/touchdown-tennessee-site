import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Makes it unmistakable that checkout is a walkthrough: no payment is taken
 * and nothing is sent to the print partner. Shown wherever a visitor is about
 * to "buy" (cart, checkout) or has just "bought" (order confirmation).
 */
export function PreviewBanner({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      role="note"
      aria-label="Preview only"
      className={cn(
        "border-l-4 border-brand bg-ink text-cream",
        compact ? "px-3 py-2" : "p-4",
        className,
      )}
    >
      <p className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-brand">
        <Info className="size-4 shrink-0" aria-hidden="true" />
        Preview only
      </p>
      <p className={cn("mt-1 text-cream/85", compact ? "text-xs" : "text-sm")}>
        {compact
          ? "No payment is taken and no order is placed."
          : "This checkout is a walkthrough of the shop. No payment is taken, no order is placed and nothing will be shipped. Real ordering opens when the shop goes live."}
      </p>
    </div>
  );
}
