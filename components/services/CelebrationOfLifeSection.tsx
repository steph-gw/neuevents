import Image from "next/image";
import Link from "next/link";
import { CELEBRATION_OF_LIFE } from "@/lib/services-data";

export default function CelebrationOfLifeSection() {
  const feature = CELEBRATION_OF_LIFE;

  return (
    <section id="celebration-of-life" className="svc-v2-section svc-v2-section--alt">
      <div className="hv2-wrap">
        <article className="svc-v2-feature">
          <div className="svc-v2-feature-inner">
            <div className="svc-v2-feature-content">
              <p className="hv2-eyebrow">{feature.eyebrow}</p>
              <h2 className="svc-v2-feature-title hv2-serif">
                {feature.title} <em>{feature.titleEm}</em>
              </h2>
              <div className="svc-v2-feature-body">
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

            <figure className="svc-v2-feature-media">
              <div className="svc-v2-feature-image">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 520px"
                  quality={90}
                />
              </div>
              {feature.photoCredit ? (
                <figcaption className="svc-v2-feature-credit">
                  Photo: {feature.photoCredit}
                </figcaption>
              ) : null}
            </figure>
          </div>
        </article>
      </div>
    </section>
  );
}
