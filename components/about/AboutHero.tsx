import Image from "next/image";
import { ABOUT_GROUP_PHOTO, HOME_ABOUT_TEAM } from "@/lib/about-data";

export default function AboutHero() {
  const [lead, ...body] = HOME_ABOUT_TEAM.paragraphs;

  return (
    <section className="about-v2-hero">
      <div className="about-v2-hero-intro">
        <p className="eyebrow">About Us</p>
        <h1 className="section-title">
          About <em>neu events</em>
        </h1>
        <p className="about-v2-hero-lead">{lead}</p>
      </div>

      <div className="about-v2-hero-media-wrap">
        <figure className="about-v2-hero-figure">
          <div className="about-v2-hero-media">
            <Image
              src={ABOUT_GROUP_PHOTO.image}
              alt={ABOUT_GROUP_PHOTO.imageAlt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1100px"
              quality={90}
            />
          </div>
          <figcaption className="about-v2-hero-caption">
            {ABOUT_GROUP_PHOTO.caption}
          </figcaption>
        </figure>
      </div>

      <div className="about-v2-story">
        <div className="about-v2-story-inner">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
