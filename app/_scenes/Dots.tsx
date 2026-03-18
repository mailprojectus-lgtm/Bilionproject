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
  dim: "#1f2937",
  red: "#ef4444",
  crimson: "#991b1b",
  amber: "#f59e0b",
  bright: "#ffffff",
};

export default function DotsScene({ onAdvance }: { onAdvance: () => void }) {
  const [dots, setDots] = useState<Dot[]>(
    Array.from({ length: 100 }, () => ({ visible: false, color: "dim" as DotColor }))
  );
  const [phase, setPhase] = useState<Phase>("appearing");
  const phaseRef = useRef<Phase>("appearing");
  const nextHighlightRef = useRef(0);
  const canAdvanceRef = useRef(false);

  // Phase 1: dots appear one by one
  useEffect(() => {
    if (phase !== "appearing") return;
    let i = 0;
    const id = setInterval(() => {
      setDots((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], visible: true };
        return next;
      });
      if (i % 4 === 0) playOneShot("/sounds/click.wav", 0.18);
      i++;
      if (i >= 100) {
        clearInterval(id);
        setTimeout(() => {
          setPhase("intro");
          phaseRef.current = "intro";
          canAdvanceRef.current = true;
        }, 700);
      }
    }, 30);
    return () => clearInterval(id);
  }, [phase]);

  // Phase 3+: light up dots for each stat
  useEffect(() => {
    if (!phase.startsWith("stat-")) return;
    const statIdx = parseInt(phase.split("-")[1]);
    const stat = STATS[statIdx];
    let lit = 0;
    canAdvanceRef.current = false;

    const id = setInterval(() => {
      if (lit >= stat.count) {
        clearInterval(id);
        setTimeout(() => {
          canAdvanceRef.current = true;
        }, 600);
        return;
      }
      setDots((prev) => {
        const next = [...prev];
        for (let i = nextHighlightRef.current; i < 100; i++) {
          if (next[i].color === "dim" && next[i].visible) {
            next[i] = { ...next[i], color: stat.color };
            nextHighlightRef.current = i + 1;
            lit++;
            playOneShot("/sounds/click.wav", 0.12);
            break;
          }
        }
        return next;
      });
    }, 55);

    return () => clearInterval(id);
  }, [phase]);

  const advancePhase = useCallback(() => {
    if (!canAdvanceRef.current) return;
    const order: Phase[] = [
      "intro",
      "stat-0",
      "stat-1",
      "stat-2",
      "stat-3",
      "done",
    ];
    const idx = order.indexOf(phaseRef.current);
    if (idx === -1) return;
    if (idx === order.length - 1) {
      onAdvance();
      return;
    }
    const next = order[idx + 1];
    phaseRef.current = next;
    setPhase(next);
  }, [onAdvance]);

  const statIdx = phase.startsWith("stat-")
    ? parseInt(phase.split("-")[1])
    : -1;
  const currentStat = statIdx >= 0 ? STATS[statIdx] : null;

  return (
    <div
      className="w-full h-full bg-[#060606] flex flex-col items-center justify-center px-6 cursor-pointer select-none"
      onClick={phase !== "appearing" ? advancePhase : undefined}
    >
      {/* Dots grid */}
      <div
        className="grid gap-[6px] mb-10"
        style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
      >
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: dot.visible ? 1 : 0,
              opacity: dot.visible ? 1 : 0,
              backgroundColor: DOT_COLORS[dot.color],
            }}
            transition={{
              scale: { duration: 0.18, ease: "backOut" },
              backgroundColor: { duration: 0.3 },
              opacity: { duration: 0.18 },
            }}
            className="w-5 h-5 md:w-6 md:h-6 rounded-full"
          />
        ))}
      </div>

      {/* Text area */}
      <div className="h-24 flex flex-col items-center justify-center">
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
              <p className="text-white/30 text-xs tracking-widest uppercase mt-3">
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
              <p className="text-white text-2xl md:text-3xl font-bold mb-1">
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
