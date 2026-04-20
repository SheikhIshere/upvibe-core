import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { BentoItem } from "../BentoItem";
import { ProposalResponse } from "../../lib/main";

interface Props {
  data: ProposalResponse["job_breakdown"];
}

export const JobBreakdown = ({ data }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <BentoItem
        indexLabel="01"
        className="w-full h-full flex flex-col bg-[#050505] p-5 border border-outline-variant font-label text-[#555] cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <div className="absolute top-5 right-5">
          <span className="material-symbols-outlined text-xs opacity-30">open_in_full</span>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[11px] uppercase mb-1 opacity-50">Precise Requirements</p>
            <ul className="text-xs space-y-1">
              {data.precise_requirements.slice(0, 3).map((item, i) => (
                <li key={i} className="flex gap-2"> <span className="text-primary opacity-50">→</span> {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase mb-1 opacity-50">Hidden Priorities</p>
            <p className="text-xs italic opacity-80 truncate">
              {data.hidden_priorities[0] || "None overtly detected."}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase mb-1 opacity-50">Implied Stack</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {data.implied_tech_stack.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-2 py-0.5 bg-white/5 text-[9px] border border-white/10 uppercase">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </BentoItem>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-20 bg-black/60 backdrop-blur-md"
            onClick={() => setIsExpanded(false)}
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
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
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
                      <div key={i} className="p-4 bg-white/5 border border-white/10 text-xs text-on-surface-variant italic">
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-label uppercase text-muted mb-4 tracking-widest border-l-2 border-primary pl-3">Complete Technology Matrix</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.implied_tech_stack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase border border-primary/20 tracking-tighter">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
