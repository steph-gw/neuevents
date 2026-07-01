"use client";

import { useState, useCallback } from "react";
import HOME_TESTIMONIALS from "@/lib/home-testimonials-data";

function renderWithHighlight(text: string, highlight: string) {
  const idx = text.indexOf(highlight);
  if (idx === -1) return text;

  return (
    <>
      {text.slice(0, idx)}
      <span className="hv2-quote-highlight">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  );
}

function QuoteNavIcon({ direction }: { direction: "prev" | "next" }) {
  if (direction === "prev") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M19 12H5M11 6l-6 6 6 6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function HomeTestimonials() {
  const [current, setCurrent] = useState(0);
  const total = HOME_TESTIMONIALS.length;

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(((idx % total) + total) % total);
    },
    [total],
  );

  const t = HOME_TESTIMONIALS[current];
  const paragraphs = t.text.split("\n\n").filter(Boolean);

  return (
    <section className="hv2-testimonial" id="testimonials">
      <div className="hv2-wrap">
        <div className="hv2-section-head">
          <span className="hv2-eyebrow">Kind Words</span>
          <h2 className="hv2-serif">
            What Our <em>Clients Say</em>
          </h2>
        </div>

        <div className="hv2-quote-stage">
          <button
            type="button"
            className="hv2-quote-nav"
            onClick={() => goTo(current - 1)}
            aria-label="Previous testimonial"
          >
            <QuoteNavIcon direction="prev" />
          </button>

          <div className="hv2-quote-wrap">
            <div className="hv2-quote-mark hv2-serif" aria-hidden>
              &ldquo;
            </div>
            <div className="hv2-quote-text">
              {paragraphs.map((para, i) => (
                <p key={i}>{renderWithHighlight(para, t.highlight)}</p>
              ))}
            </div>
            <p className="hv2-quote-author">— {t.author}</p>
          </div>

          <button
            type="button"
            className="hv2-quote-nav"
            onClick={() => goTo(current + 1)}
            aria-label="Next testimonial"
          >
            <QuoteNavIcon direction="next" />
          </button>
        </div>

        <div className="hv2-quote-controls">
          <button
            type="button"
            className="hv2-quote-nav hv2-quote-nav--mobile"
            onClick={() => goTo(current - 1)}
            aria-label="Previous testimonial"
          >
            <QuoteNavIcon direction="prev" />
          </button>

          <div className="hv2-quote-dots">
            {HOME_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === current ? "active" : undefined}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="hv2-quote-nav hv2-quote-nav--mobile"
            onClick={() => goTo(current + 1)}
            aria-label="Next testimonial"
          >
            <QuoteNavIcon direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
