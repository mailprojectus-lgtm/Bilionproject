"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    type: "question",
    lines: ["So why are you reading this?"],
    sub: null,
  },
  {
    type: "answer",
    lines: ["Because I need you."],
    sub: "For a fresh start. For creating something great.",
  },
  {
    type: "projects",
    lines: ["I need a team."],
    sub: null,
    items: [
      "→ Review and perfect Squeak App — squeakapp.com",
      "→ Build a second idea. Still secret.",
    ],
  },
  {
    type: "plan",
    lines: ["My plan:"],
    sub: null,
    items: [
      "Rent a place somewhere in the world. One month.",
      "Get a team. Make real connections.",
      "Work outside. Work out. Run.",
      "Work on a mission: to help others.",
    ],
  },
  {
    type: "offer",
    lines: ["One month."],
    sub: "I'll cover most expenses.",
    extra: "In exchange? A connection. A startup share. An experience.",
  },
  {
    type: "cta",
    lines: ["Are you down?"],
    sub: null,
  },
];

export default function TheAskScene() {
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;

  const next = () => {
    if (!isLast) setStep((s) => s + 1);
  };

  const current = STEPS[step];

  return (
    <div
      className="w-full h-full bg-[#060606] flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={!isLast ? next : undefined}
    >
      <div className="text-center px-8 max-w-xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Headline */}
            {current.lines.map((line, i) => (
              <p
                key={i}
                className={`text-white font-black tracking-tight leading-none mb-4 ${
                  current.type === "cta"
                    ? "text-6xl md:text-8xl"
                    : "text-4xl md:text-5xl"
                }`}
              >
                {line}
              </p>
            ))}

            {/* Sub */}
            {current.sub && (
              <p className="text-white/60 text-lg md:text-xl font-light mb-6">
                {current.sub}
              </p>
            )}

            {/* Extra */}
            {"extra" in current && current.extra && (
              <p className="text-white/50 text-base md:text-lg font-light mt-4">
                {current.extra}
              </p>
            )}

            {/* Items */}
            {"items" in current && current.items && (
              <div className="mt-6 space-y-3 text-left">
                {(current.items as string[]).map((item, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="text-white/70 text-base md:text-lg"
                  >
                    {item}
                  </motion.p>
                ))}
              </div>
            )}

            {/* CTA final screen */}
            {current.type === "cta" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mt-10 space-y-4"
              >
                <p className="text-white/50 text-lg font-light">
                  Hit me up and join the journey.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                  <a
                    href="tel:+393395441023"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full text-base hover:bg-white/90 active:scale-95 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    +39 339 544 1023
                  </a>
                  <a
                    href="mailto:mail.project.us@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white font-medium rounded-full text-base hover:border-white/60 active:scale-95 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Send an email
                  </a>
                </div>

                <p className="text-white/25 text-sm mt-8">
                  Andrea &nbsp;·&nbsp; 2026
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {!isLast && (
          <motion.p
            key={`hint-${step}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-white text-xs tracking-widest uppercase mt-12"
          >
            tap
          </motion.p>
        )}
      </div>
    </div>
  );
}
