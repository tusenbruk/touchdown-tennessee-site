"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      <div style={{ textAlign: "center", color: "#FF6600", fontSize: 15, fontStyle: "italic", padding: "10px 0" }}>
        You&apos;re in. Friday morning, Rocky Top Digest lands in your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", maxWidth: 380, margin: "0 auto", position: "relative" as const }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{ flex: 1, padding: "10px 14px", fontSize: 13, border: "1px solid #333", background: "#2a2010", color: "#fff", outline: "none" }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        style={{ padding: "10px 18px", background: status === "loading" ? "#cc5200" : "#FF6600", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, border: "none", cursor: "pointer" }}
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
