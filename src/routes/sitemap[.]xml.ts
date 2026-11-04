import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/seo";

/** Static, indexable pages. */
const STATIC_PATHS = ["/"];

/**
 * sitemap.xml. No <lastmod>: we have no honest per-page timestamp, and
 * a wrong one is worse than none.
 */
export function buildSitemap() {
  const urls = STATIC_PATHS.map((p) => `  <url><loc>${absoluteUrl(p)}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
