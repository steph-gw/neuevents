import Image from "next/image";

const PRESS_LOGOS = [
  {
    src: "/images/press/the-knot.png",
    alt: "The Knot",
    width: 393,
    height: 128,
    displayHeight: 32,
  },
  {
    src: "/images/press/owa.png",
    alt: "Oahu Wedding Association — Proud Member, Est. 2005",
    width: 200,
    height: 200,
    displayHeight: 64,
  },
  {
    src: "/images/press/equally-wed.png",
    alt: "Equally Wed",
    width: 300,
    height: 45,
    displayHeight: 24,
  },
] as const;

export default function PressBanner() {
  return (
    <div className="press-banner">
      <p className="press-label">As Featured In</p>
      <div className="press-logos">
        {PRESS_LOGOS.map((logo) => (
          <div
            key={logo.alt}
            className="press-logo-wrap"
            style={{ height: logo.displayHeight }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              style={{ height: logo.displayHeight, width: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
