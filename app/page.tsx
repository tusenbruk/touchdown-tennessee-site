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
            Saturday · Atlanta · Road lights
          </span>
          <h1 style={{ fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 900, lineHeight: 1.02, margin: "18px 0 10px", letterSpacing: "0.02em" }}>
