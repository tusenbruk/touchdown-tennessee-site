import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "./components/CartContext";
import AnalyticsScripts from "./components/AnalyticsScripts";
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
    default: "Touchdown Tennessee — Original Tennessee Football Goods",
    template: "%s | Touchdown Tennessee",
  },
  description: "Original, independent Tennessee football designs — apparel, prints, and gifts. Plus daily trivia and arcade games. Knoxville to Nashville.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Touchdown Tennessee",
    description: "Original, independent Tennessee football designs — apparel, prints, and gifts.",
    url: SITE_URL,
    siteName: "Touchdown Tennessee",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TDTennessee",
  },
  icons: {
    icon: "/tdt-favicon.png",
    apple: "/tdt-favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5612762298444240"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd(), websiteJsonLd()) }}
        />
        <CartProvider>{children}</CartProvider>
        <NewsletterPopup />
        <AnalyticsScripts />
        <Analytics />
      </body>
    </html>
  );
}
