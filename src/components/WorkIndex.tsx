"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import type { Project } from "@/lib/projects";
import { useJump } from "@/lib/useJump";

export function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const jump = useJump();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 35, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 35, mass: 0.5 });

  function onMove(e: React.MouseEvent) {
    const rect = wrap.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  const activeProject = active !== null ? projects[active] : null;

  return (
    <section className="hidden bg-paper px-[5vw] py-[12vh] md:block">
      <div className="mb-10 flex items-baseline justify-between border-b border-ink/15 pb-4">
        <h2 className="mono-label text-ink/60">Index / Selected Work</h2>
        <span className="mono-label text-ink/40">
          {String(projects.length).padStart(2, "0")} Projects
        </span>
      </div>

      <div ref={wrap} onMouseMove={onMove} className="relative">
        {/* floating preview follows the cursor (desktop) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 hidden aspect-[4/3] w-[26vw] max-w-[380px] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-paper shadow-2xl md:block"
          style={{ x: sx, y: sy }}
          animate={{ opacity: activeProject ? 1 : 0, scale: activeProject ? 1 : 0.85 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="popLayout">
            {activeProject && (
              <motion.div
                key={activeProject.slug}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full"
              >
                <Image
                  src={activeProject.cover.src}
                  alt=""
                  fill
                  sizes="380px"
                  className="object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <ul>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <a
                href={`#${p.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  jump(p.slug);
                }}
                data-cursor
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group grid grid-cols-[3ch_1fr] items-baseline gap-4 border-b border-ink/15 py-5 transition-colors md:grid-cols-[4ch_1fr_auto] md:py-7"
              >
                <span className="mono-label text-ink/40 transition-colors group-hover:text-blue">
                  {p.number}
                </span>

                <span
                  className="display text-ink transition-all duration-300 group-hover:text-blue group-hover:md:translate-x-3"
                  style={{ fontSize: "clamp(1.7rem, 5.2vw, 4.6rem)" }}
                >
                  {p.title}
                </span>

                <span className="mono-label col-start-2 mt-1 text-ink/50 transition-colors group-hover:text-ink md:col-start-3 md:mt-0 md:text-right">
                  {p.category}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
