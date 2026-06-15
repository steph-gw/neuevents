import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.join(import.meta.dirname, "..");
const outDir = path.join(root, "public/images/gallery");
const fullDir = path.join(outDir, "full");
const GALLERY_HEIGHT = 520;
const LIGHTBOX_MAX_DIMENSION = 2400;
const WEBP_QUALITY = 92;
const LIGHTBOX_QUALITY = 92;

const SOURCES = [
  {
    url: "https://static.showit.com/file/2Ml4o-LY2_ZgLkrxNmqGkQ/314908/x0a0746.jpg",
    file: "ceremony-aisle",
    alt: "Outdoor wedding ceremony aisle with white chairs and floral arrangements",
  },
  {
    url: "https://static.showit.com/file/wITm4q6jK5zRWkoNwSx3AA/314908/x0a8932.jpg",
    file: "bride-portrait",
    alt: "Bride holding a white floral bouquet outdoors",
  },
  {
    url: "https://static.showit.com/file/FBF7Dc75M8J77AeN5Eux6A/314908/x0a9491.jpg",
    file: "ballroom-couple",
    alt: "Bride and groom in an elegant ballroom reception",
  },
  {
    url: "https://static.showit.com/file/kn7zPkrjrKNetb3ZVj4cbA/314908/x0a9829.jpg",
    file: "bar-portrait",
    alt: "Bride and groom portrait at a modern venue bar",
  },
  {
    url: "https://static.showit.com/file/OvwLFqH5rz3jfzP4etv4BA/314908/2024-12-12_22_33_01.jpg",
    file: "mother-necklace",
    alt: "Mother helping the bride with her pearl necklace",
  },
  {
    url: "https://static.showit.com/file/-Au5OYRLfzJh39HZ9pE3Hg/314908/2024-12-12_22_34_37.jpg",
    file: "couple-window",
    alt: "Bride and groom smiling in front of a bright window",
  },
  {
    url: "https://static.showit.com/file/zVmB2-02eRYfUklGu_id3w/314908/2024-12-23_04_55_35.jpg",
    file: "wedding-party-walk",
    alt: "Wedding party walking together across a green lawn",
  },
  {
    url: "https://static.showit.com/file/OJvPVJMqg6ub3u_FoN1XAg/314908/2024-12-23_19_51_19.jpg",
    file: "bridesmaids-bouquets",
    alt: "Bridesmaids in sage and cream dresses holding floral bouquets",
  },
  {
    url: "https://static.showit.com/file/ImvOEWCYqg_KvJ70hPjh1g/314908/2024-12-23_20_03_27.jpg",
    file: "reception-table",
    alt: "Elegant wedding reception table setting with florals and candles",
  },
  {
    url: "https://static.showit.com/file/0IfidG7URUYB2OAuXqr1PQ/314908/amanda-tom-wedding-320.jpg",
    file: "cake-display",
    alt: "Wedding cakes and tall floral display by a window",
  },
  {
    url: "https://static.showit.com/file/LG9g5hAax0ByhxDnGwIlqQ/314908/amanda-tom-wedding-331.jpg",
    file: "bamboo-embrace",
    alt: "Bride and groom embracing in a bamboo grove",
  },
  {
    url: "https://static.showit.com/file/ZPaWsYuhQshZ6e42Fkwuyw/314908/amanda-tom-wedding-818.jpg",
    file: "floral-cake",
    alt: "Two-tier wedding cake with cascading coral and pink florals",
  },
  {
    url: "https://static.showit.com/file/MSJlv63I2Iud6ldqR32Qug/314908/asheville_wedding_photographer_allegory_and_elm-291.jpg",
    file: "church-ceremony",
    alt: "Bride and groom at the altar during a church ceremony",
  },
  {
    url: "https://static.showit.com/file/B6u-w1KUdtNUcRHg4SN10g/314908/asheville_wedding_photographer_allegory_and_elm-387.jpg",
    file: "church-aisle",
    alt: "Bride and groom walking down the church aisle",
  },
  {
    url: "https://static.showit.com/file/ewCpLLF-TQ9nQtlmOnqItQ/314908/dsc00972.jpg",
    file: "blue-bridesmaids",
    alt: "Bride and bridesmaids in blue walking through a grassy field",
  },
  {
    url: "https://static.showit.com/file/52HJG0M40AeppZrFuPrOUQ/314908/dsc07967.jpg",
    file: "lift-in-field",
    alt: "Groom lifting the bride in a sunlit grassy field",
  },
  {
    url: "https://static.showit.com/file/_yZpt0zndk2fQUHiULw8kg/314908/ea5a5363.jpg",
    file: "celebration-laugh",
    alt: "Wedding party laughing together outdoors",
  },
  {
    url: "https://static.showit.com/file/q2Kpi8T5yB4DRBYY9DiX_A/314908/ea5a5796.jpg",
    file: "golden-hour-party",
    alt: "Bride, groom, and wedding party walking in golden hour light",
  },
  {
    url: "https://static.showit.com/file/QnET8wSvpghoCRvviF-XAw/314908/elizabeth_dustincouplephotoo-13.jpg",
    file: "couple-forehead-kiss",
    alt: "Groom kissing the bride's forehead in a sunlit field",
  },
  {
    url: "https://static.showit.com/file/4hhfEwml9OWgbbRh5otY6Q/314908/finals-102.jpg",
    file: "rings-invitation",
    alt: "Wedding rings resting on a printed invitation",
  },
  {
    url: "https://static.showit.com/file/9Aymp9QEfDkRWHaWeaQjiQ/314908/finals-178.jpg",
    file: "teal-wedding-cake",
    alt: "Three-tier teal watercolor wedding cake with florals",
  },
  {
    url: "https://static.showit.com/file/24o9UNTGcKDE0OjQR_Bvbw/314908/finals-298.jpg",
    file: "bamboo-kiss",
    alt: "Bride and groom sharing a kiss in a bamboo grove",
  },
  {
    url: "https://static.showit.com/file/3eO8-Fv8pCjRwVy-2usAGQ/314908/francesca_bryan_weddingsneakpeeks-0022.jpg",
    file: "bride-twirl",
    alt: "Bride twirling in her gown surrounded by her bridesmaids",
  },
  {
    url: "https://static.showit.com/file/Xu3lOWXE1woPPvwdGOn-Hg/314908/img_4689.jpg",
    file: "mansion-toast",
    alt: "Bride and friends toasting on a grand brick mansion staircase",
  },
  {
    url: "https://static.showit.com/file/vA9U1eG60NVXntmpuMuWyA/314908/img_5416.jpg",
    file: "emerald-bridal-party",
    alt: "Bride and bridesmaids in emerald gowns in an editorial portrait",
  },
  {
    url: "https://static.showit.com/file/DTsL9_hrk3VW7mYfYjU1ew/314908/mt-105.jpg",
    file: "welcome-mirror",
    alt: "Arched welcome mirror sign with florals at a wedding",
  },
  {
    url: "https://static.showit.com/file/3msckBYqY-Yo0Cf7JL9SWQ/314908/mt-131.jpg",
    file: "veil-embrace",
    alt: "Bride and groom embracing under a pearl-trimmed veil",
  },
  {
    url: "https://static.showit.com/file/G2q_ukfnZMTUixNJNZG09Q/314908/rk1_7115_2048.jpg",
    file: "cottage-venue",
    alt: "Rustic cottage-style wedding venue surrounded by trees",
  },
  {
    url: "https://static.showit.com/file/ZxO69cKM3yMmc1jGvsJ7Aw/314908/rk1_7726_2048.jpg",
    file: "hedge-kiss",
    alt: "Bride and groom kissing on a path lined with tall hedges",
  },
];

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(fullDir, { recursive: true });

