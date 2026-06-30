import Link from "next/link";
import { WEDDING_PACKAGES } from "@/lib/services-data";

export default function WeddingPackagesSection() {
  return (
    <section id="wedding-services" className="services-section services-section--alt">
      <div className="services-section-inner">
        <header className="services-section-header">
          <p className="eyebrow">Wedding Services</p>
          <h2 className="services-section-title">
            Planning Packages for <em>Every Couple</em>
          </h2>
          <p className="services-section-lead">
            No matter the size, every wedding deserves careful planning and
            attention. Let us bring you peace of mind on your big day, knowing
            that we&apos;re there to help with all of your details.
          </p>
        </header>

        <div className="services-wedding-grid">
          {WEDDING_PACKAGES.map((pkg) => (
            <article key={pkg.id} className="services-wedding-card">
              <div className="services-wedding-card-head">
                <p className="services-wedding-card-eyebrow">{pkg.eyebrow}</p>
                <p className="services-wedding-card-price">{pkg.price}</p>
              </div>
              <p className="services-wedding-card-desc">{pkg.description}</p>
              <ul className="services-wedding-card-list">
                {pkg.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {pkg.footnote ? (
                <p className="services-wedding-card-footnote">{pkg.footnote}</p>
              ) : null}
              {pkg.pdfHref ? (
                <Link
                  href={pkg.pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="services-wedding-card-pdf"
                >
                  Detailed PDF
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
