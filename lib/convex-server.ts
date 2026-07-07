import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

export type GalleryEntry = Doc<"gallery">;

function getConvexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
  }
  return new ConvexHttpClient(url);
}

export async function fetchGalleryList(): Promise<GalleryEntry[]> {
  const client = getConvexClient();
  return client.query(api.gallery.list, {});
}

export async function fetchGalleryBySlug(
  slug: string,
  type: string,
): Promise<GalleryEntry | null> {
  const client = getConvexClient();
  return client.query(api.gallery.getBySlug, { slug, type });
}

export function collectionForType(type: string): string {
  return type === "wedding" ? "weddings" : "events";
}

export function typeForCollection(collection: string): string | null {
  if (collection === "weddings") return "wedding";
  if (collection === "events") return "events";
  return null;
}
