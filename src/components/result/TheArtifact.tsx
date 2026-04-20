import { BentoItem } from "../BentoItem";
import { ProposalResponse } from "../../lib/main";

interface Props {
  data: ProposalResponse["final_proposal"];
  onCopy: () => void;
}

export const TheArtifact = ({ data, onCopy }: Props) => (
  <BentoItem
    className="w-full h-full flex flex-col bg-surface-container-highest p-8 border border-primary shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden relative"
  >
    <div className="absolute top-0 right-0 p-2 text-[8px] font-label text-primary/20 uppercase">
      High Priority Artifact // Encrypted Output
    </div>
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[10px] font-label text-primary uppercase tracking-[0.3em]">The Artifact</span>
        <div className="h-px flex-grow bg-gradient-to-r from-primary to-transparent"></div>
      </div>
      <div className="flex-grow overflow-y-auto mb-6 pr-2 custom-scrollbar">
        <p className="text-lg md:text-xl font-medium leading-relaxed tracking-tight text-white whitespace-pre-wrap">
          {data.proposal_text}
        </p>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
        <div className="font-label">
          <p className="text-[10px] text-muted uppercase leading-none mb-1">Char Count</p>
          <p className="text-lg text-primary leading-none">{data.character_count}<span className="text-xs text-on-surface-variant">/300</span></p>
        </div>
        <button
          onClick={onCopy}
          className="px-6 md:px-8 py-3 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest hover:bg-white transition-all active:scale-95 flex items-center gap-2"
        >
          Copy Proposal
        </button>
      </div>
    </div>
  </BentoItem>
);
