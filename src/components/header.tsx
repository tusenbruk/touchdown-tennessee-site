import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cartCount, useCart } from "@/lib/cart";
import { PrimaryMark } from "@/components/brand-mark";
import { CartDrawer } from "@/components/cart-drawer";

export function Header() {
  const items = useCart((s) => s.items);
  const count = cartCount(items);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setCartOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="bg-ink text-cream">
        <p className="hidden py-2 text-center font-display text-[11px] uppercase tracking-[0.22em] sm:block">
          Furman · Saturday 3:30 ET · Independent on purpose
        </p>
        <p className="py-2 text-center font-display text-[11px] uppercase tracking-[0.18em] sm:hidden">
          Furman · Saturday 3:30 ET
        </p>
      </div>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6">
          <button
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          <Link to="/" className="flex items-center text-ink" aria-label="Touchdown Tennessee home">
            <PrimaryMark />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <NavLinks />
          </nav>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative grid size-11 place-items-center"
            aria-label={`Cart, ${count} items`}
          >
            <ShoppingBag className="size-5" />
            {count > 0 ? (
              <span className="absolute top-1.5 right-1.5 grid min-w-4 place-items-center bg-brand px-1 font-display text-[10px] text-ink">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <div className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}>
        <button
          type="button"
          aria-label="Close menu"
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-200 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={`absolute top-0 left-0 flex h-full w-72 flex-col bg-paper p-6 transition-transform duration-200 ease-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-8 flex items-center justify-between">
            <PrimaryMark />
            <button
              type="button"
              className="grid size-11 place-items-center"
              onClick={() => setMenuOpen(false)}
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="flex flex-col" onClick={() => setMenuOpen(false)}>
            <MobileLinks />
          </div>
        </nav>
      </div>
    </>
  );
}

const linkClass =
  "font-display text-sm uppercase tracking-[0.16em] text-ink/80 transition-colors hover:text-ink";
const mobileClass =
  "border-b border-ink/10 py-4 font-display text-2xl uppercase tracking-[0.08em]";

function NavLinks() {
  return (
    <>
      <Link to="/shop" className={linkClass}>
        Shop
      </Link>
      <Link to="/saturday" className={linkClass}>
        Saturday
      </Link>
      <Link to="/collection/$slug" params={{ slug: "classics" }} className={linkClass}>
        Classics
      </Link>
      <Link to="/independent" className={linkClass}>
        Independent
      </Link>
    </>
  );
}

function MobileLinks() {
  return (
    <>
      <Link to="/shop" className={mobileClass}>
        Shop
      </Link>
      <Link to="/saturday" className={mobileClass}>
        Saturday
      </Link>
      <Link to="/saturday/wire" className={mobileClass}>
        The Wire
      </Link>
      <Link to="/saturday/six" className={mobileClass}>
        Give Him 6
      </Link>
      <Link to="/collection/$slug" params={{ slug: "classics" }} className={mobileClass}>
        Classics
      </Link>
      <Link to="/independent" className={mobileClass}>
        Independent
      </Link>
    </>
  );
}
