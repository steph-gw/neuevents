import Image from "next/image";
import Link from "next/link";
import { FEATURED_WEDDINGS } from "@/lib/data";
import { SERVICE_LINKS } from "@/lib/service-links";

export default function Featured() {
  return (
    <section className="featured" id="portfolio">
      <div className="featured-header">
        <p className="eyebrow">Featured Celebrations</p>
        <h2 className="section-title">
          The neu events <em>Experience</em>
        </h2>
      </div>

      <div className="featured-grid">
        {FEATURED_WEDDINGS.map((wedding, i) => (
          <div
            key={wedding.location}
            className={`featured-item${"objectPosition" in wedding ? " featured-item--focus-top" : ""}`}
          >
            <div
              className={`featured-item-media reveal-image${i > 0 ? ` reveal-image-delay-${i}` : ""}`}
            >
              <Image
                src={wedding.image}
                alt={wedding.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                style={
                  "objectPosition" in wedding
                    ? { objectPosition: wedding.objectPosition }
                    : undefined
                }
              />
            </div>
            <div className="featured-caption">
              <p className="featured-caption-location">{wedding.location}</p>
              <p className="featured-caption-name">{wedding.names}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="featured-cta">
        <Link href={SERVICE_LINKS.featuredGallery} className="btn service-card-btn">
          View Gallery
        </Link>
      </div>
    </section>
  );
}
