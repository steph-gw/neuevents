#!/usr/bin/env node
/**
 * Removes non-event junk images (site footer / CTA / nav decorative assets)
 * that the scraper accidentally pulled into each event's images array.
 */
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
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

// Filenames (anywhere in the url) that are not real event photos.
const JUNK_PATTERNS = [
  /footer-\d+\./i,
  /book-us-now/i,
  /image-asset\./i,
];

function isJunk(url) {
  return JUNK_PATTERNS.some((re) => re.test(url));
}

async function main() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) throw new Error("NEXT_PUBLIC_CONVEX_URL not set");

  const client = new ConvexHttpClient(convexUrl);
  const entries = await client.query(api.gallery.list, {});
  console.log(`Found ${entries.length} gallery entries`);

  for (const entry of entries) {
    const kept = entry.images.filter((img) => !isJunk(img.url));
    const removed = entry.images.length - kept.length;
    if (removed === 0) {
      console.log(`  ${entry.name}: no junk (${entry.images.length} images)`);
      continue;
    }
    await client.mutation(api.galleryMutations.setImages, {
      id: entry._id,
      images: kept,
    });
    console.log(
      `  ${entry.name}: removed ${removed}, kept ${kept.length}`,
    );
  }

  console.log("Done.");
}

main().catch((err) => { console.error(err); process.exit(1); });
