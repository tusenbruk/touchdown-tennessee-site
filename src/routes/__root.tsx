import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { SiteShell } from "@/components/site-shell";
import appCss from "../styles.css?url";

const APP_NAME = "Touchdown Tennessee";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Original Tennessee football goods. Independent and unlicensed on purpose. Run by a fan and alumnus, a Tennessee native living overseas.",
      },
      { name: "theme-color", content: "#16120E" },
      { property: "og:title", content: APP_NAME },
      {
        property: "og:description",
        content:
          "Original Tennessee football goods. Independent and unlicensed on purpose.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Oswald:wght@500;600;700&display=swap",
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
              color: "#FFF8F0",
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
