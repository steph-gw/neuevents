#!/usr/bin/env node
/**
 * Scrapes https://www.neuevents.com/weddings detail pages,
 * downloads gallery images, and seeds the Convex gallery table (type: "wedding").
 *
 * Usage:
 *   node scripts/scrape-weddings-gallery.mjs --dry   # parse + print, no download/seed
 *   node scripts/scrape-weddings-gallery.mjs         # full scrape + download + seed
 */
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const DRY = process.argv.includes("--dry");

// Load .env.local for Convex URL
const envPath = path.join(root, ".env.local");
if (fsSync.existsSync(envPath)) {
  for (const line of fsSync.readFileSync(envPath, "utf8").split("\n")) {
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

const outDir = path.join(root, "public/images/gallery/weddings");

// Slugs in listing order (newest first) across the 3 listing pages.
const SLUGS = [
  // page 1
  "nivedita-nick", "carmela-babu", "carmela-babu-4rlds", "rebecca-linh",
  "michelle-kamakani", "megan-sean", "jesse-matt", "nohea-kori-ann",
  "kate-gene", "holly-komo", "kavya-tommy", "ivonne-michael", "caryn-jordan",
  "rachel-jared", "sydnie-hans", "rachel-jacob", "michelle-joshua",
  "remy-kyle", "maya-achyut", "brandon-jonah",
  // page 2
  "lakshmi-marc", "taryn-daniel", "chyann-jake", "esha-rikin",
  "christina-chris", "joyce-gino", "kayla-jj", "jing-clint", "kailee-riley",
  "leah-sarav", "cristina-jesus", "leiloni-markeice", "mia-david",
  "kirsten-matt", "wendie-michael", "emily-drew", "jing-ken", "angela-ellis",
  "courtney-mario", "kathleen-nathan",
  // page 3
  "alice-kevin", "ricki-josh", "jasmine-glen", "kasandra-victor",
  "michelle-spencer", "connie-jeff", "sovattey-michael", "valentina-albert",
  "aimee-maxwell", "natalie-tom", "mia-kawena", "ryan-chelsea",
  "kristine-joshua",
];

const ENTITIES = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&#39;": "\u2019", "&rsquo;": "\u2019", "&#8217;": "\u2019",
  "&lsquo;": "\u2018", "&#8216;": "\u2018",
  "&ldquo;": "\u201c", "&#8220;": "\u201c",
  "&rdquo;": "\u201d", "&#8221;": "\u201d",
  "&mdash;": "\u2014", "&#8212;": "\u2014",
  "&ndash;": "\u2013", "&#8211;": "\u2013",
  "&nbsp;": " ", "&hellip;": "\u2026", "&#8230;": "\u2026",
};

function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&[a-z]+;|&#\d+;/gi, (m) => ENTITIES[m] ?? m);
}

function stripTags(html) {
  return html.replace(/<[^>]*>/g, "");
}

function cleanSpaces(text) {
  // collapse spaces/tabs but preserve newlines
  return text.replace(/[ \t\f\r]+/g, " ");
}

/** Parse an HTML fragment into rich-text segments (text + link). */
function htmlToSegments(html) {
  const normalized = html.replace(/<br\s*\/?>/gi, "\n");
  const segments = [];
  const re = /<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  let last = 0;
  let m;
  const pushText = (raw) => {
    const t = cleanSpaces(decode(stripTags(raw)));
    if (t) segments.push({ type: "text", text: t });
  };
  while ((m = re.exec(normalized))) {
    pushText(normalized.slice(last, m.index));
    const href = decode(m[1]);
    const text = cleanSpaces(decode(stripTags(m[2]))).trim();
    if (text) segments.push({ type: "link", text, href });
    last = re.lastIndex;
  }
  pushText(normalized.slice(last));
  return trimSegments(segments);
}

