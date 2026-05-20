import Image from "next/image";
import Link from "next/link";
import { getAllArticles, Article } from "@/lib/articles";
import NewsletterForm from "./components/NewsletterForm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allArticles = await getAllArticles();
  const volsArticles = allArticles.filter((a) => a.desk === "vols").slice(0, 3);
  const titansArticles = allArticles.filter((a) => a.desk === "titans").slice(0, 3);
  const heroArticle = allArticles[0];

  // Fallback placeholder articles if no content yet
  const volsFallback = [
    { slug: "#", badge: "Film Room", title: "The Route Combination Killing SEC Defenses", deck: "Tennessee's crossing concept is open every week.", date: "May 18", author: "Cal Merritt" },
    { slug: "#", badge: "Recruiting", title: "Four-Star WR Commits — What It Means for 2027", deck: "The Vols landed their second top-50 receiver in the class.", date: "May 17", author: "Huck Denton" },
    { slug: "#", badge: "Analysis", title: "Spring Practice Winners and One Lingering Question", deck: "Three players who helped themselves.", date: "May 16", author: "Ned Bowman" },
  ];
  const titansFallback = [
    { slug: "#", badge: "Gamebook", title: "Containing the Edge Where Everyone Can Rush", deck: "The Titans' defensive scheme is built for one thing.", date: "May 18", author: "Ray Pickard" },
    { slug: "#", badge: "Draft", title: "Draft Capital and What Nashville Does With It", deck: "Three picks in the top 60.", date: "May 17", author: "Ray Pickard" },
    { slug: "#", badge: "Camp", title: "OTA Observations: The Quarterback Situation, Plainly Stated", deck: "No spin. Here is what the depth chart looks like.", date: "May 15", author: "Cal Merritt" },
  ];

  const displayVols = volsArticles.length > 0 ? volsArticles.map((a) => ({
    slug: `/article/${a.slug}`,
    badge: a.tags[0] || "Analysis",
    title: a.title,
    deck: a.deck,
    date: new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    author: a.author,
  })) : volsFallback;

  const displayTitans = titansArticles.length > 0 ? titansArticles.map((a) => ({
    slug: `/article/${a.slug}`,
    badge: a.tags[0] || "Analysis",
    title: a.title,
    deck: a.deck,
    date: new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    author: a.author,
  })) : titansFallback;

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
      <div style={{ borderBottom: "1px solid #D4CEC7", padding: "7px 40px", display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
        <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
        <span>Tennessee Football · Vols · Titans · Rocky Top</span>
        <span>Independent Editorial</span>
      </div>

      {/* MASTHEAD */}
      <div style={{ textAlign: "center", padding: "20px 40px 0" }}>
        <div style={{ height: 3, background: "#1A1208", marginBottom: 2 }} />
        <div style={{ height: 1, background: "#1A1208", marginBottom: 16 }} />
        <h1 style={{ fontSize: 64, fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1, color: "#1A1208" }}>Touchdown Tennessee</h1>
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
      <nav style={{ display: "flex", justifyContent: "center", borderBottom: "1px solid #D4CEC7" }}>
        {[["Vols Desk","#FF6600"],["Vols Roster","#FF6600"],["Titans Desk","#4B92DB"],["Titans Roster","#4B92DB"],["Bookie's Nook","#1A1208"],["Shop","#FF6600"],["Newsletter","#1A1208"]].map(([label, color], i) => (
          <a key={i} href={label === "Bookie's Nook" ? "#bookies-nook" : label === "Vols Roster" ? "/vols/roster" : label === "Titans Roster" ? "/titans/roster" : label === "Shop" ? "/merch" : "#"} style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, textDecoration: "none", color, padding: "10px 20px", borderRight: "1px solid #D4CEC7", borderLeft: i === 0 ? "1px solid #D4CEC7" : undefined }}>{label}</a>
        ))}
      </nav>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px" }}>
        <AdSlot label="728×90 Leaderboard" />

        {/* HERO */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", borderBottom: "1px solid #D4CEC7", paddingBottom: 32 }}>
          <div style={{ paddingRight: 32, borderRight: "1px solid #D4CEC7" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#FF6600", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <Badge label="Vols Desk" color="#FF6600" /><span>Latest</span>
              <div style={{ flex: 1, height: 1, background: "#FF6600", opacity: 0.3 }} />
            </div>
            <div style={{ position: "relative", width: "100%", marginBottom: 20, borderBottom: "3px solid #FF6600" }}>
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
              By {heroArticle?.author || "Staff Writer"} · {heroArticle ? new Date(heroArticle.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "May 19, 2026"}
            </div>
          </div>
          <div style={{ paddingLeft: 28 }}>
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
            <div style={{ background: "#FAFAF8", border: "1px dashed #D4CEC7", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0", marginTop: 8 }}>
              <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#C0B9AF" }}>Ad · 300×250</span>
            </div>
          </div>
        </div>

        {/* VOLS */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "36px 0 18px" }}>
          <Badge label="Vols Desk" color="#FF6600" />
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#aaa" }}>University of Tennessee Volunteers</span>
        </div>
        <div style={{ width: "100%", marginBottom: 24 }}>
          <Image src="/family.png" alt="Vols fans" width={1400} height={788} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 8 }}>
          {displayVols.map((a,i)=>(
            <Link key={i} href={a.slug} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ borderTop: "2px solid #FF6600", paddingTop: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.22, marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5, marginBottom: 10 }}>{a.deck}</p>
                <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355", display: "flex", gap: 8, alignItems: "center" }}>
                  <Badge label={a.badge} color="#FF6600" /><span>·</span><span>{a.date}</span>
                </div>
                <div style={{ fontSize: 11, color: "#8B7355", marginTop: 6 }}>By {a.author}</div>
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

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px" }}>
        <AdSlot label="728×90 Mid-Page" />

        {/* TITANS */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0 18px" }}>
          <Badge label="Titans Desk" color="#4B92DB" />
          <div style={{ flex: 1, height: 1, background: "#4B92DB" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#aaa" }}>Tennessee Titans · NFL</span>
        </div>
        <div style={{ width: "100%", marginBottom: 24, borderBottom: "3px solid #4B92DB" }}>
          <Image src="/titans-hero.png" alt="Nashville Titans" width={1400} height={788} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 40 }}>
          {displayTitans.map((a,i)=>(
            <Link key={i} href={a.slug} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ borderTop: "2px solid #4B92DB", paddingTop: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.22, marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5, marginBottom: 10 }}>{a.deck}</p>
                <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355", display: "flex", gap: 8, alignItems: "center" }}>
                  <Badge label={a.badge} color="#4B92DB" /><span>·</span><span>{a.date}</span>
                </div>
                <div style={{ fontSize: 11, color: "#8B7355", marginTop: 6 }}>By {a.author}</div>
              </div>
            </Link>
          ))}
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
          <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
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
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px" }}>
        <footer style={{ borderTop: "3px solid #1A1208", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, letterSpacing: "0.04em", fontWeight: 700 }}>Touchdown Tennessee</div>
          <div style={{ display: "flex", gap: 18, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B7355" }}>
            <span>About</span><span>Contact</span><span>Advertise</span>
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B7355" }}>Independent editorial · Not affiliated with UT or NFL</div>
        </footer>
      </div>

    </main>
  );
}
