import { motion, AnimatePresence } from "motion/react";
import React from "react";

interface Props {
  inputText: string;
  isExpanded: boolean;
  onClose: () => void;
}

export const TerminalInputModal = ({ inputText, isExpanded, onClose }: Props) => (
  <AnimatePresence>
    {isExpanded && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-20 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-5xl h-full max-h-[80vh] bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col overflow-hidden rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></div>
              </div>
              <span className="text-[10px] font-label uppercase tracking-widest text-muted">System Terminal Output</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          <div className="flex-grow p-8 font-label text-sm text-[#888] overflow-y-auto custom-scrollbar leading-relaxed">
            <div className="mb-4 text-primary opacity-40">[INITIALIZING_FETCH_SEQUENCE...]</div>
            {inputText}
            <motion.span
              animate={{ opacity: [0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-primary ml-1"
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
