"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { TRIVIA_QUESTIONS, TriviaQuestion } from "@/data/games/trivia-questions";
import { pickDaily, mulberry32, hashString, seededShuffle, utcDateKey } from "@/lib/games/engine";
import { loadProgress, recordDailyResult, GameProgress } from "@/lib/games/progress";
import { shareResult } from "@/lib/games/share";
import { trackGameStart, trackGameComplete, trackGameShare, trackGameProductClick } from "@/app/components/analytics";

const GAME_KEY = "trivia";
const ROUND_SIZE = 10;

type Mode = "daily" | "practice";
type Stage = "intro" | "playing" | "done";

interface DisplayChoice {
  text: string;
  correct: boolean;
}

function rankTitle(score: number): string {
  if (score >= 10) return "General Neyland Would Salute";
  if (score >= 8) return "All-Conference";
  if (score >= 6) return "Saturday Starter";
  if (score >= 4) return "Special Teams";
  return "Walk-On";
}

export default function TriviaClient() {
  const [stage, setStage] = useState<Stage>("intro");
  const [mode, setMode] = useState<Mode>("daily");
  const [round, setRound] = useState<TriviaQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [shareState, setShareState] = useState<string | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const todayKey = utcDateKey(new Date());

  useEffect(() => {
    // Deferred so hydration completes before local progress renders
    const t = setTimeout(() => setProgress(loadProgress(GAME_KEY)), 0);
    return () => clearTimeout(t);
  }, []);

  const question = round[qIndex];

  // Deterministic per-question choice order so the correct answer isn't
  // always in the same slot.
  const choices: DisplayChoice[] = useMemo(() => {
    if (!question) return [];
    const rng = mulberry32(hashString(`${question.id}:${mode}`));
    return seededShuffle(
      question.choices.map((text, i) => ({ text, correct: i === question.answerIndex })),
      rng
    );
  }, [question, mode]);

  const start = (m: Mode) => {
    const pool =
      m === "daily"
        ? pickDaily(TRIVIA_QUESTIONS, new Date(), "tdt-trivia", ROUND_SIZE)
        : seededShuffle(TRIVIA_QUESTIONS, mulberry32(Date.now() >>> 0)).slice(0, ROUND_SIZE);
    setMode(m);
    setRound(pool);
    setQIndex(0);
    setPicked(null);
    setResults([]);
    setShareState(null);
    setStage("playing");
    trackGameStart(GAME_KEY, m);
  };

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setResults((r) => [...r, choices[i].correct]);
    setTimeout(() => nextBtnRef.current?.focus(), 50);
  };

  const next = () => {
    if (qIndex + 1 >= round.length) {
      const score = results.filter(Boolean).length;
      if (mode === "daily") {
        setProgress(recordDailyResult(GAME_KEY, todayKey, score));
      }
      trackGameComplete(GAME_KEY, mode, score, round.length);
      setStage("done");
    } else {
      setQIndex((i) => i + 1);
      setPicked(null);
    }
  };

  const score = results.filter(Boolean).length;

  const doShare = async () => {
    const grid = results.map((r) => (r ? "🟧" : "⬜")).join("");
    const text = `Tennessee Football Trivia ${todayKey}\n${score}/${round.length} — ${rankTitle(score)}\n${grid}\ntouchdowntennessee.com/games`;
    const outcome = await shareResult("Tennessee Football Trivia", text);
    setShareState(outcome === "copied" ? "Copied to clipboard" : outcome === "shared" ? "Shared" : "Couldn't share");
    trackGameShare(GAME_KEY);
  };

  const wrap = { maxWidth: 640, margin: "40px auto", padding: "0 24px 64px" } as const;
  const badge = (label: string, color: string) => (
    <span style={{ border: `1.5px solid ${color}`, color, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" as const }}>{label}</span>
  );

  if (stage === "intro") {
    return (
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          {badge("Daily Trivia", "#FF6600")}
          <div style={{ flex: 1, height: 1, background: "#FF6600" }} />
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.12, marginBottom: 10 }}>Tennessee Football Trivia</h1>
        <p style={{ fontSize: 15, color: "#666", fontStyle: "italic", lineHeight: 1.6, marginBottom: 18 }}>
          Ten questions. History, players, coaches, bowls, venues, Titans lore. Today&apos;s round is the same for everyone — settle it in the group chat.
        </p>
        {progress && progress.plays > 0 && (
          <p style={{ fontSize: 12, color: "#8B7355", marginBottom: 18 }}>
            Streak: <strong>{progress.streak}</strong> · Best: <strong>{progress.bestScore}/{ROUND_SIZE}</strong>
            {progress.lastPlayed === todayKey && " · You've played today's round — play it again or practice."}
          </p>
        )}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => start("daily")} style={{ background: "#FF6600", color: "#fff", border: "none", padding: "14px 28px", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-body)" }}>
            Play Today&apos;s Round
          </button>
          <button onClick={() => start("practice")} style={{ background: "#fff", color: "#1A1208", border: "2px solid #1A1208", padding: "12px 26px", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-body)" }}>
            Practice Round
          </button>
        </div>
        <p style={{ fontSize: 11, color: "#aaa", marginTop: 22, lineHeight: 1.6 }}>
          Every answer is sourced — you&apos;ll see the reference after each question. Progress is stored only on this device.
        </p>
      </div>
    );
  }

  if (stage === "playing" && question) {
    return (
      <div style={wrap}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B7355" }}>
            Question {qIndex + 1} of {round.length}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {badge(question.category, question.category === "titans" ? "#4B92DB" : "#FF6600")}
            {badge(question.difficulty, "#8B7355")}
          </div>
        </div>
        <div style={{ height: 4, background: "#F0EBE3", marginBottom: 24 }}>
          <div style={{ height: "100%", width: `${((qIndex + (picked !== null ? 1 : 0)) / round.length) * 100}%`, background: "#FF6600", transition: "width 0.3s" }} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.3, marginBottom: 22 }}>{question.question}</h2>

        <div role="group" aria-label="Answer choices">
          {choices.map((c, i) => {
            const isPicked = picked === i;
            const showState = picked !== null;
            const bg = showState ? (c.correct ? "#2a5c2a" : isPicked ? "#8f2727" : "#fff") : "#fff";
            const fg = showState && (c.correct || isPicked) ? "#fff" : "#1A1208";
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={picked !== null}
                aria-pressed={isPicked}
                style={{
                  display: "block", width: "100%", textAlign: "left", padding: "14px 18px", marginBottom: 10,
                  background: bg, color: fg, border: `2px solid ${showState && c.correct ? "#2a5c2a" : "#D4CEC7"}`,
                  fontSize: 15, fontFamily: "var(--font-body)", cursor: picked === null ? "pointer" : "default",
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontWeight: 700, marginRight: 10, color: showState && (c.correct || isPicked) ? fg : "#FF6600" }}>{String.fromCharCode(65 + i)}.</span>
                {c.text}
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          {picked !== null && (
            <div style={{ borderTop: "2px solid #1A1208", marginTop: 18, paddingTop: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: choices[picked].correct ? "#2a5c2a" : "#8f2727" }}>
                {choices[picked].correct ? "Correct." : "Not this time."}
              </p>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, marginBottom: 8 }}>{question.note}</p>
              <p style={{ fontSize: 11, color: "#8B7355", marginBottom: 16 }}>
                Source: <a href={question.source.url} target="_blank" rel="noopener noreferrer" style={{ color: "#8B7355" }}>{question.source.label}</a>
              </p>
              <button ref={nextBtnRef} onClick={next} style={{ background: "#1A1208", color: "#fff", border: "none", padding: "12px 26px", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-body)" }}>
                {qIndex + 1 >= round.length ? "See Results" : "Next Question"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // done
  return (
    <div style={wrap}>
      <div style={{ textAlign: "center", borderTop: "3px solid #1A1208", borderBottom: "3px solid #1A1208", padding: "32px 0", marginBottom: 24 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8B7355", marginBottom: 10 }}>
          {mode === "daily" ? `Daily round · ${todayKey}` : "Practice round"}
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, color: "#FF6600" }}>{score}<span style={{ fontSize: 28, color: "#1A1208" }}>/{round.length}</span></div>
        <div style={{ fontSize: 16, fontWeight: 700, marginTop: 10, letterSpacing: "0.04em" }}>{rankTitle(score)}</div>
        <div style={{ fontSize: 20, letterSpacing: 2, marginTop: 12 }} aria-hidden="true">{results.map((r) => (r ? "🟧" : "⬜")).join("")}</div>
        {mode === "daily" && progress && (
          <div style={{ fontSize: 12, color: "#8B7355", marginTop: 12 }}>
            Streak: <strong>{progress.streak}</strong> · Best: <strong>{progress.bestScore}/{ROUND_SIZE}</strong>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 8 }}>
        <button onClick={doShare} style={{ background: "#FF6600", color: "#fff", border: "none", padding: "12px 26px", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-body)" }}>
          Share Result
        </button>
        <button onClick={() => start("practice")} style={{ background: "#fff", color: "#1A1208", border: "2px solid #1A1208", padding: "10px 24px", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-body)" }}>
          Practice Round
        </button>
      </div>
      {shareState && <p style={{ textAlign: "center", fontSize: 12, color: "#8B7355" }} aria-live="polite">{shareState}</p>}

      <Link
        href="/merch"
        onClick={() => trackGameProductClick(GAME_KEY, "/merch")}
        className="article-card"
        style={{ display: "block", textDecoration: "none", color: "inherit", border: "1px solid #D4CEC7", borderTop: "3px solid #FF6600", padding: "18px 20px", marginTop: 28 }}
      >
        <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.24em", textTransform: "uppercase", color: "#FF6600", marginBottom: 8 }}>Earned a victory lap?</div>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Original Tennessee football designs in the shop</div>
        <div style={{ fontSize: 12, color: "#8B7355" }}>Independent artwork, printed to order · Frontier Collection →</div>
      </Link>
    </div>
  );
}
