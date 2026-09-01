import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Volume2, VolumeX } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { loadKickSave, writeKickSave } from "@/lib/saturday/scores";
import { cn } from "@/lib/cn";

type Phase = "title" | "ready" | "charging" | "flight" | "made" | "missed" | "over";

const DISTANCES = [20, 27, 33, 39, 45, 50, 53, 58, 61, 64];
const PAPER = "#f3ebe0";
const BONE = "#e7d9c6";
const CREAM = "#fff8f0";
const INK = "#16120e";
const BRAND = "#e85d04";
const G = 32.2;

function pointsFor(yards: number) {
  if (yards >= 50) return 6;
  if (yards >= 32) return 3;
  return 1;
}

function roundWind() {
  const mph = Math.round((Math.random() * 18 - 9) * 2) / 2;
  return mph;
}

type Sfx = {
  ctx: AudioContext;
  muted: boolean;
  beep: (freq: number, dur: number, type: OscillatorType, gain: number, slide?: number) => void;
  noise: (dur: number, gain: number, hp: number) => void;
};

function makeSfx(): Sfx {
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx({ latencyHint: "interactive" });
  const master = ctx.createGain();
  master.gain.value = 0.7;
  master.connect(ctx.destination);

  const api: Sfx = {
    ctx,
    muted: false,
    beep(freq, dur, type, gain, slide = freq) {
      if (api.muted) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, slide), t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g);
      g.connect(master);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    },
    noise(dur, gain, hp) {
      if (api.muted) return;
      const t = ctx.currentTime;
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = hp;
      const g = ctx.createGain();
      g.gain.setValueAtTime(gain, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(filter);
      filter.connect(g);
      g.connect(master);
      src.start(t);
      src.stop(t + dur + 0.02);
    },
  };
  return api;
}

type Sim = {
  phase: Phase;
  kickIndex: number;
  score: number;
  best: number;
  made50: boolean;
  distance: number;
  wind: number;
  power: number;
  aim: number;
  chargeT: number;
  ball: { x: number; y: number; z: number; vx: number; vy: number; vz: number; rot: number };
  cam: number;
  trauma: number;
  hitstop: number;
  resultT: number;
  particles: { x: number; y: number; vx: number; vy: number; life: number; max: number }[];
  reduced: boolean;
};

function freshSim(best: number): Sim {
  return {
    phase: "title",
    kickIndex: 0,
    score: 0,
    best,
    made50: false,
    distance: DISTANCES[0]!,
    wind: roundWind(),
    power: 0.5,
    aim: 0,
    chargeT: 0,
    ball: { x: 0, y: 2, z: 0, vx: 0, vy: 0, vz: 0, rot: 0 },
    cam: 0,
    trauma: 0,
    hitstop: 0,
    resultT: 0,
    particles: [],
    reduced: false,
  };
}

