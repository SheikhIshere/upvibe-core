import React, { useState } from "react";
import { motion } from "motion/react";

// ── CONSTANTS ────────────────────────────────────────────────────────────────
const R = 80;
const CX = 100;
const CY = 100;
const GAP_DEG = 4;
const THICKNESS = 16;

// Segments: from HIGH (0°) to LOW (180°) – reversed for gauge logic
const SEGMENTS = [
  { color: "#2E7D32", from: 36,  to: 0,   label: "BEST"  },
  { color: "#8BC34A", from: 72,  to: 36,  label: "GOOD"  },
  { color: "#FDD835", from: 108, to: 72,  label: "MOD"   },
  { color: "#FF7043", from: 144, to: 108, label: "POOR"  },
  { color: "#E53935", from: 180, to: 144, label: "BAD"   },
];

function polarToXY(angleDeg: number, r = R) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY - r * Math.sin(rad) };
}

function arcPath(fromDeg: number, toDeg: number, r = R, thickness = THICKNESS) {
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

function getSegmentIndex(value: number) {
  if (value <= 20) return 4;
  if (value <= 40) return 3;
  if (value <= 60) return 2;
  if (value <= 80) return 1;
  return 0;
}

function getValueColor(value: number): string {
  return SEGMENTS[getSegmentIndex(value)].color;
}

// ── COMPONENT ────────────────────────────────────────────────────────────────
interface GaugeMeterProps {
  value: number;
  color?: string;
  showValue?: boolean;
  hoverEffect?: boolean;
  interactive?: boolean;
}

export const GaugeMeter = ({
  value,
  color,
  showValue = true,
  hoverEffect = true,
  interactive = false,
}: GaugeMeterProps) => {
  const [hovered, setHovered] = useState(false);
  const [mouseAngle, setMouseAngle] = useState<number | null>(null);

  const rotation = (value / 100) * 180 - 90;
  const activeColor = color || getValueColor(value);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    setMouseAngle(angle);
  };

  const handleMouseLeave = () => {
    setMouseAngle(null);
    setHovered(false);
  };

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: "2/1" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <svg viewBox="0 0 200 115" className="w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer border rings */}
        <path d={arcPath(180, 0, R + 3, THICKNESS + 6)} fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
        <path d={arcPath(180, 0, R + 1.5, THICKNESS + 3)} fill="none" stroke="#555" strokeWidth="0.5" />

        {/* Dark background track */}
        <path d={arcPath(180, 0, R, THICKNESS)} fill="#0f0f0f" />

        {/* Color segments */}
        {SEGMENTS.map((seg, i) => {
          let isHighlighted = false;
          if (interactive && mouseAngle !== null) {
            const segMid = (seg.from + seg.to) / 2;
            const diff = Math.abs(mouseAngle - segMid);
            isHighlighted = diff < 18;
          } else if (hoverEffect && hovered && getSegmentIndex(value) === i) {
            isHighlighted = true;
          }
          return (
            <g key={i}>
              <path d={arcPath(seg.from, seg.to, R, THICKNESS)} fill={seg.color} />
              {isHighlighted && (
                <path
                  d={arcPath(seg.from, seg.to, R, THICKNESS)}
                  fill={seg.color}
                  opacity="0.6"
                  filter="url(#strongGlow)"
                />
              )}
              <path
                d={arcPath(seg.from, seg.to, R - 2, THICKNESS - 4)}
                fill="url(#arcGrad)"
                opacity="0.3"
              />
            </g>
          );
        })}

        {/* Tick marks */}
        {Array.from({ length: 11 }).map((_, i) => {
          const angle = 180 - i * 18;
          const start = polarToXY(angle, R + 4);
          const end = polarToXY(angle, R - 8);
          return (
            <line
              key={i}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#888"
              strokeWidth={i % 5 === 0 ? 1.5 : 0.8}
              opacity={0.5}
            />
          );
        })}

        {/* LOW / HIGH labels */}
        <text x="28" y="112" fill="#E53935" fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0.9" textAnchor="middle">LOW</text>
        <text x="172" y="112" fill="#2E7D32" fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0.9" textAnchor="middle">HIGH</text>

        {/* Segment labels */}
        {SEGMENTS.map((seg, i) => {
          const midAngle = (seg.from + seg.to) / 2;
          const pos = polarToXY(midAngle, R + 12);
          return (
            <text
              key={`label-${i}`}
              x={pos.x}
              y={pos.y}
              fill="#aaa"
              fontSize="5"
              fontFamily="monospace"
              textAnchor="middle"
              dominantBaseline="middle"
              opacity={0.7}
            >
              {seg.label}
            </text>
          );
        })}

        {/* NEEDLE GROUP with correct transform origin */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 60, damping: 16, mass: 0.8 }}
          style={{ originX: 0.5, originY: 0.5 }}
        >
          {/* Invisible stabilizer: forces group center to be at the pivot point (CX, CY) */}
          <circle cx={CX} cy={CY} r={R} fill="transparent" stroke="none" />
          
          {/* Metallic base */}
          <polygon
            points={`${CX - 2.5},${CY} ${CX + 2.5},${CY} ${CX + 0.8},${CY - 72} ${CX - 0.8},${CY - 72}`}
            fill="#3a3a3a"
            stroke="#666"
            strokeWidth="0.5"
          />
          <line x1={CX} y1={CY} x2={CX} y2={CY - 72} stroke="#1a1a1a" strokeWidth="2" />

          {/* Glowing energy core */}
          <line
            x1={CX}
            y1={CY - 5}
            x2={CX}
            y2={CY - 70}
            stroke={activeColor}
            strokeWidth="2"
            filter="url(#glow)"
            opacity="0.9"
            strokeLinecap="round"
          />
          <line
            x1={CX}
            y1={CY - 10}
            x2={CX}
            y2={CY - 68}
            stroke="white"
            strokeWidth="0.8"
            opacity="0.6"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Pivot / center cap (always on top) */}
        <motion.circle
          cx={CX}
          cy={CY}
          r="14"
          fill={activeColor}
          opacity="0.35"
          filter="url(#strongGlow)"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <circle cx={CX} cy={CY} r="8" fill="#1f1f1f" stroke="#777" strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r="3" fill={activeColor} />
        <circle cx={CX} cy={CY} r="1.2" fill="white" opacity="0.8" />

        {/* Active segment overlay glow */}
        {(() => {
          const seg = SEGMENTS[getSegmentIndex(value)];
          return (
            <path
              d={arcPath(seg.from, seg.to, R, THICKNESS)}
              fill={seg.color}
              opacity="0.25"
              filter="url(#glow)"
            />
          );
        })()}
      </svg>

      {/* Digital readout */}
      {showValue && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-center">
          <motion.div
            className="text-xs font-mono font-bold tabular-nums"
            style={{ color: activeColor, textShadow: `0 0 5px ${activeColor}` }}
            animate={{ scale: hovered ? 1.05 : 1 }}
          >
            {Math.round(value)}%
          </motion.div>
          <div className="text-[8px] text-gray-500 font-mono -mt-0.5">CONFIDENCE</div>
        </div>
      )}
    </div>
  );
};