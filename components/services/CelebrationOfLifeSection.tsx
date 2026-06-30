import Image from "next/image";
import Link from "next/link";
import { CELEBRATION_OF_LIFE } from "@/lib/services-data";

export default function CelebrationOfLifeSection() {
  const feature = CELEBRATION_OF_LIFE;

  return (
    <section
      id="celebration-of-life"
      className="services-section services-section--alt"
    >
      <div className="services-section-inner">
        <article className="services-feature">
          <div className="services-feature-inner">
            <div className="services-feature-content">
              <p className="eyebrow">{feature.eyebrow}</p>
              <h2 className="services-feature-title">
                {feature.title} <em>{feature.titleEm}</em>
              </h2>
              <div className="services-feature-body">
                {feature.paragraphs.map((paragraph) => {
                  if (paragraph.includes("Contact us")) {
                    const [before, after] = paragraph.split("Contact us");
                    return (
                      <p key={paragraph}>
                        {before}
                        <Link href="/contact">Contact us</Link>
                        {after}
                      </p>
                    );
                  }
                  return <p key={paragraph}>{paragraph}</p>;
                })}
              </div>
            </div>

            <figure className="services-feature-media">
              <div className="services-feature-image">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 520px"
                  quality={90}
                />
              </div>
              {feature.photoCredit ? (
                <figcaption className="services-feature-credit">
                  Photographer: {feature.photoCredit}
                </figcaption>
              ) : null}
            </figure>
          </div>
        </article>
      </div>
    </section>
  );
}
