import { Mail, Phone } from "react-feather";
import ConsultCard from "@/components/ConsultCard";
import {
  CONSULTANTS,
  CONTACT_EMAIL,
  CONTACT_OFFICE_PHONE,
  CONTACT_OFFICE_PHONE_HREF,
  TIME_ZONE_CONVERTER_URL,
  WEDDING_SERVICES_PDF,
} from "@/lib/contact-data";

export default function ContactInfo() {
  return (
    <aside className="contact-info">
      <div className="contact-consult-cards">
        {CONSULTANTS.map((consultant) => (
          <ConsultCard key={consultant.name} {...consultant} />
        ))}
      </div>

      <div className="contact-info-block">
        <p className="contact-sidebar-title">Reach Us Directly</p>
        <ul className="contact-info-rows">
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-info-link">
              <Mail size={14} strokeWidth={1.5} aria-hidden />
              <span>{CONTACT_EMAIL}</span>
            </a>
          </li>
          <li>
            <a href={CONTACT_OFFICE_PHONE_HREF} className="contact-info-link">
              <Phone size={14} strokeWidth={1.5} aria-hidden />
              <span>{CONTACT_OFFICE_PHONE}</span>
            </a>
          </li>
        </ul>
        <p className="contact-info-hours">
          Monday–Friday, 8:30am – 5:00pm Hawai&apos;i Standard Time (HST)
        </p>
      </div>

      <div className="contact-info-block">
        <p className="contact-sidebar-title">Helpful Resources</p>
        <ul className="contact-info-rows contact-info-rows--resources">
          <li>
            <a href={TIME_ZONE_CONVERTER_URL} target="_blank" rel="noopener noreferrer">
              Time Zone Converter
            </a>
          </li>
          <li>
            <a href={WEDDING_SERVICES_PDF} target="_blank" rel="noopener noreferrer">
              Wedding Planning Services (PDF)
            </a>
          </li>
        </ul>
      </div>

      <p className="contact-info-note">
        If you don&apos;t hear back from us, please check your junk mail folder.
      </p>
    </aside>
  );
}
