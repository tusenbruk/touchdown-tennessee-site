// Single source of truth for site navigation. Masthead (desktop), MobileNav,
// and the homepage inline nav all render from this array so they can't drift.
// Culture-site era: merch unlinked from primary nav; routes stay live.
export interface NavItem {
  label: string;
  color: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", color: "#FF6600", href: "/" },
  { label: "Games", color: "#1A1208", href: "/games" },
  { label: "The Place", color: "#1A1208", href: "/the-place" },
  { label: "Days That Matter", color: "#FF6600", href: "/days-that-matter" },
  { label: "What It Means", color: "#1A1208", href: "/what-it-means" },
];
