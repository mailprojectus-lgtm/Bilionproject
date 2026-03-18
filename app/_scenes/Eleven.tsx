"use client";

import { motion } from "framer-motion";

export default function ElevenScene({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div
      className="w-full h-full bg-[#080808] flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={onAdvance}
    >
      <div className="text-center px-6 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-lg md:text-xl font-light tracking-widest uppercase mb-6"
        >
          Every
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-baseline justify-center gap-3 mb-6"
        >
          <span
            className="font-black text-white leading-none"
            style={{ fontSize: "clamp(6rem, 20vw, 14rem)" }}
          >
            11
          </span>
          <span className="text-white/50 text-3xl md:text-4xl font-light">
            minutes
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="text-white text-xl md:text-2xl font-light mb-14"
        >
          someone takes their own life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
          className="space-y-2"
        >
          <p className="text-white/40 text-base md:text-lg">
            But we don&apos;t have to go that far
          </p>
          <p className="text-white/60 text-base md:text-lg">
            to see there&apos;s a problem in today&apos;s reality.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
