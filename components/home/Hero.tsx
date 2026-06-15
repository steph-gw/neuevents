"use client";

import AnniversaryBadge from "@/components/AnniversaryBadge";
import HeroCarousel from "@/components/home/HeroCarousel";
import PlaceholderButton from "@/components/PlaceholderButton";
import Image from "next/image";

const PRESS_LOGOS = [
  {
    src: "/images/press/the-knot.png",
    alt: "The Knot",
    href: "https://www.theknot.com/marketplace/neu-events-honolulu-hi-211110",
    width: 393,
    height: 128,
    displayHeight: 22,
  },
  {
    src: "/images/press/owa.png",
    alt: "Oahu Wedding Association",
    href: "https://www.oahuweddingassociation.com/",
    width: 200,
    height: 200,
    displayHeight: 44,
  },
  {
    src: "/images/press/equally-wed.png",
    alt: "Equally Wed",
    href: "https://equallywed.com/hawaii-ranch-styled-lesbian-wedding/",
    width: 300,
    height: 45,
    displayHeight: 16,
  },
] as const;

export default function Hero() {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-eyebrow">
          Weddings · Events · Celebration of Life · Travel · Hawaii
        </p>
        <h1 className="hero-title">
          Life&apos;s Most Meaningful Moments,
          <br />
          <em>Beautifully Planned</em>
        </h1>
        <div className="hero-actions">
          <PlaceholderButton
            className="btn btn-primary"
            onClick={scrollToServices}
          >
            Explore Our Services
          </PlaceholderButton>

          <div className="hero-press">
            <div className="hero-press-logos">
              {PRESS_LOGOS.map((logo) => (
                <a
                  key={logo.alt}
                  href={logo.href}
                  className="hero-press-logo"
                  style={{ height: logo.displayHeight }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={logo.alt}
                >
                  <Image
                    src={logo.src}
                    alt=""
                    width={logo.width}
                    height={logo.height}
                    style={{ height: logo.displayHeight, width: "auto" }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-media">
        <HeroCarousel />
      </div>

      <div className="hero-badge">
        <AnniversaryBadge className="hero-badge-svg" />
      </div>
    </section>
  );
}
