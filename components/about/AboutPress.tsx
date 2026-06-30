import Image from "next/image";
import { ABOUT_PRESS_LOGOS } from "@/lib/about-data";

export default function AboutPress() {
  return (
    <section className="about-v2-press">
      <div className="about-v2-press-inner">
        <p className="eyebrow">Also Featured In</p>
        <ul className="about-v2-press-logos">
          {ABOUT_PRESS_LOGOS.map((logo) => (
            <li key={logo.name}>
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.name}
              >
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={160}
                  height={64}
                  className="about-v2-press-logo"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
