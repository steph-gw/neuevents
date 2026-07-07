import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { galleryImage, richText } from "./validators";

export default defineSchema({
  gallery: defineTable({
    type: v.string(),
    slug: v.string(),
    name: v.string(),
    description: richText,
    videoUrl: v.optional(v.string()),
    images: v.array(galleryImage),
    /** Index into `images` used as the listing cover. Defaults to 0. */
    coverIndex: v.optional(v.number()),
    photography: richText,
    location: richText,
    party: v.string(),
    order: v.number(),
    /** Event date as ISO 8601 calendar date (YYYY-MM-DD). */
    date: v.string(),
  })
    .index("by_type", ["type"])
    .index("by_party", ["party"])
    .index("by_name", ["name"])
    .index("by_order", ["order"])
    .index("by_slug", ["slug"]),

  instagram: defineTable({
    images: v.array(galleryImage),
    /** Video sources (e.g. self-hosted mp4 URLs). */
    videos: v.optional(v.array(v.string())),
    order: v.number(),
    /** Post date as ISO 8601 calendar date (YYYY-MM-DD). */
    date: v.string(),
    /** Optional link out to the specific post on Instagram. */
    href: v.optional(v.string()),
  }).index("by_order", ["order"]),
});
