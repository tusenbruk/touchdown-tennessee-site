import Masthead from "@/app/components/Masthead";
import Link from "next/link";

export const metadata = {
  title: "Contact | Touchdown Tennessee",
  description: "Get in touch with Touchdown Tennessee — editorial inquiries, advertising, partnerships, and general questions.",
};

export default function ContactPage() {
  return (
    <main style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1A1208", minHeight: "100vh" }}>
      <Masthead backLink={{ href: "/", label: "← Home" }} />

      <div style={{ maxWidth: 740, margin: "48px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ border: "1.5px solid #FF6600", color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>Contact</span>
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
        </div>

        <h2 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>Get in Touch</h2>
        <p style={{ fontSize: 16, color: "#666", fontStyle: "italic", lineHeight: 1.6, marginBottom: 40 }}>
          We read every message. Response time is typically 1–2 business days.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 48 }}>
          <div style={{ borderTop: "2px solid #FF6600", paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: "0.04em" }}>Editorial</h3>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>
              Story tips, corrections, press credentials, or editorial feedback.
            </p>
            <a href="mailto:editorial@touchdowntennessee.com" style={{ fontSize: 13, color: "#FF6600", textDecoration: "none", fontWeight: 600 }}>
              editorial@touchdowntennessee.com
            </a>
          </div>

          <div style={{ borderTop: "2px solid #FF6600", paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: "0.04em" }}>Advertising</h3>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>
              Display advertising, newsletter sponsorships, and affiliate partnerships.
            </p>
            <a href="mailto:advertising@touchdowntennessee.com" style={{ fontSize: 13, color: "#FF6600", textDecoration: "none", fontWeight: 600 }}>
              advertising@touchdowntennessee.com
            </a>
          </div>

          <div style={{ borderTop: "2px solid #1A1208", paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: "0.04em" }}>Shop & Orders</h3>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>
              Questions about the Rocky Top Collection, orders, or returns.
            </p>
            <a href="mailto:shop@touchdowntennessee.com" style={{ fontSize: 13, color: "#1A1208", textDecoration: "none", fontWeight: 600 }}>
              shop@touchdowntennessee.com
            </a>
          </div>

          <div style={{ borderTop: "2px solid #1A1208", paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: "0.04em" }}>General</h3>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>
              Everything else — reader feedback, site issues, general inquiries.
            </p>
            <a href="mailto:hello@touchdowntennessee.com" style={{ fontSize: 13, color: "#1A1208", textDecoration: "none", fontWeight: 600 }}>
              hello@touchdowntennessee.com
            </a>
          </div>
        </div>

        {/* Legal */}
        <div style={{ borderTop: "1px solid #D4CEC7", paddingTop: 24, marginBottom: 48 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Legal & Compliance</h3>
          <p style={{ fontSize: 13, color: "#8B7355", lineHeight: 1.7 }}>
            Touchdown Tennessee is an independent editorial brand operated by Watauga Pty Ltd. We are not affiliated with, endorsed by, or connected to the University of Tennessee, the NFL, or the Tennessee Titans. For legal notices, please contact <a href="mailto:legal@touchdowntennessee.com" style={{ color: "#8B7355" }}>legal@touchdowntennessee.com</a>.
          </p>
        </div>

        <div style={{ borderTop: "2px solid #1A1208", paddingTop: 20, display: "flex", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", color: "#8B7355" }}>← Back to Home</Link>
          <Link href="/about" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", color: "#8B7355" }}>About →</Link>
        </div>
      </div>
    </main>
  );
}
