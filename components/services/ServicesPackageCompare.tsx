"use client";

import { Check, X } from "react-feather";
import {
  PACKAGE_COMPARE_COLUMNS,
  PACKAGE_COMPARE_ROWS,
} from "@/lib/services-data";

function CompareValue({
  value,
  highlighted,
  suppressCheck,
}: {
  value: string;
  highlighted?: boolean;
  suppressCheck?: boolean;
}) {
  const normalized = value.trim().toLowerCase();
  const className = `services-compare-value${
    highlighted ? " services-compare-value--highlight" : ""
  }`;

  if (normalized === "included") {
    return (
      <span className={className}>
        <Check className="services-compare-icon services-compare-icon--check" aria-hidden="true" />
        Included
      </span>
    );
  }

  if (normalized.startsWith("yes")) {
    const text = suppressCheck ? value : value.replace(/^yes\s*[–—-]\s*/i, "");
    return (
      <span className={className}>
        {!suppressCheck ? (
          <Check className="services-compare-icon services-compare-icon--check" aria-hidden="true" />
        ) : null}
        {text}
      </span>
    );
  }

  if (normalized === "none") {
    return (
      <span className={`${className} services-compare-value--muted`}>
        <X className="services-compare-icon services-compare-icon--x" aria-hidden="true" />
        None
      </span>
    );
  }

  return <span className={className}>{value}</span>;
}

export default function ServicesPackageCompare() {
  return (
    <section className="services-page-compare" id="package-features">
      <div className="services-page-compare-inner">
        <header className="services-page-compare-header">
          <p className="eyebrow">Package Features</p>
          <h2 className="section-title">
            Find Your <em>Perfect Fit</em>
          </h2>
          <p className="services-page-compare-lead">
            Compare what&apos;s included across our three planning tiers — from
            month-of coordination to full-service planning and design.
          </p>
        </header>

        <div className="services-compare-table-wrap">
          <table className="services-compare-table">
            <thead>
              <tr>
                <th scope="col" className="services-compare-feature-col services-compare-feature-col--empty" />
                {PACKAGE_COMPARE_COLUMNS.map((column) => (
                  <th
                    key={column.id}
                    scope="col"
                    className={`services-compare-heading-col${
                      column.highlighted ? " services-compare-heading-col--highlight" : ""
                    }`}
                  >
                    <span className="services-compare-heading-title">{column.title}</span>
                    {column.subtitle ? (
                      <span className="services-compare-heading-sub">{column.subtitle}</span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PACKAGE_COMPARE_ROWS.map((row) => (
                <tr key={row.feature}>
                  <th scope="row" className="services-compare-feature-col">
                    {row.feature}
                  </th>
                  {row.values.map((value, index) => {
                    const column = PACKAGE_COMPARE_COLUMNS[index];
                    return (
                      <td
                        key={`${row.feature}-${column.id}`}
                        className={
                          column.highlighted
                            ? "services-compare-cell services-compare-cell--highlight"
                            : "services-compare-cell"
                        }
                      >
                        <CompareValue
                          value={value}
                          highlighted={column.highlighted}
                          suppressCheck={row.suppressCheck?.[index]}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
