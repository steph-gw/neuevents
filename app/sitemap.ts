import type { MetadataRoute } from "next";
import {
  collectionForType,
  fetchGalleryList,
} from "@/lib/convex-server";
import { getSiteUrl } from "@/lib/site";

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/gallery", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/tips-ideas", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/perks-and-benefits", changeFrequency: "monthly" as const, priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let galleryEntries: MetadataRoute.Sitemap = [];
  try {
    const entries = await fetchGalleryList();
    galleryEntries = entries.map((entry) => ({
      url: `${siteUrl}/gallery/${collectionForType(entry.type)}/${entry.slug}`,
      lastModified: entry.date ? new Date(`${entry.date}T00:00:00Z`) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
  } catch {
    // Convex may be unavailable at build time; static routes still publish.
  }

  return [...staticEntries, ...galleryEntries];
}
