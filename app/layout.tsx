import type { Metadata } from "next";
import { CartProvider } from "./components/CartContext";

export const metadata: Metadata = {
  title: "Touchdown Tennessee — Independent Tennessee Football Editorial",
  description: "Independent editorial coverage of the Tennessee Volunteers and Tennessee Titans.",
  openGraph: {
    title: "Touchdown Tennessee",
    description: "Independent editorial coverage of the Tennessee Volunteers and Tennessee Titans.",
    url: "https://touchdowntennessee.com",
    siteName: "Touchdown Tennessee",
    locale: "en_US",
    type: "website",
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
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
