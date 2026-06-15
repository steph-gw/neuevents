import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.join(import.meta.dirname, "..");
const outDir = path.join(root, "public/images/services");

const SOURCES = [
  {
    url: "https://static.showit.com/file/rqu3T_xH3w_Fub1viUWYdg/314908/dsc07970_1.jpg",
    file: "full-planning",
    maxWidth: 1200,
    quality: 90,
  },
  {
    url: "https://static.showit.com/file/USE1De6lGW-8lHoaqiUAmg/314908/mt-101.jpg",
    file: "design-services",
    quality: 90,
  },
  {
    url: "https://static.showit.com/file/-NENZCIYBpKM8bhPmU8Odg/314908/asheville_wedding_photographer_allegory_and_elm-71.jpg",
    file: "partial-planning",
    quality: 90,
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const item of SOURCES) {
  const res = await fetch(item.url);
  if (!res.ok) throw new Error(`Failed ${item.url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  const outPath = path.join(outDir, `${item.file}.webp`);
  let pipeline = sharp(buffer).rotate();
  if (item.maxWidth) {
    pipeline = pipeline.resize(item.maxWidth, null, { withoutEnlargement: true });
  }
  const meta = await pipeline.webp({ quality: item.quality }).toFile(outPath);

  console.log(
    `${item.file}.webp — ${meta.width}x${meta.height} — ${(meta.size / 1024).toFixed(0)} KB`
  );
}
