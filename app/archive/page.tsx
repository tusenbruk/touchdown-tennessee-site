import Link from "next/link";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Archive | Touchdown Tennessee",
  description: "Every article published by Touchdown Tennessee — Vols Desk, Titans Desk, Film Room, and more.",
};

export default async function ArchivePage() {
  const articles = await getAllArticles();
  const vols = articles.filter((a) => a.desk === "vols");
  const titans = articles.filter((a) => a.desk === "titans");

  const ArticleRow = ({ article }: { article: typeof articles[0] }) => {
    const deskColor = article.desk === "titans" ? "#4B92DB" : "#FF6600";
    const deskLabel = article.desk === "titans" ? "Titans" : "Vols";
    const date = new Date(article.date).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric"
    });

    return (
      <Link href={`/article/${article.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 160px", gap: 20, padding: "18px 0", borderBottom: "1px solid #D4CEC7", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 4 }}>
            <span style={{ border: `1.5px solid ${deskColor}`, color: deskColor, fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", padding: "3px 8px", textTransform: "uppercase" as const, display: "inline-block" }}>{deskLabel}</span>
            <span style={{ fontSize: 11, color: "#8B7355", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>{date}</span>
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2, marginBottom: 6, color: "#1A1208" }}>{article.title}</h3>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5, margin: 0 }}>{article.deck}</p>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <div style={{ fontSize: 12, color: "#8B7355", fontStyle: "italic" }}>By {article.author}</div>
            {article.tags.slice(0, 1).map((tag) => (
              <div key={tag} style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginTop: 4 }}>{tag}</div>
            ))}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>

      <Masthead backLink={{ href: "/", label: "← Home" }} />

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "center", borderBottom: "1px solid #D4CEC7" }}>
        {[["Vols Desk","#FF6600","/"],["Titans Desk","#4B92DB","/"],["Vols Roster","#FF6600","/vols/roster"],["Titans Roster","#4B92DB","/titans/roster"],["Bookie's Nook","#1A1208","/#bookies-nook"],["Shop","#FF6600","/merch"]].map(([label, color, href], i) => (
          <a key={i} href={href as string} style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, textDecoration: "none", color: color as string, padding: "10px 20px", borderRight: "1px solid #D4CEC7", borderLeft: i === 0 ? "1px solid #D4CEC7" : undefined }}>{label as string}</a>
        ))}
      </nav>

      {/* ARCHIVE */}
      <div style={{ maxWidth: 1080, margin: "48px auto", padding: "0 40px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Archive</h2>
          <span style={{ fontSize: 12, color: "#8B7355", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{articles.length} articles</span>
        </div>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 40 }} />

        {/* VOLS SECTION */}
        {vols.length > 0 && (
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Vols Desk</span>
              <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
              <span style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>{vols.length} articles</span>
              <img src="/vols-rifleman-1794.png" alt="" style={{ height: 60, width: "auto" }} />
            </div>
            {vols.map((article) => (
              <ArticleRow key={article.slug} article={article} />
            ))}
          </div>
        )}

        {/* TITANS SECTION */}
        {titans.length > 0 && (
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ border: "1.5px solid #4B92DB", color: "#4B92DB", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Titans Desk</span>
              <div style={{ flex: 1, height: 1, background: "#4B92DB" }} />
              <span style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>{titans.length} articles</span>
            </div>
            {titans.map((article) => (
              <ArticleRow key={article.slug} article={article} />
            ))}
          </div>
        )}

        {articles.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#8B7355", fontStyle: "italic" }}>
            No articles yet. Check back soon.
          </div>
        )}

        <div style={{ borderTop: "2px solid #1A1208", paddingTop: 20, marginBottom: 40, display: "flex", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", color: "#8B7355" }}>← Back to Home</Link>
          <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355" }}>Touchdown Tennessee · Independent Editorial</span>
        </div>
      </div>
    </main>
  );
}
