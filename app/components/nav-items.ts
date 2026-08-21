// Single source of truth for site navigation. Masthead (desktop), MobileNav,
// and the homepage inline nav all render from this array so they can't drift.
// Shop-only era: commerce first, games and guides as the draw.
export interface NavItem {
  label: string;
  color: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Shop", color: "#FF6600", href: "/merch" },
  { label: "Tasteless", color: "#1A1208", href: "/merch#tasteless" },
  { label: "Games", color: "#FF6600", href: "/games" },
  { label: "Guides", color: "#1A1208", href: "/guides" },
  { label: "About", color: "#1A1208", href: "/about" },
  { label: "Cart", color: "#FF6600", href: "/cart" },
];
