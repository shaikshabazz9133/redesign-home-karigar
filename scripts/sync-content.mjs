/**
 * Builds `src/content/generated/projects.json` from the legacy site's data
 * file, so both sites share one source of truth.
 *
 * Point LEGACY_DIR at the original project (default: the Home Karigar repo).
 * Images are read from this project's own `public/images`.
 *
 * - Extracts room labels from the `// ── Room ──` comments in each gallery
 * - Skips images that no longer exist on disk
 * - Records intrinsic width/height for every image (prevents layout shift)
 *
 * Run: npm run sync-content   (or LEGACY_DIR=/path/to/repo npm run sync-content)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { imageSize } = require("next/dist/compiled/image-size");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const legacyDir = process.env.LEGACY_DIR ?? "/Users/apple/Desktop/codersnest/home karigar";
const legacyFile = resolve(legacyDir, "src/data/projects.ts");
const publicDir = resolve(root, "public");
const outFile = join(root, "src/content/generated/projects.json");

const source = readFileSync(legacyFile, "utf8");
const [listPart, galleryPart] = source.split("export const projectGalleries");

/* ── Project list ─────────────────────────────────────────── */
const field = (block, key) =>
  block.match(new RegExp(`${key}:\\s*(?:"([^"]*)"|(\\d+))`))?.slice(1).find(Boolean);

const projects = listPart
  .split(/\{\s*\n\s*id:/)
  .slice(1)
  .map((chunk) => "id:" + chunk)
  .filter((b) => /^id:\s*\d/.test(b))
  .map((b) => ({
    id: Number(field(b, "id")),
    flatNo: field(b, "flatNo"),
    type: field(b, "type"),
    location: field(b, "location"),
    area: field(b, "area"),
    cover: field(b, "src"),
  }));

/* ── Galleries (room-aware) ───────────────────────────────── */
const galleries = {};
let current = null;
let room = "Interiors";
for (const line of galleryPart.split("\n")) {
  const start = line.match(/^\s*(\d+):\s*\[/);
  if (start) {
    current = Number(start[1]);
    galleries[current] = [];
    room = "Interiors";
    continue;
  }
  const comment = line.match(/\/\/\s*──\s*(.+?)\s*──/);
  if (comment) {
    room = comment[1].trim();
    continue;
  }
  const src = line.match(/src:\s*"([^"]+)"/);
  if (src && current !== null) galleries[current].push({ src: src[1], room });
}

/* ── Normalise ────────────────────────────────────────────── */
const ROOM_NAMES = {
  "Entrance area – shoe unit": "Entrance & Foyer",
  "Living TV unit": "Living Room",
  "Crockery unit, sofa, dining": "Dining & Crockery",
  "Kitchen": "Kitchen",
  "Master room": "Master Bedroom",
  "Guest room": "Guest Bedroom",
  "Kids room": "Kids' Bedroom",
  "Wall decor": "Wall Décor",
  "Others": "Details",
  "Interiors": "Interiors",
};

const measure = (src) => {
  const file = join(publicDir, decodeURI(src));
  if (!existsSync(file)) return null;
  try {
    const { width, height } = imageSize(readFileSync(file));
    return width && height ? { width, height } : null;
  } catch {
    return null;
  }
};

const slugify = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-");

let skipped = 0;
const out = projects
  .map((p) => {
    const flat = p.flatNo.replace(/\D/g, "");
    const [development, community] = p.location.split(",").map((s) => s.trim());
    const images = (galleries[p.id] ?? [])
      .map((img) => {
        const size = measure(img.src);
        if (!size) {
          skipped++;
          return null;
        }
        return { src: img.src, room: ROOM_NAMES[img.room] ?? img.room, ...size };
      })
      .filter(Boolean);

    const coverSize = measure(p.cover);
    const cover = coverSize ? { src: p.cover, room: "Interiors", ...coverSize } : images[0];
    if (!cover) return null;

    return {
      id: p.id,
      slug: `flat-${flat}-${slugify(development)}`,
      flatNo: flat,
      configuration: p.type.replace(/\s*Residency/i, "").trim(),
      development,
      community: community ?? "",
      area: p.area,
      cover: images.find((i) => i.src === cover.src) ?? cover,
      images,
    };
  })
  .filter(Boolean);

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(out, null, 2) + "\n");
console.log(
  `✓ ${out.length} projects, ${out.reduce((n, p) => n + p.images.length, 0)} images` +
    (skipped ? ` (${skipped} missing files skipped)` : ""),
);
