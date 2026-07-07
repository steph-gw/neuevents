"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { GalleryImage } from "@/lib/gallery-types";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {dir === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

type LightboxProps = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  altBase: string;
};

export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
  altBase,
}: LightboxProps) {
  const isOpen = index !== null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, goPrev, goNext]);

  if (index === null) return null;
  const image = images[index];
  if (!image) return null;

  const multiple = images.length > 1;

  return (
    <div
      className="gal-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
    >
      <button className="gal-lightbox-close" onClick={onClose} aria-label="Close preview">
        <CloseIcon />
      </button>

      {multiple && (
        <button
          className="gal-lightbox-nav gal-lightbox-nav--prev"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
        >
          <ChevronIcon dir="left" />
        </button>
      )}

      <div className="gal-lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <Image
          key={index}
          src={image.url}
          alt={image.alt ?? `${altBase} — photo ${index + 1}`}
          fill
          sizes="100vw"
          quality={90}
          priority
          className="gal-lightbox-img"
        />
      </div>

      {multiple && (
        <button
          className="gal-lightbox-nav gal-lightbox-nav--next"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
        >
          <ChevronIcon dir="right" />
        </button>
      )}

      {multiple && (
        <div className="gal-lightbox-counter">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
