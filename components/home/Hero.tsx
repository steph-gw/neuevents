"use client";

import AnniversaryBadge from "@/components/AnniversaryBadge";
import HeroCarousel from "@/components/home/HeroCarousel";

export default function Hero() {
  const scrollToNextSection = () => {
    document.getElementById("after-hero")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToIntro = () => {
    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-media">
        <HeroCarousel />
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">
          Bespoke Luxury Wedding Planning in North & South Carolina and beyond
        </p>
        <h1 className="hero-title">
          Your Love Story,
          <br />
          <em>Beautifully Told</em>
        </h1>
        <div className="hero-actions">
          <a
            href="#after-hero"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              scrollToNextSection();
            }}
          >
            Begin Your Journey
          </a>
        </div>
      </div>

      <div className="hero-badge">
        <AnniversaryBadge className="hero-badge-svg" />
      </div>

      <button
        type="button"
        className="hero-scroll"
        onClick={scrollToIntro}
        aria-label="Scroll to introduction"
      >
        <span className="scroll-line" aria-hidden />
        <span>Scroll</span>
      </button>
    </section>
  );
}
