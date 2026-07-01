"use client";

import { Alice, Outfit } from "next/font/google";
import { useId, useMemo } from "react";

const ESTABLISHED_YEAR = 2000;
const CURVE_TEXT_SIZE = 56;
const NUMERAL_SIZE = 272;

const alice = Alice({
  subsets: ["latin"],
  weight: "400",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600"],
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
  const baseR = 395;
  const amp = 18;
  const totalPoints = lobes * 4;
  const pts: [number, number][] = [];

  for (let i = 0; i < totalPoints; i++) {
    const theta = (i / totalPoints) * Math.PI * 2;
    const r = baseR + amp * Math.sin(lobes * theta);
    pts.push([cx + r * Math.cos(theta), cy + r * Math.sin(theta)]);
  }

  const innerR = 228;
  const midR = (innerR + baseR) / 2;
  const capHalf = CURVE_TEXT_SIZE * 0.36;
  const topR = Math.round(midR - capHalf);
  const bottomR = Math.round(midR + capHalf);
  const dotR = Math.round(midR);
  const tStart = arcPoint(cx, cy, 200, topR);
  const tEnd = arcPoint(cx, cy, 340, topR);
  const bStart = arcPoint(cx, cy, 160, bottomR);
  const bEnd = arcPoint(cx, cy, 20, bottomR);

  return {
    scallopPath: smoothClosedPath(pts),
    topArcPath: `M ${tStart[0].toFixed(2)},${tStart[1].toFixed(2)} A ${topR},${topR} 0 0 1 ${tEnd[0].toFixed(2)},${tEnd[1].toFixed(2)}`,
    bottomArcPath: `M ${bStart[0].toFixed(2)},${bStart[1].toFixed(2)} A ${bottomR},${bottomR} 0 0 0 ${bEnd[0].toFixed(2)},${bEnd[1].toFixed(2)}`,
    dotLeft: { cx: cx - dotR, cy },
    dotRight: { cx: cx + dotR, cy },
    innerR,
  };
}

type AnniversaryBadgeV2Props = {
  className?: string;
};

export default function AnniversaryBadgeV2({ className }: AnniversaryBadgeV2Props) {
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
        fill="#c9a96e"
        stroke="#b89555"
        strokeWidth={6}
      />

      <circle
        cx={500}
        cy={500}
        r={geometry.innerR}
        fill="#E8D9C0"
        stroke="#b89555"
        strokeWidth={6}
      />

      <circle
        cx={geometry.dotLeft.cx}
        cy={geometry.dotLeft.cy}
        r={14}
        fill="#E8D9C0"
      />
      <circle
        cx={geometry.dotRight.cx}
        cy={geometry.dotRight.cy}
        r={14}
        fill="#E8D9C0"
      />

      <text
        x={500}
        y={500}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={NUMERAL_SIZE}
        fill="#111110"
        dy={-6}
        style={{ fontFamily: alice.style.fontFamily }}
      >
        {yearStr}
      </text>

      <text
        fontSize={CURVE_TEXT_SIZE}
        fill="#111110"
        letterSpacing={3}
        style={{ fontFamily: outfit.style.fontFamily, fontWeight: 600 }}
      >
        <textPath href={`#${topArcId}`} startOffset="50%" textAnchor="middle">
          ESTABLISHED 2000
        </textPath>
      </text>

      <text
        fontSize={CURVE_TEXT_SIZE}
        fill="#111110"
        letterSpacing={3}
        style={{ fontFamily: outfit.style.fontFamily, fontWeight: 600 }}
      >
        <textPath href={`#${bottomArcId}`} startOffset="50%" textAnchor="middle">
          {`CELEBRATING ${yearsValue} YEARS`}
        </textPath>
      </text>
    </svg>
  );
}
