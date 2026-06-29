import Link from "next/link";
import { CLIENT_PERK_CATEGORIES } from "@/lib/client-perks-data";

export default function ClientPerksDirectory() {
  return (
    <>
      <section className="client-perks-hero">
        <div className="client-perks-hero-intro">
          <p className="eyebrow">Client Access</p>
          <h1 className="section-title">
            Perks of Being a <em>Client</em>
          </h1>
          <p className="client-perks-hero-lead">
            Exclusive discounts and offers from our trusted vendor partners —
            available only to neu events clients.
          </p>
        </div>
      </section>

      <section className="client-perks-directory">
        <div className="client-perks-directory-inner">
          {CLIENT_PERK_CATEGORIES.map((category) => (
            <div key={category.name} className="client-perks-category">
              <h2 className="client-perks-category-title">{category.name}</h2>
              <ul className="client-perks-vendor-list">
                {category.vendors.map((vendor) => (
                  <li key={vendor.name} className="client-perks-vendor">
                    <h3 className="client-perks-vendor-name">{vendor.name}</h3>
                    <p className="client-perks-vendor-desc">{vendor.description}</p>
                    {vendor.code ? (
                      <p className="client-perks-vendor-code">
                        Code: <strong>{vendor.code}</strong>
                      </p>
                    ) : null}
                    {vendor.email ? (
                      <p className="client-perks-vendor-email">
                        <a href={`mailto:${vendor.email}`}>{vendor.email}</a>
                      </p>
                    ) : null}
                    {vendor.link ? (
                      <a
                        href={vendor.link.href}
                        className="btn consult-card-btn client-perks-vendor-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {vendor.link.label}
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="client-perks-footer-note">
            Questions about a perk or need your discount code?{" "}
            <Link href="/contact">Contact your neu events planner</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
