"use client";

import { motion } from "framer-motion";

export default function ElevenScene({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div
      className="w-full h-full bg-[#080808] flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={onAdvance}
    >
      <div className="text-center px-6 max-w-xl mx-auto flex flex-col items-center">

        {/* "Every" label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.35, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white text-sm tracking-[0.3em] uppercase font-light mb-4"
        >
          Every
        </motion.p>

        {/* Big stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-baseline gap-3 mb-2"
        >
          <span
            className="font-black text-white leading-none"
            style={{ fontSize: "clamp(7rem, 22vw, 15rem)" }}
          >
            11
          </span>
          <span
            className="text-white/45 font-light"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
          >
            min
          </span>
        </motion.div>

        {/* Main line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-white font-light mb-10"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}
        >
          someone takes their own life.
        </motion.p>

        {/* Thin divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.7, ease: "easeOut" }}
          className="w-12 h-px bg-white/20 mb-10"
        />

        {/* Sub copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="space-y-1 text-center"
        >
          <p className="text-white/35 font-light" style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)" }}>
            But we don&apos;t have to go that far
          </p>
          <p className="text-white/55 font-light" style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)" }}>
            to see there&apos;s a problem in today&apos;s reality.
          </p>
        </motion.div>

        {/* Tap hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ delay: 3, duration: 1.2 }}
          className="text-white text-xs tracking-widest uppercase mt-14"
        >
          tap to continue
        </motion.p>

      </div>
    </div>
  );
}
