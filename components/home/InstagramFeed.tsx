"use client";

import Image from "next/image";
import { Instagram } from "react-feather";
import { useQuery } from "convex/react";
import { api } from "@/lib/convex";

const INSTAGRAM_URL = "https://www.instagram.com/neuevents/";
const INSTAGRAM_HANDLE = "@neuevents";

export default function InstagramFeed() {
  const posts = useQuery(api.instagram.list, {});

  // Hide the section entirely if the feed is empty (but keep it while loading).
  if (posts && posts.length === 0) return null;

  const items = posts ?? Array.from({ length: 8 }, () => null);

  return (
    <section className="hv2-section hv2-ig" id="instagram">
      <div className="hv2-wrap">
        <div className="hv2-ig-grid">
          {items.map((post, i) => {
            if (!post) {
              return (
                <div
                  key={`ig-skeleton-${i}`}
                  className="hv2-ig-tile hv2-ig-tile--skeleton"
                  aria-hidden
                />
              );
            }

            const image = post.images[0];
            const video = post.videos?.[0];
            const href = post.href ?? INSTAGRAM_URL;

            return (
              <a
                key={post._id}
                href={href}
                className="hv2-ig-tile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View this post on Instagram (${INSTAGRAM_HANDLE})`}
              >
                {video ? (
                  <video
                    className="hv2-ig-media"
                    src={video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : image ? (
                  <Image
                    src={image.url}
                    alt={image.alt ?? `Neu Events on Instagram — ${i + 1}`}
                    fill
                    sizes="(max-width: 560px) 50vw, (max-width: 900px) 25vw, 12vw"
                    quality={85}
                    className="hv2-ig-media"
                  />
                ) : null}
              </a>
            );
          })}
        </div>

        <div className="hv2-ig-cta">
          <a
            href={INSTAGRAM_URL}
            className="hv2-btn-outline hv2-ig-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={18} aria-hidden />
            <span>Follow us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
