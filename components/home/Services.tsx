import Image from "next/image";
import Link from "next/link";
import { HOME_SERVICES } from "@/lib/data";
import { HOME_SERVICE_LEARN_MORE } from "@/lib/service-links";

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services-header">
        <p className="eyebrow">What We Offer</p>
        <h2 className="section-title">
          Our <em>Services</em>
        </h2>
      </div>

      <div className="services-grid">
        {HOME_SERVICES.map((s, index) => (
          <article key={s.titleLines.join("-")} className="service-card">
            <div className="service-card-media reveal-image">
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
                style={{ objectPosition: "center center" }}
              />
              <div className="service-card-overlay" />
            </div>

            <div className="service-card-body">
              <p className="service-card-eyebrow">{s.eyebrow}</p>
              <h3 className="service-card-name">
                {s.titleLines.map((line, i) => (
                  <span key={line} className="service-card-name-line">
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h3>
              <p className="service-card-price">{s.price}</p>
              <div className="service-card-rule" aria-hidden />
              <p className="service-card-desc">{s.description}</p>
              <Link href={HOME_SERVICE_LEARN_MORE[index]} className="btn service-card-btn">
                Learn More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