function trimSegments(segments) {
  const out = segments.map((s) => ({ ...s }));
  if (out.length && out[0].type === "text") {
    out[0].text = out[0].text.replace(/^\s+/, "");
  }
  if (out.length && out[out.length - 1].type === "text") {
    out[out.length - 1].text = out[out.length - 1].text.replace(/\s+$/, "");
  }
  return out.filter((s) => !(s.type === "text" && s.text === ""));
}

/** Split a credit paragraph's segments into [creditSegs, descSegs] at first newline. */
function splitCreditDesc(segments) {
  const credit = [];
  const desc = [];
  let inDesc = false;
  for (const seg of segments) {
    if (inDesc) {
      desc.push(seg);
      continue;
    }
    if (seg.type === "text" && seg.text.includes("\n")) {
      const idx = seg.text.indexOf("\n");
      const before = seg.text.slice(0, idx);
      const after = seg.text.slice(idx).replace(/^\n+/, "");
      if (before.trim()) credit.push({ type: "text", text: before });
      inDesc = true;
      if (after) desc.push({ type: "text", text: after });
    } else {
      credit.push(seg);
    }
  }
  return [trimSegments(credit), trimSegments(desc)];
}

const CREDIT_RE = /(video and photos by|photos by|photo by|video by|photography by)/i;

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

