"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playOneShot } from "../../hooks/useSound";

type DotColor = "dim" | "red" | "crimson" | "amber" | "bright";

interface Dot {
  visible: boolean;
  color: DotColor;
}

const STATS = [
  {
    count: 25,
    color: "red" as DotColor,
    headline: "25 feel chronically lonely.",
    sub: "That's 1 in 4. Regularly. Deeply.",
  },
  {
    count: 13,
    color: "crimson" as DotColor,
    headline: "13 will face depression this year.",
    sub: "Most will never talk about it.",
  },
  {
    count: 9,
    color: "amber" as DotColor,
    headline: "9 say social media makes them feel worse.",
    sub: "More connected. More alone.",
  },
  {
    count: 1,
    color: "bright" as DotColor,
    headline: "And 1...",
    sub: "...will attempt to end their life tonight.",
  },
];

type Phase =
  | "appearing"
  | "intro"
  | "stat-0"
  | "stat-1"
  | "stat-2"
  | "stat-3"
  | "done";

const DOT_COLORS: Record<DotColor, string> = {
  dim: "#2a2a2a",
  red: "#ef4444",
  crimson: "#991b1b",
  amber: "#f59e0b",
  bright: "#ffffff",
};

function makeDots(): Dot[] {
  return Array.from({ length: 100 }, () => ({ visible: false, color: "dim" as DotColor }));
}

export default function DotsScene({ onAdvance }: { onAdvance: () => void }) {
  const [dots, setDots] = useState<Dot[]>(makeDots);
  const [phase, setPhase] = useState<Phase>("appearing");
  const phaseRef = useRef<Phase>("appearing");
  const nextHighlightRef = useRef(0);
  const canAdvanceRef = useRef(false);
  // Mirror of dots state — lets us read current value without stale closure issues
  const dotsRef = useRef<Dot[]>(dots);

  const applyDots = useCallback((next: Dot[]) => {
    dotsRef.current = next;
    setDots(next);
  }, []);

  // Phase 1: reveal dots one by one
  useEffect(() => {
    if (phase !== "appearing") return;
    let i = 0;
    const id = setInterval(() => {
      const idx = i;
      const next = dotsRef.current.map((d, j) =>
        j === idx ? { ...d, visible: true } : d
      );
      applyDots(next);
      playOneShot("/sounds/click.wav", 0.22);
      i++;
      if (i >= 100) {
        clearInterval(id);
        setTimeout(() => {
          setPhase("intro");
          phaseRef.current = "intro";
          canAdvanceRef.current = true;
        }, 800);
      }
    }, 18);
    return () => clearInterval(id);
  }, [phase, applyDots]);

  // Stats: light up dots one by one — all side effects OUTSIDE setDots to avoid StrictMode double-call
  useEffect(() => {
    if (!phase.startsWith("stat-")) return;
    const statIdx = parseInt(phase.split("-")[1]);
    const stat = STATS[statIdx];
    let lit = 0;
    canAdvanceRef.current = false;

    const id = setInterval(() => {
      if (lit >= stat.count) {
        clearInterval(id);
        setTimeout(() => { canAdvanceRef.current = true; }, 500);
        return;
      }

      // Find next dim visible dot using the ref (always current, no closure staleness)
      const current = dotsRef.current;
      let targetIdx = -1;
      for (let i = nextHighlightRef.current; i < 100; i++) {
        if (current[i].color === "dim" && current[i].visible) {
          targetIdx = i;
          break;
        }
      }

      if (targetIdx === -1) {
        clearInterval(id);
        canAdvanceRef.current = true;
        return;
      }

      // Build new array and apply — no side effects inside setDots
      const next = current.map((d, i) =>
        i === targetIdx ? { visible: true, color: stat.color } : d
      );
      nextHighlightRef.current = targetIdx + 1;
      lit++;
      applyDots(next);
      playOneShot("/sounds/click.wav", 0.14);
    }, 60);

    return () => clearInterval(id);
  }, [phase, applyDots]);

  const advancePhase = useCallback(() => {
    if (!canAdvanceRef.current) return;
    const order: Phase[] = ["intro", "stat-0", "stat-1", "stat-2", "stat-3", "done"];
    const idx = order.indexOf(phaseRef.current);
    if (idx === -1) return;
    if (idx === order.length - 1) { onAdvance(); return; }
    const next = order[idx + 1];
    phaseRef.current = next;
    setPhase(next);
  }, [onAdvance]);

  const statIdx = phase.startsWith("stat-") ? parseInt(phase.split("-")[1]) : -1;
  const currentStat = statIdx >= 0 ? STATS[statIdx] : null;

  return (
    <div
      className="w-full h-full bg-[#060606] flex flex-col items-center justify-center cursor-pointer select-none"
      style={{ padding: "clamp(1rem, 4vw, 3rem)" }}
      onClick={phase !== "appearing" ? advancePhase : undefined}
    >
      {/* 10×10 grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "clamp(4px, 1.2vw, 10px)",
          marginBottom: "clamp(1.5rem, 4vh, 3rem)",
        }}
      >
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0, backgroundColor: DOT_COLORS["dim"] }}
            animate={{
              scale: dot.visible ? 1 : 0,
              opacity: dot.visible ? 1 : 0,
              backgroundColor: DOT_COLORS[dot.color],
            }}
            transition={{
              scale: { duration: 0.14, ease: "backOut" },
              opacity: { duration: 0.14 },
              backgroundColor: { duration: 0.3 },
            }}
            style={{
              width: "clamp(16px, 4vw, 28px)",
              height: "clamp(16px, 4vw, 28px)",
              borderRadius: "50%",
            }}
          />
        ))}
      </div>

      {/* Text */}
      <div
        style={{ minHeight: "clamp(5rem, 12vh, 8rem)" }}
        className="flex flex-col items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-white text-2xl md:text-3xl font-semibold mb-1">
                Here are 100 people.
              </p>
              <p className="text-white/30 text-xs tracking-widest uppercase mt-4">
                tap to continue
              </p>
            </motion.div>
          )}

          {currentStat && (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-white text-2xl md:text-3xl font-bold mb-2">
                {currentStat.headline}
              </p>
              <p className="text-white/55 text-base md:text-lg font-light">
                {currentStat.sub}
              </p>
              <p className="text-white/25 text-xs tracking-widest uppercase mt-4">
                tap to continue
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
