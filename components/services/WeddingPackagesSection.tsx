import Image from "next/image";
import Link from "next/link";
import { WEDDING_PACKAGES, type WeddingPackage } from "@/lib/services-data";

function formatPackagePrice(price: string) {
  const match = price.match(/^(Starting at)\s+(\$.+)/);
  if (!match) return price;

  return (
    <>
      {match[1]}{" "}
      <span className="svc-v2-pkg-price-amount">{match[2]}</span>
    </>
  );
}

function PackageCardContent({ pkg }: { pkg: WeddingPackage }) {
  return (
    <>
      <div className="svc-v2-pkg-head">
        <h3 className="svc-v2-pkg-name hv2-serif">{pkg.eyebrow}</h3>
        <p className="svc-v2-pkg-price">{formatPackagePrice(pkg.price)}</p>
      </div>
      <p className="svc-v2-pkg-desc">{pkg.description}</p>
      <ul className="svc-v2-pkg-list">
        {pkg.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {pkg.footnote ? (
        <p className="svc-v2-pkg-footnote">{pkg.footnote}</p>
      ) : null}
      {pkg.pdfHref ? (
        <Link
          href={pkg.pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="svc-v2-pkg-pdf"
        >
          View detailed PDF ↗
        </Link>
      ) : null}
    </>
  );
}

export default function WeddingPackagesSection() {
  return (
    <section id="wedding-services" className="svc-v2-section svc-v2-section--alt">
      <div className="hv2-wrap">
        <header className="svc-v2-section-header">
          <p className="hv2-eyebrow">Wedding Services</p>
          <h2 className="svc-v2-section-title hv2-serif">
            Planning Packages for
            <br />
            Every Couple
          </h2>
          <p className="svc-v2-section-lead">
            No matter the size, every wedding deserves careful planning and
            attention. Let us bring you peace of mind on your big day, knowing
            that we&apos;re there to help with all of your details.
          </p>
        </header>

        <div className="svc-v2-pkg-grid">
          {WEDDING_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className={[
                "svc-v2-pkg-card",
                pkg.image ? "svc-v2-pkg-card--featured" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {pkg.image ? (
                <>
                  <div className="svc-v2-pkg-card-media">
                    <Image
                      src={pkg.image}
                      alt={pkg.imageAlt ?? pkg.eyebrow}
                      fill
                      sizes="(max-width: 900px) 100vw, 540px"
                      quality={90}
                    />
                  </div>
                  <div className="svc-v2-pkg-card-body">
                    <PackageCardContent pkg={pkg} />
                  </div>
                </>
              ) : (
                <PackageCardContent pkg={pkg} />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
