"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/lib/projects";
import { RevealImage } from "./RevealImage";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProjectChapter({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: dividerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-linked motion on the outlined numeral - the chapter "opener".
  const numY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const numScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section id={project.slug} data-chapter data-number={project.number}>
      {/* divider / chapter opener */}
      <div
        ref={dividerRef}
        className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-blue"
      >
        <motion.img
          src={`/dividers/${project.number}.svg`}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain"
          style={{ y: numY, scale: numScale, opacity: numOpacity }}
        />
        <motion.div
          className="relative z-10 px-[5vw] text-center text-paper"
          style={{ y: titleY }}
        >
          <motion.p
            className="mono-label mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {project.number} / {project.category}
          </motion.p>
          <div className="overflow-hidden pb-[0.1em]">
            <motion.h2
              className="display type-divider"
              initial={{ y: "115%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
            >
              {project.title}
            </motion.h2>
          </div>
        </motion.div>
      </div>

      {/* brief */}
      <div className="safe-x grid gap-8 bg-paper py-[13vh] md:grid-cols-12">
        <div className="md:col-span-7">
          <motion.p
            className="mono-label text-blue"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease }}
          >
            The Brief
          </motion.p>
          <motion.p
            className="mt-6 max-w-[22ch] text-ink"
            style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)", lineHeight: 1.15 }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
          >
            {project.title}
          </motion.p>
        </div>
        <div className="md:col-span-5">
          <motion.p
            className="max-w-[46ch] text-sm leading-relaxed text-ink/70 md:text-base"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
          >
            {project.description}
          </motion.p>
          <dl className="mono-label mt-8 grid grid-cols-[8ch_1fr] gap-y-3 text-ink/50">
            <dt>Type</dt>
            <dd className="text-ink">{project.category}</dd>
            <dt>Year</dt>
            <dd className="text-ink">2026</dd>
            <dt>Role</dt>
            <dd className="text-ink">Design &amp; Art Direction</dd>
          </dl>
        </div>
      </div>

      {/* gallery */}
      <div className="safe-x bg-paper pb-[12vh]">
        <div className="flex flex-col gap-[8vh]">
          {project.images.map((im, i) => {
            const landscape = im.w >= im.h;
            const align = i % 3 === 0 ? "mx-auto" : i % 3 === 1 ? "mr-auto" : "ml-auto";
            const width = landscape ? "w-full md:w-[82%]" : "w-full md:w-[52%]";
            return (
              <figure key={im.src} className={`${width} ${align}`}>
                <RevealImage
                  image={im}
                  alt={`${project.title}, image ${i + 1}`}
                  priority={priority && i === 0}
                />
                <figcaption className="mono-label mt-3 text-ink/35">
                  {project.number}.{String(i + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
