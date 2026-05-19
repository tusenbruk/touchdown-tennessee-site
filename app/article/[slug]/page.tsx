import { getArticleBySlug, getAllSlugs } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const deskColor = article.desk === "titans" ? "#4B92DB" : "#FF6600";
  const deskLabel = article.desk === "titans" ? "TITANS DESK" : "VOLS DESK";

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>

      {/* TOP BAR */}
      <div style={{ borderBottom: "1px solid #D4CEC7", padding: "7px 40px", display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#8B7355" }}>← Touchdown Tennessee</Link>
        <span>Tennessee Football · Vols · Titans · Rocky Top</span>
        <span>Independent Editorial</span>
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
          <div style={{ fontSize: 11, fontWeight: 700, border: "1.5px solid #1A1208", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>TT</div>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
        </div>
        <div style={{ height: 1, background: "#1A1208", marginTop: 16 }} />
        <div style={{ height: 3, background: "#1A1208", marginTop: 2 }} />
      </div>

      {/* ARTICLE */}
      <div style={{ maxWidth: 740, margin: "48px auto", padding: "0 40px" }}>

        {/* Desk badge */}
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
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32, paddingBottom: 20, borderBottom: "1px solid #D4CEC7" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1A1208", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>
            {article.author.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em" }}>{article.author}</div>
            <div style={{ fontSize: 11, color: "#8B7355", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{formattedDate}</div>
          </div>
        </div>

        {/* Body */}
        <div
          dangerouslySetInnerHTML={{ __html: article.body || "" }}
          style={{ fontSize: 17, lineHeight: 1.75, color: "#1A1208" }}
        />

        {/* Bottom rule */}
        <div style={{ marginTop: 48, borderTop: "2px solid #1A1208", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", color: "#8B7355" }}>← Back to Home</Link>
          <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>Touchdown Tennessee · Independent Editorial</span>
        </div>

      </div>
    </main>
  );
}
