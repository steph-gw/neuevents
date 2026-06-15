import Image from "next/image";
import { ABOUT_COMPANY } from "@/lib/about-data";

export default function AboutCompany() {
  return (
    <section className="about-page-hero-block">
      <div className="about-page-hero-intro">
        <p className="eyebrow">Our Story</p>
        <h1 className="section-title">
          About <em>neu events</em>
        </h1>
        <p className="about-page-hero-lead">
          Introducing the team, philosophy, and passion behind every celebration
          we create across North &amp; South Carolina and beyond.
        </p>
      </div>

      <div className="about-page-hero-inner">
        <div className="about-page-hero-card reveal-text">
          <div className="about-page-hero-card-content">
            <p className="about-page-tag">{ABOUT_COMPANY.eyebrow}</p>
            <div className="about-page-copy">
              {ABOUT_COMPANY.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="about-page-hero-media">
            <Image
              src="/images/about/couple.webp"
              alt="Candace and Matt Kelly, owners of neu events"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 480px"
              quality={90}
              style={{ objectPosition: "center top" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
