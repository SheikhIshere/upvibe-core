import { motion, useMotionValue, useSpring } from "motion/react";
import React, { useRef, useCallback, useEffect } from "react";
import { InputButton } from "./input_button";

interface CylinderInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  isFocused: boolean;
  placeholder: string;
  showWordCountWarning?: boolean;
  className?: string;
  minHeight?: string;
  maxHeight?: string;
  extraActions?: React.ReactNode;
}

export const CylinderInput: React.FC<CylinderInputProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onGenerate,
  isGenerating,
  isFocused,
  placeholder,
  showWordCountWarning = false,
  className = "",
  minHeight = "min-h-[60px]",
  maxHeight = "max-h-[60px]",
  extraActions,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const strokeRef = useRef<HTMLDivElement>(null);
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
  const isInputValid = wordCount >= 10;

  // Spring physics for buttery smooth mouse following
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const springX = useSpring(rawX, { stiffness: 80, damping: 18, mass: 0.5 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 18, mass: 0.5 });

  // Sync spring values → CSS variables on the stroke element
  useEffect(() => {
    const unsubX = springX.on("change", (v) => {
      strokeRef.current?.style.setProperty("--mouse-x", `${v}%`);
    });
    const unsubY = springY.on("change", (v) => {
      strokeRef.current?.style.setProperty("--mouse-y", `${v}%`);
    });
    return () => { unsubX(); unsubY(); };
  }, [springX, springY]);

  const handleMouseMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 100);
    rawY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(50);
    rawY.set(50);
  }, [rawX, rawY]);

  return (
    <div
      ref={wrapperRef}
      className={`relative group ${className}`}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
    >
      {/* ── Layer 1: Deep drop shadow to lift from bg ── */}
      <div className="
        absolute -inset-1 rounded-[44px] pointer-events-none z-0
        shadow-[0_16px_60px_-8px_rgba(0,0,0,0.9),0_4px_24px_-4px_rgba(0,0,0,0.8)]
      " />

      {/* ── Layer 2: Colorful Spring-Tracked Glow (Outer bloom) ── */}
      <div
        ref={strokeRef}
        className="
          absolute -inset-3 rounded-[46px] pointer-events-none z-0
          opacity-0 group-hover:opacity-70 group-focus-within:opacity-90
          transition-opacity duration-700
        "
        style={{
          background: `radial-gradient(
            ellipse 160px 80px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(208, 188, 255, 0.90) 0%,
            rgba(173, 198, 255, 0.65) 35%,
            rgba(130, 170, 255, 0.20) 65%,
            transparent 100%
          )`,
          filter: "blur(14px)",
          willChange: "background",
        } as React.CSSProperties}
      />

      {/* ── Layer 3: Crisp colorful border stroke (the fine line) ── */}
      <div
        className="
          absolute -inset-[2.5px] rounded-[42.5px] pointer-events-none z-1
          opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
          transition-opacity duration-500
        "
        style={{
          background: `radial-gradient(
            ellipse 200px 100px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 1.0) 0%,
            rgba(208, 188, 255, 0.95) 18%,
            rgba(173, 198, 255, 0.70) 40%,
            transparent 70%
          )`,
          filter: "blur(1.5px)",
          willChange: "background",
        } as React.CSSProperties}
      />

      {/* ── Layer 4: Static ambient underline (always-on subtle base) ── */}
      <div className="
        absolute -inset-1 rounded-[44px] pointer-events-none z-0
        bg-gradient-to-r from-primary/8 via-transparent to-primary/8 blur-2xl opacity-40
      " />

      {/* ── The actual Input Container ── */}
      <div
        className={`
          relative z-10 rounded-[40px] overflow-hidden transition-all duration-300
          bg-[#080808] border border-white/[0.06]
          ${isFocused
            ? "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_0_40px_-12px_rgba(173,198,255,0.25)] border-white/10"
            : "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
          }
        `}
      >
        <div className="flex items-end gap-2 px-6 py-4">
          <div className="flex-grow relative flex flex-col min-w-0">
            <textarea
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={isGenerating}
              className={`
                w-full bg-transparent border-none text-on-surface font-body text-lg
                resize-none focus:ring-0 focus:outline-none
                placeholder:text-on-surface-variant/50 py-2 leading-relaxed
                transition-all duration-300 overflow-y-auto custom-scrollbar
                break-words whitespace-pre-wrap
                ${isFocused ? "min-h-[160px] max-h-[30vh]" : `${minHeight} ${maxHeight}`}
              `}
              placeholder={placeholder}
              rows={1}
            />
            {showWordCountWarning && value.trim() && wordCount < 10 && (
              <div className="text-red-400/90 text-[10px] font-bold uppercase tracking-widest mt-1 animate-pulse">
                Insufficient detail — minimum 10 words
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2 flex-shrink-0">
            {extraActions}
            <InputButton
              onClick={onGenerate}
              isDisabled={!value.trim() || !isInputValid}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>

      {/* ── Status Ticker ── */}
      {isGenerating && (
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-primary whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Processing Artifact Sequence
        </motion.div>
      )}
    </div>
  );
};
