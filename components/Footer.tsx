"use client";

import { usePathname } from "next/navigation";
import { CONTACT_SOCIAL_LINKS, SOCIAL_ICONS } from "@/components/SocialIcons";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_MAILING_ADDRESS,
  CONTACT_OFFICE_PHONE,
  CONTACT_OFFICE_PHONE_HREF,
} from "@/lib/contact-data";

function LegacyFooter() {
  return (
    <footer>
      <div className="footer-bottom">
        <p className="footer-copy">© 2026 neu events. All rights reserved.</p>

        <div className="footer-social">
          {CONTACT_SOCIAL_LINKS.map(({ label, href }) => {
            const Icon = SOCIAL_ICONS[label];
            return (
              <a
                key={label}
                href={href}
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-copy">© 2026 neu events. All rights reserved.</p>

        <div className="site-footer-end">
          <p className="site-footer-details">
            <span>{CONTACT_MAILING_ADDRESS}</span>
            <span className="site-footer-dot" aria-hidden>
              ·
            </span>
            <a href={CONTACT_OFFICE_PHONE_HREF}>{CONTACT_OFFICE_PHONE}</a>
            <span className="site-footer-dot" aria-hidden>
              ·
            </span>
            <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>
          </p>

          <div className="site-footer-social">
            {CONTACT_SOCIAL_LINKS.map(({ label, href }) => {
              const Icon = SOCIAL_ICONS[label];
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon size={16} strokeWidth={1.4} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isLegacy = pathname.startsWith("/old_index");

  if (isLegacy) {
    return <LegacyFooter />;
  }

  return <SiteFooter />;
}
