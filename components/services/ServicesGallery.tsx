"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { GALLERY_IMAGES } from "@/lib/gallery-data";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

export default function ServicesGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const goToPrevious = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveIndex((index) => {
      if (index === null) return null;
      return (index - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    });
  }, []);

  const goToNext = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveIndex((index) => {
      if (index === null) return null;
      return (index + 1) % GALLERY_IMAGES.length;
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => {
          if (index === null) return null;
          return (index - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
        });
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => {
          if (index === null) return null;
          return (index + 1) % GALLERY_IMAGES.length;
        });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, closeLightbox]);

  const activeImage =
    activeIndex === null ? null : GALLERY_IMAGES[activeIndex];

  return (
    <section className="services-page-gallery" id="portfolio-gallery">
      <div className="services-page-gallery-header">
        <p className="eyebrow">Featured Celebrations</p>
        <h2 className="section-title">Gallery</h2>
        <p className="services-page-gallery-lead">
          A curated look at the celebrations we&apos;ve brought to life across
          North &amp; South Carolina and beyond.
        </p>
      </div>

      <div className="services-page-gallery-grid">
        {GALLERY_IMAGES.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`services-page-gallery-item reveal-image${
              index % 3 === 1
                ? " reveal-image-delay-1"
                : index % 3 === 2
                  ? " reveal-image-delay-2"
                  : ""
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`View larger: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 620px"
              quality={92}
              className="services-page-gallery-photo"
            />
          </button>
        ))}
      </div>

      {activeImage && activeIndex !== null && (
        <div
          className="gallery-lightbox"
          role="presentation"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-nav--prev"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronIcon direction="left" />
          </button>

          <div
            className="gallery-lightbox-image-wrap"
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.alt}
          >
            <img
              src={activeImage.fullSrc}
              alt={activeImage.alt}
              width={activeImage.fullWidth}
              height={activeImage.fullHeight}
              className="gallery-lightbox-photo"
              decoding="async"
            />
          </div>

          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-nav--next"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      )}
    </section>
  );
}
