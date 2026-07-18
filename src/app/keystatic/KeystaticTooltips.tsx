"use client";

import { useEffect, useState } from "react";

// Keystatic's toolbar icons have terse, jargony names and no reliable tooltip
// (and native title tooltips don't work on the disabled "Reset changes" clock).
// So we render our own: a live tooltip driven by the pointer position that
// explains each icon in plain English, including disabled ones.
const FRIENDLY: Record<string, string> = {
  "reset changes": "Undo your unsaved edits (back to the last saved version)",
  "delete entry": "Delete this project permanently",
  "copy entry": "Copy this whole project (so you can paste it as a new one)",
  "paste entry": "Paste a project you copied earlier",
  "duplicate entry": "Make a copy of this project as a new entry",
  save: "Save your changes (goes live on the site)",
  theme: "Switch between light and dark mode",
  regenerate: "Refill the web link name from the title",
  "open app navigation": "Open the menu",
  "choose file": "Upload or replace this image",
  remove: "Remove this image",
  add: "Add an image",
};

function normalize(raw: string): string {
  return raw.trim().replace(/[.…]+$/, "").toLowerCase();
}

function labelFor(el: HTMLElement): string | null {
  const raw = el.getAttribute("aria-label") || el.textContent?.trim() || "";
  if (!raw || raw.length > 44) return null;
  const key = normalize(raw);
  const known = FRIENDLY[key];
  // Only show for icon controls or the ones we have a plain-English line for,
  // so we don't spam tooltips over ordinary text buttons/links.
  const hasIcon = !!el.querySelector("svg");
  if (!known && !hasIcon) return null;
  return known ?? raw.trim();
}

export function KeystaticTooltips() {
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(
    null,
  );

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const at = document.elementFromPoint(
          e.clientX,
          e.clientY,
        ) as HTMLElement | null;
        const ctrl = at?.closest<HTMLElement>(
          "button, a[href], [role=button], [role=switch]",
        );
        if (!ctrl) return setTip(null);
        const text = labelFor(ctrl);
        if (!text) return setTip(null);
        const r = ctrl.getBoundingClientRect();
        setTip({ x: r.left + r.width / 2, y: r.bottom + 8, text });
      });
    };
    const clear = () => setTip(null);
    document.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", clear, true);
    window.addEventListener("blur", clear);
    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", clear, true);
      window.removeEventListener("blur", clear);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!tip) return null;

  return (
    <div
      role="tooltip"
      style={{
        position: "fixed",
        left: Math.min(Math.max(tip.x, 130), window.innerWidth - 130),
        top: tip.y,
        transform: "translateX(-50%)",
        zIndex: 100000,
        pointerEvents: "none",
        maxWidth: "240px",
        padding: "7px 10px",
        borderRadius: "7px",
        background: "#0a0a1a",
        color: "#fff",
        fontSize: "12px",
        lineHeight: 1.35,
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        textAlign: "center",
        boxShadow: "0 6px 22px rgba(0,0,0,0.28)",
      }}
    >
      {tip.text}
    </div>
  );
}
