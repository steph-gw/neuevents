"use client";

import HeroPolaroidStack from "@/components/home/HeroPolaroidStack";
import AnniversaryBadgeV2 from "@/components/home/AnniversaryBadgeV2";
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

  const scrollToTeam = () => {
    document.getElementById("team")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="hv2-hero" id="home">
        <div className="hv2-hero-inner">
          <div className="hv2-hero-text">
            <div className="hv2-hero-tags">
              <span>Weddings</span>
              <span>Events</span>
              <span>Celebrations of Life</span>
              <span>Travel</span>
              <span>Hawaii</span>
            </div>
            <h1 className="hv2-hero-title">
              <span className="hv2-hero-title-line">Where life&apos;s biggest</span>
              <span className="hv2-hero-title-line">moments deserve</span>
              <span className="hv2-accent">beautiful planning.</span>
            </h1>
            <div className="hv2-hero-actions">
              <PlaceholderButton className="hv2-btn-primary" onClick={scrollToServices}>
                Explore Our Services
              </PlaceholderButton>
              <button type="button" className="hv2-text-link" onClick={scrollToTeam}>
                Our Story <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="hv2-hero-press">
              <div className="hv2-hero-press-logos">
                {PRESS_LOGOS.map((logo) => (
                  <a
                    key={logo.alt}
                    href={logo.href}
                    className="hv2-hero-press-logo"
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

          <div className="hv2-hero-media">
            <HeroPolaroidStack />
            <div className="hv2-hero-badge">
              <AnniversaryBadgeV2 className="hv2-hero-badge-svg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
