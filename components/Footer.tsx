import { CONTACT_SOCIAL_LINKS, SOCIAL_ICONS } from "@/components/SocialIcons";

export default function Footer() {
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
