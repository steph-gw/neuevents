import Image from "next/image";
import { ABOUT_PRESS_LOGOS } from "@/lib/about-data";

export default function AboutPress() {
  return (
    <section className="abt-press">
      <div className="abt-press-inner hv2-wrap">
        <p className="hv2-eyebrow abt-press-eyebrow">Also Featured In</p>
        <ul className="abt-press-logos">
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
                  className="abt-press-logo"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
