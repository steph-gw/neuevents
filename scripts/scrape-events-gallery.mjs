#!/usr/bin/env node
/**
 * Scrapes https://www.neuevents.com/events detail pages,
 * downloads gallery images, and seeds the Convex gallery table.
 */
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

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

const outDir = path.join(root, "public/images/gallery/events");

const EVENTS = [
  {
    slug: "public-schools-hawaii-2026",
    name: "PUBLIC SCHOOLS OF HAWAIʻI FOUNDATION 2026",
    date: "2026-04-02",
    order: 1,
    location: "",
    photographer: "Vivir Photography",
    photographerUrl: "https://www.vivirphotography.com/",
    description:
      "The Public Schools of Hawaii Foundation celebrated amazing teachers, principals, and community contributors at their annual award banquet in 2026. Gold and black décor was highlighted with beautiful florals on this night of recognition.\n\nWe have been coordinating Public Schools of Hawaii Foundation's annual fundraising and awards banquet for many years.",
  },
  {
    slug: "hah-awards-scholarship-gala-mwxfe",
    name: "HAH 2025 AWARDS AND SCHOLARSHIP GALA",
    date: "2025-10-25",
    order: 2,
    location: "Sheraton Waikiki Beach Resort",
    photographer: "ACES XP",
    photographerUrl: "http://www.acesxp.com/photography/",
    description:
      "A night to remember. The Healthcare Association of Hawaii hosted a 'Hawaii Healthcare Walk of Fame' to honor their 2025 award and scholarship recipients.",
  },
  {
    slug: "hscadv-conference-2025",
    name: "HSCADV CONFERENCE 2025",
    date: "2025-07-25",
    order: 3,
    location: "Ala Moana Hotel",
    photographer: "Vivir Photography",
    photographerUrl: "https://www.vivirphotography.com/",
    description:
      "The Hawaii State Coalition Against Domestic Violence hosted a conference focusing on gender based violence.",
  },
  {
    slug: "styled-photo-shoot",
    name: "LUANA KAI STYLED PHOTO SHOOT",
    date: "2024-12-28",
    order: 4,
    location: "",
    photographer: "Rachel Robertson Photography",
    photographerUrl: "https://www.rachelrobertson.com/",
    description:
      "This styled photo shoot captured the work of some of Hawaii's foremost wedding pros as they worked their magic to make a gorgeous wedding setting.\n\nFlowers by Spinning Web Florist, hair and makeup by Dorys Foltin of Maleana Beauty, design by LeiAloha Design + Décor, and attire by Jules Bly.",
  },
  {
    slug: "hah-awards-scholarship-gala",
    name: "HAH AWARDS AND SCHOLARSHIP GALA 2024",
    date: "2024-11-22",
    order: 5,
    location: "Ko'olau Ballrooms",
    photographer: "ACES XP",
    photographerUrl: "http://www.acesxp.com/photography/",
    description:
      "Good food and great company. The Healthcare Association of Hawaii gathered on this beautiful evening to celebrate award and scholarship recipients.",
  },
  {
    slug: "hscadv-conference-2024",
    name: "HSCADV CONFERENCE 2024",
    date: "2024-09-01",
    order: 6,
    location: "Hilton Hawaiian Village",
    photographer: "Vivir Photography",
    photographerUrl: "https://www.vivirphotography.com/",
    description:
      "The Hawaii State Coalition Against Domestic Violence hosted a conference focusing on gender based violence.",
  },
  {
    slug: "public-schools-hawaii",
    name: "PUBLIC SCHOOLS OF HAWAIʻI FOUNDATION",
    date: "2023-05-15",
    order: 7,
    location: "",
    photographer: "Edmar Castillo Photography",
    photographerUrl: "https://www.edmarcastillo.com/",
    description:
      "A classic red and white themed décor, showcasing performances by public school students and presentations honoring the many teachers, principals, and community leaders who contribute selflessly to Hawaii's public schools.",
  },
  {
    slug: "equally-wed-photoshoot",
    name: "EQUALLY WED PHOTOSHOOT",
    date: "2023-05-14",
    order: 8,
    location: "Dillingham Ranch, North Shore",
    photographer: "Kate & Keith Photography",
    photographerUrl: "https://www.kateandkeith.com/",
    description:
      "LOVE IS BOUNDLESS\n\nA simple country side wedding photoshoot in Dillingham Ranch located on the North Shore of Oahu. With a rustic yet shabby chic theme, the shoot was a perfect opportunity for us to showcase our creativity and create the ideal ranch style wedding. In collaboration with local vendors from hair and makeup, photography and videography to table design, wedding dresses and flower arrangements we were able to display the type of services we provide.\n\nAt neu event we strive to do everything with perfection and excellence, and will do our best to ensure that your special day is a memorable one.",
    articleUrl: "http://equallywed.com/hawaii-ranch-styled-lesbian-wedding/",
  },
  {
    slug: "kakaako-wine-loft-sake-collection-grand-opening",
    name: "KAKAʻAKO WINE LOFT & SAKE COLLECTION GRAND OPENING",
    date: "2023-05-14",
    order: 9,
    location: "Kakaʻako Wine Loft & Sake Collection",
    photographer: "Eric Arii",
    photographerUrl: "https://www.ericarii.com/",
    description:
      "Home to one of Honolulu's newest and highly sought after wine and sake collections on island, Kakaʻako Wine Loft & Sake celebrated its opening with a fusion of Japanese elements paired with sleek and modern touches.",
  },
  {
    slug: "public-schools-hawaii-5e9ac",
    name: "THE KNOT MIXER",
    date: "2023-05-13",
    order: 10,
    location: "Iolani Palace",
    photographer: "Love Story Weddings",
    photographerUrl: "https://www.lovestoryweddings.com/",
    description:
      "This whimsical mixer for The Knot, the country's largest wedding-specific media company, featured an \"Alice in Wonderland\" theme, evidenced by the \"eat me\" treats, festive décor, custom stationery, costumes for servers, theatrical hair and makeup for staff, and spectacular aerial performances.\n\nThinking of a birthday carnival? How about a company holiday party? What about a 90s theme for your high school reunion? Whatever you envision for your event, we want to help you bring it to life! We'll help you find everything you need from the perfect venue, to the right design for your invitations.",
  },
];

