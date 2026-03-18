"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BillionScene({ onAdvance }: { onAdvance: () => void }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [moveCount, setMoveCount] = useState(0);
  const noRef = useRef<HTMLButtonElement>(null);

  const showBeReal = moveCount >= 2;
  const noGone = noScale < 0.12;

  const moveNoButton = useCallback(() => {
    if (noGone) return;
    const maxX = window.innerWidth * 0.38;
    const maxY = window.innerHeight * 0.28;
    setNoPos({
      x: (Math.random() - 0.5) * maxX * 2,
      y: (Math.random() - 0.5) * maxY * 2,
    });
    setNoScale((s) => Math.max(s * 0.82, 0.08));
    setMoveCount((c) => c + 1);
  }, [noGone]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const btn = noRef.current;
      if (!btn || noGone) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      if (Math.sqrt(dx * dx + dy * dy) < 130) moveNoButton();
    },
    [noGone, moveNoButton]
  );

  return (
    <div
      className="w-full h-full bg-white flex flex-col items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center px-6 mb-20 select-none"
      >
        <p className="text-black/40 text-xl md:text-2xl mb-3 tracking-wide font-light">
          Would you like
        </p>
        <h1 className="font-black text-black leading-none tracking-tight"
            style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}>
          One Billion
          <br />
          Dollars?
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-8 items-center relative"
        style={{ minHeight: 80 }}
      >
        {/* YES */}
        <button
          onClick={onAdvance}
          className="px-12 py-4 bg-black text-white font-bold text-lg rounded-full hover:scale-105 active:scale-95 transition-transform select-none"
        >
          Yes
        </button>

        {/* NO — runs away */}
        {!noGone && (
          <motion.button
            ref={noRef}
            animate={{ x: noPos.x, y: noPos.y, scale: noScale }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            onMouseEnter={moveNoButton}
            className="px-12 py-4 border-2 border-black text-black font-bold text-lg rounded-full select-none"
            style={{ pointerEvents: noScale < 0.5 ? "none" : "auto" }}
          >
            No
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {showBeReal && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-24 text-black/35 text-sm italic tracking-wide"
          >
            be real.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
