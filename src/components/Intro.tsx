"use client";

import { motion } from "motion/react";
import { useJump } from "@/lib/useJump";
import type { SiteSettings } from "@/lib/content";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Intro({ settings }: { settings: SiteSettings }) {
  const jump = useJump();
  return (
    <section className="safe-x safe-t safe-b relative flex h-[100svh] flex-col justify-between bg-blue text-paper">
      {/* top row */}
      <div className="flex items-start justify-between">
        <motion.p
          className="mono-label max-w-[16ch] leading-relaxed text-paper/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {settings.role}
          <br />
          Selected Work, 2026
        </motion.p>

        <div className="vertical-rl mono-label h-[34vh] text-right tracking-[0.35em] text-paper sm:h-[40vh]">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {settings.name}
          </motion.span>
        </div>
      </div>

      {/* headline */}
      <div className="select-none">
        <h1 className="display type-hero text-paper">
          {[settings.heroLine1, settings.heroLine2].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="inline-block"
                variants={line}
                initial="hidden"
                animate="show"
                custom={i}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.button
          onClick={() => jump("contents")}
          data-cursor
          className="mono-label mt-6 flex items-center gap-2 text-paper/70 transition-colors hover:text-paper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <motion.span
            aria-hidden
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          Scroll to explore
        </motion.button>
      </div>
    </section>
  );
}
