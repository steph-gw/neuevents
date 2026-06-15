"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (fading) return;
      setFading(true);
      setTimeout(() => {
        setCurrent((idx + TESTIMONIALS.length) % TESTIMONIALS.length);
        setFading(false);
      }, 280);
    },
    [fading]
  );

  useEffect(() => {
    const id = setInterval(() => goTo(current + 1), 8000);
    return () => clearInterval(id);
  }, [current, goTo]);

  const t = TESTIMONIALS[current];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-inner">

        <header className="testimonials-header">
          <p className="eyebrow">Kind Words</p>
          <p className="testimonials-count" aria-live="polite">
            <span>{String(current + 1).padStart(2, "0")}</span>
            <span className="testimonials-count-sep" aria-hidden>/</span>
            <span>{String(TESTIMONIALS.length).padStart(2, "0")}</span>
          </p>
        </header>

        <div className={`testimonials-stage${fading ? " testimonials-stage--fading" : ""}`}>
          <div className="testimonials-visual">
            <div className="testimonials-photo">
              <Image
                key={t.image}
                src={t.image}
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 80vw, 340px"
                style={{ objectPosition: "center top" }}
              />
            </div>
          </div>

          <div className="testimonials-copy">
            <div className="testimonials-copy-body">
              <blockquote className="testimonials-quote">{t.text}</blockquote>
              <cite className="testimonials-author">{t.author}</cite>
            </div>
            <nav className="testimonials-nav" aria-label="Testimonial navigation">
              <button
                type="button"
                className="testimonials-nav-btn"
                onClick={() => goTo(current - 1)}
                aria-label="Previous testimonial"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
              <div className="testimonials-dots">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`testimonials-dot${i === current ? " active" : ""}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    {...(i === current ? { "aria-current": "true" as const } : {})}
                  />
                ))}
              </div>
              <button
                type="button"
                className="testimonials-nav-btn"
                onClick={() => goTo(current + 1)}
                aria-label="Next testimonial"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </nav>
          </div>
        </div>

      </div>
    </section>
  );
}
