import Image from "next/image";
import Link from "next/link";
import { NONPROFIT_TILES, type NonprofitTile } from "@/lib/tips-ideas-nonprofits-data";

function NonprofitTileCard({ tile }: { tile: NonprofitTile }) {
  const content = (
    <>
      <Image
        src={tile.image}
        alt={tile.imageAlt}
        fill
        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw"
        className="ideas-nonprofit-tile-img"
      />
      <span
        className={`ideas-nonprofit-tile-tag ideas-nonprofit-tile-tag--${tile.categoryTagClass}`}
      >
        {tile.categoryTag}
      </span>
      <div className="ideas-nonprofit-tile-overlay">
        <p className="ideas-nonprofit-tile-title">{tile.name}</p>
      </div>
    </>
  );

  if (tile.href) {
    return (
      <Link
        href={tile.href}
        className="ideas-nonprofit-tile"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </Link>
    );
  }

  return <div className="ideas-nonprofit-tile">{content}</div>;
}

export default function NonprofitTiles() {
  // 10 tiles in a 4-col grid = 4+4+2; add 2 placeholders to fill the last row
  const placeholders = (4 - (NONPROFIT_TILES.length % 4)) % 4;

  return (
    <div className="ideas-nonprofit-tiles">
      {NONPROFIT_TILES.map((tile) => (
        <NonprofitTileCard key={tile.id} tile={tile} />
      ))}
      {Array.from({ length: placeholders }).map((_, i) => (
        <div key={`placeholder-${i}`} className="ideas-nonprofit-tile ideas-nonprofit-tile--placeholder" aria-hidden />
      ))}
    </div>
  );
}
