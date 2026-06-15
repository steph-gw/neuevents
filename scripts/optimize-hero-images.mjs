import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.join(import.meta.dirname, "..");
const srcDir = path.join(root, "public/images/hero/source");
const outDir = path.join(root, "public/images/hero");

const files = [
  "hero-1.jpg",
  "hero-2.jpg",
  "hero-3.jpg",
  "hero-4.jpg",
  "hero-5.jpg",
];
const maxWidth = 1920;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  const base = path.basename(file, ".jpg");
  const input = path.join(srcDir, file);

  await sharp(input)
    .resize(maxWidth, null, { withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(path.join(outDir, `${base}.webp`));

  const stats = fs.statSync(path.join(outDir, `${base}.webp`));
  console.log(`${base}.webp — ${(stats.size / 1024).toFixed(0)} KB`);
}

console.log("Done.");
