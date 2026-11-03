import { cva } from "class-variance-authority";

/**
 * Button styles, kept apart from the component so both `<Button>` and router
 * `<Link>`s can use them (and so Fast Refresh keeps working on button.tsx).
 * Focus rings come from the global :focus-visible rule in styles.css.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display uppercase tracking-[0.14em] text-sm transition-[transform,background-color,color,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-brand text-ink hover:bg-brand-dark",
        ink: "bg-ink text-cream hover:bg-brand hover:text-ink",
        outline:
          "bg-transparent text-ink shadow-[inset_0_0_0_1px_rgba(22,18,14,0.35)] hover:bg-ink hover:text-cream",
        ghost: "bg-transparent text-ink hover:bg-ink/6",
        cream: "bg-cream text-ink hover:bg-brand",
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
