import { motion, AnimatePresence } from "motion/react";
import React from "react";

interface InputButtonProps {
  onClick: () => void;
  isDisabled: boolean;
  isGenerating: boolean;
  className?: string;
}

export const InputButton: React.FC<InputButtonProps> = ({
  onClick,
  isDisabled,
  isGenerating,
  className = "",
}) => {
  const isReallyDisabled = isDisabled && !isGenerating;

  // Two icons staggered by half a cycle so one exits as the other enters
  // This eliminates any visual gap or "flash" at the edge
  const iconAnimation = {
    initial: { y: -22, opacity: 0 },
    animate: {
      y: [22, 0, 0, -22],        // enter from above, hold center, exit below
      opacity: [0, 1, 1, 0],     // perfectly synchronised fade
    },
    transition: {
      repeat: Infinity,
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1] as any, // expo-out — fast-start, soft-settle
      times: [0, 0.2, 0.7, 1],   // 20% entering, 50% visible, 30% exiting
    },
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled || isGenerating}
      animate={{
        scale: isReallyDisabled ? 0.95 : 1,
        filter: isReallyDisabled
          ? "grayscale(60%) brightness(0.6)"
          : "grayscale(0%) brightness(1)",
        opacity: isReallyDisabled ? 0.5 : 1,
      }}
      whileHover={!isReallyDisabled ? { scale: 1.1 } : {}}
      whileTap={!isReallyDisabled ? { scale: 0.94 } : {}}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center shadow-lg
        relative overflow-hidden flex-shrink-0 btn-gradient
        ${isReallyDisabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {/* Static → Generating swap with AnimatePresence (no flicker) */}
      <AnimatePresence mode="wait" initial={false}>
        {isGenerating ? (
          <motion.div
            key="generating"
            className="relative h-6 w-6 overflow-visible flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Icon A — primary */}
            <motion.span
              className="material-symbols-outlined text-[22px] absolute text-on-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
              {...iconAnimation}
            >
              auto_awesome
            </motion.span>

            {/* Icon B — offset by half cycle for seamless loop */}
            <motion.span
              className="material-symbols-outlined text-[22px] absolute text-on-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
              initial={{ y: -22, opacity: 0 }}
              animate={{
                y: [22, 0, 0, -22],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: [0.16, 1, 0.3, 1] as any,
                times: [0, 0.2, 0.7, 1],
                delay: 0.8, // exactly half of duration
              }}
            >
              auto_awesome
            </motion.span>
          </motion.div>
        ) : (
          <motion.span
            key="idle"
            className="material-symbols-outlined text-[22px] text-on-primary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            auto_awesome
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};