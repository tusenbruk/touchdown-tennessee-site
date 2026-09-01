import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { cartTotals, useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/format";
import { saveOrder } from "@/lib/orders";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const items = useCart((s) => s.items);
  const code = useCart((s) => s.code);
  const clear = useCart((s) => s.clear);
  const totals = cartTotals(items, code);
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-4xl">Nothing to check out</h1>
        <Link to="/shop" className={cn(buttonVariants({ variant: "ink" }), "mt-6 inline-flex")}>
          Shop
        </Link>
      </div>
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const id = `TDT-${Date.now().toString(36).toUpperCase()}`;
    saveOrder({
      id,
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      address: String(fd.get("address") || ""),
      city: String(fd.get("city") || ""),
      state: String(fd.get("state") || "TN"),
      zip: String(fd.get("zip") || ""),
      items: items.map((i) => ({
        name: i.name,
        qty: i.qty,
        price: i.price,
        size: i.size,
        color: i.color,
        image: i.image,
        printfulVariantId: i.printfulVariantId,
      })),
      total: totals.total,
      createdAt: new Date().toISOString(),
    });
    clear();
    void navigate({ to: "/order/$id", params: { id } });
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_20rem]">
      <form onSubmit={onSubmit} className="space-y-4">
        <h1 className="text-4xl">Checkout</h1>
        <p className="text-sm text-muted">
          Preview catalog — this places a local order so you can walk the flow. No card is charged.
        </p>
        <label className="block text-xs font-medium text-muted">
          Name
          <Input name="name" required className="mt-1" autoComplete="name" />
        </label>
        <label className="block text-xs font-medium text-muted">
          Email
          <Input name="email" type="email" required className="mt-1" autoComplete="email" />
        </label>
        <label className="block text-xs font-medium text-muted">
          Address
          <Input name="address" required className="mt-1" autoComplete="street-address" />
        </label>
        <div className="grid grid-cols-6 gap-3">
          <label className="col-span-3 block text-xs font-medium text-muted">
            City
            <Input name="city" required className="mt-1" autoComplete="address-level2" />
          </label>
          <label className="col-span-1 block text-xs font-medium text-muted">
            State
            <Input name="state" defaultValue="TN" required className="mt-1" autoComplete="address-level1" />
          </label>
          <label className="col-span-2 block text-xs font-medium text-muted">
            ZIP
            <Input name="zip" required className="mt-1" autoComplete="postal-code" />
          </label>
        </div>
        <Button type="submit" variant="ink" size="lg" className="mt-4 w-full" disabled={busy}>
          Place order · {formatMoney(totals.total)}
        </Button>
      </form>
      <aside className="h-fit bg-bone p-5">
        <p className="font-display text-sm uppercase tracking-[0.16em]">In the truck</p>
        <ul className="mt-4 space-y-3">
          {items.map((i) => (
            <li key={i.key} className="flex gap-3 text-sm">
              <img src={i.image} alt="" className="size-14 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display uppercase">{i.name}</p>
                <p className="text-xs text-muted">
                  {i.qty} × {formatMoney(i.price)}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-ink/10 pt-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span className="tabular-nums">{formatMoney(totals.subtotal)}</span>
          </div>
          {totals.discount > 0 ? (
            <div className="flex justify-between">
              <span className="text-muted">WELCOME10</span>
              <span className="tabular-nums">−{formatMoney(totals.discount)}</span>
            </div>
          ) : null}
          <div className="flex justify-between">
            <span className="text-muted">Shipping</span>
            <span className="tabular-nums">
              {totals.shipping === 0 ? "Free" : formatMoney(totals.shipping)}
            </span>
          </div>
          <div className="mt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatMoney(totals.total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
