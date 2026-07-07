"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/lib/convex";
import { toTitleCase } from "@/lib/gallery-types";
import RichText from "@/components/gallery/RichText";
import type { Doc } from "@/convex/_generated/dataModel";

type GalleryEntry = Doc<"gallery">;
type Segment = { type: "text"; text: string } | { type: "link"; text: string; href: string };

type FilterKey = "all" | "wedding" | "events";

const FILTERS: { key: FilterKey; label: string; tab: string }[] = [
  { key: "all", label: "All", tab: "all" },
  { key: "wedding", label: "Weddings", tab: "weddings" },
  { key: "events", label: "Events", tab: "events" },
];

function collectionFor(type: string): string {
  return type === "wedding" ? "weddings" : "events";
}

function filterFromTab(tab: string | null): FilterKey {
  if (tab === "weddings") return "wedding";
  if (tab === "events") return "events";
  return "all";
}

function tabParamFor(filter: FilterKey): string {
  if (filter === "wedding") return "weddings";
  if (filter === "events") return "events";
  return "all";
}

function hasContent(segs: Segment[]): boolean {
  return segs.some((s) => s.text.trim().length > 0);
}

function GalleryCard({ entry, tab }: { entry: GalleryEntry; tab: string }) {
  const cover = entry.images[entry.coverIndex ?? 0] ?? entry.images[0];
  const locationSegs = entry.location as Segment[];
  const collection = collectionFor(entry.type);
  const href =
    tab === "all"
      ? `/gallery/${collection}/${entry.slug}`
      : `/gallery/${collection}/${entry.slug}?tab=${tab}`;

  return (
    <Link href={href} className="gal-event-card">
      <div className="gal-event-card-media">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt ?? entry.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
            quality={85}
            className="gal-event-card-img"
          />
        ) : (
          <div className="gal-event-card-placeholder" />
        )}
        <span className={`gal-card-badge gal-card-badge--${collection}`}>
          {entry.type === "wedding" ? "Wedding" : "Event"}
        </span>
      </div>
      <div className="gal-event-card-body">
        <h2 className="gal-event-card-name hv2-serif">{toTitleCase(entry.name)}</h2>
        {hasContent(locationSegs) && (
          <p className="gal-event-card-location">
            <RichText segments={locationSegs} />
          </p>
        )}
        {hasContent(entry.photography as Segment[]) && (
          <p className="gal-event-card-photo">
            <RichText segments={entry.photography as Segment[]} />
          </p>
        )}
        <span className="gal-event-card-cta">Read More</span>
      </div>
    </Link>
  );
}

function CardSkeleton() {
  return <div className="gal-event-card gal-event-card--skeleton" aria-hidden="true" />;
}

export default function GalleryClient() {
  const entries = useQuery(api.gallery.list, {});
  const searchParams = useSearchParams();
  const router = useRouter();

  const filter = filterFromTab(searchParams.get("tab"));
  const activeTab = tabParamFor(filter);

  const setFilter = (key: FilterKey) => {
    const url = key === "all" ? "/gallery" : `/gallery?tab=${tabParamFor(key)}`;
    router.replace(url, { scroll: false });
  };

  const sorted = useMemo(() => {
    if (!entries) return undefined;
    return [...entries].sort((a, b) => b.date.localeCompare(a.date));
  }, [entries]);

  const visible = useMemo(() => {
    if (!sorted) return undefined;
    if (filter === "all") return sorted;
    return sorted.filter((e) => e.type === filter);
  }, [sorted, filter]);

  return (
    <main className="gal-events-page">
      <section className="gal-events-hero">
        <div className="hv2-wrap">
          <p className="hv2-eyebrow">Gallery</p>
          <h1 className="gal-events-title hv2-serif">
            Weddings <em>&amp; Events</em>
          </h1>
          <p className="gal-events-lead">
            A curated collection of the celebrations we&apos;ve had the honor of
            bringing to life across Hawaii — from weddings to galas, conferences,
            and styled shoots.
          </p>

          <div className="gal-filter-tabs" role="tablist" aria-label="Filter gallery">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={filter === f.key}
                className={`gal-filter-tab ${filter === f.key ? "is-active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="gal-events-grid-section">
        <div className="hv2-wrap">
          <div className="gal-events-grid">
            {visible === undefined
              ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
              : visible.map((entry) => (
                  <GalleryCard key={entry._id} entry={entry} tab={activeTab} />
                ))}
          </div>
          {visible && visible.length === 0 && (
            <p className="gal-events-empty">No entries yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
