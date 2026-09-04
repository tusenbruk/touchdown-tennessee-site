import Image from "next/image";
import Link from "next/link";
import Masthead from "./components/Masthead";
import Footer from "./components/Footer";
import { DAYS_THAT_MATTER, PHOTOS, THIS_SATURDAY } from "@/lib/culture";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main style={{ fontFamily: "var(--font-body)", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <Masthead />

      {/* CULTURE HERO */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "clamp(360px, 48vw, 520px)", display: "flex", alignItems: "flex-end", borderBottom: "3px solid #FF6600" }}>
        <Image
          src="/photos/neyland-2010.jpg"
          alt="Stadium exterior in Knoxville"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,18,8,0.35) 0%, rgba(26,18,8,0.9) 100%)" }} />
        <Image
          src="/art/tdt-mark-state.png"
          alt=""
          width={385}
          height={134}
          style={{ position: "absolute", top: 20, right: 24, width: "clamp(90px, 12vw, 150px)", height: "auto", opacity: 0.85 }}
        />
        <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "0 40px 40px", width: "100%", color: "#F5EFE4" }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 900, letterSpacing: "0.26em", padding: "4px 10px", textTransform: "uppercase" as const }}>
            Saturday · Knoxville · Football country
          </span>
          <h1 style={{ fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 900, lineHeight: 1.02, margin: "18px 0 10px", letterSpacing: "0.02em" }}>
            THEN GO AHEAD.
          </h1>
          <p style={{ fontSize: 15, color: "#E7DFD1", lineHeight: 1.55, maxWidth: 640, margin: "0 0 6px", fontStyle: "italic" }}>
            “Be always sure you&apos;re right, then go ahead.”
          </p>
          <p style={{ fontSize: 12, color: "#C0B9AF", letterSpacing: "0.08em", margin: "0 0 18px" }}>
            — Davy Crockett
          </p>
          <p style={{ fontSize: 16, color: "#E7DFD1", lineHeight: 1.6, maxWidth: 620, margin: "0 0 22px" }}>
            Independent Tennessee football culture. Games, history, and why Saturdays still matter.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12, alignItems: "center" }}>
            <Link
              href="/games"
              style={{ display: "inline-block", background: "#FF6600", color: "#fff", textDecoration: "none", fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, padding: "12px 18px" }}
            >
              See this Saturday →
            </Link>
            <span style={{ fontSize: 12, color: "#C0B9AF", letterSpacing: "0.08em" }}>Shop is resting</span>
          </div>
        </div>
      </section>

      {/* THIS SATURDAY CARD */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 40px 8px" }}>
        <div style={{ border: "1px solid #D4CEC7", borderTop: "3px solid #FF6600", padding: "22px 24px", background: "#FAFAF8" }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "#FF6600", marginBottom: 8 }}>
            {THIS_SATURDAY.label}
          </div>
          <div style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 800, lineHeight: 1.25, marginBottom: 8 }}>
            {THIS_SATURDAY.line}
          </div>
          <p style={{ margin: 0, fontSize: 14, color: "#666", fontStyle: "italic" }}>{THIS_SATURDAY.note}</p>
        </div>
      </section>

      {/* THE PLACE */}
      <section id="the-place" style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 40px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>The Place</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
          <Link href="/the-place" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#FF6600", textDecoration: "none" }}>
            Read more →
          </Link>
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15 }}>The Place</h2>
        <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: 720, margin: "0 0 14px" }}>
          On the river. Built for Saturdays. Expanded until a whole state could fit inside the noise.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65, maxWidth: 720, margin: "0 0 10px" }}>
          Shields-Watkins Field became the stadium people still point at when they say “home.” Generations of East Tennesseans learned the walk, the wait, the first roar when the team came out of the tunnel.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65, maxWidth: 720, margin: "0 0 10px" }}>
          The checkerboard end zones aren’t decoration to the people who grew up under them — they’re a calendar. Fall means orange. Fall means the river. Fall means someone in your family already has the radio on.
        </p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65, maxWidth: 720, margin: 0 }}>
          We don’t own the marks. We know the feeling.
        </p>
      </section>

      {/* DAYS THAT MATTER */}
      <section id="days-that-matter" style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 40px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ border: "1.5px solid #1A1208", color: "#1A1208", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>History</span>
          <div style={{ flex: 1, height: 1, background: "#1A1208" }} />
          <Link href="/days-that-matter" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#FF6600", textDecoration: "none" }}>
            All six →
          </Link>
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, margin: "0 0 8px", lineHeight: 1.15 }}>Days That Matter</h2>
        <p style={{ fontSize: 15, color: "#666", fontStyle: "italic", margin: "0 0 22px", maxWidth: 640 }}>
          Not a full encyclopedia. Just the Saturdays people still tell at the tailgate.
        </p>
        <div className="article-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {DAYS_THAT_MATTER.map((d) => (
            <div key={`${d.year}-${d.opponent}`} style={{ border: "1px solid #D4CEC7", borderTop: "3px solid #FF6600", padding: "16px 16px 18px", background: "#fff" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#FF6600", marginBottom: 8 }}>
                {d.year} · {d.opponent}
              </div>
              <p style={{ margin: "0 0 6px", fontSize: 14, lineHeight: 1.45, color: "#1A1208" }}>{d.detail}</p>
              {d.why ? <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.5 }}>{d.why}</p> : null}
            </div>
          ))}
        </div>
      </section>

      {/* WHAT IT MEANS */}
      <section id="what-it-means" style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 40px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ border: "1.5px solid #4B92DB", color: "#4B92DB", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Culture</span>
          <div style={{ flex: 1, height: 1, background: "#4B92DB" }} />
          <Link href="/what-it-means" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#FF6600", textDecoration: "none" }}>
            Read more →
          </Link>
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, margin: "0 0 14px", lineHeight: 1.15 }}>What It Means</h2>
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, margin: "0 0 12px" }}>
            Tennessee football isn’t only a scoreboard. It’s the drive over the mountains. It’s a kid in an oversized shirt. It’s alumni all over the world still checking kickoff times like they’re late for church.
          </p>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, margin: "0 0 12px" }}>
            It’s hospitality that runs hot until the whistle — then the joke gets sharper. It’s arguing about coaching on Monday and forgiving by Thursday because Saturday is coming again.
          </p>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, margin: 0 }}>
            Touchdown Tennessee is an independent corner of that culture. Original art. Plain talk. No bookstore shelf required.
          </p>
        </div>
      </section>

      {/* PHOTO WALL */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 40px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ border: "1.5px solid #8B7355", color: "#8B7355", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Photo wall</span>
          <div style={{ flex: 1, height: 1, background: "#8B7355" }} />
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 18px" }}>On the river</h2>
        <div className="article-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
          {PHOTOS.map((photo) => (
            <figure key={photo.src} style={{ margin: 0, border: "1px solid #D4CEC7", background: "#FAFAF8" }}>
              <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: "#1A1208" }}>
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
            </figure>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
