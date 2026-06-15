import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.join(import.meta.dirname, "..");
const srcDir = path.join(root, "public/images/hero/source");
const outDir = path.join(root, "public/images/hero");

const MAX_BYTES = 1024 * 1024; // only compress files over 1 MB
const MAX_WIDTH = 2560;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(srcDir)) {
  console.log("No source directory — nothing to optimize.");
  process.exit(0);
}

const files = fs.readdirSync(srcDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

for (const file of files) {
  const input = path.join(srcDir, file);
  const base = path.basename(file).replace(/\.(jpe?g|png|webp)$/i, "");
  const stats = fs.statSync(input);

  if (stats.size <= MAX_BYTES) {
    const ext = path.extname(file).toLowerCase();
    const output = path.join(outDir, `${base}${ext === ".jpeg" ? ".jpg" : ext}`);
    fs.copyFileSync(input, output);
    console.log(`${base} — copied as-is (${(stats.size / 1024).toFixed(0)} KB)`);
    continue;
  }

  const output = path.join(outDir, `${base}.webp`);
  await sharp(input)
    .rotate()
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: 90, effort: 4 })
    .toFile(output);

  const outStats = fs.statSync(output);
  console.log(
    `${base}.webp — compressed from ${(stats.size / 1024 / 1024).toFixed(1)} MB to ${(outStats.size / 1024).toFixed(0)} KB`
  );
}

console.log("Done.");
