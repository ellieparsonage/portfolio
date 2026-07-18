import Link from "next/link";
import type { SiteSettings } from "@/lib/content";

export function Contact({ settings }: { settings: SiteSettings }) {
  return (
    <footer
      id="contact"
      className="safe-x safe-b flex min-h-[92svh] flex-col justify-between bg-blue pt-[12vh] text-paper"
    >
      <div className="max-w-[24ch]">
        <p className="mono-label text-paper/70">{settings.available}</p>
        <p
          className="display mt-6"
          style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)", lineHeight: 1.05 }}
        >
          {settings.contactHeading}
        </p>
        <Link
          href={`mailto:${settings.contactEmail}`}
          data-cursor
          className="mono-label mt-8 inline-block border-b border-paper/50 pb-1 text-base tracking-[0.1em] transition-colors hover:border-paper"
        >
          {settings.contactEmail} ↗
        </Link>
      </div>

      <div className="flex items-end justify-between">
        <h2 className="display type-thanks leading-none">
          Thank
          <br />
          You.
        </h2>
        <div className="mono-label hidden text-right text-paper/60 sm:block">
          <p>{settings.name}</p>
          <p>Design Portfolio</p>
          <p>© 2026</p>
        </div>
      </div>
    </footer>
  );
}
