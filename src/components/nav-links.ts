/**
 * Single source of truth for site navigation. The header (desktop + mobile
 * drawer) and the footer all render from this, so a new page is added once.
 */
export type NavItem = {
  label: string;
  to: "/saturday" | "/saturday/wire" | "/saturday/board" | "/independent";
};

export const primaryNav: NavItem[] = [
  { label: "Saturday", to: "/saturday" },
  { label: "The Wire", to: "/saturday/wire" },
  { label: "The Board", to: "/saturday/board" },
  { label: "Independent", to: "/independent" },
];

export const saturdayNav: NavItem[] = [
  { label: "Clubhouse", to: "/saturday" },
  { label: "The Wire", to: "/saturday/wire" },
  { label: "The Board", to: "/saturday/board" },
];

export const CONTACT_EMAIL = "touchdowntennessee@gmail.com";
