import { v } from "convex/values";
import { query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db.query("gallery").withIndex("by_order").collect();
    return entries.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return b.date.localeCompare(a.date);
    });
  },
});

export const listByType = query({
  args: { type: v.string() },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("gallery")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .collect();
    return entries.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return b.date.localeCompare(a.date);
    });
  },
});

export const getBySlug = query({
  args: { slug: v.string(), type: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const matches = await ctx.db
      .query("gallery")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();
    if (args.type) {
      return matches.find((m) => m.type === args.type) ?? null;
    }
    return matches[0] ?? null;
  },
});
