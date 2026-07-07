import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env.local");
for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
  const t = line.trim(); if (!t || t.startsWith("#")) continue;
  const eq = t.indexOf("="); if (eq === -1) continue;
  const k = t.slice(0, eq).trim(); let v = t.slice(eq + 1).trim();
  if (v.includes(" #")) v = v.split(" #")[0].trim();
  if (!process.env[k]) process.env[k] = v;
}

const SLUG = "nivedita-nick";
const IMAGE_SRC =
  "https://images.squarespace-cdn.com/content/v1/645eb0736e4523787c777f1f/1767728156733-XJXR96TNE005QKEKE534/DSC01957.jpg?format=1500w";
const VIDEO_URL = "https://www.youtube.com/watch?v=YY8U1NZSMTI";

const REL_DIR = `/images/gallery/weddings/${SLUG}`;
const FILE = "01-DSC01957.jpg";
const REL_URL = `${REL_DIR}/${FILE}`;
const ABS_DIR = path.join(root, "public", REL_DIR.replace(/^\//, ""));
const ABS_FILE = path.join(ABS_DIR, FILE);

async function download() {
  fs.mkdirSync(ABS_DIR, { recursive: true });
  const res = await fetch(IMAGE_SRC);
  if (!res.ok) throw new Error(`download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(ABS_FILE, buf);
  console.log(`  saved ${REL_URL} (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  const entries = await client.query(api.gallery.list, {});
  const entry = entries.find((e) => e.slug === SLUG);
  if (!entry) throw new Error(`entry not found: ${SLUG}`);

  await download();

  await client.mutation(api.galleryMutations.patch, {
    id: entry._id,
    videoUrl: VIDEO_URL,
    images: [{ url: REL_URL, alt: entry.name }],
    coverIndex: 0,
  });
  console.log(`  patched ${entry.name}`);
  console.log("Done.");
}

main().catch((err) => { console.error(err); process.exit(1); });
