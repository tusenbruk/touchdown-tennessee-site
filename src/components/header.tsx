import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cartCount, useCart } from "@/lib/cart";
import { PrimaryMark } from "@/components/brand-mark";
import { CartDrawer } from "@/components/cart-drawer";
import { primaryNav, type NavItem } from "@/components/nav-links";
import { cn } from "@/lib/cn";

export function Header() {
  const items = useCart((s) => s.items);
  const count = cartCount(items);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);

  // Close any open overlay when the route changes.
  useEffect(() => {
    setCartOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // Mobile menu: Escape closes it, focus moves in on open and back to the
  // trigger on close, and the page behind cannot scroll.
  useEffect(() => {
    if (!menuOpen) return;
    const trigger = menuButtonRef.current;
    menuCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <div className="bg-brand text-ink">
        <p className="py-2 text-center font-display text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em]">
          Saturday · Knoxville · Noon
        </p>
      </div>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>

          <Link to="/" className="flex items-center text-ink" aria-label="Touchdown Tennessee home">
            <PrimaryMark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {primaryNav.map((item) => (
              <NavAnchor key={item.label} item={item} className={desktopLink} />
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative grid size-11 place-items-center"
            aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
            aria-haspopup="dialog"
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {count > 0 ? (
              <span
                aria-hidden="true"
                className="absolute top-1.5 right-1.5 grid min-w-4 place-items-center bg-brand px-1 font-display text-[10px] text-ink"
              >
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* `inert` removes the closed drawer from the tab order and the a11y tree. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
        className={cn("fixed inset-0 z-50 lg:hidden", menuOpen ? "" : "pointer-events-none")}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          className={cn(
            "absolute inset-0 bg-ink/40 transition-opacity duration-200",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          aria-label="Mobile"
          className={cn(
            "absolute top-0 left-0 flex h-full w-[min(20rem,85vw)] flex-col bg-paper p-6 transition-transform duration-200 ease-out",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <PrimaryMark />
            <button
              ref={menuCloseRef}
              type="button"
              className="grid size-11 place-items-center"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-col">
            {primaryNav.map((item) => (
              <NavAnchor key={item.label} item={item} className={mobileLink} />
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}

const desktopLink =
  "border-b-2 border-transparent py-1 font-display text-sm uppercase tracking-[0.16em] text-ink/80 transition-colors hover:text-ink";
const mobileLink = "border-b border-ink/10 py-4 font-display text-2xl uppercase tracking-[0.08em]";

/** Renders one NavItem as a router Link with an orange underline when active. */
export function NavAnchor({ item, className }: { item: NavItem; className?: string }) {
  const active = { className: "!border-brand !text-ink" };
  if (item.to === "/collection/$slug") {
    return (
      <Link to={item.to} params={item.params} className={className} activeProps={active}>
        {item.label}
      </Link>
    );
  }
  return (
    <Link to={item.to} className={className} activeProps={active}>
      {item.label}
    </Link>
  );
}
