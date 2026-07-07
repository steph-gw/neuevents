#!/usr/bin/env node
/**
 * Builds a numbered contact-sheet montage per gallery entry so a human (or
 * agent) can eyeball which image should be the listing cover. Indices in the
 * montage correspond 1:1 to the entry's `images` array in Convex.
 *
 * Output:
 *   scripts/.montages/<type>__<slug>.jpg   (one montage per entry)
 *   scripts/.montages/manifest.json        ({ slug, type, _id, count })
 */
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const envPath = path.join(root, ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (value.includes(" #")) value = value.split(" #")[0].trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

const OUT_DIR = path.join(__dirname, ".montages");
const COLS = 5;
const THUMB = 240;
const PAD = 6;
const LABEL_H = 26;
const CELL_W = THUMB + PAD * 2;
const CELL_H = THUMB + LABEL_H + PAD * 2;

function localPathForUrl(url) {
  // urls look like /images/gallery/events/<slug>/01-foo.jpg
  const clean = url.split("?")[0];
  return path.join(root, "public", clean.replace(/^\//, ""));
}

async function buildThumb(imgPath, index) {
  const base = await sharp(imgPath)
    .resize(THUMB, THUMB, { fit: "cover", position: "attention" })
    .toBuffer();

  const labelSvg = Buffer.from(
    `<svg width="${CELL_W}" height="${CELL_H}">
       <rect x="0" y="0" width="${CELL_W}" height="${CELL_H}" fill="#111"/>
       <text x="${PAD + 4}" y="${LABEL_H - 8}" font-family="Arial" font-size="18"
             font-weight="bold" fill="#ffd76a">#${index}</text>
     </svg>`,
  );

  return sharp(labelSvg)
    .composite([{ input: base, top: LABEL_H + PAD, left: PAD }])
    .jpeg({ quality: 78 })
    .toBuffer();
}

async function buildMontage(entry) {
  const images = entry.images ?? [];
  if (images.length === 0) return null;

  const rows = Math.ceil(images.length / COLS);
  const width = COLS * CELL_W;
  const height = rows * CELL_H;

  const composites = [];
  for (let i = 0; i < images.length; i++) {
    const imgPath = localPathForUrl(images[i].url);
    if (!fs.existsSync(imgPath)) {
      console.warn(`   missing file for #${i}: ${imgPath}`);
      continue;
    }
    try {
      const thumb = await buildThumb(imgPath, i);
      const col = i % COLS;
      const rowIdx = Math.floor(i / COLS);
      composites.push({ input: thumb, top: rowIdx * CELL_H, left: col * CELL_W });
    } catch (err) {
      console.warn(`   failed #${i}: ${err.message}`);
    }
  }

  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 20, g: 20, b: 20 },
    },
  })
    .composite(composites)
    .jpeg({ quality: 80 })
    .toBuffer();
}

async function main() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) throw new Error("NEXT_PUBLIC_CONVEX_URL not set");

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const client = new ConvexHttpClient(convexUrl);
  const entries = await client.query(api.gallery.list, {});
  console.log(`Found ${entries.length} entries`);

  const manifest = [];
  for (const entry of entries) {
    const buf = await buildMontage(entry);
    if (!buf) {
      console.log(`  skip (no images): ${entry.slug}`);
      continue;
    }
    const file = `${entry.type}__${entry.slug}.jpg`;
    fs.writeFileSync(path.join(OUT_DIR, file), buf);
    manifest.push({
      file,
      slug: entry.slug,
      type: entry.type,
      id: entry._id,
      name: entry.name,
      count: entry.images.length,
      coverIndex: entry.coverIndex ?? 0,
    });
    console.log(`  ${file} (${entry.images.length} imgs)`);
  }

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  console.log(`Done. ${manifest.length} montages -> ${OUT_DIR}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
