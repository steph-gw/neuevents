import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.join(import.meta.dirname, "..");
const srcDir = path.join(root, "public/images/featured/source");
const outDir = path.join(root, "public/images/featured");

const files = ["featured-1.jpg", "featured-2.jpg", "featured-3.jpg"];

for (const file of files) {
  const base = path.basename(file, ".jpg");
  await sharp(path.join(srcDir, file))
    .resize(900, null, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, `${base}.webp`));
  const stats = fs.statSync(path.join(outDir, `${base}.webp`));
  console.log(`${base}.webp — ${(stats.size / 1024).toFixed(0)} KB`);
}
