"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/lib/convex";
import RichText from "@/components/gallery/RichText";
import Lightbox from "@/components/gallery/Lightbox";

type Segment = { type: "text"; text: string } | { type: "link"; text: string; href: string };

function hasContent(segs: Segment[]): boolean {
  return segs.some((s) => s.text.trim().length > 0);
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {dir === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      className="gal-detail-meta-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      className="gal-detail-meta-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function collectionForType(type: string): string {
  return type === "wedding" ? "weddings" : "events";
}

/** Extracts a YouTube video id from watch/share/embed URLs. Returns null if not YouTube. */
function youTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1) || null;
    if (host.endsWith("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/);
      if (m) return m[1];
    }
    return null;
  } catch {
    return null;
  }
}

export default function GalleryDetailClient({
  slug,
  type,
  collection,
  tab = "all",
}: {
  slug: string;
  type: string;
  collection: string;
  tab?: string;
}) {
  const entry = useQuery(api.gallery.getBySlug, { slug, type });
  const allEntries = useQuery(api.gallery.list, {});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Build the sibling list to match the gallery listing the visitor came from:
  // "all" traverses every entry (date desc); a specific tab stays within its type.
  const tabType = tab === "weddings" ? "wedding" : tab === "events" ? "events" : null;
  const siblings = allEntries
    ? [...allEntries]
        .sort((a, b) => b.date.localeCompare(a.date))
        .filter((e) => (tabType ? e.type === tabType : true))
    : undefined;

  const backHref = tab === "all" ? "/gallery" : `/gallery?tab=${tab}`;
  const tabSuffix = tab === "all" ? "" : `?tab=${tab}`;

  if (entry === undefined) {
    return (
      <main className="gal-detail-page">
        <div className="hv2-wrap gal-detail-inner">
          <div className="gal-detail-skeleton" aria-busy="true" aria-label="Loading…" />
        </div>
      </main>
    );
  }

  if (entry === null) {
    return (
      <main className="gal-detail-page">
        <div className="hv2-wrap gal-detail-not-found-wrap">
          <p className="gal-detail-not-found">Not found.</p>
          <Link href={backHref} className="hv2-btn-primary">
            ← Back to Gallery
          </Link>
        </div>
      </main>
    );
  }

  const videoId = entry.videoUrl ? youTubeId(entry.videoUrl) : null;
  // When an entry has a film, its listing cover isn't repeated in the photo
  // grid below the video.
  const coverIdx = entry.coverIndex ?? 0;
  const images = videoId
    ? entry.images.filter((_, i) => i !== coverIdx)
    : entry.images;
  const locationSegs = entry.location as Segment[];
  const photographySegs = entry.photography as Segment[];
  const descriptionSegs = entry.description as Segment[];

  const currentIndex = siblings?.findIndex((e) => e.slug === slug) ?? -1;
  const prev = siblings && currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const next =
    siblings && currentIndex >= 0 && currentIndex < siblings.length - 1
      ? siblings[currentIndex + 1]
      : null;

  return (
    <main className="gal-detail-page">
      <section className="gal-detail-body">
        <div className="hv2-wrap gal-detail-inner">
          <Link href={backHref} className="gal-detail-back">
            <ChevronIcon dir="left" />
            <span>Back</span>
          </Link>

          <header className="gal-detail-head">
            <h1 className="gal-detail-title hv2-serif">{entry.name}</h1>
            {hasContent(locationSegs) && (
              <p className="gal-detail-location gal-detail-meta">
                <MapPinIcon />
                <span>
                  <RichText segments={locationSegs} />
                </span>
              </p>
            )}
            {hasContent(photographySegs) && (
              <p className="gal-detail-credit gal-detail-meta">
                <CameraIcon />
                <span>
                  <RichText segments={photographySegs} />
                </span>
              </p>
            )}
          </header>

          {hasContent(descriptionSegs) && (
            <div className="gal-detail-description">
              <RichText segments={descriptionSegs} />
            </div>
          )}

          {videoId && (
            <div className="gal-detail-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`${entry.name} — film`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          )}

          {images.length > 0 && (
            <div className="gal-detail-grid">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className="gal-detail-grid-item"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View photo ${i + 1}`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt ?? `${entry.name} — photo ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={85}
                  />
                </button>
              ))}
            </div>
          )}

          {(prev || next) && (
            <nav className="gal-detail-nav" aria-label="Gallery navigation">
              {prev ? (
                <Link
                  href={`/gallery/${collectionForType(prev.type)}/${prev.slug}${tabSuffix}`}
                  className="gal-detail-nav-link gal-detail-nav-link--prev"
                >
                  <ChevronIcon dir="left" />
                  <span className="gal-detail-nav-text">
                    <span className="gal-detail-nav-label">Previous</span>
                    <span className="gal-detail-nav-name">{prev.name}</span>
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/gallery/${collectionForType(next.type)}/${next.slug}${tabSuffix}`}
                  className="gal-detail-nav-link gal-detail-nav-link--next"
                >
                  <span className="gal-detail-nav-text">
                    <span className="gal-detail-nav-label">Next</span>
                    <span className="gal-detail-nav-name">{next.name}</span>
                  </span>
                  <ChevronIcon dir="right" />
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </div>
      </section>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
        altBase={entry.name}
      />
    </main>
  );
}
