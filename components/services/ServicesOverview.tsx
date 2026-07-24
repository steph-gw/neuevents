import Image from "next/image";
import Link from "next/link";
import PhotoCreditOverlay from "@/components/PhotoCreditOverlay";
import { SERVICES_CATEGORIES } from "@/lib/services-data";

export default function ServicesOverview() {
  return (
    <>
      <section className="ideas-hero">
        <div className="ideas-hero-inner hv2-wrap">
          <p className="ideas-hero-eyebrow">What We Offer</p>
          <h1 className="ideas-hero-title">
            Our <span className="ideas-hero-title-accent">Services</span>
          </h1>
          <p className="ideas-hero-lead">
            From weddings and corporate events to celebrations of life and
            travel resources — neu events brings thoughtful planning and
            seamless execution to every occasion.
          </p>
        </div>
      </section>

      <nav className="svc-v2-category-nav" aria-label="Service categories">
        <div className="svc-v2-category-nav-inner hv2-wrap">
          {SERVICES_CATEGORIES.map((category) => (
            <article key={category.anchor} className="svc-v2-category-card">
              <div className="svc-v2-category-card-media">
                <Link
                  href={`#${category.anchor}`}
                  className="svc-v2-category-card-media-link"
                  aria-label={`Explore ${category.titleLines.join(" ")}`}
                >
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    quality={90}
                  />
                </Link>
                {"photoCredit" in category && category.photoCredit ? (
                  <PhotoCreditOverlay
                    name={category.photoCredit.name}
                    href={category.photoCredit.href}
                  />
                ) : null}
              </div>
              <Link
                href={`#${category.anchor}`}
                className="svc-v2-category-card-body"
              >
                <p className="svc-v2-category-card-title">
                  {category.titleLines.join(" ")}
                </p>
                <span className="svc-v2-category-card-link">Explore</span>
              </Link>
            </article>
          ))}
        </div>
      </nav>
    </>
  );
}
