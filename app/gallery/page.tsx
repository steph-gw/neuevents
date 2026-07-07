import type { Metadata } from "next";
import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/metadata";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Weddings & Events Gallery | neu events",
  description:
    "Browse weddings, galas, conferences, and celebrations planned by neu events across Hawaii.",
  openGraphTitle: "Weddings & Events Gallery | neu events",
  openGraphDescription:
    "A curated collection of weddings and events we've had the honor of bringing to life across Hawaii.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryClient />
    </Suspense>
  );
}
