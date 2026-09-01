import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display uppercase tracking-[0.14em] text-sm transition-[transform,background-color,color,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  {
    variants: {
      variant: {
        primary: "bg-brand text-ink hover:bg-brand-dark",
        ink: "bg-ink text-cream hover:bg-ink/90",
        outline:
          "bg-transparent text-ink shadow-[inset_0_0_0_1px_rgba(22,18,14,0.22)] hover:bg-ink hover:text-cream",
        ghost: "bg-transparent text-ink hover:bg-ink/6",
        cream: "bg-cream text-ink hover:bg-paper",
      },
      size: {
        md: "h-11 px-5",
        lg: "h-12 px-6",
        sm: "h-9 px-3 text-xs",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: Props) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
