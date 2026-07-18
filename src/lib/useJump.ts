"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

// Smoothly scrolls to a section id via Lenis and reflects it in the URL hash,
// so navigation feels continuous but sections stay deep-linkable/shareable.
export function useJump() {
  const lenis = useLenis();
  return useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.5, offset: 0 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      history.replaceState(null, "", `#${id}`);
    },
    [lenis],
  );
}
