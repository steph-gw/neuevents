import Image from "next/image";
import Link from "next/link";
import { SERVICES_CATEGORIES } from "@/lib/services-data";

export default function ServicesOverview() {
  return (
    <>
      <section className="services-hero">
        <div className="services-hero-intro">
          <p className="eyebrow">What We Offer</p>
          <h1 className="section-title">
            Our <em>Services</em>
          </h1>
          <p className="services-hero-lead">
            From weddings and corporate events to celebrations of life and
            travel resources — neu events brings thoughtful planning and
            seamless execution to every occasion.
          </p>
        </div>
      </section>

      <nav className="services-category-nav" aria-label="Service categories">
        <div className="services-category-nav-inner">
          {SERVICES_CATEGORIES.map((category) => (
            <Link
              key={category.anchor}
              href={`#${category.anchor}`}
              className="services-category-card"
            >
              <div className="services-category-card-media">
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  quality={90}
                />
                <div className="services-category-card-overlay" />
              </div>
              <div className="services-category-card-body">
                <h2 className="services-category-card-title">
                  {category.titleLines.join(" ")}
                </h2>
                <p className="services-category-card-desc">
                  {category.description}
                </p>
                <span className="services-category-card-link">Explore</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
