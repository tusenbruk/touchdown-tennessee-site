import { createFileRoute } from "@tanstack/react-router";
import { collections, products } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";

/** Static, indexable pages. Cart, orders and /drops are deliberately excluded. */
const STATIC_PATHS = [
  "/",
  "/shop",
  "/saturday",
  "/saturday/wire",
  "/saturday/board",
  "/independent",
];

/**
 * sitemap.xml, generated from the catalog so new products and collections are
 * listed automatically. No <lastmod>: we have no honest per-page timestamp, and
 * a wrong one is worse than none.
 */
export function buildSitemap() {
  const paths = [
    ...STATIC_PATHS,
    ...Object.keys(collections).map((slug) => `/collection/${slug}`),
    ...products.map((p) => `/shop/${p.slug}`),
  ];
  const urls = paths.map((p) => `  <url><loc>${absoluteUrl(p)}</loc></url>`).join("\n");
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
