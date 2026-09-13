import React from "react";
import { BentoItem } from "../../../BentoItem";

interface Props {
  inputText: string;
  onExpand: () => void;
}

export const TerminalInputCard = ({ inputText, onExpand }: Props) => (
  <BentoItem
    indexLabel="Terminal Input"
    onClick={onExpand}
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
);
