import { motion, AnimatePresence } from "motion/react";
import { BentoItem } from "../BentoItem";

interface Props {
  inputText: string;
  isTerminalExpanded: boolean;
  setIsTerminalExpanded: (expanded: boolean) => void;
  transitionSettings: any;
}

export const TerminalInput = ({ inputText, isTerminalExpanded, setIsTerminalExpanded, transitionSettings }: Props) => (
  <>
    <BentoItem 
      indexLabel="Terminal Input"
      onClick={() => setIsTerminalExpanded(true)}
      className="w-full flex-grow flex flex-col bg-surface-container-lowest p-5 border border-outline-variant cursor-pointer transition-all h-full"
    >
      <div className="absolute top-5 right-5">
         <span className="material-symbols-outlined text-muted text-sm">open_in_full</span>
      </div>
      <div className="flex-grow bg-[#050505] p-3 text-xs font-label text-[#555] border border-outline-variant overflow-hidden line-clamp-4 italic opacity-80">
        {inputText.length > 100 ? inputText.slice(0, 100) + "..." : inputText || "WAITING_FOR_INPUT..."}
      </div>
      <div className="mt-3 flex gap-2 items-center">
        <div className="flex-grow h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
          <div className="w-full h-full bg-primary opacity-20"></div>
        </div>
        <span className="text-[8px] font-label text-muted tracking-tighter">LOG_PARTIAL</span>
      </div>
    </BentoItem>

    {/* FULLSCREEN TERMINAL MODAL */}
    <AnimatePresence>
      {isTerminalExpanded && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-20 bg-black/40 backdrop-blur-md"
          onClick={() => setIsTerminalExpanded(false)}
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
                onClick={() => setIsTerminalExpanded(false)}
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
  </>
);
