type IconType = "star" | "badge" | "trophy" | "heart" | "press";

export default function AwardIcon({ type }: { type: IconType }) {
  const props = {
    className: "award-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  const icon = (() => {
    switch (type) {
      case "star":
        return (
          <svg {...props}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case "badge":
        return (
          <svg {...props}>
            <circle cx="12" cy="8.5" r="5.25" />
            <path d="M8.4 13.1 7 20.5 12 17.2 17 20.5 15.6 13.1" />
          </svg>
        );
      case "trophy":
        return (
          <svg {...props}>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
          </svg>
        );
      case "heart":
        return (
          <svg {...props}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        );
      case "press":
        return (
          <svg {...props}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 9h6M9 12h6M9 15h4" />
          </svg>
        );
    }
  })();

  const sizeClass =
    type === "heart"
      ? " award-icon-slot--heart"
      : type === "badge"
        ? " award-icon-slot--badge"
        : "";

  return <span className={`award-icon-slot${sizeClass}`}>{icon}</span>;
}
