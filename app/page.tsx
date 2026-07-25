import Image from "next/image";
import Link from "next/link";
import { getAllArticles, Article } from "@/lib/articles";
import NewsletterForm from "./components/NewsletterForm";
import MobileNav from "./components/MobileNav";
import NewsTicker from "./components/NewsTicker";

export const dynamic = "force-dynamic";

const VOLS_CARD_IMAGES = [
  "/vols-runningback-2.png",
  "/vols-stadium-charge.png",
  "/volwalk-banner.png",
];

const TITANS_CARD_IMAGES = [
  "/titans-stadium-charge.png",
  "/titans-hero.png",
  "/titans-stadium-charge.png",
];

export default async function Home() {
  const allArticles = await getAllArticles();
  const volsArticles = allArticles.filter((a) => a.desk === "vols").slice(0, 3);
  const titansArticles = allArticles.filter((a) => a.desk === "titans").slice(0, 3);
  const heroArticle = allArticles[0];
  // Hot takes: latest 3 articles (any desk) excluding hero
  const hotTakeArticles = allArticles.filter((a) => a.slug !== heroArticle?.slug).slice(0, 3);

  const volsFallback = [
    { slug: "#", badge: "Film Room", title: "The Route Combination Killing SEC Defenses", deck: "Tennessee's crossing concept is open every week.", date: "Sept 6", author: "Cal Merritt", image: VOLS_CARD_IMAGES[0] },
    { slug: "#", badge: "Recruiting", title: "Four-Star WR Commits — What It Means for 2027", deck: "The Vols landed their second top-50 receiver in the class.", date: "Sept 5", author: "Huck Denton", image: VOLS_CARD_IMAGES[1] },
    { slug: "#", badge: "Analysis", title: "Spring Practice Winners and One Lingering Question", deck: "Three players who helped themselves.", date: "Sept 4", author: "Ned Bowman", image: VOLS_CARD_IMAGES[2] },
  ];
  const titansFallback = [
    { slug: "#", badge: "Gamebook", title: "Containing the Edge Where Everyone Can Rush", deck: "The Titans' defensive scheme is built for one thing.", date: "Sept 6", author: "Ray Pickard", image: TITANS_CARD_IMAGES[0] },
    { slug: "#", badge: "Draft", title: "Draft Capital and What Nashville Does With It", deck: "Three picks in the top 60.", date: "Sept 5", author: "Ray Pickard", image: TITANS_CARD_IMAGES[1] },
    { slug: "#", badge: "Camp", title: "OTA Observations: The Quarterback Situation, Plainly Stated", deck: "No spin. Here is what the depth chart looks like.", date: "Sept 4", author: "Cal Merritt", image: TITANS_CARD_IMAGES[2] },
  ];

  const displayVols = volsArticles.length > 0 ? volsArticles.map((a, i) => ({
    slug: `/article/${a.slug}`,
    badge: a.tags[0] || "Analysis",
    title: a.title,
    deck: a.deck,
    date: new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    author: a.author,
    image: VOLS_CARD_IMAGES[i % VOLS_CARD_IMAGES.length],
  })) : volsFallback;

  const displayTitans = titansArticles.length > 0 ? titansArticles.map((a, i) => ({
    slug: `/article/${a.slug}`,
    badge: a.tags[0] || "Analysis",
    title: a.title,
    deck: a.deck,
    date: new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    author: a.author,
    image: TITANS_CARD_IMAGES[i % TITANS_CARD_IMAGES.length],
  })) : titansFallback;

  const displayHotTakes = hotTakeArticles.length > 0 ? hotTakeArticles.map((a, i) => ({
    slug: `/article/${a.slug}`,
    title: a.title,
    deck: a.deck,
    author: a.author,
    desk: a.desk,
    image: a.desk === "titans" ? TITANS_CARD_IMAGES[i % TITANS_CARD_IMAGES.length] : VOLS_CARD_IMAGES[i % VOLS_CARD_IMAGES.length],
  })) : [
    { slug: "#", title: "Nico Iamaleava Is the Most Dangerous Quarterback in the SEC", deck: "No one is accounting for his mobility. That is a mistake.", author: "Ned Bowman", desk: "vols" as const, image: VOLS_CARD_IMAGES[0] },
    { slug: "#", title: "The Titans Don't Need to Win the AFC South to Matter This Year", deck: "A six-win season with the right losses teaches you more.", author: "Ray Pickard", desk: "titans" as const, image: TITANS_CARD_IMAGES[0] },
    { slug: "#", title: "Stop Counting Out Tennessee as a College Football Playoff Team", deck: "The schedule is winnable and the talent is there.", author: "Huck Denton", desk: "vols" as const, image: VOLS_CARD_IMAGES[1] },
  ];

  const odds = [
    { game: "Tennessee vs Alabama", date: "Sep 20", spread: "TN -3.5", ml: "+160 / -185", ou: "47.5", best: "DraftKings", bestSpread: "-3.5 (-108)" },
    { game: "Titans vs Jaguars", date: "Sep 14", spread: "TN +1.5", ml: "+130 / -155", ou: "41.5", best: "FanDuel", bestSpread: "+1.5 (-110)" },
    { game: "Tennessee vs Georgia", date: "Oct 4", spread: "TN +7", ml: "+240 / -295", ou: "44", best: "BetMGM", bestSpread: "+7.5 (-110)" },
  ];

  const Badge = ({ label, color }: { label: string; color: string }) => (
    <span style={{ border: `1.5px solid ${color}`, color, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>{label}</span>
  );

  const BrassRule = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, borderTop: "1px dashed #8B7355", opacity: 0.5 }} />
      <div style={{ width: 4, height: 4, background: "#8B7355", borderRadius: "50%", opacity: 0.5 }} />
      <div style={{ flex: 1, borderTop: "1px dashed #8B7355", opacity: 0.5 }} />
    </div>
  );

  const AdSlot = ({ label }: { label: string }) => (
    <div style={{ background: "#FAFAF8", border: "1px dashed #D4CEC7", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", margin: "24px 0" }}>
      <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#C0B9AF" }}>Advertisement · {label}</span>
    </div>
  );

  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>

      {/* TOP BAR */}
      <div className="top-bar" style={{ borderBottom: "1px solid #D4CEC7", padding: "7px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
        <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        <span className="top-bar-center">Tennessee Football · Vols · Titans · Rocky Top</span>
        <div className="top-bar-right" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.12em" }}>Independent Editorial</span>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="https://twitter.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: "#8B7355", display: "flex" }} aria-label="X / Twitter">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
            </a>
            <a href="https://instagram.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: "#8B7355", display: "flex" }} aria-label="Instagram">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
        <MobileNav />
      </div>

      {/* MASTHEAD */}
      <div style={{ textAlign: "center", padding: "20px 40px 0" }}>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 2 }} />
        <div style={{ height: 1, background: "#1A1208", marginBottom: 16 }} />
        <h1 className="masthead-title" style={{ fontSize: 64, fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1, color: "#1A1208" }}>Touchdown Tennessee</h1>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "#FF6600", margin: "10px 0 4px" }}>Tennessee Football Desk</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", margin: "14px 0 0" }}>
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
          <img src="/tdt-logo.png" alt="Touchdown Tennessee" style={{ height: 36, width: "auto", display: "block" }} />
          <div style={{ flex: 1, height: 1, background: "#1A1208", maxWidth: 220 }} />
        </div>
        <div style={{ height: 1, background: "#1A1208", marginTop: 16 }} />
        <div style={{ height: 3, background: "#1A1208", marginTop: 2 }} />
      </div>

      {/* NAV */}
      <nav className="desktop-nav" style={{ display: "flex", justifyContent: "center", borderBottom: "1px solid #D4CEC7", overflowX: "auto" as const }}>
        {[["Vols Desk","#FF6600"],["Vols Roster","#FF6600"],["Titans Desk","#4B92DB"],["Titans Roster","#4B92DB"],["Bookie's Nook","#1A1208"],["Shop","#FF6600"],["Archive","#1A1208"],["Arcade","#FF6600"]].map(([label, color], i) => (
          <a key={i} href={label === "Bookie's Nook" ? "#bookies-nook" : label === "Vols Roster" ? "/vols/roster" : label === "Titans Roster" ? "/titans/roster" : label === "Shop" ? "/merch" : label === "Archive" ? "/archive" : label === "Arcade" ? "/arcade" : "#"} style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, textDecoration: "none", color, padding: "10px 20px", borderRight: "1px solid #D4CEC7", borderLeft: i === 0 ? "1px solid #D4CEC7" : undefined }}>{label}</a>
        ))}
      </nav>

      {/* BREAKING NEWS TICKER */}
      <NewsTicker />

      <div className="main-container" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px" }}>
        <AdSlot label="728×90 Leaderboard" />

        {/* HERO */}
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 320px", borderBottom: "1px solid #D4CEC7", paddingBottom: 32 }}>
          <div style={{ paddingRight: 32, borderRight: "1px solid #D4CEC7" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#FF6600", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <Badge label="Vols Desk" color="#FF6600" /><span>Latest</span>
              <div style={{ flex: 1, height: 1, background: "#FF6600", opacity: 0.3 }} />
            </div>
            <div style={{ position: "relative", width: "100%", marginBottom: 20, borderBottom: "3px solid #FF6600", overflow: "hidden" }}>
              <Image src="/playcall.png" alt="The Callman at Neyland" width={1400} height={788} style={{ width: "100%", height: "auto", display: "block" }} priority />
            </div>
            {heroArticle ? (
              <Link href={`/article/${heroArticle.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <h2 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.07, color: "#1A1208", marginBottom: 14 }}>{heroArticle.title}</h2>
                <p style={{ fontSize: 16, color: "#555", lineHeight: 1.55, fontStyle: "italic", marginBottom: 16 }}>{heroArticle.deck}</p>
              </Link>
            ) : (
              <>
                <h2 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.07, color: "#1A1208", marginBottom: 14 }}>Patience in the Trenches: How Tennessee Wins the Line</h2>
                <p style={{ fontSize: 16, color: "#555", lineHeight: 1.55, fontStyle: "italic", marginBottom: 16 }}>The Volunteers&apos; offensive line is the story no one is telling.</p>
              </>
            )}
            <BrassRule />
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355", marginTop: 10 }}>
              By {heroArticle?.author || "Staff Writer"} · {heroArticle ? new Date(heroArticle.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Sept 6, 2026"}
            </div>
          </div>

          {/* SIDEBAR: Scores + Social CTA */}
          <div className="hero-sidebar" style={{ paddingLeft: 28 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, borderBottom: "2px solid #1A1208", paddingBottom: 5, marginBottom: 12 }}>Latest Scores</div>
            {[{badge:"VOLS",color:"#FF6600",score:"28 – 14",game:"Tennessee over Florida · SEC Week 4"},{badge:"TITANS",color:"#4B92DB",score:"21 – 17",game:"Tennessee over Jacksonville · Week 3"}].map((s,i)=>(
              <div key={i} style={{ borderBottom: "1px solid #D4CEC7", paddingBottom: 10, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <Badge label={s.badge} color={s.color} />
                  <span style={{ fontWeight: 700, fontSize: 20 }}>{s.score}</span>
                </div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 3 }}>{s.game}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355" }}>Final</div>
              </div>
            ))}

            {/* Social CTA in sidebar */}
            <div style={{ background: "#1A1208", padding: "16px", marginTop: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#FF6600", marginBottom: 10 }}>Follow TDT</div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                <a href="https://twitter.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
                  @TDTennessee on X
                </a>
                <a href="https://instagram.com/TDTennessee" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </a>
              </div>
            </div>

            <div style={{ background: "#FAFAF8", border: "1px dashed #D4CEC7", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0", marginTop: 0 }}>
              <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#C0B9AF" }}>Ad · 300×250</span>
            </div>
          </div>
        </div>

        {/* VOLS DESK */}
        <div id="vols" style={{ display: "flex", alignItems: "center", gap: 12, margin: "36px 0 18px" }}>
          <Badge label="Vols Desk" color="#FF6600" />
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#aaa" }}>University of Tennessee Volunteers</span>
          <img src="/vols-rifleman-1794.png" alt="Vol" style={{ height: 80, width: "auto", display: "block", marginRight: -8 }} />
        </div>
        <div style={{ width: "100%", marginBottom: 24 }}>
          <Image src="/family.png" alt="Vols fans" width={1400} height={788} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>

        {/* VOLS ARTICLE CARDS WITH IMAGE THUMBNAILS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 8 }}>
          {displayVols.map((a, i) => (
            <Link key={i} href={a.slug} style={{ textDecoration: "none", color: "inherit" }} className="article-card">
              <div>
                <div style={{ overflow: "hidden", marginBottom: 0, aspectRatio: "16/9" as const }}>
                  <img
                    src={a.image}
                    alt={a.title}
                    className="card-image"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ borderTop: "3px solid #FF6600", paddingTop: 14 }}>
                  <div style={{ marginBottom: 8 }}>
                    <Badge label={a.badge} color="#FF6600" />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.22, marginBottom: 8, transition: "color 0.2s" }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5, marginBottom: 10 }}>{a.deck}</p>
                  <div style={{ fontSize: 11, color: "#8B7355" }}>{a.date} · By {a.author}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ margin: "24px 0" }}><BrassRule /></div>
      </div>

      {/* CAMPUS DIVIDER */}
      <div style={{ width: "100%", borderTop: "1px solid #D4CEC7", borderBottom: "1px solid #D4CEC7", overflow: "hidden", maxHeight: 240 }}>
        <Image src="/campus-divider.png" alt="UT Campus" width={1800} height={500} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      <div id="titans" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px" }}>
        <AdSlot label="728×90 Mid-Page" />

        {/* TITANS DESK */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0 18px" }}>
          <Badge label="Titans Desk" color="#4B92DB" />
          <div style={{ flex: 1, height: 1, background: "#4B92DB" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#aaa" }}>Tennessee Titans · NFL</span>
        </div>
        <div style={{ width: "100%", marginBottom: 24, borderBottom: "3px solid #4B92DB" }}>
          <Image src="/titans-hero.png" alt="Nashville Titans" width={1400} height={788} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>

        {/* TITANS ARTICLE CARDS WITH IMAGE THUMBNAILS */}
        <div className="titans-desk" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 40 }}>
          {displayTitans.map((a, i) => (
            <Link key={i} href={a.slug} style={{ textDecoration: "none", color: "inherit" }} className="article-card">
              <div>
                <div style={{ overflow: "hidden", marginBottom: 0, aspectRatio: "16/9" as const }}>
                  <img
                    src={a.image}
                    alt={a.title}
                    className="card-image"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ borderTop: "3px solid #4B92DB", paddingTop: 14 }}>
                  <div style={{ marginBottom: 8 }}>
                    <Badge label={a.badge} color="#4B92DB" />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.22, marginBottom: 8, transition: "color 0.2s" }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5, marginBottom: 10 }}>{a.deck}</p>
                  <div style={{ fontSize: 11, color: "#8B7355" }}>{a.date} · By {a.author}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* HOT TAKES SECTION */}
        <div style={{ background: "#1A1208", margin: "0 -40px 48px", padding: "36px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ fontSize: 22, lineHeight: 1 }}>🔥</span>
            <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 900, letterSpacing: "0.26em", padding: "4px 10px", textTransform: "uppercase" as const }}>Fire Takes</span>
            <div style={{ flex: 1, height: 1, background: "#FF6600", opacity: 0.4 }} />
            <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#666" }}>Strong opinions. Strongly held.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {displayHotTakes.map((a, i) => (
              <Link key={i} href={a.slug} style={{ textDecoration: "none", color: "inherit" }} className="hot-take-card">
                <div style={{ border: `2px solid ${a.desk === "titans" ? "#4B92DB" : "#FF6600"}`, overflow: "hidden" }}>
                  <div style={{ position: "relative", aspectRatio: "16/9" as const, overflow: "hidden" }}>
                    <img
                      src={a.image}
                      alt={a.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.55)" }}
                    />
                    <div style={{ position: "absolute", top: 8, left: 8 }}>
                      <span style={{ background: a.desk === "titans" ? "#4B92DB" : "#FF6600", color: "#fff", fontSize: 8, fontWeight: 900, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>
                        {a.desk === "titans" ? "Titans" : "Vols"}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ fontSize: 15, fontWeight: 900, lineHeight: 1.25, color: "#fff", marginBottom: 8 }}>{a.title}</h3>
                    <p style={{ fontSize: 12, color: "#999", lineHeight: 1.5, marginBottom: 10, fontStyle: "italic" }}>{a.deck}</p>
                    <div style={{ fontSize: 10, color: "#666", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                      By {a.author} · <span style={{ color: a.desk === "titans" ? "#4B92DB" : "#FF6600" }}>Read →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* BOOKIE'S NOOK */}
        <div id="bookies-nook" style={{ marginBottom: 48 }}>
          <div style={{ width: "100%", marginBottom: 0, borderTop: "2px solid #1A1208", overflow: "hidden" }}>
            <Image src="/bookies-nook-art.png" alt="Bookie's Nook" width={1400} height={788} style={{ width: "100%", height: "auto", display: "block", maxHeight: 320, objectFit: "cover", objectPosition: "top" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0 18px" }}>
            <span style={{ border: "1.5px solid #1A1208", color: "#1A1208", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Bookie&apos;s Nook</span>
            <div style={{ flex: 1, height: 1, background: "#1A1208" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#aaa" }}>Odds updated hourly · Bet responsibly</span>
          </div>
          <div style={{ border: "1px solid #D4CEC7", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr 0.8fr 1.4fr", background: "#1A1208", color: "#fff", padding: "10px 16px", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, gap: 12 }}>
              <span>Matchup</span><span>Spread</span><span>Moneyline</span><span>O/U</span><span>Best Line</span>
            </div>
            {odds.map((o, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr 0.8fr 1.4fr", padding: "14px 16px", borderTop: i === 0 ? "none" : "1px solid #D4CEC7", background: i % 2 === 0 ? "#fff" : "#FAFAF8", gap: 12, alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{o.game}</div>
                  <div style={{ fontSize: 11, color: "#8B7355", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{o.date}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{o.spread}</div>
                <div style={{ fontSize: 13, color: "#555" }}>{o.ml}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{o.ou}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#FF6600" }}>{o.best}</div>
                  <div style={{ fontSize: 11, color: "#555" }}>{o.bestSpread}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" as const }}>
            {["DraftKings","FanDuel","BetMGM","Caesars"].map((book) => (
              <a key={book} href="#" style={{ border: "1.5px solid #1A1208", padding: "6px 14px", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", color: "#1A1208" }}>Bet {book} →</a>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "#aaa", marginTop: 8 }}>21+ only. Gambling problem? Call 1-800-GAMBLER. Affiliate links may earn commission.</div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div style={{ background: "#1A1208", color: "#fff", padding: "0", margin: "0 0 40px", position: "relative" as const, overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", width: "45%", opacity: 0.12 }}>
          <Image src="/titans-ticket.png" alt="" width={900} height={500} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, borderTop: "3px dashed rgba(255,255,255,0.15)" }} />
        <div style={{ padding: "36px 40px", textAlign: "center", position: "relative" as const }}>
          <h3 style={{ fontSize: 22, letterSpacing: "0.06em", marginBottom: 6 }}>The Rocky Top Digest</h3>
          <p style={{ fontSize: 14, fontStyle: "italic", color: "#aaa", marginBottom: 20 }}>Game-week analysis, delivered Friday morning. No filler.</p>
          <NewsletterForm />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderBottom: "3px dashed rgba(255,255,255,0.15)" }} />
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "3px solid #1A1208", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap" as const, justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 14, letterSpacing: "0.04em", fontWeight: 700 }}>Touchdown Tennessee</div>
          <div style={{ display: "flex", gap: 18, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
            <a href="/about" style={{color:"#8B7355",textDecoration:"none"}}>About</a>
            <a href="/contact" style={{color:"#8B7355",textDecoration:"none"}}>Contact</a>
            <a href="/contact#advertising" style={{color:"#8B7355",textDecoration:"none"}}>Advertise</a>
            <a href="https://twitter.com/TDTennessee" target="_blank" rel="noopener noreferrer" style={{ color: "#8B7355", textDecoration: "none" }}>@TDTennessee</a>
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#8B7355" }}>Independent editorial · Not affiliated with UT or NFL</div>
        </div>
        <div style={{ textAlign: "center" as const, marginTop: 12, fontSize: 10, color: "#D4CEC7", letterSpacing: "0.08em" }}>touchdowntennessee.com</div>
      </footer>

    </main>
  );
}
