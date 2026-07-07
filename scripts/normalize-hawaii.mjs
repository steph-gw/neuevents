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

const FROM = "Hawaiʻi";
const TO = "Hawaii";

function normalizeString(s) {
  return s.includes(FROM) ? s.replaceAll(FROM, TO) : s;
}

function normalizeRichText(segments) {
  let changed = false;
  const next = segments.map((seg) => {
    const text = normalizeString(seg.text);
    if (text !== seg.text) changed = true;
    return { ...seg, text };
  });
  return changed ? next : null;
}

function normalizeImages(images) {
  let changed = false;
  const next = images.map((img) => {
    const alt = img.alt ? normalizeString(img.alt) : img.alt;
    if (alt !== img.alt) changed = true;
    return alt !== img.alt ? { ...img, alt } : img;
  });
  return changed ? next : null;
}

async function main() {
  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  const entries = await client.query(api.gallery.list, {});

  let updated = 0;
  for (const entry of entries) {
    const patch = {};

    const name = normalizeString(entry.name);
    if (name !== entry.name) patch.name = name;

    const party = normalizeString(entry.party);
    if (party !== entry.party) patch.party = party;

    const description = normalizeRichText(entry.description);
    if (description) patch.description = description;

    const location = normalizeRichText(entry.location);
    if (location) patch.location = location;

    const photography = normalizeRichText(entry.photography);
    if (photography) patch.photography = photography;

    const images = normalizeImages(entry.images ?? []);
    if (images) patch.images = images;

    if (Object.keys(patch).length === 0) continue;

    await client.mutation(api.galleryMutations.patch, { id: entry._id, ...patch });
    updated++;
    console.log(`  patched ${entry.slug}`);
  }

  console.log(`Done. Updated ${updated} of ${entries.length} entries.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
