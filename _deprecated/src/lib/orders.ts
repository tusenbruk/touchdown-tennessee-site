export type PlacedOrder = {
  id: string;
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  items: {
    name: string;
    qty: number;
    price: number;
    size?: string;
    color?: string;
    image: string;
    printfulVariantId?: number;
  }[];
  total: number;
  createdAt: string;
};

const KEY = "tdt-orders";

export function saveOrder(order: PlacedOrder) {
  const all = listOrders();
  localStorage.setItem(KEY, JSON.stringify([order, ...all]));
}

export function listOrders(): PlacedOrder[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as PlacedOrder[];
  } catch {
    return [];
  }
}

export function getOrder(id: string) {
  return listOrders().find((o) => o.id === id);
}
