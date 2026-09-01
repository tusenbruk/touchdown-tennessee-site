import type { ReactNode } from "react";
import { CartHydrate } from "@/components/cart-hydrate";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <CartHydrate />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
