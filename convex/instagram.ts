import { query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("instagram").withIndex("by_order").collect();
    return posts.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return b.date.localeCompare(a.date);
    });
  },
});
