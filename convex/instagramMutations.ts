import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { galleryImage } from "./validators";

const instagramFields = {
  images: v.array(galleryImage),
  videos: v.optional(v.array(v.string())),
  order: v.number(),
  date: v.string(),
  href: v.optional(v.string()),
};

export const create = mutation({
  args: instagramFields,
  handler: async (ctx, args) => {
    return await ctx.db.insert("instagram", args);
  },
});

export const patch = mutation({
  args: {
    id: v.id("instagram"),
    images: v.optional(v.array(galleryImage)),
    videos: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
    date: v.optional(v.string()),
    href: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const clean = Object.fromEntries(
      Object.entries(fields).filter(([, val]) => val !== undefined),
    );
    await ctx.db.patch(id, clean);
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("instagram") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const clear = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("instagram").collect();
    for (const doc of all) {
      await ctx.db.delete(doc._id);
    }
    return all.length;
  },
});
