"use client";

import HeroCarousel from "@/components/home/HeroCarousel";

const KNOT_BADGE_SRC =
  "https://media-api.xogrp.com/images/a8d5af98-7fba-4287-a568-695c3d6436e1~sc_500.500";

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
      <div className="hero-overlay" aria-hidden />
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={KNOT_BADGE_SRC}
          alt="The Knot Best of Weddings 2026"
          width={120}
          height={120}
          className="hero-badge-img"
        />
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
