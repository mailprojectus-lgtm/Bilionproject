"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    lines: [
      "If this project even manages to make",
      "a small difference.",
    ],
    sub: null,
  },
  {
    lines: [
      "To resonate with even one single person",
      "that was going to end their life...",
    ],
    sub: null,
  },
  {
    lines: ["This journey is going to be worth"],
    sub: "One Billion Dollars.",
  },
  {
    lines: ["So what?"],
    sub: null,
  },
];

export default function IfEvenOneScene({
  onAdvance,
}: {
  onAdvance: () => void;
}) {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      onAdvance();
    }
  };

  const current = STEPS[step];

  return (
    <div
      className="w-full h-full bg-[#050505] flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={next}
    >
      <div className="text-center px-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {current.lines.map((line, i) => (
              <p
                key={i}
                className={`font-light leading-snug ${
                  step === STEPS.length - 1
                    ? "text-5xl md:text-7xl font-black text-white tracking-tight"
                    : step === STEPS.length - 2 && current.sub
                    ? "text-2xl md:text-3xl text-white/70"
                    : "text-2xl md:text-3xl text-white/80"
                }`}
              >
                {line}
              </p>
            ))}

            {current.sub && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-6xl font-black text-white mt-3 tracking-tight"
              >
                {current.sub}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.p
          key={`hint-${step}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-white text-xs tracking-widest uppercase mt-12"
        >
          tap
        </motion.p>
      </div>
    </div>
  );
}
