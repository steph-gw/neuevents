import Image from "next/image";
import PlaceholderButton from "@/components/PlaceholderButton";
import { FEATURED_WEDDINGS } from "@/lib/data";

export default function Featured() {
  return (
    <section className="featured" id="portfolio">
      <div className="featured-header">
        <p className="eyebrow">Featured Celebrations</p>
        <h2 className="section-title">
          The Neu <em>Experience</em>
        </h2>
      </div>

      <div className="featured-grid">
        {FEATURED_WEDDINGS.map((wedding, i) => {
          if ("placeholder" in wedding && wedding.placeholder) {
            return (
              <div
                key={`featured-placeholder-${i}`}
                className="featured-item featured-item--placeholder"
                aria-hidden
              />
            );
          }

          return (
          <div
            key={wedding.names}
            className={`featured-item${"objectPosition" in wedding ? " featured-item--focus-top" : ""}`}
          >
            <span className="featured-item-badge">
              {i < 3 ? "Weddings" : "Events"}
            </span>
            <div
              className={`featured-item-media reveal-image${i > 0 ? ` reveal-image-delay-${i}` : ""}`}
            >
              <Image
                src={wedding.image}
                alt={wedding.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                style={
                  "objectPosition" in wedding &&
                  typeof wedding.objectPosition === "string"
                    ? { objectPosition: wedding.objectPosition }
                    : undefined
                }
              />
            </div>
            <div className="featured-caption">
              <p className="featured-caption-name">{wedding.names}</p>
            </div>
          </div>
          );
        })}
      </div>

      <div className="featured-cta">
        <PlaceholderButton className="btn service-card-btn">
          View Gallery
        </PlaceholderButton>
      </div>
    </section>
  );
}
