// Optimises gallery images in place so uploads never bloat the repo.
//
// - Resizes anything wider/taller than MAX_EDGE down to MAX_EDGE.
// - Re-encodes JPEG/PNG/WebP at a sensible quality and strips metadata.
// - Keeps the same filename and format, so content references never break.
// - Idempotent: only overwrites when it saves at least MIN_SAVING, so running
//   it twice (or the CI committing its own result back) can't loop.
//
// Usage:
//   node scripts/optimize-images.mjs           # optimise in place
//   node scripts/optimize-images.mjs --dry     # report only, write nothing

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images", "work");
const MAX_EDGE = 2560; // longest side, in pixels
const SIZE_THRESHOLD = 900 * 1024; // only touch files heavier than this...
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 82;
const MIN_SAVING = 0.1; // ...and only rewrite if >=10% smaller
const DRY = process.argv.includes("--dry");

const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (RASTER.has(path.extname(e.name).toLowerCase())) out.push(full);
  }
  return out;
}

async function encode(pipeline, ext) {
  const p = pipeline.rotate(); // bake EXIF orientation before stripping metadata
  if (ext === ".png") return p.png({ compressionLevel: 9, palette: true }).toBuffer();
  if (ext === ".webp") return p.webp({ quality: WEBP_QUALITY }).toBuffer();
  return p.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
}

function fmt(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

async function main() {
  const files = await walk(ROOT);
  let changed = 0;
  let before = 0;
  let after = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const orig = await readFile(file);
    let pipeline = sharp(orig, { failOn: "none" });

    const meta = await pipeline.metadata();
    const oversized = meta.width && meta.height && Math.max(meta.width, meta.height) > MAX_EDGE;
    const heavy = orig.length > SIZE_THRESHOLD;

    // Leave already-reasonable images byte-for-byte untouched (no quality loss).
    if (!oversized && !heavy) {
      before += orig.length;
      after += orig.length;
      continue;
    }

    if (oversized) {
      pipeline = pipeline.resize({
        width: meta.width >= meta.height ? MAX_EDGE : undefined,
        height: meta.height > meta.width ? MAX_EDGE : undefined,
        withoutEnlargement: true,
      });
    }

    let optimized;
    try {
      optimized = await encode(pipeline, ext);
    } catch (err) {
      console.warn(`skip ${path.relative(ROOT, file)}: ${err.message}`);
      continue;
    }

    before += orig.length;
    const saved = orig.length - optimized.length;
    if (saved / orig.length < MIN_SAVING) {
      after += orig.length; // keep original
      continue;
    }

    after += optimized.length;
    changed++;
    const rel = path.relative(ROOT, file);
    console.log(`${DRY ? "[dry] " : ""}${rel}  ${fmt(orig.length)} -> ${fmt(optimized.length)}`);
    if (!DRY) await writeFile(file, optimized);
  }

  const pct = before ? Math.round(((before - after) / before) * 100) : 0;
  console.log(
    `\n${DRY ? "[dry] " : ""}${changed}/${files.length} image(s) optimised — ${fmt(before)} -> ${fmt(after)} (${pct}% smaller)`,
  );
  // Signal to CI whether anything actually changed.
  process.exitCode = 0;
}

main();
