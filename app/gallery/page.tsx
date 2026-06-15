import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Wedding Gallery | neu events",
  description:
    "Browse a curated collection of weddings and celebrations planned by neu events across North & South Carolina and beyond.",
  openGraphTitle: "Wedding Gallery | neu events",
  openGraphDescription:
    "A curated collection of celebrations we've had the honor of bringing to life across the Carolinas and beyond.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <PagePlaceholder
      eyebrow="Featured Celebrations"
      title="Wedding"
      titleEm="Gallery"
      description="A curated collection of celebrations we've had the honor of bringing to life — coming soon."
    />
  );
}
