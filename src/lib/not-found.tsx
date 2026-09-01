import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-5xl">That page left quietly</h1>
      <p className="mt-3 text-muted">Nothing at this URL. The shop is still open.</p>
      <Link to="/shop" className={cn(buttonVariants({ variant: "ink" }), "mt-8 inline-flex")}>
        Shop
      </Link>
    </div>
  );
}
