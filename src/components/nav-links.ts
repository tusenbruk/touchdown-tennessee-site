/**
 * Single source of truth for site navigation. The header (desktop + mobile
 * drawer) and the footer all render from this, so a new page is added once.
 */
export type NavItem =
  | {
      label: string;
      to: "/shop" | "/saturday" | "/saturday/wire" | "/saturday/board" | "/independent";
    }
  | { label: string; to: "/collection/$slug"; params: { slug: "classics" | "heritage" } };

export const primaryNav: NavItem[] = [
  { label: "Shop", to: "/shop" },
  { label: "Classics", to: "/collection/$slug", params: { slug: "classics" } },
  { label: "1794", to: "/collection/$slug", params: { slug: "heritage" } },
  { label: "Saturday", to: "/saturday" },
  { label: "Independent", to: "/independent" },
];

export const saturdayNav: NavItem[] = [
  { label: "Clubhouse", to: "/saturday" },
  { label: "The Wire", to: "/saturday/wire" },
  { label: "The Board", to: "/saturday/board" },
];

export const CONTACT_EMAIL = "touchdowntennessee@gmail.com";
