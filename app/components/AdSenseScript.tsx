"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// AdSense loader, kept off the shopping funnel: no ads on /merch or /cart so
// nothing competes with the buy flow. Everywhere else is unchanged.
const NO_ADS_PREFIXES = ["/merch", "/cart"];

export default function AdSenseScript() {
  const pathname = usePathname() || "/";
  if (NO_ADS_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5612762298444240"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
