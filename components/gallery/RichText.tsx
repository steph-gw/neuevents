import type { RichTextSegment } from "@/lib/gallery-types";

export default function RichText({
  segments,
  className,
}: {
  segments: RichTextSegment[];
  className?: string;
}) {
  return (
    <span className={className}>
      {segments.map((seg, i) =>
        seg.type === "link" ? (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-rich-link"
          >
            {seg.text}
          </a>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </span>
  );
}
