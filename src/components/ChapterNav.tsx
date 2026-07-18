"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import type { Project } from "@/lib/projects";
import { useJump } from "@/lib/useJump";

export function ChapterNav({ projects }: { projects: Project[] }) {
  const { scrollYProgress } = useScroll();
  const jump = useJump();
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Subscribe to Lenis scroll: reveal the floating button once past the hero.
  const lenis = useLenis((l: { scroll: number }) => {
    setScrolled(l.scroll > window.innerHeight * 0.6);
  });

  const activeProject = projects.find((p) => p.slug === active);

  // Track which chapter is centered in the viewport.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Deep-link on load: honour an incoming #hash once Lenis is ready.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const t = setTimeout(() => {
      if (lenis) lenis.scrollTo(el, { immediate: true });
      else el.scrollIntoView();
    }, 120);
    return () => clearTimeout(t);
  }, [lenis]);

  const go = (slug: string) => {
    setMenuOpen(false);
    jump(slug);
  };

  return (
    <>
      {/* top scroll-progress bar */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-blue"
        style={{ scaleX: scrollYProgress }}
      />

      {/* desktop side rail */}
      <nav className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 md:flex">
        {projects.map((p) => {
          const isActive = active === p.slug;
          return (
            <button
              key={p.slug}
              onClick={() => go(p.slug)}
              data-cursor
              className="group flex items-center gap-2.5"
              aria-label={`Go to ${p.title}`}
            >
              <span
                className={`mono-label whitespace-nowrap text-right transition-all duration-300 ${
                  isActive
                    ? "text-blue opacity-100"
                    : "text-ink/60 opacity-0 group-hover:opacity-100"
                }`}
              >
                {p.title}
              </span>
              <span
                className={`h-px transition-all duration-300 ${
                  isActive ? "w-8 bg-blue" : "w-4 bg-ink/30 group-hover:w-6 group-hover:bg-ink"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* mobile jump overlay - tap empty space to dismiss */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            onClick={() => setMenuOpen(false)}
            className="safe-x safe-t fixed inset-0 z-[60] flex flex-col justify-center bg-blue text-paper md:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mono-label absolute left-[5vw] top-5 text-paper/60">
              Jump to a section
            </p>
            <ul className="flex flex-col gap-1">
              {projects.map((p) => (
                <li key={p.slug}>
                  <button
                    onClick={() => go(p.slug)}
                    className="flex w-full items-baseline gap-3 py-1.5 text-left"
                  >
                    <span className="mono-label text-paper/60">{p.number}</span>
                    <span
                      className="display"
                      style={{ fontSize: "clamp(1.4rem, 6vw, 2.2rem)" }}
                    >
                      {p.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile floating button - one thumb-zone control that toggles the menu.
          Sits ABOVE the overlay (z-70) so it becomes the close affordance too. */}
      <motion.button
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? "Close index" : "Open index"}
        className={`fixed bottom-0 right-[5vw] z-[70] mb-[max(1rem,env(safe-area-inset-bottom))] flex items-center gap-3 py-3 pl-4 pr-3.5 shadow-[0_8px_30px_rgba(0,0,255,0.35)] md:hidden ${
          menuOpen ? "bg-paper text-blue" : "bg-blue text-paper"
        }`}
        initial={{ y: 80, opacity: 0 }}
        animate={
          scrolled || menuOpen ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }
        }
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {menuOpen ? (
          <>
            <span className="mono-label">Close</span>
            <span aria-hidden className="relative h-3.5 w-3.5">
              <span className="absolute left-0 top-1/2 block h-px w-full rotate-45 bg-blue" />
              <span className="absolute left-0 top-1/2 block h-px w-full -rotate-45 bg-blue" />
            </span>
          </>
        ) : (
          <>
            {activeProject && (
              <span className="mono-label border-r border-paper/30 pr-3 text-paper/70">
                {activeProject.number}
              </span>
            )}
            <span className="mono-label">Index</span>
            <span aria-hidden className="flex flex-col gap-[3px]">
              <span className="block h-px w-4 bg-paper" />
              <span className="block h-px w-4 bg-paper" />
              <span className="block h-px w-4 bg-paper" />
            </span>
          </>
        )}
      </motion.button>
    </>
  );
}
