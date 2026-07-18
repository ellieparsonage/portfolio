import { promises as fs } from "node:fs";
import path from "node:path";

// Ellie-facing guides, in reading order (Gabriel's checklist/needs are excluded).
const FILES = [
  "README.md",
  "01-how-to-edit-your-site.md",
  "02-what-is-all-this.md",
  "03-if-something-goes-wrong.md",
  "04-accounts-and-renewals.md",
  "05-editing-the-code-with-ai.md",
];

export type Guide = { slug: string; markdown: string };

export async function getGuides(): Promise<Guide[]> {
  const dir = path.join(process.cwd(), "handover");
  const guides: Guide[] = [];
  for (const file of FILES) {
    try {
      const markdown = await fs.readFile(path.join(dir, file), "utf8");
      guides.push({ slug: file.replace(/\.md$/, ""), markdown });
    } catch {
      // skip a missing file rather than break the page
    }
  }
  return guides;
}