function parseDetail(html, slug) {
  const titleMatch = html.match(
    /<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i,
  );
  const name = titleMatch ? cleanSpaces(decode(stripTags(titleMatch[1]))).trim() : slug;

  const dateMatch = html.match(/"datePublished"\s*content="(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : "";

  // Isolate the post content between the title and the shared footer CTA.
  const startIdx = html.search(/class="[^"]*entry-title/i);
  const cutIdx = html.indexOf("LET US PLAN YOUR NEXT EVENT");
  const region = html.slice(startIdx >= 0 ? startIdx : 0, cutIdx >= 0 ? cutIdx : html.length);

  const paraHtml = [...region.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((mm) => mm[1]);

  let creditIdx = -1;
  for (let i = 0; i < paraHtml.length; i++) {
    if (CREDIT_RE.test(stripTags(paraHtml[i]))) {
      creditIdx = i;
      break;
    }
  }

  let location = [];
  let photography = [];
  let descriptionSegs = [];

  if (creditIdx === -1) {
    // No credit line — everything is description.
    descriptionSegs = joinParagraphs(paraHtml);
  } else {
    // Detail pages read [couple names, venue, credit]. The venue is the
    // paragraph immediately before the credit line; earlier lines (couple
    // names) are dropped.
    const locParas = paraHtml.slice(0, creditIdx).map(htmlToSegments).filter((s) => s.length);
    location = locParas.length ? locParas[locParas.length - 1] : [];

    const [credit, inlineDesc] = splitCreditDesc(htmlToSegments(paraHtml[creditIdx]));
    photography = credit;

    const trailing = paraHtml.slice(creditIdx + 1);
    descriptionSegs = joinParagraphs(
      [],
      inlineDesc,
      trailing.map(htmlToSegments),
    );
  }

  const images = extractImages(html);

  return { slug, name, date, location, photography, description: descriptionSegs, images };
}

/** Join multiple paragraph segment-arrays with "\n\n" text separators. */
function joinParagraphs(rawParas = [], inlineDesc = [], extraParas = []) {
  const paras = [];
  for (const raw of rawParas) {
    const segs = htmlToSegments(raw);
    if (segs.length) paras.push(segs);
  }
  if (inlineDesc.length) paras.push(inlineDesc);
  for (const segs of extraParas) {
    if (segs.length) paras.push(segs);
  }

  const out = [];
  paras.forEach((segs, idx) => {
    if (idx > 0) out.push({ type: "text", text: "\n\n" });
    out.push(...segs);
  });
  return out;
}

function extractImages(html) {
  const urls = html.match(
    /https:\/\/images\.squarespace-cdn\.com\/content\/[^"' <>)?\\]+/gi,
  );
  if (!urls) return [];
  const seen = new Set();
  const unique = [];
  for (const u of urls) {
    if (seen.has(u)) continue;
    seen.add(u);
    if (/footer|book\+us\+now|book-us-now|image-asset|favicon/i.test(u)) continue;
    unique.push(u);
  }
  return unique;
}

async function downloadImage(url, destPath) {
  const full = url.includes("?") ? `${url}&format=2500w` : `${url}?format=2500w`;
  const res = await fetch(full, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, buf);
}

function imageFileName(url, index) {
  const base = path.basename(url.split("?")[0]);
  const safe = base.replace(/[^a-zA-Z0-9._-]/g, "-");
  return `${String(index + 1).padStart(2, "0")}-${safe}`;
}

async function scrapeAndDownload(slug, order) {
  console.log(`\nScraping ${slug} (order ${order})...`);
  const html = await fetchText(`https://www.neuevents.com/weddings/${slug}`);
  const parsed = parseDetail(html, slug);
  console.log(`  ${parsed.name} — ${parsed.date} — ${parsed.images.length} images`);

  if (DRY) {
    console.log("  location:", JSON.stringify(parsed.location));
    console.log("  photography:", JSON.stringify(parsed.photography));
    console.log(
      "  description:",
      JSON.stringify(parsed.description).slice(0, 260),
    );
    return {
      type: "wedding",
      slug,
      name: parsed.name,
      description: parsed.description,
      images: [],
      photography: parsed.photography,
      location: parsed.location,
      party: "Mona Hirata-Sung",
      order,
      date: parsed.date,
    };
  }

  const dir = path.join(outDir, slug);
  await fs.mkdir(dir, { recursive: true });

  const images = [];
  for (let i = 0; i < parsed.images.length; i++) {
    const url = parsed.images[i];
    const fileName = imageFileName(url, i);
    const destPath = path.join(dir, fileName);
    try {
      await downloadImage(url, destPath);
      images.push({
        url: `/images/gallery/weddings/${slug}/${fileName}`,
        alt: `${parsed.name} — photo ${i + 1}`,
      });
      process.stdout.write(".");
    } catch (err) {
      console.warn(`\n  Skipped image ${i + 1}: ${err.message}`);
    }
  }
  console.log(`\n  Downloaded ${images.length} images`);

  return {
    type: "wedding",
    slug,
    name: parsed.name,
    description: parsed.description,
    images,
    photography: parsed.photography,
    location: parsed.location,
    party: "Mona Hirata-Sung",
    order,
    date: parsed.date,
  };
}

async function seed(entries) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) throw new Error("NEXT_PUBLIC_CONVEX_URL is not set. Check .env.local");

  const client = new ConvexHttpClient(convexUrl);
  const existing = await client.query(api.gallery.list, {});
  const existingSlugs = new Set(existing.map((e) => e.slug));

  for (const entry of entries) {
    if (existingSlugs.has(entry.slug)) {
      console.log(`Skipping existing: ${entry.slug}`);
      continue;
    }
    const id = await client.mutation(api.galleryMutations.create, entry);
    console.log(`Seeded: ${entry.name} (${id})`);
  }
}

async function main() {
  const entries = [];
  for (let i = 0; i < SLUGS.length; i++) {
    try {
      entries.push(await scrapeAndDownload(SLUGS[i], i + 1));
    } catch (err) {
      console.error(`  ERROR on ${SLUGS[i]}: ${err.message}`);
    }
  }

  const seedPath = path.join(root, "data/weddings-gallery-seed.json");
  await fs.mkdir(path.dirname(seedPath), { recursive: true });
  await fs.writeFile(seedPath, JSON.stringify(entries, null, 2) + "\n");
  console.log(`\nWrote ${seedPath}`);

  if (!DRY) {
    await seed(entries);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
