"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit() {
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p style={{ textAlign: "center", color: "#FF6600", fontSize: 15, fontStyle: "italic" }}>
        You&apos;re in. Friday morning, Rocky Top Digest lands in your inbox.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", maxWidth: 380, width: "100%" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="your@email.com"
          style={{ flex: 1, padding: "10px 14px", fontSize: 13, border: "1px solid #333", background: "#2a2010", color: "#fff", outline: "none" }}
        />
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          style={{ padding: "10px 18px", background: "#FF6600", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, border: "none", cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p style={{ color: "#ff9999", fontSize: 12, margin: 0 }}>Something went wrong — try again.</p>
      )}
    </div>
  );
}
