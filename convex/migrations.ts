import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

// The slugs from neuevents.com/events, keyed by event name
const SLUG_MAP: Record<string, string> = {
  "PUBLIC SCHOOLS OF HAWAIʻI FOUNDATION 2026": "public-schools-hawaii-2026",
  "HAH 2025 AWARDS AND SCHOLARSHIP GALA": "hah-awards-scholarship-gala-mwxfe",
  "ANNUAL HSCADV CONFERENCE 2025": "hscadv-conference-2025",
  "LUANA KAI STYLED PHOTO SHOOT": "styled-photo-shoot",
  "HAH AWARDS AND SCHOLARSHIP GALA": "hah-awards-scholarship-gala",
  "ANNUAL HSCADV CONFERENCE 2024": "hscadv-conference-2024",
  "PUBLIC SCHOOLS OF HAWAIʻI FOUNDATION": "public-schools-hawaii",
  "EQUALLY WED PHOTOSHOOT": "equally-wed-photoshoot",
  "KAKAʻAKO WINE LOFT & SAKE COLLECTION GRAND OPENING":
    "kakaako-wine-loft-sake-collection-grand-opening",
  "THE KNOT MIXER": "the-knot-mixer",
};

export const addSlugs = internalMutation({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db.query("gallery").collect();
    let updated = 0;
    for (const entry of entries) {
      const slug = (entry as Record<string, unknown>).slug as string | undefined;
      if (slug) continue;
      const mapped = SLUG_MAP[entry.name];
      if (!mapped) {
        console.warn(`No slug mapping for: ${entry.name}`);
        continue;
      }
      await ctx.db.patch(entry._id, { slug: mapped });
      updated++;
    }
    return `Updated ${updated} entries`;
  },
});
