"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSound } from "../../hooks/useSound";

export default function CatchScene({ onAdvance }: { onAdvance: () => void }) {
  const { play, stop } = useSound("/sounds/heartbeat.mp3");

  useEffect(() => {
    const t = setTimeout(() => {
      play({ loop: true, volume: 0.55 });
    }, 300);
    return () => {
      clearTimeout(t);
      stop();
    };
  }, [play, stop]);

  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={onAdvance}
    >
      {/* Slow, subtle heartbeat glow — much slower and more subtle */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: [
            "#090909",
            "#1a0505",
            "#090909",
            "#140404",
            "#090909",
          ],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.28, 0.5, 0.72, 1],
        }}
      />

      {/* Subtle radial glow in center */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(120,0,0,0.18) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0, 1, 0, 0.7, 0] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.28, 0.5, 0.72, 1],
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-white text-xl md:text-2xl mb-5 tracking-wide font-light"
        >
          The catch:
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9, ease: "easeOut" }}
          className="text-white text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight"
        >
          Tomorrow
          <br />
          you die.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="text-white text-lg md:text-2xl mb-14 font-light"
        >
          And you take the money with you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.7 }}
          onClick={onAdvance}
          className="px-8 py-3 border border-white/30 text-white/80 rounded-full text-sm hover:border-white/70 hover:text-white transition-colors"
        >
          Still want to say yes?
        </motion.button>
      </div>
    </div>
  );
}
