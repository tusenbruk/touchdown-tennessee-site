import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      suppressHydrationWarning
      className={cn(
        "h-11 w-full bg-cream px-3 text-sm text-ink placeholder:text-muted shadow-[inset_0_0_0_1px_rgba(22,18,14,0.14)]",
        "outline-none focus:shadow-[inset_0_0_0_1.5px_#E85D04]",
        className,
      )}
      {...props}
    />
  );
}
