"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MARGIN = 48;
const BTN_W = 168;
const BTN_H = 56;

type Mode = "flex" | "floating";

export default function BillionScene({ onAdvance }: { onAdvance: () => void }) {
  const noRef = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<Mode>("flex");
  // floating mode: absolute left/top of button's top-left corner
  const [initPos, setInitPos] = useState({ x: 0, y: 0 });
  const [absPos, setAbsPos] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [noOpacity, setNoOpacity] = useState(1);
  const [pressCount, setPressCount] = useState(0);
  const noGone = noScale < 0.12;

  const randomPos = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: MARGIN + Math.random() * (vw - BTN_W - 2 * MARGIN),
      y: MARGIN + Math.random() * (vh - BTN_H - 2 * MARGIN),
    };
  }, []);

  const handleNoPress = useCallback(() => {
    if (noGone) return;

    if (mode === "flex" && noRef.current) {
      // Capture exact current position (user has clicked = page is fully visible, no animation)
      const rect = noRef.current.getBoundingClientRect();
      const captured = { x: rect.left, y: rect.top };
      const target = randomPos();
      setInitPos(captured);
      setAbsPos(target);
      setMode("floating");
    } else {
      setAbsPos(randomPos());
    }

    setNoScale((s) => Math.max(s * 0.78, 0.08));
    setNoOpacity((o) => Math.max(o * 0.72, 0.08));
    setPressCount((c) => c + 1);
  }, [mode, noGone, randomPos]);

  return (
    <div className="w-full h-full bg-[#060606] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center px-6 mb-20 select-none"
      >
        <p className="text-white/40 text-xl md:text-2xl mb-3 tracking-wide font-light">
          Would you like
        </p>
        <h1
          className="font-black text-white leading-none tracking-tight"
          style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}
        >
          One Billion
          <br />
          Dollars?
        </h1>
      </motion.div>

      {/* Buttons — always in flex row so they appear side-by-side on load */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-8 items-center"
      >
        {/* YES */}
        <button
          onClick={onAdvance}
          className="px-12 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 active:scale-95 transition-transform select-none"
        >
          Yes
        </button>

        {/* NO in flex — shown until first press; replaced by spacer so YES never shifts */}
        {mode === "flex" && !noGone ? (
          <button
            ref={noRef}
            onClick={handleNoPress}
            className="px-12 py-4 border-2 border-white/70 text-white font-bold text-lg rounded-full select-none"
          >
            No
          </button>
        ) : (
          <div style={{ width: BTN_W, height: BTN_H, flexShrink: 0 }} />
        )}
      </motion.div>

      {/* NO floating — absolutely positioned after first press */}
      {mode === "floating" && !noGone && (
        <motion.button
          initial={{ x: initPos.x, y: initPos.y, scale: 1 }}
          animate={{ x: absPos.x, y: absPos.y, scale: noScale, opacity: noOpacity }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 22,
          }}
          onClick={handleNoPress}
          className="absolute px-12 py-4 border-2 border-white/70 text-white font-bold text-lg rounded-full select-none"
          style={{
            left: 0,
            top: 0,
            pointerEvents: noScale < 0.45 ? "none" : "auto",
          }}
        >
          No
        </motion.button>
      )}

      {/* "be real" — fades in slowly after first press */}
      <AnimatePresence>
        {pressCount >= 1 && (
          <motion.p
            key="be-real"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2.2, ease: "easeIn" }}
            className="absolute bottom-10 left-0 right-0 text-center text-white text-sm italic tracking-wide select-none"
            style={{ zIndex: 20 }}
          >
            be real.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
