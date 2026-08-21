"use client";

// Thin, safe wrappers around GA4 (gtag) and Meta Pixel (fbq). Every call
// no-ops when the scripts aren't loaded (env ids unset, ad blockers, SSR).

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
}

type GtagFn = (...args: unknown[]) => void;
type FbqFn = (...args: unknown[]) => void;

function gtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { gtag?: GtagFn };
  return w.gtag ?? null;
}

function fbq(): FbqFn | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { fbq?: FbqFn };
  return w.fbq ?? null;
}

export function trackViewItem(item: EcommerceItem) {
  gtag()?.("event", "view_item", { currency: "USD", value: item.price ?? 0, items: [item] });
  fbq()?.("track", "ViewContent", { content_ids: [item.item_id], content_name: item.item_name, value: item.price ?? 0, currency: "USD" });
}

export function trackAddToCart(item: EcommerceItem) {
  gtag()?.("event", "add_to_cart", { currency: "USD", value: (item.price ?? 0) * (item.quantity ?? 1), items: [item] });
  fbq()?.("track", "AddToCart", { content_ids: [item.item_id], content_name: item.item_name, value: item.price ?? 0, currency: "USD" });
}

export function trackBeginCheckout(items: EcommerceItem[], value: number) {
  gtag()?.("event", "begin_checkout", { currency: "USD", value, items });
  fbq()?.("track", "InitiateCheckout", { value, currency: "USD", num_items: items.length });
}

// Game events — names only, never answers or identity.
export function trackGameStart(game: string, mode: string) {
  gtag()?.("event", "game_start", { game, mode });
}
export function trackGameComplete(game: string, mode: string, score: number, maxScore: number) {
  gtag()?.("event", "game_complete", { game, mode, score, max_score: maxScore });
}
export function trackGameShare(game: string) {
  gtag()?.("event", "game_share", { game });
}
export function trackGameProductClick(game: string, target: string) {
  gtag()?.("event", "game_product_click", { game, target });
}

// Purchase is deduped by transaction (session) id so a success-page refresh
// doesn't double-count.
export function trackPurchase(transactionId: string, value: number, items: EcommerceItem[]) {
  try {
    const key = `tdt-purchase-${transactionId}`;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
  } catch {}
  gtag()?.("event", "purchase", { transaction_id: transactionId, currency: "USD", value, items });
  fbq()?.("track", "Purchase", { value, currency: "USD" });
}
