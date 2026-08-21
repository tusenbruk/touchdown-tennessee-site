// Single source of truth for site navigation. Masthead (desktop), MobileNav,
// and the homepage inline nav all render from this array so they can't drift.
// Shop-first order per the shop-pivot spec.
export interface NavItem {
  label: string;
  color: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Shop", color: "#FF6600", href: "/merch" },
  { label: "Vols Desk", color: "#FF6600", href: "/#vols" },
  { label: "Vols Roster", color: "#FF6600", href: "/vols/roster" },
  { label: "Titans Desk", color: "#4B92DB", href: "/#titans" },
  { label: "Titans Roster", color: "#4B92DB", href: "/titans/roster" },
  { label: "Bookie's Nook", color: "#1A1208", href: "/#bookies-nook" },
  { label: "Archive", color: "#1A1208", href: "/archive" },
  { label: "Arcade", color: "#FF6600", href: "/arcade" },
  { label: "Cart", color: "#1A1208", href: "/cart" },
];
