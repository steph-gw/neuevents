"use client";

import { Playfair_Display, Poppins } from "next/font/google";
import { useId, useMemo } from "react";

const ESTABLISHED_YEAR = 2000;
const NUMERAL_RAISE = 76;
const CURVE_TEXT_SIZE = 68;

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "900",
  style: "italic",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});

function smoothClosedPath(points: [number, number][]) {
  const n = points.length;
  let d = `M ${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;

  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }

  return `${d} Z`;
}

function arcPoint(cx: number, cy: number, deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
}

function buildBadgeGeometry() {
  const cx = 500;
  const cy = 500;
  const lobes = 16;
  const baseR = 470;
  const amp = 22;
  const totalPoints = lobes * 4;
  const pts: [number, number][] = [];

  for (let i = 0; i < totalPoints; i++) {
    const theta = (i / totalPoints) * Math.PI * 2;
    const r = baseR + amp * Math.sin(lobes * theta);
    pts.push([cx + r * Math.cos(theta), cy + r * Math.sin(theta)]);
  }

  // The orange stripe runs from r=332 (inner circle) to r≈470 (outer scallop), midpoint ≈401.
  // Top-arc text: baseline on arc, glyphs face outward → center at topR + capH/2 = 401 → topR ≈ 377
  // Bottom-arc text: baseline on arc, glyphs face inward → center at bottomR - capH/2 = 401 → bottomR ≈ 425
  const topR = 365;
  const bottomR = 413;
  const tStart = arcPoint(cx, cy, 200, topR);
  const tEnd = arcPoint(cx, cy, 340, topR);
  const bStart = arcPoint(cx, cy, 160, bottomR);
  const bEnd = arcPoint(cx, cy, 20, bottomR);
  const dotR = 410;

  return {
    scallopPath: smoothClosedPath(pts),
    topArcPath: `M ${tStart[0].toFixed(2)},${tStart[1].toFixed(2)} A ${topR},${topR} 0 0 1 ${tEnd[0].toFixed(2)},${tEnd[1].toFixed(2)}`,
    bottomArcPath: `M ${bStart[0].toFixed(2)},${bStart[1].toFixed(2)} A ${bottomR},${bottomR} 0 0 0 ${bEnd[0].toFixed(2)},${bEnd[1].toFixed(2)}`,
    dotLeft: { cx: cx - dotR, cy },
    dotRight: { cx: cx + dotR, cy },
  };
}

type AnniversaryBadgeProps = {
  className?: string;
};

export default function AnniversaryBadge({ className }: AnniversaryBadgeProps) {
  const uid = useId().replace(/:/g, "");
  const topArcId = `topArc-${uid}`;
  const bottomArcId = `bottomArc-${uid}`;
  const geometry = useMemo(buildBadgeGeometry, []);
  const yearsValue = new Date().getFullYear() - ESTABLISHED_YEAR;
  const yearStr = String(yearsValue);

  return (
    <svg
      className={className}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Established ${ESTABLISHED_YEAR}, celebrating ${yearsValue} years`}
    >
      <defs>
        <path id={topArcId} d={geometry.topArcPath} fill="none" />
        <path id={bottomArcId} d={geometry.bottomArcPath} fill="none" />
      </defs>

      <path
        d={geometry.scallopPath}
        fill="#FF5722"
        stroke="#F500D8"
        strokeWidth={7}
      />

      <circle
        cx={500}
        cy={500}
        r={332}
        fill="#F7E96B"
        stroke="#F500D8"
        strokeWidth={7}
      />

      <circle
        cx={geometry.dotLeft.cx}
        cy={geometry.dotLeft.cy}
        r={17}
        fill="#F7E96B"
      />
      <circle
        cx={geometry.dotRight.cx}
        cy={geometry.dotRight.cy}
        r={17}
        fill="#F7E96B"
      />

      <text
        x={500}
        y={500}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={380}
        fill="#F500D8"
        style={{ fontFamily: playfair.style.fontFamily }}
      >
        {yearStr.length > 1 ? (
          <>
            <tspan dy={-NUMERAL_RAISE}>{yearStr[0]}</tspan>
            <tspan dy={NUMERAL_RAISE}>{yearStr.slice(1)}</tspan>
          </>
        ) : (
          yearStr
        )}
      </text>

      <text
        fontSize={CURVE_TEXT_SIZE}
        fill="#F7E96B"
        letterSpacing={3}
        style={{ fontFamily: poppins.style.fontFamily }}
      >
        <textPath href={`#${topArcId}`} startOffset="50%" textAnchor="middle">
          ESTABLISHED 2000
        </textPath>
      </text>

      <text
        fontSize={CURVE_TEXT_SIZE}
        fill="#F7E96B"
        letterSpacing={3}
        style={{ fontFamily: poppins.style.fontFamily }}
      >
        <textPath href={`#${bottomArcId}`} startOffset="50%" textAnchor="middle">
          {`CELEBRATING ${yearsValue} YEARS`}
        </textPath>
      </text>
    </svg>
  );
}
