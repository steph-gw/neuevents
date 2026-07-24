import Image from "next/image";
import Link from "next/link";
import PhotoCreditOverlay from "@/components/PhotoCreditOverlay";
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

            const href = "href" in wedding ? wedding.href : undefined;
            const photoCredit =
              "photoCredit" in wedding ? wedding.photoCredit : undefined;
            const isEvent = i >= 3;

            return (
              <article key={wedding.names} className="hv2-gal-item">
                {href ? (
                  <Link
                    href={href}
                    className="hv2-gal-item-link"
                    aria-label={wedding.names}
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
                  </Link>
                ) : (
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
                )}

                <span
                  className={`hv2-gal-tag ${isEvent ? "hv2-gal-tag--events" : "hv2-gal-tag--weddings"}`}
                >
                  {isEvent ? "Events" : "Weddings"}
                </span>

                <div
                  className={`hv2-gal-overlay${photoCredit ? " hv2-gal-overlay--credited" : ""}`}
                >
                  {href ? (
                    <Link href={href} className="hv2-gal-names hv2-serif">
                      {wedding.names}
                    </Link>
                  ) : (
                    <span className="hv2-gal-names hv2-serif">{wedding.names}</span>
                  )}
                  {photoCredit ? (
                    <PhotoCreditOverlay
                      className="hv2-gal-credit"
                      name={photoCredit.name}
                      href={photoCredit.href}
                    />
                  ) : null}
                </div>
              </article>
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
