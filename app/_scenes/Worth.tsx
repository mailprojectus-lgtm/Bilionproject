"use client";

import { motion } from "framer-motion";

export default function WorthScene({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div
      className="w-full h-full bg-[#050505] flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={onAdvance}
    >
      <div className="text-center px-6 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.45, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-white text-xl md:text-2xl font-light mb-6 tracking-wide"
        >
          Waking up tomorrow is worth at least
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white font-black leading-none tracking-tighter"
          style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
        >
          $1,000,000,000
        </motion.h1>
      </div>
    </div>
  );
}
