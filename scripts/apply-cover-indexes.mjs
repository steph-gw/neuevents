#!/usr/bin/env node
/**
 * Applies hand-picked listing cover images to each gallery entry.
 *
 * Keys are `<type>__<slug>` (matches the montage filenames from
 * build-gallery-montages.mjs). Values are the chosen index into the entry's
 * `images` array — selected to favor a clear, people-focused cover shot.
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

// <type>__<slug> -> chosen cover index
const COVERS = {
  "events__public-schools-hawaii-2026": 32,
  "wedding__carmela-babu": 53,
  "events__hah-awards-scholarship-gala-mwxfe": 16,
  "wedding__carmela-babu-4rlds": 20,
  "events__hscadv-conference-2025": 22,
  "wedding__rebecca-linh": 1,
  "events__styled-photo-shoot": 0,
  "wedding__michelle-kamakani": 45,
  "events__hah-awards-scholarship-gala": 21,
  "wedding__megan-sean": 19,
  "events__hscadv-conference-2024": 38,
  "wedding__jesse-matt": 16,
  "events__public-schools-hawaii": 20,
  "wedding__nohea-kori-ann": 18,
  "events__equally-wed-photoshoot": 15,
  "wedding__kate-gene": 23,
  "events__kakaako-wine-loft-sake-collection-grand-opening": 13,
  "wedding__holly-komo": 33,
  "events__the-knot-mixer": 9,
  "wedding__kavya-tommy": 18,
  "wedding__ivonne-michael": 33,
  "wedding__caryn-jordan": 26,
  "wedding__rachel-jared": 32,
  "wedding__sydnie-hans": 40,
  "wedding__rachel-jacob": 34,
  "wedding__michelle-joshua": 5,
  "wedding__remy-kyle": 33,
  "wedding__maya-achyut": 1,
  "wedding__brandon-jonah": 9,
  "wedding__lakshmi-marc": 11,
  "wedding__taryn-daniel": 13,
  "wedding__chyann-jake": 0,
  "wedding__esha-rikin": 1,
  "wedding__christina-chris": 0,
  "wedding__joyce-gino": 16,
  "wedding__kayla-jj": 1,
  "wedding__jing-clint": 29,
  "wedding__kailee-riley": 33,
  "wedding__leah-sarav": 7,
  "wedding__cristina-jesus": 24,
  "wedding__leiloni-markeice": 4,
  "wedding__mia-david": 10,
  "wedding__kirsten-matt": 31,
  "wedding__wendie-michael": 8,
  "wedding__emily-drew": 10,
  "wedding__jing-ken": 34,
  "wedding__angela-ellis": 4,
  "wedding__courtney-mario": 9,
  "wedding__kathleen-nathan": 15,
  "wedding__alice-kevin": 25,
  "wedding__ricki-josh": 8,
  "wedding__jasmine-glen": 3,
  "wedding__kasandra-victor": 3,
  "wedding__michelle-spencer": 0,
  "wedding__connie-jeff": 7,
  "wedding__sovattey-michael": 0,
  "wedding__valentina-albert": 19,
  "wedding__aimee-maxwell": 3,
  "wedding__natalie-tom": 25,
  "wedding__mia-kawena": 20,
  "wedding__ryan-chelsea": 23,
  "wedding__kristine-joshua": 19,
};

async function main() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) throw new Error("NEXT_PUBLIC_CONVEX_URL not set");

  const client = new ConvexHttpClient(convexUrl);
  const entries = await client.query(api.gallery.list, {});

  const byKey = new Map(entries.map((e) => [`${e.type}__${e.slug}`, e]));

  let updated = 0;
  let skipped = 0;
  for (const [key, coverIndex] of Object.entries(COVERS)) {
    const entry = byKey.get(key);
    if (!entry) {
      console.warn(`  ! no entry for ${key}`);
      skipped++;
      continue;
    }
    const max = (entry.images?.length ?? 0) - 1;
    if (coverIndex > max) {
      console.warn(`  ! ${key}: index ${coverIndex} > max ${max}, clamping`);
    }
    const safeIndex = Math.max(0, Math.min(coverIndex, max));
    await client.mutation(api.galleryMutations.setCover, {
      id: entry._id,
      coverIndex: safeIndex,
    });
    updated++;
    console.log(`  ${key} -> #${safeIndex}`);
  }

  const missing = entries.filter((e) => !(`${e.type}__${e.slug}` in COVERS));
  for (const e of missing) {
    console.warn(`  (no selection) ${e.type}__${e.slug}`);
  }

  console.log(`Done. Updated ${updated}, skipped ${skipped}, unselected ${missing.length}.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
