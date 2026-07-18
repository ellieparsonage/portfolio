"use client";

import { useEffect } from "react";

const IMG_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

// Keystatic (0.5.x) shows gallery array items as plain rows, not thumbnails.
// We surface each row's filename via itemLabel, then render a real thumbnail
// from it here. Self-heals via the observer if Keystatic re-renders a row.
export function KeystaticGalleryThumbs() {
  useEffect(() => {
    const getSlug = () => {
      const m = location.pathname.match(/\/item\/([^/?#]+)/);
      return m ? decodeURIComponent(m[1]) : null;
    };

    let queued = false;
    const apply = () => {
      queued = false;
      const slug = getSlug();
      if (!slug) return;
      document
        .querySelectorAll<HTMLElement>('[class*="ListViewItem-grid"]')
        .forEach((row) => {
          if (row.querySelector(".ks-thumb")) return;
          const label = [...row.querySelectorAll<HTMLElement>("*")].find(
            (el) =>
              el.children.length === 0 &&
              IMG_RE.test((el.textContent || "").trim()),
          );
          if (!label) return;
          const rel = (label.textContent || "").trim();
          const src = rel.startsWith("/") ? rel : `/images/work/${slug}/${rel}`;
          const img = document.createElement("img");
          img.className = "ks-thumb";
          img.src = src;
          img.alt = "";
          img.loading = "lazy";
          img.onerror = () => img.remove();
          label.parentElement?.insertBefore(img, label);
          label.parentElement?.classList.add("ks-thumb-cell");
          label.classList.add("ks-thumb-name");
        });
    };

    apply();
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