function textToRichText(text) {
  if (!text) return [];
  return [{ type: "text", text }];
}

function photographyCredit(name, href) {
  const segments = [{ type: "text", text: "Photos by " }];
  if (href) {
    segments.push({ type: "link", text: name, href });
  } else {
    segments.push({ type: "text", text: name });
  }
  return segments;
}

function descriptionToRichText(description, articleUrl) {
  const paragraphs = description.split(/\n\n+/).filter(Boolean);
  const segments = [];
  paragraphs.forEach((paragraph, index) => {
    if (index > 0) segments.push({ type: "text", text: "\n\n" });
    segments.push({ type: "text", text: paragraph });
  });
  if (articleUrl) {
    segments.push({ type: "text", text: "\n\n" });
    segments.push({ type: "link", text: articleUrl, href: articleUrl });
  }
  return segments;
}

async function fetchEventImages(slug) {
  const url = `https://www.neuevents.com/events/${slug}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const html = await res.text();
  const matches = html.match(
    /https:\/\/images\.squarespace-cdn\.com[^"'<> )\\]+?\.(?:jpg|jpeg|png|webp)/gi,
  );
  if (!matches) return [];
  const unique = [...new Set(matches)].filter((u) => !u.includes("favicon"));
  return unique;
}

async function downloadImage(url, destPath) {
  const res = await fetch(url.includes("?") ? `${url}&format=2500w` : `${url}?format=2500w`);
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

async function scrapeAndDownload(event) {
  console.log(`Scraping ${event.slug}...`);
  const imageUrls = await fetchEventImages(event.slug);
  console.log(`  Found ${imageUrls.length} images`);

  const eventDir = path.join(outDir, event.slug);
  await fs.mkdir(eventDir, { recursive: true });

  const images = [];
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const fileName = imageFileName(url, i);
    const destPath = path.join(eventDir, fileName);
    try {
      await downloadImage(url, destPath);
      images.push({
        url: `/images/gallery/events/${event.slug}/${fileName}`,
        alt: `${event.name} — photo ${i + 1}`,
      });
      process.stdout.write(".");
    } catch (err) {
      console.warn(`\n  Skipped image ${i + 1}: ${err.message}`);
    }
  }
  console.log(`\n  Downloaded ${images.length} images`);

  return {
    type: "events",
    name: event.name,
    description: descriptionToRichText(event.description, event.articleUrl),
    images,
    photography: photographyCredit(event.photographer, event.photographerUrl),
    location: textToRichText(event.location),
    party: "Mona Hirata-Sung",
    order: event.order,
    date: event.date,
  };
}

async function seed(entries) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set. Check .env.local");
  }

  const client = new ConvexHttpClient(convexUrl);
  const existing = await client.query(api.gallery.list, {});
  const existingNames = new Set(existing.map((e) => e.name));

  for (const entry of entries) {
    if (existingNames.has(entry.name)) {
      console.log(`Skipping existing: ${entry.name}`);
      continue;
    }
    const id = await client.mutation(api.galleryMutations.create, entry);
    console.log(`Seeded: ${entry.name} (${id})`);
  }
}

async function main() {
  const entries = [];
  for (const event of EVENTS) {
    entries.push(await scrapeAndDownload(event));
  }

  const seedPath = path.join(root, "data/events-gallery-seed.json");
  await fs.mkdir(path.dirname(seedPath), { recursive: true });
  await fs.writeFile(seedPath, JSON.stringify(entries, null, 2));
  console.log(`\nWrote ${seedPath}`);

  await seed(entries);
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
