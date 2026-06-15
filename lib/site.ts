export const SITE_NAME = "neu events";

export const SITE_BROWSER_TITLE =
  "North & South Carolina Wedding Planner | neu events";

export const SITE_DESCRIPTION =
  "Bespoke luxury wedding planning and design across Asheville, Charlotte, and the Carolinas. Full planning, partial planning, event management, and travel.";

export const SITE_OG_TITLE =
  "Your Love Story, Beautifully Told | neu events";

export const SITE_OG_DESCRIPTION =
  "Bespoke luxury wedding planning and design across North & South Carolina and beyond — full planning, partial planning, event management, and travel.";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "https://neuevents.com";
}
