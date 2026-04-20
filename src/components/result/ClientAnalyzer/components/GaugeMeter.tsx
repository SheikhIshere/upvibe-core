import React from "react";
import { motion } from "motion/react";

// ── SVG GAUGE CONSTANTS ───────────────────────────────────────────────────────
const R = 80;
const CX = 100;
const CY = 100;
const GAP_DEG = 4;

const SEGMENTS = [
  { color: "#E53935", from: 180, to: 144 }, // Red    — Bad
  { color: "#FF7043", from: 144, to: 108 }, // Orange — Poor
  { color: "#FDD835", from: 108, to: 72  }, // Yellow — Moderate
  { color: "#8BC34A", from: 72,  to: 36  }, // Lt Green — Good
  { color: "#2E7D32", from: 36,  to: 0   }, // Dk Green — Best
];

function polarToXY(angleDeg: number, r = R) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY - r * Math.sin(rad) };
}

function arcPath(fromDeg: number, toDeg: number, r = R, thickness = 16) {
  const outerFrom = polarToXY(fromDeg - GAP_DEG / 2, r);
  const outerTo   = polarToXY(toDeg   + GAP_DEG / 2, r);
  const innerFrom = polarToXY(fromDeg - GAP_DEG / 2, r - thickness);
  const innerTo   = polarToXY(toDeg   + GAP_DEG / 2, r - thickness);
  const largeArc  = (fromDeg - toDeg - GAP_DEG) > 180 ? 1 : 0;

  return [
    `M ${outerFrom.x} ${outerFrom.y}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${outerTo.x} ${outerTo.y}`,
    `L ${innerTo.x} ${innerTo.y}`,
    `A ${r - thickness} ${r - thickness} 0 ${largeArc} 0 ${innerFrom.x} ${innerFrom.y}`,
    "Z",
  ].join(" ");
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────
interface GaugeMeterProps {
  value: number;  // 0–100
  color: string;  // active color for pivot glow
}

export const GaugeMeter = ({ value, color }: GaugeMeterProps) => {
  // 0 → -90deg (left/Red), 100 → +90deg (right/Green)
  const rotation = (value / 100) * 180 - 90;

  return (
    <div className="relative w-full" style={{ aspectRatio: "2/1" }}>
      <svg viewBox="0 0 200 115" className="w-full h-full" style={{ overflow: "visible" }}>

        {/* Outer border ring */}
        <path d={arcPath(180, 0, R + 3, 22)} fill="none" stroke="#444" strokeWidth="1" />

        {/* Dark background track */}
        <path d={arcPath(180, 0, R, 16)} fill="#1a1a1a" />

        {/* 5 Discrete color segments */}
        {SEGMENTS.map((seg, i) => (
          <path key={i} d={arcPath(seg.from, seg.to, R, 16)} fill={seg.color} />
        ))}

        {/* LOW / HIGH labels */}
        <text x="28"  y="110" fill="#E53935" fontSize="7" fontFamily="monospace" opacity="0.9" textAnchor="middle">LOW</text>
        <text x="172" y="110" fill="#2E7D32" fontSize="7" fontFamily="monospace" opacity="0.9" textAnchor="middle">HIGH</text>

        {/* Animated needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 40, damping: 14 }}
          style={{ originX: 0.5, originY: 0.5 }}
        >
          {/* Invisible stabilizer: forces bounding-box center = pivot point */}
          <circle cx={CX} cy={CY} r={72} fill="transparent" stroke="none" />
          <polygon
            points={`${CX - 2},${CY} ${CX + 2},${CY} ${CX + 0.5},${CY - 72} ${CX - 0.5},${CY - 72}`}
            fill="#2a2a2a" stroke="#555" strokeWidth="0.4"
          />
          <line x1={CX} y1={CY} x2={CX} y2={CY - 72} stroke="#111" strokeWidth="1" />
        </motion.g>

        {/* Pivot: colored aura + metallic cap */}
        <circle cx={CX} cy={CY} r="12" fill={color} opacity="0.3" filter="url(#glow)" />
        <circle cx={CX} cy={CY} r="7"  fill="#2a2a2a" stroke="#666" strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r="2.5" fill={color} />

        {/* Active segment glow overlay */}
        {SEGMENTS.map((seg, i) => {
          const isActive = value >= ((4 - i) * 20) && value <= ((5 - i) * 20);
          if (!isActive) return null;
          return (
            <path key={"glow-" + i} d={arcPath(seg.from, seg.to, R, 16)}
              fill={seg.color} opacity="0.35" filter="url(#glow)" />
          );
        })}

        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};
