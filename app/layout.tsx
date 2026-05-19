import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Touchdown Tennessee — Independent Tennessee Football Editorial",
  description: "Independent editorial coverage of the Tennessee Volunteers and Tennessee Titans. Vols Desk, Titans Desk, Film Room, Recruiting, and the Bookie's Nook.",
  openGraph: {
    title: "Touchdown Tennessee",
    description: "Independent editorial coverage of the Tennessee Volunteers and Tennessee Titans.",
    url: "https://touchdowntennessee.com",
    siteName: "Touchdown Tennessee",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5612762298444240"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
