import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button-variants";
import { PageHeader } from "@/components/page-header";
import { products } from "@/lib/catalog";
import { numberWord } from "@/lib/format";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/drops")({ component: DropsPage });

function DropsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        kicker="The shop"
        title="Limited runs"
        lede={`${numberWord(products.length)} pieces from the Printful press. Classics first — tee, signature tee, hoodie, hat, case — then 1794: Rifleman, Blount College, Crockett.`}
      />
      <Link to="/shop" className={cn(buttonVariants({ variant: "ink" }), "mt-10 inline-flex")}>
        Shop
      </Link>
    </div>
  );
}
