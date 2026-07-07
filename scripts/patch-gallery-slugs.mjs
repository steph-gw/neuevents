#!/usr/bin/env node
/**
 * Patches all existing gallery records with their slug field.
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

const SLUG_MAP = {
  "PUBLIC SCHOOLS OF HAWAIʻI FOUNDATION 2026": "public-schools-hawaii-2026",
  "HAH 2025 AWARDS AND SCHOLARSHIP GALA": "hah-awards-scholarship-gala-mwxfe",
  "ANNUAL HSCADV CONFERENCE 2025": "hscadv-conference-2025",
  "LUANA KAI STYLED PHOTO SHOOT": "styled-photo-shoot",
  "HAH AWARDS AND SCHOLARSHIP GALA": "hah-awards-scholarship-gala",
  "ANNUAL HSCADV CONFERENCE 2024": "hscadv-conference-2024",
  "PUBLIC SCHOOLS OF HAWAIʻI FOUNDATION": "public-schools-hawaii",
  "EQUALLY WED PHOTOSHOOT": "equally-wed-photoshoot",
  "KAKAʻAKO WINE LOFT & SAKE COLLECTION GRAND OPENING": "kakaako-wine-loft-sake-collection-grand-opening",
  "THE KNOT MIXER": "the-knot-mixer",
};

async function main() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) throw new Error("NEXT_PUBLIC_CONVEX_URL not set");

  const client = new ConvexHttpClient(convexUrl);

  const entries = await client.query(api.gallery.list, {});
  console.log(`Found ${entries.length} gallery entries`);

  for (const entry of entries) {
    if (entry.slug) {
      console.log(`  Already has slug: ${entry.name}`);
      continue;
    }
    const slug = SLUG_MAP[entry.name];
    if (!slug) {
      console.warn(`  No slug mapping for: ${entry.name}`);
      continue;
    }
    await client.mutation(api.galleryMutations.patch, { id: entry._id, slug });
    console.log(`  Patched: ${entry.name} → ${slug}`);
  }

  console.log("Done.");
}

main().catch((err) => { console.error(err); process.exit(1); });
