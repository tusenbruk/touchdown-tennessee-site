"use client";

import { usePathname } from "next/navigation";

// Shop capture is parked with the merch catalog. Culture pages stay quiet.
export default function NewsletterPopup() {
  const pathname = usePathname();
  void pathname;
  return null;
}
