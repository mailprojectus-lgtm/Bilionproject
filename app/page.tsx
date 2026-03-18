"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import HeroScene from "./_scenes/Hero";
import BillionScene from "./_scenes/Billion";
import CatchScene from "./_scenes/Catch";
import WorthScene from "./_scenes/Worth";
import ElevenScene from "./_scenes/Eleven";
import DotsScene from "./_scenes/Dots";
import IfEvenOneScene from "./_scenes/IfEvenOne";
import AndreaScene from "./_scenes/Andrea";
import TheAskScene from "./_scenes/TheAsk";

type SceneKey =
  | "hero"
  | "billion"
  | "catch"
  | "worth"
  | "eleven"
  | "dots"
  | "ifeven"
  | "andrea"
  | "ask";

const SCENES: SceneKey[] = [
  "hero",
  "billion",
  "catch",
  "worth",
  "eleven",
  "dots",
  "ifeven",
  "andrea",
  "ask",
];

// These scenes block scroll-based navigation
const SCROLL_BLOCKED = new Set<SceneKey>(["billion", "dots"]);

const BG_COLORS: Record<SceneKey, string> = {
  hero: "#070707",
  billion: "#ffffff",
  catch: "#090909",
  worth: "#050505",
  eleven: "#080808",
  dots: "#060606",
  ifeven: "#050505",
  andrea: "#0a0807",
  ask: "#060606",
};

const pageVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "100vh" : "-100vh",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? "-50vh" : "50vh",
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" as const },
  }),
};

export default function Page() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const cooldown = useRef(false);
  const currentKey = SCENES[idx];

  const navigate = useCallback(
    (delta: number) => {
      const next = idx + delta;
      if (next < 0 || next >= SCENES.length) return;
      if (cooldown.current) return;
      cooldown.current = true;
      setTimeout(() => {
        cooldown.current = false;
      }, 900);
      setDir(delta);
      setIdx(next);
    },
    [idx]
  );

  const advance = useCallback(() => navigate(1), [navigate]);
  const retreat = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    if (SCROLL_BLOCKED.has(currentKey)) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 10) return;
      if (e.deltaY > 0) advance();
      else retreat();
    };

    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (dy > 50) advance();
      else if (dy < -50) retreat();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [advance, retreat, currentKey]);

  const sceneMap: Record<SceneKey, React.ReactNode> = {
    hero: <HeroScene onAdvance={advance} />,
    billion: <BillionScene onAdvance={advance} />,
    catch: <CatchScene onAdvance={advance} />,
    worth: <WorthScene onAdvance={advance} />,
    eleven: <ElevenScene onAdvance={advance} />,
    dots: <DotsScene onAdvance={advance} />,
    ifeven: <IfEvenOneScene onAdvance={advance} />,
    andrea: <AndreaScene onAdvance={advance} />,
    ask: <TheAskScene />,
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ backgroundColor: BG_COLORS[currentKey] }}
    >
      <AnimatePresence custom={dir} mode="wait">
        <motion.div
          key={currentKey}
          custom={dir}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {sceneMap[currentKey]}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar — thicker */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/8 z-50">
        <motion.div
          className={`h-full ${currentKey === "billion" ? "bg-black/30" : "bg-white/40"}`}
          animate={{ width: `${((idx + 1) / SCENES.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
