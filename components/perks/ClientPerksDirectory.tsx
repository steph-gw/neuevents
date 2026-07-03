"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ClientPerksVendorCard from "@/components/perks/ClientPerksVendorCard";
import { CLIENT_PERK_CATEGORIES } from "@/lib/client-perks-data";

const ALL_CATEGORIES = "all";

const vendorCount = CLIENT_PERK_CATEGORIES.reduce(
  (total, category) => total + category.vendors.length,
  0,
);

export default function ClientPerksDirectory() {
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const isFiltered = selectedCategory !== ALL_CATEGORIES;

  const visibleCategories = useMemo(() => {
    if (selectedCategory === ALL_CATEGORIES) {
      return CLIENT_PERK_CATEGORIES;
    }
    return CLIENT_PERK_CATEGORIES.filter(
      (category) => category.name === selectedCategory,
    );
  }, [selectedCategory]);

  return (
    <>
      <section className="client-perks-v2-dir-header">
        <div className="client-perks-v2-dir-header-inner hv2-wrap">
          <div className="client-perks-v2-dir-header-top">
            <div className="client-perks-v2-dir-heading">
              <p className="hv2-eyebrow">Client Perks</p>
              <h1 className="client-perks-v2-dir-title hv2-serif">Vendor Directory</h1>
            </div>
            <dl className="client-perks-v2-dir-stats">
              <div>
                <dt>Partners</dt>
                <dd>{vendorCount}</dd>
              </div>
              <div>
                <dt>Categories</dt>
                <dd>{CLIENT_PERK_CATEGORIES.length}</dd>
              </div>
            </dl>
          </div>
          <p className="client-perks-v2-dir-lead">
            Curated discounts, promo codes, and exclusive offers from vendors we
            trust — available only to neu events clients.
          </p>
        </div>
      </section>

      <section className="client-perks-v2-directory">
        <div className="client-perks-v2-dir-filter-sticky">
          <div className="client-perks-v2-dir-filter-bar hv2-wrap">
            <select
              id="vendor-category"
              className="client-perks-v2-dir-filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value={ALL_CATEGORIES}>All categories</option>
              {CLIENT_PERK_CATEGORIES.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            {isFiltered ? (
              <button
                type="button"
                className="client-perks-v2-dir-filter-reset"
                onClick={() => setSelectedCategory(ALL_CATEGORIES)}
              >
                View all categories
              </button>
            ) : null}
          </div>
        </div>

        <div className="client-perks-v2-directory-inner hv2-wrap">
          {isFiltered ? (
            <ul className="client-perks-v2-vendor-grid">
              {visibleCategories[0]?.vendors.map((vendor) => (
                <ClientPerksVendorCard
                  key={`${selectedCategory}-${vendor.name}`}
                  vendor={vendor}
                  categoryName={selectedCategory}
                />
              ))}
            </ul>
          ) : (
            visibleCategories.map((category) => (
              <div key={category.name} className="client-perks-v2-category">
                <header className="client-perks-v2-category-header">
                  <h2 className="client-perks-v2-category-title">{category.name}</h2>
                  <span className="client-perks-v2-category-count">
                    {category.vendors.length}{" "}
                    {category.vendors.length === 1 ? "vendor" : "vendors"}
                  </span>
                </header>

                <ul className="client-perks-v2-vendor-grid">
                  {category.vendors.map((vendor) => (
                    <ClientPerksVendorCard
                      key={`${category.name}-${vendor.name}`}
                      vendor={vendor}
                      categoryName={category.name}
                    />
                  ))}
                </ul>
              </div>
            ))
          )}

          <p className="client-perks-v2-footer-note">
            Questions about a perk or need your discount code?{" "}
            <Link href="/contact">Contact your neu events planner</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
