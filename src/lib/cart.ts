import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products, SHIP_FREE_AT, WELCOME_CODE } from "./catalog";

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  size?: string;
  color?: string;
  printfulVariantId?: number;
};

type CartState = {
  items: CartItem[];
  code: string;
  add: (item: Omit<CartItem, "key" | "qty"> & { qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  applyCode: (code: string) => boolean;
  clearCode: () => void;
  clear: () => void;
};

function makeKey(item: { productId: string; size?: string; color?: string }) {
  return [item.productId, item.size ?? "", item.color ?? ""].join(":");
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      code: "",
      add: (item) => {
        const key = makeKey(item);
        const qty = item.qty ?? 1;
        const existing = get().items.find((i) => i.key === key);
        if (existing) {
          set({
            items: get().items.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i)),
          });
          return;
        }
        set({ items: [...get().items, { ...item, key, qty }] });
      },
      setQty: (key, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.key !== key) });
          return;
        }
        set({ items: get().items.map((i) => (i.key === key ? { ...i, qty } : i)) });
      },
      remove: (key) => set({ items: get().items.filter((i) => i.key !== key) }),
      applyCode: (code) => {
        const ok = code.trim().toUpperCase() === WELCOME_CODE;
        if (ok) set({ code: WELCOME_CODE });
        return ok;
      },
      clearCode: () => set({ code: "" }),
      clear: () => set({ items: [], code: "" }),
    }),
    { name: "tdt-cart", skipHydration: true },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((n, i) => n + i.price * i.qty, 0);
}

export function cartTotals(items: CartItem[], code: string) {
  const subtotal = cartSubtotal(items);
  const discount = code === WELCOME_CODE ? Math.round(subtotal * 0.1) : 0;
  const after = subtotal - discount;
  const shipping = after >= SHIP_FREE_AT || after === 0 ? 0 : 800;
  return { subtotal, discount, shipping, total: after + shipping };
}

export function hydrateItemProduct(id: string) {
  return products.find((p) => p.id === id);
}
