import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { DEFAULT_DESCRIPTION, jsonLd, organizationLd, pageTitle, websiteLd } from "@/lib/seo";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: pageTitle() },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { name: "theme-color", content: "#FF8200" },
    ],
    // Site-wide structured data: who we are, and the site itself.
    scripts: [jsonLd(organizationLd), jsonLd(websiteLd)],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <SiteShell>
          <Outlet />
        </SiteShell>
        <Toaster
          theme="light"
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#16120E",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 0,
              fontFamily: "Oswald, sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            },
          }}
        />
        <Analytics />
        <Scripts />
      </body>
    </html>
  ),
});
