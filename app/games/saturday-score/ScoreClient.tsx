"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SCORE_PUZZLES } from "@/data/games/score-puzzles";
import { pickDailyIndex, matchesAnswer, utcDateKey } from "@/lib/games/engine";
import { loadProgress, recordDailyResult, GameProgress } from "@/lib/games/progress";
import { shareResult } from "@/lib/games/share";
import { trackGameStart, trackGameComplete, trackGameShare, trackGameProductClick } from "@/app/components/analytics";

const GAME_KEY = "saturday-score";
const MAX_CLUES = 5;

type Stage = "intro" | "playing" | "done";

// Score = 6 - clues seen when solved (5 points for a first-clue solve), 0 on a miss.
function pointsFor(cluesSeen: number, solved: boolean): number {
  return solved ? Math.max(1, 6 - cluesSeen) : 0;
}

export default function ScoreClient() {
  const todayKey = utcDateKey(new Date());
  const puzzle = SCORE_PUZZLES[pickDailyIndex(SCORE_PUZZLES.length, new Date(), "tdt-saturday-score")];

  const [stage, setStage] = useState<Stage>("intro");
  const [cluesSeen, setCluesSeen] = useState(1);
  const [guess, setGuess] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [shareState, setShareState] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Deferred so hydration completes before local progress renders
    const t = setTimeout(() => setProgress(loadProgress(GAME_KEY)), 0);
    return () => clearTimeout(t);
  }, []);

  const start = () => {
    setStage("playing");
    setCluesSeen(1);
    setWrongGuesses([]);
    setGuess("");
    setSolved(false);
    setShareState(null);
    trackGameStart(GAME_KEY, "daily");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const finish = (didSolve: boolean, seen: number) => {
    const score = pointsFor(seen, didSolve);
    setSolved(didSolve);
    setProgress(recordDailyResult(GAME_KEY, todayKey, score));
    trackGameComplete(GAME_KEY, "daily", score, 5);
    setStage("done");
  };

  const submitGuess = () => {
    const g = guess.trim();
    if (!g) return;
    if (matchesAnswer(g, puzzle.aliases)) {
      finish(true, cluesSeen);
      return;
    }
    setWrongGuesses((w) => [...w, g]);
    setGuess("");
    if (cluesSeen >= MAX_CLUES) {
      finish(false, MAX_CLUES);
    } else {
      setCluesSeen((c) => c + 1);
      setFlash("Not it — here's another clue.");
      setTimeout(() => setFlash(null), 1800);
      inputRef.current?.focus();
    }
  };

  const skipClue = () => {
    if (cluesSeen >= MAX_CLUES) return;
    setCluesSeen((c) => c + 1);
    inputRef.current?.focus();
  };

  const score = pointsFor(cluesSeen, solved);

  const doShare = async () => {
    const grid = Array.from({ length: MAX_CLUES }, (_, i) => {
      if (solved && i === cluesSeen - 1) return "🟩";
      if (i < cluesSeen - (solved ? 1 : 0)) return "🟥";
      return solved ? "⬜" : "🟥";
    }).join("");
    const text = `Saturday Score ${todayKey}\n${solved ? `Solved on clue ${cluesSeen} — ${score}/5` : "Stumped today — 0/5"}\n${grid}\ntouchdowntennessee.com/games`;
    const outcome = await shareResult("Saturday Score", text);
    setShareState(outcome === "copied" ? "Copied to clipboard" : outcome === "shared" ? "Shared" : "Couldn't share");
    trackGameShare(GAME_KEY);
  };

  const wrap = { maxWidth: 640, margin: "40px auto", padding: "0 24px 64px" } as const;

  if (stage === "intro") {
    return (
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ border: "1.5px solid #4B92DB", color: "#4B92DB", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", padding: "3px 8px", textTransform: "uppercase" }}>Daily Puzzle</span>
          <div style={{ flex: 1, height: 1, background: "#4B92DB" }} />
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.12, marginBottom: 10 }}>Saturday Score</h1>
        <p style={{ fontSize: 15, color: "#666", fontStyle: "italic", lineHeight: 1.6, marginBottom: 18 }}>
          One answer from Tennessee football history — a person, a game, a season, a place, a tradition. Five clues, hardest first. Solve early, score big.
        </p>
        {progress && progress.plays > 0 && (
          <p style={{ fontSize: 12, color: "#8B7355", marginBottom: 18 }}>
            Streak: <strong>{progress.streak}</strong> · Best: <strong>{progress.bestScore}/5</strong>
            {progress.lastPlayed === todayKey && " · You've played today — replays don't change your streak."}
          </p>
        )}
        <button onClick={start} style={{ background: "#4B92DB", color: "#fff", border: "none", padding: "14px 28px", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>
          Play Today&apos;s Puzzle
        </button>
        <p style={{ fontSize: 11, color: "#aaa", marginTop: 22, lineHeight: 1.6 }}>
          Same puzzle for everyone each day. Progress is stored only on this device.
        </p>
      </div>
    );
  }

  if (stage === "playing") {
    return (
      <div style={wrap}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B7355" }}>Clue {cluesSeen} of {MAX_CLUES}</span>
          <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4B92DB", fontWeight: 700 }}>Worth {pointsFor(cluesSeen, true)} point{pointsFor(cluesSeen, true) !== 1 ? "s" : ""}</span>
        </div>

        <ol style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          {puzzle.clues.slice(0, cluesSeen).map((clue, i) => (
            <li key={i} style={{ borderLeft: `3px solid ${i === cluesSeen - 1 ? "#4B92DB" : "#D4CEC7"}`, padding: "10px 16px", marginBottom: 10, background: i === cluesSeen - 1 ? "#F7FAFD" : "#FAFAF8", fontSize: 15, lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: "#4B92DB", marginRight: 8 }}>{i + 1}.</span>
              {clue}
            </li>
          ))}
        </ol>

        <div aria-live="polite" style={{ minHeight: 20, marginBottom: 8 }}>
          {flash && <span style={{ fontSize: 13, color: "#8f2727", fontStyle: "italic" }}>{flash}</span>}
        </div>

        <label htmlFor="score-guess" style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
          Your guess
        </label>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            id="score-guess"
            ref={inputRef}
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitGuess()}
            placeholder="Person, game, place, tradition…"
            autoComplete="off"
            style={{ flex: 1, padding: "12px 14px", fontSize: 15, fontFamily: "Georgia, serif", border: "2px solid #1A1208", outline: "none" }}
          />
          <button onClick={submitGuess} style={{ background: "#1A1208", color: "#fff", border: "none", padding: "12px 22px", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Guess
          </button>
        </div>
        {cluesSeen < MAX_CLUES && (
          <button onClick={skipClue} style={{ background: "none", border: "none", color: "#8B7355", fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif", padding: 0, textDecoration: "underline" }}>
            Skip to the next clue (costs a point)
          </button>
        )}
        {wrongGuesses.length > 0 && (
          <p style={{ fontSize: 12, color: "#8B7355", marginTop: 14 }}>
            Guessed: {wrongGuesses.join(" · ")}
          </p>
        )}
      </div>
    );
  }

  // done
  return (
    <div style={wrap}>
      <div style={{ textAlign: "center", borderTop: "3px solid #1A1208", borderBottom: "3px solid #1A1208", padding: "32px 0", marginBottom: 24 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8B7355", marginBottom: 10 }}>Saturday Score · {todayKey}</div>
        <div style={{ fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: solved ? "#2a5c2a" : "#8f2727", fontWeight: 700, marginBottom: 8 }}>
          {solved ? `Solved on clue ${cluesSeen}` : "Stumped today"}
        </div>
        <div style={{ fontSize: 30, fontWeight: 900, marginBottom: 6 }}>{puzzle.answer}</div>
        <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, color: "#4B92DB" }}>{score}<span style={{ fontSize: 24, color: "#1A1208" }}>/5</span></div>
        {progress && (
          <div style={{ fontSize: 12, color: "#8B7355", marginTop: 12 }}>
            Streak: <strong>{progress.streak}</strong> · Best: <strong>{progress.bestScore}/5</strong>
          </div>
        )}
      </div>

      <p style={{ fontSize: 15, lineHeight: 1.7, color: "#2A2118", marginBottom: 8 }}>{puzzle.explanation}</p>
      <p style={{ fontSize: 11, color: "#8B7355", marginBottom: 24 }}>
        Source: <a href={puzzle.source.url} target="_blank" rel="noopener noreferrer" style={{ color: "#8B7355" }}>{puzzle.source.label}</a>
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 8 }}>
        <button onClick={doShare} style={{ background: "#4B92DB", color: "#fff", border: "none", padding: "12px 26px", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>
          Share Result
        </button>
        <Link href="/games/tennessee-football-trivia" style={{ background: "#fff", color: "#1A1208", border: "2px solid #1A1208", padding: "10px 24px", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none", fontFamily: "Georgia, serif" }}>
          Play the Trivia
        </Link>
      </div>
      {shareState && <p style={{ textAlign: "center", fontSize: 12, color: "#8B7355" }} aria-live="polite">{shareState}</p>}

      <Link
        href="/merch"
        onClick={() => trackGameProductClick(GAME_KEY, "/merch")}
        className="article-card"
        style={{ display: "block", textDecoration: "none", color: "inherit", border: "1px solid #D4CEC7", borderTop: "3px solid #4B92DB", padding: "18px 20px", marginTop: 28 }}
      >
        <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.24em", textTransform: "uppercase", color: "#4B92DB", marginBottom: 8 }}>New puzzle tomorrow</div>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Meanwhile — original Tennessee designs in the shop</div>
        <div style={{ fontSize: 12, color: "#8B7355" }}>Independent artwork, printed to order →</div>
      </Link>
    </div>
  );
}
