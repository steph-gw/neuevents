import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryDetailClient from "@/components/gallery/GalleryDetailClient";
import StructuredData from "@/components/StructuredData";
import { fetchGalleryBySlug } from "@/lib/convex-server";
import { richTextToPlain, toTitleCase } from "@/lib/gallery-types";
import { buildPageMetadata } from "@/lib/metadata";
import type { RichTextSegment } from "@/lib/gallery-types";
import {
  buildBreadcrumbSchema,
  buildGalleryEntrySchema,
} from "@/lib/structured-data";

const COLLECTION_TO_TYPE: Record<string, string> = {
  events: "events",
  weddings: "wedding",
};

type Props = {
  params: Promise<{ collection: string; slug: string }>;
  searchParams: Promise<{ tab?: string }>;
};

function truncateDescription(text: string, max = 155): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection, slug } = await params;
  const type = COLLECTION_TO_TYPE[collection];
  if (!type) {
    return { title: "Not Found | neu events" };
  }

  const entry = await fetchGalleryBySlug(slug, type);
  if (!entry) {
    return { title: "Not Found | neu events" };
  }

  const title = `${toTitleCase(entry.name)} | neu events`;
  const plainDescription = richTextToPlain(entry.description as RichTextSegment[]);
  const fallback =
    entry.type === "wedding"
      ? "A wedding planned by neu events in Hawaii."
      : "An event planned by neu events in Hawaii.";
  const description = truncateDescription(plainDescription || fallback);

  const cover = entry.images[entry.coverIndex ?? 0] ?? entry.images[0];
  const ogImage = cover
    ? {
        url: cover.url,
        width: 1200,
        height: 1200,
        alt: cover.alt ?? entry.name,
      }
    : undefined;

  return buildPageMetadata({
    title,
    description,
    openGraphTitle: title,
    openGraphDescription: description,
    path: `/gallery/${collection}/${slug}`,
    ogImage,
  });
}

export default async function GalleryDetailPage({ params, searchParams }: Props) {
  const { collection, slug } = await params;
  const { tab } = await searchParams;
  const type = COLLECTION_TO_TYPE[collection];
  if (!type) notFound();
  const entry = await fetchGalleryBySlug(slug, type);
  if (!entry) notFound();

  const cover = entry.images[entry.coverIndex ?? 0] ?? entry.images[0];
  const description = richTextToPlain(entry.description as RichTextSegment[]);
  const galleryEntrySchema = buildGalleryEntrySchema({
    name: toTitleCase(entry.name),
    description: description || "A celebration planned by neu events in Hawaii.",
    date: entry.date,
    image: cover?.url,
    path: `/gallery/${collection}/${slug}`,
    type: entry.type,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    {
      name: collection === "weddings" ? "Weddings" : "Events",
      path: "/gallery",
    },
    { name: toTitleCase(entry.name), path: `/gallery/${collection}/${slug}` },
  ]);

  return (
    <>
      <StructuredData data={galleryEntrySchema} />
      <StructuredData data={breadcrumbSchema} />
      <GalleryDetailClient
        slug={slug}
        type={type}
        collection={collection}
        tab={tab === "weddings" || tab === "events" ? tab : "all"}
      />
    </>
  );
}
