#!/usr/bin/env node
/**
 * Patches location rich-text (with venue links) onto gallery events that
 * had their location links dropped during the initial scrape.
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

const link = (text, href) => ({ type: "link", text, href });
const text = (t) => ({ type: "text", text: t });

// slug -> location rich text segments
const LOCATIONS = {
  "hah-awards-scholarship-gala-mwxfe": [
    link(
      "Sheraton Waikiki Beach Resort",
      "https://www.marriott.com/en-us/hotels/hnlws-sheraton-waikiki-beach-resort/events/",
    ),
  ],
  "hscadv-conference-2025": [
    link("Ala Moana Hotel", "https://www.alamoanahotelhonolulu.com/"),
  ],
  "hscadv-conference-2024": [
    link(
      "Hilton Hawaiian Village",
      "https://www.hilton.com/en/hotels/hnlhvhh-hilton-hawaiian-village-waikiki-beach-resort/",
    ),
  ],
  "hah-awards-scholarship-gala": [
    link("Ko'olau Ballrooms", "https://www.koolauballrooms.com/"),
  ],
  "equally-wed-photoshoot": [
    link("Dillingham Ranch", "https://dillinghamranch.com/"),
    text(", North Shore"),
  ],
};

async function main() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) throw new Error("NEXT_PUBLIC_CONVEX_URL not set");

  const client = new ConvexHttpClient(convexUrl);
  const entries = await client.query(api.gallery.list, {});

  for (const [slug, location] of Object.entries(LOCATIONS)) {
    const entry = entries.find((e) => e.slug === slug);
    if (!entry) {
      console.warn(`  No entry for slug: ${slug}`);
      continue;
    }
    await client.mutation(api.galleryMutations.patch, {
      id: entry._id,
      location,
    });
    console.log(`  Patched location: ${entry.name}`);
  }

  console.log("Done.");
}

main().catch((err) => { console.error(err); process.exit(1); });
