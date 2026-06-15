export const SITE_NAME = "neu events";

export const SITE_BROWSER_TITLE =
  "Hawaii Wedding & Event Planner | neu events";

export const SITE_DESCRIPTION =
  "Award-winning wedding and event planning in Hawaii — weddings, corporate events, celebrations of life, and destination travel. Naturally elegant, beautifully planned since 2000.";

export const SITE_OG_TITLE =
  "Life's Most Meaningful Moments, Beautifully Planned | neu events";

export const SITE_OG_DESCRIPTION =
  "Weddings, events, celebrations of life, and travel — thoughtfully planned across Hawaii and beyond by the neu events team.";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "https://neuevents.com";
}
