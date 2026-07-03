import Image from "next/image";
import Link from "next/link";
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
            <Link
              key={category.anchor}
              href={`#${category.anchor}`}
              className="svc-v2-category-card"
            >
              <div className="svc-v2-category-card-media">
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  quality={90}
                />
              </div>
              <div className="svc-v2-category-card-body">
                <p className="svc-v2-category-card-title">
                  {category.titleLines.join(" ")}
                </p>
                <span className="svc-v2-category-card-link">Explore</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
