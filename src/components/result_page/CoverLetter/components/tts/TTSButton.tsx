import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, useTransform } from "motion/react";
import { useLocalTTS } from "./useLocalTTS";

interface Props {
  text: string;
}

const BAR_COUNT = 16;
const PROXIMITY_RADIUS = 100; // px

export const TTSButton: React.FC<Props> = ({ text }) => {
  const { isSpeaking, toggleSpeak } = useLocalTTS();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorAngle, setCursorAngle] = useState<number | null>(null);
  const [isNear, setIsNear] = useState(false);

  const barHeights = useRef(
    Array.from({ length: BAR_COUNT }, () => useMotionValue(0.2))
  ).current;
  const currentHeights = useRef<number[]>(barHeights.map((mv) => mv.get()));
  const intervalRef = useRef<number | null>(null);

  // Track cursor position relative to button
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      const isCursorNear = distance < PROXIMITY_RADIUS;
      setIsNear(isCursorNear);

      if (isCursorNear) {
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        angle = (angle + 360) % 360;
        setCursorAngle(angle);
      } else {
        setCursorAngle(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update spectrum with cursor influence
  const updateSpectrum = () => {
    if (!isSpeaking) return;

    const baseAmplitude = isNear ? 0.35 : 0.25; // more active when cursor near
    const newRaw = currentHeights.current.map((h) => {
      const delta = (Math.random() - 0.5) * baseAmplitude;
      return Math.min(0.95, Math.max(0.15, h + delta));
    });

    let smoothed = newRaw.map((_, idx) => {
      const prev = newRaw[Math.max(0, idx - 1)];
      const curr = newRaw[idx];
      const next = newRaw[Math.min(BAR_COUNT - 1, idx + 1)];
      return (prev + curr + next) / 3;
    });

    // Cursor follower: boost the bar closest to cursor angle
    if (isNear && cursorAngle !== null) {
      const barAngleStep = 360 / BAR_COUNT;
      // Find bar index whose center angle is closest to cursor angle
      let bestIndex = 0;
      let minDiff = 180;
      for (let i = 0; i < BAR_COUNT; i++) {
        const barAngle = (i * barAngleStep) % 360;
        let diff = Math.abs(barAngle - cursorAngle);
        diff = Math.min(diff, 360 - diff);
        if (diff < minDiff) {
          minDiff = diff;
          bestIndex = i;
        }
      }
      // Boost that bar (add extra 0.4 height, clamp to 0.95)
      smoothed[bestIndex] = Math.min(0.95, smoothed[bestIndex] + 0.4);
      // Also boost neighbors slightly for smoothness
      const prevIdx = (bestIndex - 1 + BAR_COUNT) % BAR_COUNT;
      const nextIdx = (bestIndex + 1) % BAR_COUNT;
      smoothed[prevIdx] = Math.min(0.95, smoothed[prevIdx] + 0.2);
      smoothed[nextIdx] = Math.min(0.95, smoothed[nextIdx] + 0.2);
    }

    // Occasional sweep (unchanged)
    if (Math.random() < 0.05) {
      const sweepPos = Math.floor(Math.random() * BAR_COUNT);
      for (let i = 0; i < BAR_COUNT; i++) {
        const influence = Math.exp(-Math.pow(i - sweepPos, 2) / 20);
        smoothed[i] = Math.min(0.95, smoothed[i] + influence * 0.4);
      }
    }

    for (let i = 0; i < BAR_COUNT; i++) {
      animate(barHeights[i], smoothed[i], {
        type: "spring",
        damping: 14,
        stiffness: 180,
        mass: 0.8,
      });
      currentHeights.current[i] = smoothed[i];
    }
  };

  useEffect(() => {
    if (isSpeaking) {
      intervalRef.current = window.setInterval(updateSpectrum, 90);
      updateSpectrum();
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      barHeights.forEach((mv) => animate(mv, 0.1, { type: "spring", damping: 15 }));
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isSpeaking, isNear, cursorAngle]); // re-run effect when cursor state changes

  return (
    <div ref={containerRef} className="relative w-12 h-12">
      {/* Circular spectrum container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {barHeights.map((mv, i) => (
          <InwardCircularBar
            key={`inward-bar-${i}`}
            motionValue={mv}
            index={i}
            total={BAR_COUNT}
            isActive={isNear && cursorAngle !== null}
            cursorAngle={cursorAngle}
          />
        ))}
      </div>

      {/* Button (unchanged) */}
      <button
        onClick={() => toggleSpeak(text)}
        className={`relative w-full h-full flex items-center justify-center rounded-full transition-all active:scale-90 border overflow-visible ${
          isSpeaking
            ? "bg-transparent text-primary border-primary shadow-[0_0_20px_rgba(173,198,255,0.3)]"
            : "bg-transparent text-primary border-primary/30 hover:border-primary hover:bg-primary/5"
        }`}
        title={isSpeaking ? "Stop Listening" : "Listen to Artifact"}
      >
        {isSpeaking && (
          <motion.div
            animate={{ scale: [1, 1.6, 1.2], opacity: [0.4, 0, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-primary blur-md z-0 pointer-events-none"
          />
        )}

        <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-[#0a0a0a] rounded-full border border-white/10 shadow-xl overflow-hidden group">
          {isSpeaking && (
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="absolute inset-0 bg-primary/10"
            />
          )}
          <span className="material-symbols-outlined text-[18px] relative z-20">
            {isSpeaking ? "stop" : "volume_up"}
          </span>
        </div>
      </button>
    </div>
  );
};

// Bar component with cursor‑following visual effects
const InwardCircularBar: React.FC<{
  motionValue: any;
  index: number;
  total: number;
  isActive: boolean;
  cursorAngle: number | null;
}> = ({ motionValue, index, total, isActive, cursorAngle }) => {
  const angle = (index / total) * 360;
  const outerRadius = 22;

  // Determine if this bar is the follower (closest to cursor)
  let isFollower = false;
  if (isActive && cursorAngle !== null) {
    const barAngleStep = 360 / total;
    let bestIndex = 0;
    let minDiff = 180;
    for (let i = 0; i < total; i++) {
      const barAngle = (i * barAngleStep) % 360;
      let diff = Math.abs(barAngle - cursorAngle);
      diff = Math.min(diff, 360 - diff);
      if (diff < minDiff) {
        minDiff = diff;
        bestIndex = i;
      }
    }
    isFollower = index === bestIndex;
  }

  const length = useTransform(motionValue, [0.1, 1], [4, 20]);
  // Brighter color and stronger glow for follower bar
  const barColor = useTransform(
    motionValue,
    [0.2, 0.9],
    isFollower
      ? ["rgba(255, 255, 255, 0.8)", `hsl(${210 + index * 5}, 100%, 75%)`]
      : ["rgba(173, 198, 255, 0.5)", `hsl(${210 + index * 5}, 85%, 65%)`]
  );

  const boxShadow = useTransform(
    motionValue,
    [0.6, 1],
    isFollower
      ? ["0 0 0px transparent", "0 0 16px rgba(255,255,255,0.9)"]
      : ["0 0 0px transparent", "0 0 8px rgba(173,198,255,0.7)"]
  );

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0 0",
      }}
    >
      <motion.div
        style={{
          width: isFollower ? "4px" : "3px",
          height: length,
          background: barColor,
          boxShadow,
          transform: `translateX(${outerRadius}px) translateY(-100%)`,
          borderRadius: "2px",
          originY: 1,
        }}
        className="absolute"
      />
    </div>
  );
};