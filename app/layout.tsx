import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "./components/CartContext";
import AnalyticsScripts from "./components/AnalyticsScripts";
import AdSenseScript from "./components/AdSenseScript";
import NewsletterPopup from "./components/NewsletterPopup";
import { jsonLdString, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/dm-sans/wght-italic.css";
import "@fontsource-variable/oswald";
import "./globals.css";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.touchdowntennessee.com").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Touchdown Tennessee — Independent Tennessee football culture",
    template: "%s | Touchdown Tennessee",
  },
  description: "Independent Tennessee football culture. Games, history, and why Saturdays still matter. Not affiliated with the University of Tennessee.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Touchdown Tennessee",
    description: "Independent Tennessee football culture. Games, history, and why Saturdays still matter.",
    url: SITE_URL,
    siteName: "Touchdown Tennessee",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/tdt-favicon.png",
    apple: "/tdt-favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd(), websiteJsonLd()) }}
        />
        <CartProvider>{children}</CartProvider>
        <NewsletterPopup />
        <AdSenseScript />
        <AnalyticsScripts />
        <Analytics />
      </body>
    </html>
  );
}
