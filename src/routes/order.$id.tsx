import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getOrder, type PlacedOrder } from "@/lib/orders";
import { formatMoney } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/order/$id")({ component: OrderPage });

function OrderPage() {
  const { id } = Route.useParams();
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(getOrder(id) ?? null);
    setReady(true);
  }, [id]);

  if (!ready) {
    return <div className="mx-auto max-w-lg px-4 py-20 text-sm text-muted">Loading order…</div>;
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-4xl">No order with that number</h1>
        <Link to="/shop" className={cn(buttonVariants({ variant: "ink" }), "mt-6 inline-flex")}>
          Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-14 sm:px-6">
      <p className="font-display text-xs tracking-[0.22em] text-brand">Order {order.id}</p>
      <h1 className="mt-2 text-4xl">It is in the truck</h1>
      <p className="mt-3 text-muted">
        Preview confirmation for {order.name}. Nothing was charged. This is how the live shop should
        feel after checkout. Questions:{" "}
        <a href="mailto:touchdowntennessee@gmail.com" className="text-ink underline">
          touchdowntennessee@gmail.com
        </a>
      </p>
      <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {order.items.map((item, i) => (
          <li key={i} className="flex items-center gap-3 py-3 text-sm">
            <img src={item.image} alt="" className="size-14 object-cover" />
            <div className="flex-1">
              <p className="font-display uppercase">{item.name}</p>
              <p className="text-xs text-muted">
                {item.qty} × {formatMoney(item.price)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-right text-lg tabular-nums">{formatMoney(order.total)}</p>
      <Link to="/" className={cn(buttonVariants({ variant: "ink" }), "mt-8 inline-flex")}>
        Back home
      </Link>
    </div>
  );
}
