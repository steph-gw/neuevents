import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { galleryImage, richText } from "./validators";

const galleryFields = {
  type: v.string(),
  slug: v.string(),
  name: v.string(),
  description: richText,
  videoUrl: v.optional(v.string()),
  images: v.array(galleryImage),
  coverIndex: v.optional(v.number()),
  photography: richText,
  location: richText,
  party: v.string(),
  order: v.number(),
  date: v.string(),
};

export const create = mutation({
  args: galleryFields,
  handler: async (ctx, args) => {
    return await ctx.db.insert("gallery", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("gallery"),
    ...galleryFields,
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
    return id;
  },
});

export const patch = mutation({
  args: {
    id: v.id("gallery"),
    slug: v.optional(v.string()),
    order: v.optional(v.number()),
    date: v.optional(v.string()),
    name: v.optional(v.string()),
    type: v.optional(v.string()),
    party: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    images: v.optional(v.array(galleryImage)),
    coverIndex: v.optional(v.number()),
    location: v.optional(richText),
    photography: v.optional(richText),
    description: v.optional(richText),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const clean = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v !== undefined),
    );
    await ctx.db.patch(id, clean);
    return id;
  },
});

export const setCover = mutation({
  args: {
    id: v.id("gallery"),
    coverIndex: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { coverIndex: args.coverIndex });
    return args.id;
  },
});

export const setImages = mutation({
  args: {
    id: v.id("gallery"),
    images: v.array(galleryImage),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { images: args.images });
    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
