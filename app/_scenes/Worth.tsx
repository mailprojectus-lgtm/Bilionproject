"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TARGET = 1_000_000_000;

function formatDollars(n: number): string {
  const s = Math.floor(n).toString();
  return "$" + s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function WorthScene({ onAdvance }: { onAdvance: () => void }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 2000; // ms
    let startTime: number | null = null;
    let raf: number;

    function tick(now: number) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * TARGET));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    // Start after the subtitle fades in (~0.9s)
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 900);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-white font-black leading-none tracking-tighter tabular-nums"
          style={{ fontSize: "clamp(2.8rem, 10vw, 8rem)" }}
        >
          {formatDollars(value)}
        </motion.h1>
      </div>
    </div>
  );
}
