"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  type: string;
  lines: string[];
  sub: string | null;
  items?: string[];
}

const STEPS: Step[] = [
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
      "A senior Full Stack dev — elite with React Native. To build something real, not a prototype.",
      "A creative — into videography and content. To make this a social phenomenon.",
    ],
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

            {/* Items — centered */}
            {current.items && (
              <div className="mt-6 space-y-3 text-center">
                {(current.items as string[]).map((item, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.12 }}
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
                    href="https://wa.me/393395441023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-black font-bold rounded-full text-base hover:bg-white/90 active:scale-95 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* WhatsApp icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp — +39 339 544 1023
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
