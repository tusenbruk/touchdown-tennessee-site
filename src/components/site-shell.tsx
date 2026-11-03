import type { ReactNode } from "react";
import { CartHydrate } from "@/components/cart-hydrate";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

/** Page chrome: skip link, header, main landmark, footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <CartHydrate />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
