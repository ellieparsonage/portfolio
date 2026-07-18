import { createReader } from "@keystatic/core/reader";
import { readFileSync } from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import keystaticConfig from "../../keystatic.config";
import type { Project, ProjectImage } from "./projects";

const reader = createReader(process.cwd(), keystaticConfig);

export type SiteSettings = {
  name: string;
  role: string;
  heroLine1: string;
  heroLine2: string;
  available: string;
  contactHeading: string;
  contactEmail: string;
};

const DEFAULT_SETTINGS: SiteSettings = {
  name: "Ellie Parsonage",
  role: "Graphic Designer",
  heroLine1: "Design",
  heroLine2: "Portfolio",
  available: "Available for freelance & collaboration",
  contactHeading: "Let's make something.",
  contactEmail: "hello@example.com",
};

function toImage(src: string | null | undefined): ProjectImage | null {
  if (!src) return null;
  const rel = src.startsWith("/") ? src : `/images/work/${src}`;
  try {
    const abs = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
    const { width, height } = imageSize(readFileSync(abs));
    return { src: rel, w: width ?? 1600, h: height ?? 1000 };
  } catch {
    return { src: rel, w: 1600, h: 1000 };
  }
}

export async function getProjects(): Promise<Project[]> {
  const entries = await reader.collections.projects.all();
  return entries
    .map(({ slug, entry }) => {
      const images = (entry.images ?? [])
        .map((i) => toImage(i))
        .filter((i): i is ProjectImage => i !== null);
      const cover = toImage(entry.cover) ?? images[0];
      return {
        slug,
        number: entry.number,
        title: entry.title,
        category: entry.category,
        description: entry.description,
        order: entry.order,
        cover,
        images,
      };
    })
    .sort((a, b) => a.order - b.order)
    .map(({ order: _order, ...p }) => p);
}

export async function getSettings(): Promise<SiteSettings> {
  const s = await reader.singletons.settings.read();
  return { ...DEFAULT_SETTINGS, ...(s ?? {}) };
}
