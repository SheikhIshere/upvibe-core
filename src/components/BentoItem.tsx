import { motion } from "motion/react";
import React from "react";

interface BentoItemProps {
  className?: string;
  indexLabel?: string;
  children: React.ReactNode;
  delay?: number;
  layout?: boolean;
  onClick?: () => void;
  transitionSettings?: any;
}

export const BentoItem: React.FC<BentoItemProps> = ({
  className = "",
  indexLabel,
  children,
  delay = 0,
  layout = false,
  onClick,
  transitionSettings = { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
}) => {
  return (
    <motion.div
      layout={layout}
      onClick={onClick}
      className={`relative flex flex-col group ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        filter: "brightness(200%) blur(4px)",
        transition: { duration: 0.4, ease: "easeIn" }
      }}
      transition={{ delay, ...transitionSettings }}
    >
      {indexLabel && (
        <span className="text-[10px] font-label text-primary mb-3 uppercase tracking-widest block">
          [{indexLabel}]
        </span>
      )}
      {children}
    </motion.div>
  );
};
