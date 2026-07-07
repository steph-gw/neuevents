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

const IG_URL = "https://www.instagram.com/neuevents/";
// Files live at public/images/instagram/0N.png, one per post, ordered 1..8.
const COUNT = 8;
const TODAY = new Date().toISOString().slice(0, 10);

async function main() {
  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  const cleared = await client.mutation(api.instagramMutations.clear, {});
  if (cleared) console.log(`  cleared ${cleared} existing post(s)`);

  for (let i = 1; i <= COUNT; i++) {
    const n = String(i).padStart(2, "0");
    const url = `/images/instagram/${n}.png`;
    const abs = path.join(root, "public", url.replace(/^\//, ""));
    if (!fs.existsSync(abs)) {
      console.warn(`  ! missing ${url}, skipping`);
      continue;
    }
    await client.mutation(api.instagramMutations.create, {
      images: [{ url, alt: "Neu Events on Instagram" }],
      videos: [],
      order: i,
      date: TODAY,
      href: IG_URL,
    });
    console.log(`  seeded #${i} -> ${url}`);
  }
  console.log("Done.");
}

main().catch((err) => { console.error(err); process.exit(1); });
