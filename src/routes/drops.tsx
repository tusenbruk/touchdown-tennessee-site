import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/drops")({ component: DropsPage });

function DropsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <p className="font-display text-xs tracking-[0.22em] text-brand">The shop</p>
      <h1 className="mt-2 text-5xl">Limited Runs</h1>
      <p className="mt-4 text-muted">
        Eight pieces from the Printful press. Classics first — tee, signature tee, hoodie, hat,
        case — then 1794: Rifleman, Blount College, Crockett.
      </p>
      <Link to="/shop" className={cn(buttonVariants({ variant: "ink" }), "mt-10 inline-flex")}>
        Shop
      </Link>
    </div>
  );
}
