import type { Metadata } from "next";

export const OG_IMAGE = {
  url: "/images/og/neu-events-og.jpg",
  width: 1200,
  height: 630,
  alt: "neu events — Thoughtfully planned. Beautifully yours.",
} as const;

type PageMetadataInput = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
  path?: string;
};

export function buildPageMetadata({
  title,
  description,
  openGraphTitle,
  openGraphDescription,
  path,
}: PageMetadataInput): Metadata {
  return {
    title: { absolute: title },
    description,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: [OG_IMAGE.url],
    },
  };
}