export function KickGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sim = useRef<Sim>(freshSim(0));
  const sfx = useRef<Sfx | null>(null);
  const kickRef = useRef<() => void>(() => {});
  const [ui, setUi] = useState({
    phase: "title" as Phase,
    score: 0,
    best: 0,
    distance: 20,
    wind: 0,
    power: 0.5,
    aim: 0,
    kickIndex: 0,
    muted: false,
    made50: false,
  });

  useEffect(() => {
    const save = loadKickSave();
    sim.current.best = save.best;
    sim.current.made50 = save.made50;
    sim.current.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setUi((u) => ({ ...u, best: save.best, made50: save.made50 }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const surface: HTMLCanvasElement = canvas;
    const box: HTMLDivElement = wrap;
    const g: CanvasRenderingContext2D = ctx;

    let raf = 0;
    let last = performance.now();
    let running = true;

    const mark = new Image();
    mark.src = "/brand/primary-orange.png";

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = box.clientWidth;
      const h = Math.max(320, Math.round(w * 0.56));
      surface.style.width = `${w}px`;
      surface.style.height = `${h}px`;
      surface.width = Math.round(w * dpr);
      surface.height = Math.round(h * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);

    function syncUi() {
      const s = sim.current;
      setUi((prev) => {
        if (
          prev.phase === s.phase &&
          prev.score === s.score &&
          prev.best === s.best &&
          prev.distance === s.distance &&
          prev.wind === s.wind &&
          prev.kickIndex === s.kickIndex &&
          Math.abs(prev.power - s.power) < 0.02 &&
          Math.abs(prev.aim - s.aim) < 0.02
        ) {
          return prev;
        }
        return {
          phase: s.phase,
          score: s.score,
          best: s.best,
          distance: s.distance,
          wind: s.wind,
          power: s.power,
          aim: s.aim,
          kickIndex: s.kickIndex,
          muted: prev.muted,
          made50: s.made50,
        };
      });
    }

    function burst(x: number, y: number, n: number) {
      const s = sim.current;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 20 + Math.random() * 90;
        s.particles.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 30,
          life: 0.45 + Math.random() * 0.4,
          max: 0.7,
        });
      }
    }

    function kick() {
      const s = sim.current;
      if (s.phase !== "charging") return;
      const posts = s.distance * 3;
      const angle = (40 + s.power * 8) * (Math.PI / 180);
      const speed = 54 + s.power * 58;
      s.ball.x = 0;
      s.ball.y = 2.4;
      s.ball.z = 0;
      s.ball.vx = speed * Math.cos(angle);
      s.ball.vy = speed * Math.sin(angle);
      s.ball.vz = s.aim * 18 + s.wind * 1.15;
      s.ball.rot = 0;
      s.phase = "flight";
      s.cam = 0;
      playKick();
      syncUi();
      void posts;
    }
    kickRef.current = kick;

    function playKick() {
      const a = sfx.current;
      if (!a) return;
      a.noise(0.12, 0.35, 400);
      a.beep(180, 0.16, "sine", 0.35, 55);
    }
    function playMake() {
      const a = sfx.current;
      if (!a) return;
      a.beep(392, 0.18, "triangle", 0.18, 392);
      a.beep(523, 0.28, "triangle", 0.14, 523);
      a.noise(0.5, 0.18, 800);
    }
    function playMiss() {
      const a = sfx.current;
      if (!a) return;
      a.beep(180, 0.35, "sine", 0.2, 70);
    }
    function playPost() {
      const a = sfx.current;
      if (!a) return;
      a.beep(740, 0.12, "square", 0.1, 420);
      a.noise(0.08, 0.2, 1200);
    }

    function step(dt: number) {
      const s = sim.current;
      if (s.hitstop > 0) {
        s.hitstop -= dt;
        return;
      }
      s.trauma = Math.max(0, s.trauma - dt * 1.8);

      if (s.phase === "charging") {
        s.chargeT += dt;
        s.power = 0.5 + 0.5 * Math.sin(s.chargeT * 4.4);
        s.aim = Math.sin(s.chargeT * 2.55 + 0.4);
      }

      for (const p of s.particles) {
        p.life -= dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy -= 80 * dt;
      }
      s.particles = s.particles.filter((p) => p.life > 0);

      if (s.phase === "flight") {
        const b = s.ball;
        const prevX = b.x;
        b.vx += s.wind * 0.35 * dt;
        b.vz += s.wind * 0.55 * dt;
        b.vy -= G * dt;
        const drag = Math.exp(-0.22 * dt);
        b.vx *= drag;
        b.vy *= drag;
        b.vz *= drag;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.z += b.vz * dt;
        b.rot += b.vx * dt * 0.08;
        s.cam += (b.x - s.cam) * (1 - Math.exp(-3.2 * dt));

        const posts = s.distance * 3;
        const crossed = prevX < posts && b.x >= posts;
        if (crossed) {
          const through = b.y >= 10 && b.y < 38 && Math.abs(b.z) < 9.25;
          const bar = b.y >= 9.2 && b.y <= 10.7 && Math.abs(b.z) < 10.5;
          if (through) {
            const pts = pointsFor(s.distance);
            s.score += pts;
            if (s.distance >= 50) s.made50 = true;
            s.phase = "made";
            s.resultT = 0;
            s.hitstop = s.reduced ? 0 : 0.07;
            s.trauma = s.reduced ? 0 : 0.7;
            burst(posts, 16, 28);
            playMake();
            syncUi();
          } else if (bar) {
            b.vy = Math.abs(b.vy) * 0.45;
            b.vx *= 0.35;
            s.trauma = s.reduced ? 0 : 0.55;
            playPost();
          } else {
            s.phase = "missed";
            s.resultT = 0;
            playMiss();
            syncUi();
          }
        } else if (b.y <= 0) {
          b.y = 0;
          s.phase = "missed";
          s.resultT = 0;
          playMiss();
          syncUi();
        } else if (b.x > posts + 40) {
          s.phase = "missed";
          s.resultT = 0;
          playMiss();
          syncUi();
        }
      }

      if (s.phase === "made" || s.phase === "missed") {
        s.resultT += dt;
        if (s.resultT > 1.35) {
          if (s.phase === "missed") {
            const saved = writeKickSave(s.score, s.made50);
            s.best = saved.best;
            s.phase = "over";
          } else {
            s.kickIndex += 1;
            const next = DISTANCES[Math.min(s.kickIndex, DISTANCES.length - 1)]!;
            s.distance = next + Math.max(0, s.kickIndex - DISTANCES.length + 1) * 2;
            s.wind = roundWind();
            s.phase = "ready";
            s.power = 0.5;
            s.aim = 0;
            s.ball = { x: 0, y: 2, z: 0, vx: 0, vy: 0, vz: 0, rot: 0 };
            s.cam = 0;
          }
          syncUi();
        }
      }
    }

    function draw() {
      const s = sim.current;
      const w = surface.clientWidth;
      const h = surface.clientHeight;
      const shake = s.reduced ? 0 : s.trauma * s.trauma;
      const ox = (Math.random() - 0.5) * 18 * shake;
      const oy = (Math.random() - 0.5) * 12 * shake;

      g.save();
      g.translate(ox, oy);
      g.fillStyle = PAPER;
      g.fillRect(-20, -20, w + 40, h + 40);

      if (mark.complete && mark.naturalWidth) {
        g.globalAlpha = 0.1;
        const mw = Math.min(220, w * 0.28);
        g.drawImage(mark, w * 0.08, h * 0.08, mw, mw * 0.72);
        g.globalAlpha = 1;
      }

      const ground = h * 0.7;
      const postsFt = s.distance * 3;
      const viewFt = Math.max(140, postsFt + 50);
      const originX = w * 0.16;
      function sx(ftX: number) {
        return originX + ((ftX - s.cam) / viewFt) * (w * 0.84);
      }
      function sy(ftY: number) {
        return ground - ftY * (h * 0.0128);
      }

      g.fillStyle = INK;
      g.fillRect(-20, ground, w + 40, h);

      g.strokeStyle = "rgba(255,248,240,0.18)";
      g.lineWidth = 1;
      for (let yds = 0; yds <= s.distance + 10; yds += 5) {
        const x = sx(yds * 3);
        g.beginPath();
        g.moveTo(x, ground);
        g.lineTo(x, h);
        g.stroke();
      }

      g.fillStyle = "rgba(255,248,240,0.45)";
      g.font = "600 12px Oswald, sans-serif";
      g.textAlign = "center";
      for (let yds = 10; yds <= s.distance; yds += 10) {
        g.fillText(String(yds), sx(yds * 3), ground + 22);
      }

      const px = sx(postsFt);
      const barY = sy(10);
      const topY = sy(30);
      g.strokeStyle = BRAND;
      g.lineWidth = 5;
      g.beginPath();
      g.moveTo(px - 11, ground);
      g.lineTo(px - 11, barY);
      g.moveTo(px + 11, ground);
      g.lineTo(px + 11, barY);
      g.moveTo(px - 18, barY);
      g.lineTo(px + 18, barY);
      g.moveTo(px - 18, barY);
      g.lineTo(px - 18, topY);
      g.moveTo(px + 18, barY);
      g.lineTo(px + 18, topY);
      g.stroke();

      g.fillStyle = BRAND;
      const windDir = s.wind >= 0 ? 1 : -1;
      g.beginPath();
      g.moveTo(px + 18, topY + 8);
      g.lineTo(px + 18 + windDir * (10 + Math.abs(s.wind)), topY + 14);
      g.lineTo(px + 18, topY + 20);
      g.closePath();
      g.fill();

      const b = s.ball;
      const bx = sx(b.x) + b.z * 2.4;
      const by = sy(Math.max(0, b.y));
      g.fillStyle = "rgba(22,18,14,0.28)";
      g.beginPath();
      g.ellipse(bx, ground + 6, 10, 3.5, 0, 0, Math.PI * 2);
      g.fill();

      g.save();
      g.translate(bx, by);
      g.rotate(b.rot);
      g.fillStyle = INK;
      g.beginPath();
      g.ellipse(0, 0, 9, 6, 0, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = CREAM;
      g.lineWidth = 1.2;
      g.beginPath();
      g.moveTo(-5, 0);
      g.lineTo(5, 0);
      g.stroke();
      g.restore();

      for (const p of s.particles) {
        g.globalAlpha = Math.max(0, p.life / p.max);
        g.fillStyle = BRAND;
        g.fillRect(sx(p.x) - 2, sy(p.y) - 2, 4, 4);
      }
      g.globalAlpha = 1;

      if (s.phase === "made") {
        g.fillStyle = BRAND;
        g.font = "700 42px Oswald, sans-serif";
        g.textAlign = "center";
        g.fillText(s.distance >= 50 ? "GIVE HIM 6" : "GOOD", w / 2, h * 0.28);
      }
      if (s.phase === "missed") {
        g.fillStyle = INK;
        g.font = "700 42px Oswald, sans-serif";
        g.textAlign = "center";
        g.fillText("NO GOOD", w / 2, h * 0.28);
      }

      g.restore();
    }

    function loop(now: number) {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(dt);
      draw();
      if (s.phase === "charging") syncUi();
      raf = requestAnimationFrame(loop);
    }
    const s = sim.current;
    raf = requestAnimationFrame(loop);

    function onKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space" || e.repeat) return;
      e.preventDefault();
      if (sim.current.phase === "ready") {
        sim.current.phase = "charging";
        sim.current.chargeT = 0;
        syncUi();
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      if (e.code !== "Space") return;
      e.preventDefault();
      kick();
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      void sfx.current?.ctx.close();
    };
  }, []);

  function unlock() {
    if (!sfx.current) sfx.current = makeSfx();
    void sfx.current.ctx.resume();
  }

  function play() {
    unlock();
    const s = sim.current;
    const best = s.best;
    const made50 = s.made50;
    Object.assign(s, freshSim(best));
    s.best = best;
    s.made50 = made50;
    s.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    s.phase = "ready";
    s.wind = roundWind();
    setUi((u) => ({
      ...u,
      phase: "ready",
      score: 0,
      distance: DISTANCES[0]!,
      wind: s.wind,
      kickIndex: 0,
      power: 0.5,
      aim: 0,
    }));
  }

  function onDown(e: React.PointerEvent) {
    if (ui.phase !== "ready" && ui.phase !== "charging") return;
    e.preventDefault();
    unlock();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const s = sim.current;
    s.phase = "charging";
    s.chargeT = 0;
    setUi((u) => ({ ...u, phase: "charging" }));
  }

  function onUp(e: React.PointerEvent) {
    if (sim.current.phase !== "charging") return;
    e.preventDefault();
    kickRef.current();
  }

  function toggleMute() {
    unlock();
    if (sfx.current) sfx.current.muted = !sfx.current.muted;
    setUi((u) => ({ ...u, muted: !u.muted }));
  }

  const playing = ui.phase !== "title" && ui.phase !== "over";
  const windLabel = ui.wind === 0 ? "Calm" : `${Math.abs(ui.wind).toFixed(0)} mph ${ui.wind > 0 ? "R" : "L"}`;

  return (
    <div className="border border-ink/10 bg-paper">
      <div ref={wrapRef} className="relative min-h-[320px] overflow-hidden bg-paper">
        <canvas ref={canvasRef} className="block h-auto w-full touch-none outline-none" />

        {ui.phase === "title" ? (
          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-ink via-ink/80 to-ink/15 p-5 sm:p-8">
            <p className="font-display text-xs tracking-[0.22em] text-brand">The game</p>
            <h2 className="mt-2 text-4xl text-cream sm:text-6xl">Give Him 6</h2>
            <p className="mt-3 max-w-md text-sm text-cream/80">
              Hold to charge. Release to kick. Distance climbs. Fifty and beyond is six. Miss and the kick is dead.
            </p>
            <div className="mt-6">
              <Button onClick={play} variant="primary" size="lg">
                Play
              </Button>
            </div>
          </div>
        ) : null}

        {ui.phase === "over" ? (
          <div className="absolute inset-0 flex flex-col justify-end bg-ink/70 p-5 sm:p-8">
            <p className="font-display text-xs tracking-[0.22em] text-brand">The kick is dead</p>
            <h2 className="mt-2 text-4xl text-cream sm:text-5xl">Score {ui.score}</h2>
            <p className="mt-2 text-sm text-cream/70">
              Best {ui.best}
              {ui.made50 ? " · You got him six." : ""}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={play} variant="primary" size="lg">
                Again
              </Button>
              <Link to="/shop/$slug" params={{ slug: "touchdown-tee" }} className={buttonVariants({ variant: "cream", size: "lg" })}>
                Wear the outline
              </Link>
            </div>
          </div>
        ) : null}

        {playing ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3 sm:p-4">
            <div className="bg-ink px-3 py-2 text-cream">
              <p className="font-display text-[10px] uppercase tracking-[0.18em] text-cream/55">Score</p>
              <p className="font-display text-2xl tabular-nums leading-none">{ui.score}</p>
            </div>
            <div className="bg-ink px-3 py-2 text-right text-cream">
              <p className="font-display text-[10px] uppercase tracking-[0.18em] text-cream/55">
                {ui.distance} yd · {windLabel}
              </p>
              <p className="font-display text-sm tabular-nums">Best {ui.best}</p>
            </div>
          </div>
        ) : null}
      </div>

      {playing ? (
        <div className="border-t border-ink/10 px-4 py-4 sm:px-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Meter label="Power" value={ui.power} />
            <Meter label="Aim" value={(ui.aim + 1) / 2} center />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onPointerDown={onDown}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              disabled={ui.phase === "flight" || ui.phase === "made" || ui.phase === "missed"}
              className={cn(
                "flex h-14 flex-1 touch-none items-center justify-center font-display text-sm uppercase tracking-[0.18em]",
                ui.phase === "charging" ? "bg-brand text-ink" : "bg-ink text-cream",
                "disabled:opacity-40",
              )}
            >
              {ui.phase === "charging" ? "Release" : ui.phase === "ready" ? "Hold to kick" : "In the air"}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="grid size-14 place-items-center bg-bone text-ink"
              aria-label={ui.muted ? "Unmute" : "Mute"}
            >
              {ui.muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-muted">Hold. Time the peak. Spacebar works too.</p>
        </div>
      ) : null}
    </div>
  );
}

function Meter({ label, value, center }: { label: string; value: number; center?: boolean }) {
  const pct = Math.max(0, Math.min(100, value * 100));
  return (
    <div>
      <div className="mb-1 flex justify-between font-display text-[10px] uppercase tracking-[0.16em] text-muted">
        <span>{label}</span>
        {center ? <span>Center</span> : <span>{Math.round(pct)}</span>}
      </div>
      <div className="relative h-2 bg-bone">
        {center ? (
          <>
            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-ink/35" />
            <div
              className="absolute top-[-3px] h-3.5 w-1.5 bg-brand"
              style={{ left: `calc(${pct}% - 3px)` }}
            />
          </>
        ) : (
          <div className="absolute top-0 left-0 h-full bg-brand" style={{ width: `${Math.max(4, pct)}%` }} />
        )}
      </div>
    </div>
  );
}
