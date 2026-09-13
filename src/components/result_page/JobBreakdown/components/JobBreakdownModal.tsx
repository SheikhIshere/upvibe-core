import { motion, AnimatePresence } from "motion/react";
import React from "react";
import { ProposalResponse } from "../../../../lib/main";
import { TTSButton } from "../../CoverLetter/components/tts/TTSButton";

interface Props {
  data: ProposalResponse["job_breakdown"];
  isExpanded: boolean;
  onClose: () => void;
}

export const JobBreakdownModal = ({ data, isExpanded, onClose }: Props) => {
  const textToRead = `
    Job Requirements: ${data.precise_requirements.join(". ")}.
    Hidden Priorities: ${data.hidden_priorities.join(". ")}.
    Technology Stack: ${data.implied_tech_stack.join(", ")}.
  `;

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-20 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
              <span className="text-xs font-label uppercase tracking-[0.2em] text-primary">Requirement Analysis Depth</span>
              <div className="flex items-center gap-2">
                <TTSButton text={textToRead} />
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            </div>
            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8 max-h-[70vh]">
              <section>
                <h4 className="text-[10px] font-label uppercase text-muted mb-4 tracking-widest border-l-2 border-primary pl-3">Full Requirements List</h4>
                <ul className="space-y-3">
                  {data.precise_requirements.map((item, i) => (
                    <li key={i} className="text-sm text-[#888] flex gap-3 leading-relaxed">
                      <span className="text-primary opacity-40 mt-1">0{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h4 className="text-[10px] font-label uppercase text-muted mb-4 tracking-widest border-l-2 border-primary pl-3">Hidden Client Priorities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.hidden_priorities.map((item, i) => (
                    <div key={i} className="p-4 bg-white/5 border border-white/10 text-xs text-on-surface-variant italic">{item}</div>
                  ))}
                </div>
              </section>
              <section>
                <h4 className="text-[10px] font-label uppercase text-muted mb-4 tracking-widest border-l-2 border-primary pl-3">Complete Technology Matrix</h4>
                <div className="flex flex-wrap gap-2">
                  {data.implied_tech_stack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase border border-primary/20 tracking-tighter">{tech}</span>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
