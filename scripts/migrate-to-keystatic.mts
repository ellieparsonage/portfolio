import { promises as fs } from "node:fs";
import path from "node:path";
import { stringify } from "yaml";
import { projects } from "../src/lib/projects.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_IMG = path.join(ROOT, "public", "work"); // existing curated images
const OUT_IMG = path.join(ROOT, "public", "images", "work");
const OUT_CONTENT = path.join(ROOT, "src", "content", "projects");

// which gallery image (1-based) is each project's cover
const COVER: Record<string, number> = {
  "album-cover": 1,
  "bread-and-butter": 3,
  "emmies-wonder-wardrobe": 2,
  silkweaver: 1,
  happiee: 2,
  moonbug: 2,
  pokket: 2,
  pictorium: 3,
  "my-first": 1,
};

// start clean so we exactly mirror Keystatic's on-disk layout:
//   public/images/work/<slug>/cover.jpg
//   public/images/work/<slug>/images/<0-based index>.jpg
await fs.rm(OUT_IMG, { recursive: true, force: true });
await fs.mkdir(OUT_IMG, { recursive: true });
await fs.mkdir(OUT_CONTENT, { recursive: true });

for (const [i, p] of projects.entries()) {
  const dir = path.join(OUT_IMG, p.slug);
  await fs.mkdir(path.join(dir, "images"), { recursive: true });

  const imagePaths: string[] = [];
  for (let n = 0; n < p.images.length; n++) {
    const srcName = `${String(n + 1).padStart(2, "0")}.jpg`;
    await fs.copyFile(
      path.join(SRC_IMG, p.slug, srcName),
      path.join(dir, "images", `${n}.jpg`),
    );
    imagePaths.push(`/images/work/${p.slug}/images/${n}.jpg`);
  }

  const coverSrc = `${String(COVER[p.slug] ?? 1).padStart(2, "0")}.jpg`;
  await fs.copyFile(
    path.join(SRC_IMG, p.slug, coverSrc),
    path.join(dir, "cover.jpg"),
  );

  const data = {
    title: p.title,
    number: p.number,
    order: i + 1,
    category: p.category,
    description: p.description,
    cover: `/images/work/${p.slug}/cover.jpg`,
    images: imagePaths,
  };
  await fs.writeFile(
    path.join(OUT_CONTENT, `${p.slug}.yaml`),
    stringify(data),
    "utf8",
  );
  console.log(`${p.slug}: ${imagePaths.length} images, cover ${coverSrc}`);
}

const settings = {
  name: "Ellie Parsonage",
  role: "Graphic Designer",
  heroLine1: "Design",
  heroLine2: "Portfolio",
  available: "Available for freelance & collaboration",
  contactHeading: "Let's make something.",
  contactEmail: "hello@example.com",
};
await fs.writeFile(
  path.join(ROOT, "src", "content", "settings.yaml"),
  stringify(settings),
  "utf8",
);
console.log("wrote settings.yaml\nDONE");
