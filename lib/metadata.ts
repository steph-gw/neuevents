import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const OG_IMAGE = {
  url: "/images/og/neuevents-og.jpg",
  width: 1024,
  height: 682,
  alt: "neu events — naturally elegant & unforgettable",
} as const;

export type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type PageMetadataInput = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
  path?: string;
  ogImage?: OgImage;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  openGraphTitle,
  openGraphDescription,
  path,
  ogImage = OG_IMAGE,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonicalUrl = path ? new URL(path, getSiteUrl()).toString() : undefined;

  return {
    title: { absolute: title },
    description,
    ...(path ? { alternates: { canonical: path } } : {}),
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
    openGraph: {
      type: "website",
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      title: openGraphTitle,
      description: openGraphDescription,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: [ogImage.url],
    },
  };
}
