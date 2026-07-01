"use client";

import { useState, useCallback } from "react";
import HOME_TESTIMONIALS from "@/lib/home-testimonials-data";

export default function HomeTestimonials() {
  const [current, setCurrent] = useState(0);
  const total = HOME_TESTIMONIALS.length;

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const t = HOME_TESTIMONIALS[current];
  const paragraphs = t.text.split("\n\n").filter(Boolean);

  return (
    <section className="ht" id="testimonials">
      <div className="ht-inner">
        <header className="ht-header">
          <p className="eyebrow">Kind Words</p>
          <h2 className="section-title">
            What Our <em>Clients Say</em>
          </h2>
        </header>

        <div className="ht-stage">
          <button
            type="button"
            className="ht-nav-btn"
            onClick={() => goTo(current - 1)}
            aria-label="Previous testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>

          <div className="ht-card">
            <div className="ht-quote-mark" aria-hidden>&ldquo;</div>
            <div className="ht-body">
              {paragraphs.map((para, i) => (
                <p key={i} className="ht-text">{para}</p>
              ))}
            </div>
            <cite className="ht-author">— {t.author}</cite>
          </div>

          <button
            type="button"
            className="ht-nav-btn"
            onClick={() => goTo(current + 1)}
            aria-label="Next testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="ht-dots-row">
          <button
            type="button"
            className="ht-nav-btn ht-nav-btn--mobile"
            onClick={() => goTo(current - 1)}
            aria-label="Previous testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <div className="ht-dots">
            {HOME_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ht-dot${i === current ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="ht-nav-btn ht-nav-btn--mobile"
            onClick={() => goTo(current + 1)}
            aria-label="Next testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
