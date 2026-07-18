"use client";

import { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Guide } from "@/lib/guides";

// A fenced code block (e.g. the AI prompt) with a one-click copy button.
function CopyablePre({ node: _node, ...props }: React.ComponentProps<"pre"> & { node?: unknown }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked; leave the button as-is
    }
  };

  return (
    <div className="help-code">
      <button type="button" className="help-copy" onClick={copy}>
        {copied ? "Copied ✓" : "Copy"}
      </button>
      <pre ref={ref} {...props} />
    </div>
  );
}

// point relative image + guide links at the right place on this single page
function fixUrl(url: string): string {
  if (!url) return url;
  if (/^\.?\/?images\//.test(url))
    return url.replace(/^\.?\/?images\//, "/help-images/");
  if (url.endsWith(".md")) return "#" + url.replace(/^\.?\//, "").replace(/\.md$/, "");
  return url;
}

function titleOf(markdown: string): string {
  const m = markdown.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/[.…]+$/, "").trim() : "Guide";
}

function stripFirstHeading(markdown: string): string {
  return markdown.replace(/^#\s+.+(\r?\n)?/, "");
}

// Lower-case and strip accents so "cafe" matches "café", "GITHUB" matches "GitHub".
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

// rehype plugin: wrap each search term in <mark> within visible prose (never code).
function highlightPlugin(terms: string[]) {
  const pattern = terms
    .filter(Boolean)
    .map(escapeRegExp)
    .sort((a, b) => b.length - a.length)
    .join("|");
  const re = new RegExp(`(${pattern})`, "gi");
  // Skip only fenced blocks (the AI prompt); inline `code` is fine to highlight.
  const SKIP = new Set(["pre"]);

  const visit = (node: HastNode) => {
    if (!node.children) return;
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (child.type === "element") {
        if (!SKIP.has(child.tagName ?? "")) visit(child);
        continue;
      }
      if (child.type !== "text" || !child.value) continue;
      const value = child.value;
      re.lastIndex = 0;
      if (!re.test(value)) continue;
      re.lastIndex = 0;
      const parts: HastNode[] = [];
      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(value))) {
        if (m.index > last) parts.push({ type: "text", value: value.slice(last, m.index) });
        parts.push({
          type: "element",
          tagName: "mark",
          properties: { className: ["help-hit"] },
          children: [{ type: "text", value: m[0] }],
        });
        last = m.index + m[0].length;
        if (m.index === re.lastIndex) re.lastIndex++;
      }
      if (last < value.length) parts.push({ type: "text", value: value.slice(last) });
      node.children.splice(i, 1, ...parts);
      i += parts.length - 1;
    }
  };

  return () => (tree: HastNode) => visit(tree);
}

export function HelpBrowser({ guides }: { guides: Guide[] }) {
  const [query, setQuery] = useState("");

  const items = useMemo(
    () =>
      guides.map((g) => ({
        slug: g.slug,
        title: titleOf(g.markdown),
        body: stripFirstHeading(g.markdown),
        haystack: normalize(g.markdown),
      })),
    [guides],
  );

  // Split the query into words; a guide matches when it contains all of them.
  const terms = useMemo(
    () => Array.from(new Set(normalize(query).split(/\s+/).filter(Boolean))),
    [query],
  );
  const shown = terms.length
    ? items.filter((g) => terms.every((t) => g.haystack.includes(t)))
    : items;

  const rehypePlugins = useMemo(
    () => (terms.length ? [highlightPlugin(terms)] : []),
    [terms],
  ) as React.ComponentProps<typeof ReactMarkdown>["rehypePlugins"];

  return (
    <div className="help-layout">
      <aside className="help-sidebar">
        <div className="help-search">
          <span aria-hidden>🔍</span>
          <input
            type="search"
            placeholder="Search the guides…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search the guides"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>
        <nav className="help-toc">
          {shown.map((g) => (
            <a key={g.slug} href={`#${g.slug}`}>
              {g.title}
            </a>
          ))}
          {shown.length === 0 && <p className="help-toc-empty">No matches</p>}
        </nav>
      </aside>

      <main className="help-content">
        {terms.length > 0 && (
          <p className="help-results">
            {shown.length === 0
              ? `No guides mention “${query.trim()}”.`
              : `${shown.length} guide${shown.length > 1 ? "s" : ""} mention “${query.trim()}”.`}
          </p>
        )}
        {shown.map((g) => (
          <section id={g.slug} key={g.slug} className="help-card">
            <header className="help-card-head">{g.title}</header>
            <div className="help-prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={rehypePlugins}
                urlTransform={fixUrl}
                components={{
                  table: (props) => (
                    <div className="help-table-wrap">
                      <table {...props} />
                    </div>
                  ),
                  pre: CopyablePre,
                }}
              >
                {g.body}
              </ReactMarkdown>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
