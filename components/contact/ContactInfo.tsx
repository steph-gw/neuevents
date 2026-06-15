"use client";

import { Mail, Phone } from "react-feather";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  CONTACT_SOCIAL_LINKS,
} from "@/lib/contact-data";
import { SOCIAL_ICONS } from "@/components/SocialIcons";

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <p className="eyebrow contact-info-eyebrow">Reach Us Directly</p>

      <ul className="contact-info-list">
        <li>
          <a href={`mailto:${CONTACT_EMAIL}`} className="contact-info-link">
            <Mail size={18} strokeWidth={1.5} aria-hidden />
            <span>{CONTACT_EMAIL}</span>
          </a>
        </li>
        <li>
          <a href={CONTACT_PHONE_HREF} className="contact-info-link">
            <Phone size={18} strokeWidth={1.5} aria-hidden />
            <span>{CONTACT_PHONE}</span>
          </a>
        </li>
      </ul>

      <div className="contact-info-social">
        <p className="eyebrow contact-info-eyebrow">Follow Us</p>
        <div className="contact-info-social-links">
          {CONTACT_SOCIAL_LINKS.map(({ label, href }) => {
            const Icon = SOCIAL_ICONS[label];
            return (
              <a
                key={label}
                href={href}
                className="contact-info-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
