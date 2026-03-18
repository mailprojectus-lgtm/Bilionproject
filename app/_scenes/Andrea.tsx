"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    lines: ["Hey there."],
    size: "xl",
  },
  {
    lines: ["I'm Andrea.", "21. From Italy."],
    size: "xl",
  },
  {
    lines: [
      "For the past months, I've been working on this project—",
      "trying to help with loneliness,",
      "depression, the disconnection.",
    ],
    size: "md",
  },
  {
    lines: ["But in the process..."],
    size: "xl",
  },
  {
    lines: [
      "I realized I was the one",
      "getting lonely.",
      "And unmotivated.",
    ],
    size: "lg",
  },
];

export default function AndreaScene({ onAdvance }: { onAdvance: () => void }) {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else onAdvance();
  };

  const current = STEPS[step];

  const textSizeClass =
    current.size === "xl"
      ? "text-4xl md:text-6xl font-black tracking-tight"
      : current.size === "lg"
      ? "text-3xl md:text-5xl font-bold tracking-tight"
      : "text-xl md:text-2xl font-light leading-relaxed";

  return (
    <div
      className="w-full h-full bg-[#0a0807] flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={next}
    >
      <div className="text-center px-8 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            {current.lines.map((line, i) => (
              <p key={i} className={`text-white ${textSizeClass}`}>
                {line}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p
          key={`hint-${step}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-white text-xs tracking-widest uppercase mt-14"
        >
          tap
        </motion.p>
      </div>
    </div>
  );
}
