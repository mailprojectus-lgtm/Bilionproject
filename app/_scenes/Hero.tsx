"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Co-founder", "Coworker", "Friend", "A mate"];

export default function HeroScene({ onAdvance }: { onAdvance: () => void }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [showCycle, setShowCycle] = useState(false);

  // First show "Hi. I'm looking for a", then start cycling
  useEffect(() => {
    const t = setTimeout(() => setShowCycle(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showCycle) return;
    const id = setInterval(() => {
      setWordIdx((i) => (i + 1) % WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, [showCycle]);

  return (
    <div
      className="w-full h-full bg-[#070707] flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={onAdvance}
    >
      <div className="text-center px-8">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 0.45, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
          className="text-white text-xl md:text-3xl font-light tracking-widest mb-3"
        >
          Hi.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: "easeOut" }}
          className="text-white/80 text-2xl md:text-4xl font-light mb-4 tracking-tight"
        >
          I&apos;m looking for a
        </motion.p>

        <div className="h-20 md:h-28 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!showCycle ? (
              <motion.span
                key="placeholder"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl font-extrabold text-white block tracking-tight"
              >
                {WORDS[0]}
              </motion.span>
            ) : (
              <motion.span
                key={wordIdx}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl font-extrabold text-white block tracking-tight"
              >
                {WORDS[wordIdx]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 3, duration: 1.5 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <div className="w-px h-8 bg-white/30 animate-pulse" />
          <span className="text-white/30 text-xs tracking-widest uppercase">
            scroll
          </span>
        </motion.div>
      </div>
    </div>
  );
}
