import Image from "next/image";
import PlaceholderButton from "@/components/PlaceholderButton";
import { HOME_SERVICES } from "@/lib/data";

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
              <h3 className="service-card-name">
                {s.titleLines.map((line, i) => (
                  <span key={line} className="service-card-name-line">
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h3>
              <p className="service-card-desc">{s.description}</p>
              <PlaceholderButton className="btn service-card-btn">
                Learn More
              </PlaceholderButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
