import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

const ROUTES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/travel", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/gallery", changeFrequency: "monthly" as const, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
