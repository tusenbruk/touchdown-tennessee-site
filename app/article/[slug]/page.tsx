import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CopyButton from "@/app/components/CopyButton";

export const dynamic = "force-dynamic";

const VOLS_BANNERS = [
  "/vols-stadium-charge.png",
  "/vols-rifleman-1794.png",
  "/vols-runningback-2.png",
  "/volwalk-banner.png",
  "/family.png",
];

const TITANS_BANNERS = [
  "/titans-stadium-charge.png",
  "/titans-hero.png",
];

const VOLS_CARD_IMAGES = ["/vols-runningback-2.png", "/vols-stadium-charge.png", "/volwalk-banner.png"];
const TITANS_CARD_IMAGES = ["/titans-stadium-charge.png", "/titans-hero.png", "/titans-stadium-charge.png"];

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getAllArticles(),
  ]);
  if (!article) notFound();

  const deskColor = article.desk === "titans" ? "#4B92DB" : "#FF6600";
  const deskLabel = article.desk === "titans" ? "TITANS DESK" : "VOLS DESK";

  const banners = article.desk === "titans" ? TITANS_BANNERS : VOLS_BANNERS;
  const bannerIndex = slug.length % banners.length;
  const banner = banners[bannerIndex];

  const cardImages = article.desk === "titans" ? TITANS_CARD_IMAGES : VOLS_CARD_IMAGES;

  // Related articles: same desk, exclude current
  const related = allArticles
    .filter((a) => a.desk === article.desk && a.slug !== slug)
    .slice(0, 3);

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>

      {/* TOP BAR */}
      <div style={{ borderBottom: "1px solid #D4CEC7", padding: "7px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#8B7355" }}>← Touchdown Tennessee</Link>
        <span>Tennessee Football · Knoxville to Nashville</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>Independent Editorial</span>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="https://twitter.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: "#8B7355", display: "flex" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
            </a>
            <a href="https://instagram.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: "#8B7355", display: "flex" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* MASTHEAD */}
      <div style={{ textAlign: "center", padding: "20px 40px 0" }}>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 2 }} />
        <div style={{ height: 1, background: "#1A1208", marginBottom: 16 }} />
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1, color: "#1A1208" }}>Touchdown Tennessee</h1>
        </Link>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "#FF6600", margin: "10px 0 4px" }}>Tennessee Football Desk</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", margin: "14px 0 0" }}>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
          <img src="/tdt-logo.png" alt="Touchdown Tennessee" style={{ height: 36, width: "auto", display: "block" }} />
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
        </div>
        <div style={{ height: 1, background: "#1A1208", marginTop: 16 }} />
        <div style={{ height: 3, background: "#1A1208", marginTop: 2 }} />
      </div>

      {/* BANNER IMAGE */}
      <div style={{ width: "100%", maxHeight: 340, overflow: "hidden", borderBottom: `3px solid ${deskColor}` }}>
        <Image
          src={banner}
          alt="Article banner"
          width={1800}
          height={600}
          style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      {/* ARTICLE */}
      <div style={{ maxWidth: 740, margin: "48px auto", padding: "0 40px" }}>

        {/* Desk badge + tags */}
        <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ border: `1.5px solid ${deskColor}`, color: deskColor, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>{deskLabel}</span>
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} style={{ border: "1px solid #D4CEC7", color: "#8B7355", fontSize: 9, letterSpacing: "0.15em", padding: "3px 8px", textTransform: "uppercase" as const }}>{tag}</span>
          ))}
        </div>

        {/* Headline */}
        <h2 style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.07, color: "#1A1208", marginBottom: 16 }}>{article.title}</h2>

        {/* Deck */}
        <p style={{ fontSize: 18, color: "#555", lineHeight: 1.5, fontStyle: "italic", marginBottom: 20, borderLeft: `3px solid ${deskColor}`, paddingLeft: 16 }}>{article.deck}</p>

        {/* Byline */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #D4CEC7" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1A1208", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
            {article.author.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em" }}>{article.author}</div>
            <div style={{ fontSize: 11, color: "#8B7355", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{formattedDate}</div>
          </div>
        </div>

        {/* SHARE BUTTONS — prominent */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid #D4CEC7", flexWrap: "wrap" as const }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#8B7355", marginRight: 4 }}>Share this story</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://touchdowntennessee.com/article/${article.slug}`)}&via=TDTennessee`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", border: "1.5px solid #1A1208", background: "#1A1208", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, textDecoration: "none" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
            Post on X
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://touchdowntennessee.com/article/${article.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", border: "1.5px solid #1877F2", background: "#1877F2", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, textDecoration: "none" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </a>
          <a
            href={`https://www.instagram.com/TDTennessee`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", border: "1.5px solid #E1306C", color: "#E1306C", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, textDecoration: "none" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Instagram
          </a>
          <CopyButton url={`https://touchdowntennessee.com/article/${article.slug}`} />
        </div>

        {/* Body */}
        <style>{`
          .article-body p { margin-bottom: 1.4em; }
          .article-body h2 { font-size: 22px; font-weight: 700; margin: 2em 0 0.6em; letter-spacing: 0.01em; }
          .article-body h3 { font-size: 18px; font-weight: 700; margin: 1.6em 0 0.5em; }
          .article-body ul, .article-body ol { margin: 0 0 1.4em 1.4em; }
          .article-body li { margin-bottom: 0.4em; }
          .article-body a { color: #FF6600; text-decoration: underline; }
        `}</style>
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.body || "" }}
          style={{ fontSize: 17, lineHeight: 1.75, color: "#1A1208" }}
        />

        {/* Share again at bottom */}
        <div style={{ marginTop: 40, padding: "20px", background: "#FAFAF8", border: "1px solid #D4CEC7", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" as const }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Enjoyed this? Share it:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://touchdowntennessee.com/article/${article.slug}`)}&via=TDTennessee`}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "#1A1208", fontSize: 11, fontWeight: 700 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
            Post on X
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://touchdowntennessee.com/article/${article.slug}`)}`} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "#1877F2", fontSize: 11, fontWeight: 700 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </a>
          <a href="https://twitter.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "#FF6600", fontSize: 11, fontWeight: 700 }}>Follow @TDTennessee →</a>
        </div>

        {/* Footer rule */}
        <div style={{ marginTop: 48, borderTop: "2px solid #1A1208", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", color: "#8B7355" }}>← Back to Home</Link>
          <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>Touchdown Tennessee · Independent Editorial</span>
        </div>

      </div>

      {/* MORE STORIES */}
      {related.length > 0 && (
        <div style={{ borderTop: "3px solid #1A1208", background: "#FAFAF8", padding: "36px 40px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ border: `1.5px solid ${deskColor}`, color: deskColor, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>More from {article.desk === "titans" ? "Titans Desk" : "Vols Desk"}</span>
              <div style={{ flex: 1, height: 1, background: deskColor, opacity: 0.4 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {related.map((a, i) => (
                <Link key={a.slug} href={`/article/${a.slug}`} style={{ textDecoration: "none", color: "inherit" }} className="article-card">
                  <div>
                    <div style={{ overflow: "hidden", aspectRatio: "16/9" as const, marginBottom: 0 }}>
                      <img
                        src={cardImages[i % cardImages.length]}
                        alt={a.title}
                        className="card-image"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                    <div style={{ borderTop: `2px solid ${deskColor}`, paddingTop: 12 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.25, marginBottom: 6, transition: "color 0.2s" }}>{a.title}</h3>
                      <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5, marginBottom: 8 }}>{a.deck}</p>
                      <div style={{ fontSize: 10, color: "#8B7355", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>
                        {new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {a.author}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
