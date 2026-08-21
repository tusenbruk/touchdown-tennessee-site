// Central SEO helpers: canonical base URL + typed JSON-LD builders.
// Every schema here must describe only visible, real page content.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.touchdowntennessee.com").replace(/\/$/, "");
export const SITE_NAME = "Touchdown Tennessee";

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/tdt-logo.png`,
    description:
      "Independent Tennessee football editorial and original-design merchandise. Not affiliated with the University of Tennessee or the NFL.",
    sameAs: ["https://twitter.com/TDTennessee", "https://instagram.com/TDTennessee"],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function articleJsonLd(a: {
  slug: string;
  title: string;
  deck: string;
  date: string;
  author: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.deck,
    datePublished: a.date,
    author: { "@type": "Person", name: a.author },
    publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/tdt-logo.png` } },
    mainEntityOfPage: `${SITE_URL}/article/${a.slug}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// Render helper — use inside a <script type="application/ld+json"> via
// dangerouslySetInnerHTML on the stringified schema.
export function jsonLdString(...schemas: JsonLd[]): string {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}
