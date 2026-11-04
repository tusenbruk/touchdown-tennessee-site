import { useEffect } from "react";
import { useCart } from "@/lib/cart";

export function CartHydrate() {
  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);
  return null;
}
