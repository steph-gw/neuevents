type Props = {
  name: string;
  href: string;
  className?: string;
};

export default function PhotoCreditOverlay({ name, href, className }: Props) {
  return (
    <div className={className ? `hv2-photo-credit ${className}` : "hv2-photo-credit"}>
      <span className="hv2-photo-credit-pill">
        Photo by{" "}
        <a href={href} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </span>
    </div>
  );
}
