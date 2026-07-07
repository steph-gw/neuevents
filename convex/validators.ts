import { v } from "convex/values";

/** Inline rich text: plain text segments and linked text (e.g. "Photos by " + link). */
export const richTextSegment = v.union(
  v.object({
    type: v.literal("text"),
    text: v.string(),
  }),
  v.object({
    type: v.literal("link"),
    text: v.string(),
    href: v.string(),
  }),
);

export const richText = v.array(richTextSegment);

export const galleryImage = v.object({
  url: v.string(),
  alt: v.optional(v.string()),
  storageId: v.optional(v.id("_storage")),
});
