import Image from "next/image";
import Link from "next/link";
import { FEATURED_WEDDINGS } from "@/lib/data";

export default function Featured() {
  return (
    <section className="hv2-section hv2-section--gallery" id="portfolio">
      <div className="hv2-wrap">
        <div className="hv2-section-head">
          <span className="hv2-eyebrow">Featured Celebrations</span>
          <h2 className="hv2-serif">
            The Neu <em>Experience</em>
          </h2>
        </div>

        <div className="hv2-gallery-grid">
          {FEATURED_WEDDINGS.map((wedding, i) => {
            if ("placeholder" in wedding && wedding.placeholder) {
              return (
                <div
                  key={`featured-placeholder-${i}`}
                  className="hv2-gal-item hv2-gal-item--placeholder"
                  aria-hidden
                />
              );
            }

            return (
              <div
                key={wedding.names}
                className="hv2-gal-item"
              >
                <Image
                  src={wedding.image}
                  alt={wedding.alt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={
                    "objectPosition" in wedding &&
                    typeof wedding.objectPosition === "string"
                      ? { objectPosition: wedding.objectPosition }
                      : undefined
                  }
                />
                <span
                  className={`hv2-gal-tag ${i < 3 ? "hv2-gal-tag--weddings" : "hv2-gal-tag--events"}`}
                >
                  {i < 3 ? "Weddings" : "Events"}
                </span>
                <div className="hv2-gal-overlay">
                  <span className="hv2-gal-names hv2-serif">{wedding.names}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hv2-gallery-cta">
          <Link href="/gallery" className="hv2-btn-outline">
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