const manifest = [];

for (const item of SOURCES) {
  const res = await fetch(item.url);
  if (!res.ok) throw new Error(`Failed ${item.url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  const image = sharp(buffer).rotate();

  const outPath = path.join(outDir, `${item.file}.webp`);
  await image
    .clone()
    .resize(null, GALLERY_HEIGHT, { withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath);

  const fullPath = path.join(fullDir, `${item.file}.webp`);
  await image
    .clone()
    .resize(LIGHTBOX_MAX_DIMENSION, LIGHTBOX_MAX_DIMENSION, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: LIGHTBOX_QUALITY })
    .toFile(fullPath);

  const stats = fs.statSync(outPath);
  const optimized = await sharp(outPath).metadata();
  const fullOptimized = await sharp(fullPath).metadata();

  manifest.push({
    src: `/images/gallery/${item.file}.webp`,
    fullSrc: `/images/gallery/full/${item.file}.webp`,
    alt: item.alt,
    width: optimized.width,
    height: optimized.height,
    fullWidth: fullOptimized.width,
    fullHeight: fullOptimized.height,
  });

  console.log(
    `${item.file}.webp — ${optimized.width}x${optimized.height} — ${(stats.size / 1024).toFixed(0)} KB | full ${fullOptimized.width}x${fullOptimized.height}`
  );
}

fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);

const tsContent = `// Generated by scripts/optimize-gallery-images.mjs — do not edit by hand
export const GALLERY_IMAGES = ${JSON.stringify(manifest, null, 2)} as const;
`;

fs.writeFileSync(path.join(root, "lib/gallery-data.ts"), tsContent);

console.log(`\nOptimized ${manifest.length} gallery images.`);
