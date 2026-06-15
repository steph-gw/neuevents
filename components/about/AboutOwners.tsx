import Image from "next/image";
import { ABOUT_OWNERS, ABOUT_OWNERS_INTRO } from "@/lib/about-data";

export default function AboutOwners() {
  return (
    <section className="about-page-owners">
      <div className="about-page-owners-inner">
        <header className="about-page-owners-header">
          <p className="eyebrow">Who We Are</p>
          <h2 className="section-title">Meet Our Owners</h2>
          <p className="about-page-hero-lead reveal-text">{ABOUT_OWNERS_INTRO}</p>
        </header>

        <div className="about-page-owners-grid">
          {ABOUT_OWNERS.map((owner, index) => (
            <article
              key={owner.name}
              className={`about-page-owner-card reveal-text${
                index === 1 ? " reveal-text-delay-1" : ""
              }`}
            >
              <div
                className={`about-page-owner-card-media${
                  index === 0 ? " about-page-owner-card-media--candace" : ""
                } reveal-image${
                  index === 1 ? " reveal-image-delay-1" : ""
                }`}
              >
                <Image
                  src={owner.image}
                  alt={owner.imageAlt}
                  fill
                  sizes="(max-width: 768px) 50vw, 240px"
                  quality={90}
                  className="about-page-owner-photo"
                />
              </div>

              <div className="about-page-owner-card-body">
                <h2 className="about-page-owner-name">{owner.name}</h2>
                <ul className="about-page-owner-list">
                  {owner.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
