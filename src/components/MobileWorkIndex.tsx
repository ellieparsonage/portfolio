"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/lib/projects";
import { useJump } from "@/lib/useJump";

// Mobile-first index: touch has no hover, so instead of the desktop's
// cursor-follow preview each project is a full-width cover card that reveals
// and settles as you scroll - its own designed experience, not a shrunk list.
export function MobileWorkIndex({ projects }: { projects: Project[] }) {
  const jump = useJump();
  return (
    <section className="safe-x bg-paper py-[9vh] md:hidden">
      <div className="mb-8 flex items-baseline justify-between border-b border-ink/15 pb-3">
        <h2 className="mono-label text-ink/60">Selected Work</h2>
        <span className="mono-label text-ink/40">
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <ul className="flex flex-col gap-[7vh]">
        {projects.map((p) => (
          <li key={p.slug}>
            <a
              href={`#${p.slug}`}
              onClick={(e) => {
                e.preventDefault();
                jump(p.slug);
              }}
              className="block"
            >
              <motion.div
                className="relative aspect-[4/5] overflow-hidden bg-[#f3f3f3]"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="relative h-full w-full"
                  initial={{ scale: 1.12 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={p.cover.src}
                    alt={`${p.title} cover`}
                    fill
                    sizes="90vw"
                    className="object-cover"
                  />
                </motion.div>
                <span className="mono-label absolute left-3 top-3 text-paper mix-blend-difference">
                  {p.number}
                </span>
              </motion.div>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="display type-card text-ink">{p.title}</h3>
                <span className="mono-label shrink-0 text-ink/40">{p.number}</span>
              </div>
              <p className="mono-label mt-2 text-ink/50">{p.category}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
