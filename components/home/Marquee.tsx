import { VENUES } from "@/lib/data";

type Props = {
  id?: string;
  className?: string;
};

export default function Marquee({ id = "after-hero", className }: Props) {
  const items = [...VENUES, ...VENUES];
  const sectionClass = ["marquee-section", "marquee-section--labeled", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={sectionClass} id={id}>
      <p className="marquee-fixed-label">Service Area</p>
      <div className="marquee-viewport">
        <div className="marquee-track">
          {items.map((venue, i) => (
            <span key={`${venue}-${i}`} className="marquee-item">
              {venue} <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
