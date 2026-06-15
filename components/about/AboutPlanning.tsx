import Link from "next/link";
import { ABOUT_PLANNING_SERVICES } from "@/lib/about-data";

export default function AboutPlanning() {
  return (
    <section className="about-page-planning">
      <div className="about-page-planning-inner">
        <header className="about-page-planning-header">
          <p className="eyebrow">Planning Services</p>
          <h2 className="section-title">
            How We <em>Partner</em> With You
          </h2>
        </header>

        <div className="about-page-planning-grid">
          {ABOUT_PLANNING_SERVICES.map((service, index) => (
            <article
              key={service.title}
              className={`about-page-planning-card reveal-text${
                index > 0 ? ` reveal-text-delay-${Math.min(index, 2)}` : ""
              }`}
            >
              <span className="about-page-planning-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="about-page-planning-title">{service.title}</h3>
              <p className="about-page-planning-body">{service.body}</p>
            </article>
          ))}
        </div>

        <div className="about-page-planning-cta">
          <Link href="/services" className="btn service-card-btn">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
