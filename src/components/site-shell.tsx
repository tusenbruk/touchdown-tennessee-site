import type { ReactNode } from "react";

/** The Saturday sheet is the whole page. No second header or footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return children;
}
