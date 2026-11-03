/**
 * Per-route SEO helpers. Every route's `head()` calls `seo()` so titles,
 * descriptions, canonicals and share tags stay consistent. This file fully
 * controls <title>, description, canonical, og/twitter tags and JSON-LD —
 * no platform head injector sits in front of it.
 */
export const SITE_URL = "https://touchdowntennessee.com";
export const SITE_NAME = "Touchdown Tennessee";
export const DEFAULT_DESCRIPTION =
  "Original Tennessee football goods, drawn in Knoxville. Independent and unlicensed on purpose. Tees, hoodies, hats and cases, plus a Saturday clubhouse.";
export const DEFAULT_IMAGE = "/og.jpg";

type SeoInput = {
  /** Page title without the site name. Omit for the home page. */
  title?: string;
  description?: string;
  /** Path starting with "/", used for the canonical URL. */
  path: string;
  /** Site-relative or absolute image URL. */
  image?: string;
  /** Keep the page out of search results (cart, orders, duplicates). */
  noindex?: boolean;
  type?: "website" | "article" | "product";
};

export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function pageTitle(title?: string) {
  return title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Original Tennessee football goods`;
}

export function seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
  noindex = false,
  type = "website",
}: SeoInput) {
  const fullTitle = pageTitle(title);
  const url = absoluteUrl(path);
  const img = absoluteUrl(image);
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: type === "product" ? "website" : type },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
    ],
    links: noindex ? [] : [{ rel: "canonical", href: url }],
  };
}

/** A JSON-LD <script> entry for a route's `head().scripts`. */
export function jsonLd(data: Record<string, unknown>) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/brand/x-avatar.png"),
  email: "touchdowntennessee@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Knoxville",
    addressRegion: "TN",
    addressCountry: "US",
  },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}
