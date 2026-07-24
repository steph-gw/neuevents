import Image from "next/image";
import Link from "next/link";
import PhotoCreditOverlay from "@/components/PhotoCreditOverlay";
import { HOME_SERVICES } from "@/lib/data";
import { HOME_SERVICE_LEARN_MORE } from "@/lib/service-links";

export default function Services() {
  return (
    <section className="hv2-section" id="services">
      <div className="hv2-wrap">
        <div className="hv2-section-head">
          <span className="hv2-eyebrow">What We Offer</span>
          <h2 className="hv2-serif">
            Our <em>Services</em>
          </h2>
        </div>

        <div className="hv2-services-grid">
          {HOME_SERVICES.map((s, index) => (
            <article key={s.titleLines.join("-")} className="hv2-service-card">
              <div className="hv2-service-media">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw"
                />
                {"photoCredit" in s && s.photoCredit ? (
                  <PhotoCreditOverlay
                    name={s.photoCredit.name}
                    href={s.photoCredit.href}
                  />
                ) : null}
              </div>
              <h3 className="hv2-serif">{s.titleLines.join(" ")}</h3>
              <p>{s.description}</p>
              <Link href={HOME_SERVICE_LEARN_MORE[index]} className="hv2-service-link">
                <span className="hv2-service-link-label">Learn More</span>
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
