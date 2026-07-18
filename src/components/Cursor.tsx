"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// A small ring that follows the pointer and swells over interactive targets
// (anything with [data-cursor] or a/button). Disabled on touch + reduced-motion.
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      setHovering(!!t?.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full border border-white bg-white"
        animate={{
          width: hovering ? 56 : 12,
          height: hovering ? 56 : 12,
          opacity: hovering ? 0.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      />
    </motion.div>
  );
}
