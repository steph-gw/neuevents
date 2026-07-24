export type RichTextSegment =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string };

export type GalleryImage = {
  url: string;
  alt?: string;
  storageId?: string;
};

export function photographyCredit(name: string, href: string): RichTextSegment[] {
  return [
    { type: "text", text: "Photos by " },
    { type: "link", text: name, href },
  ];
}

export function richTextToPlain(segments: RichTextSegment[]): string {
  return segments.map((s) => s.text).join("");
}

export function richTextToJsx(
  segments: RichTextSegment[],
): Array<{ key: string; type: "text" | "link"; text: string; href?: string }> {
  return segments.map((s, i) => ({
    key: `${i}`,
    ...s,
  }));
}

export function formatEventDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatEventYear(iso: string): string {
  return iso.split("-")[0];
}

const MINOR_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "in", "nor",
  "of", "on", "or", "the", "to", "with", "vs",
]);

/** Kept fully uppercase when title-casing gallery names. */
const ACRONYMS = new Set(["hah", "hscadv"]);

export function toTitleCase(input: string): string {
  const words = input.trim().toLowerCase().split(/(\s+)/);
  return words
    .map((word, i) => {
      if (/^\s+$/.test(word) || word.length === 0) return word;
      if (ACRONYMS.has(word)) return word.toUpperCase();
      const isFirst = i === 0;
      const isLast = i === words.length - 1;
      if (!isFirst && !isLast && MINOR_WORDS.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}
