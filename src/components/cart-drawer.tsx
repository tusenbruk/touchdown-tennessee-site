import { useEffect, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { cartCount, cartTotals, useCart } from "@/lib/cart";
import { SHIP_FREE_AT } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useCart((s) => s.items);
  const code = useCart((s) => s.code);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const totals = cartTotals(items, code);
  const count = cartCount(items);
  const toFree = Math.max(0, SHIP_FREE_AT - (totals.subtotal - totals.discount));
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-paper text-ink shadow-border transition-transform duration-200 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Cart"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="text-xl">Cart {count ? `(${count})` : ""}</h2>
          <button type="button" onClick={onClose} className="grid size-11 place-items-center" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-display text-2xl uppercase">Empty truck</p>
            <p className="text-sm text-muted">The opener is this week. Put something in it.</p>
            <Link to="/shop" onClick={onClose} className={buttonVariants({ variant: "ink" })}>
              Shop all
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-ink/10 px-5 py-3">
              <div className="h-1.5 overflow-hidden bg-bone">
                <div
                  className="h-full bg-brand transition-[width] duration-200"
                  style={{ width: `${Math.min(100, ((SHIP_FREE_AT - toFree) / SHIP_FREE_AT) * 100)}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted">
                {toFree === 0
                  ? "Free US shipping unlocked."
                  : `${formatMoney(toFree)} from free US shipping.`}
              </p>
            </div>
            <ul className="flex-1 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3 border-b border-ink/10 py-4">
                  <img src={item.image} alt="" className="size-20 shrink-0 object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="font-display text-sm uppercase tracking-wide">{item.name}</p>
                      <p className="tabular-nums text-sm">{formatMoney(item.price * item.qty)}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      {[item.color, item.size].filter(Boolean).join(" · ") || "One size"}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="grid size-11 place-items-center shadow-[inset_0_0_0_1px_rgba(22,18,14,0.15)]"
                        onClick={() => setQty(item.key, item.qty - 1)}
                        aria-label="Decrease"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-6 text-center tabular-nums text-sm">{item.qty}</span>
                      <button
                        type="button"
                        className="grid size-11 place-items-center shadow-[inset_0_0_0_1px_rgba(22,18,14,0.15)]"
                        onClick={() => setQty(item.key, item.qty + 1)}
                        aria-label="Increase"
                      >
                        <Plus className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        className="ml-auto min-h-11 text-xs text-muted underline"
                        onClick={() => remove(item.key)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Promo />
            <div className="border-t border-ink/10 px-5 py-4">
              <Row label="Subtotal" value={formatMoney(totals.subtotal)} />
              {totals.discount > 0 ? (
                <Row label="WELCOME10" value={`−${formatMoney(totals.discount)}`} />
              ) : null}
              <Row label="Shipping" value={totals.shipping === 0 ? "Free" : formatMoney(totals.shipping)} />
              <Row label="Total" value={formatMoney(totals.total)} strong />
              <Link
                to="/checkout"
                onClick={onClose}
                className={cn(buttonVariants({ variant: "ink", size: "lg" }), "mt-4 w-full")}
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between py-1 text-sm ${strong ? "font-semibold" : ""}`}>
      <span className={strong ? "text-ink" : "text-muted"}>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

function Promo() {
  const code = useCart((s) => s.code);
  const applyCode = useCart((s) => s.applyCode);
  const clearCode = useCart((s) => s.clearCode);

  if (code) {
    return (
      <div className="flex items-center justify-between px-5 py-2 text-xs">
        <span>Code {code} on</span>
        <button type="button" className="underline" onClick={clearCode}>
          Remove
        </button>
      </div>
    );
  }

  return (
    <form
      className="flex gap-2 px-5 pb-2"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        applyCode(String(fd.get("code") || ""));
      }}
    >
      <input
        name="code"
        placeholder="WELCOME10"
        className="h-11 flex-1 bg-cream px-3 text-xs uppercase tracking-wide outline-none shadow-[inset_0_0_0_1px_rgba(22,18,14,0.14)]"
        aria-label="Promo code"
      />
      <Button type="submit" variant="outline" size="sm" className="h-11">
        Apply
      </Button>
    </form>
  );
}
