"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { HERO_SLIDES } from "@/lib/data";

const INTERVAL_MS = 4500;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion, advance]);

  return (
    <div className="hero-carousel" aria-hidden>
      {HERO_SLIDES.map((slide, i) => {
        const isCurrent = i === current;
        return (
          <div
            key={slide.src}
            className={`hero-slide${isCurrent ? " hero-slide--current" : ""}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i <= 1}
              sizes="100vw"
              className={
                isCurrent && !reduceMotion ? "hero-slide-img" : undefined
              }
              style={{ objectPosition: slide.position }}
            />
          </div>
        );
      })}
    </div>
  );
}
