import React from "react";

interface Props {
  characterCount: number;
  onCopy: () => void;
}

export const ArtifactControls = ({ characterCount, onCopy }: Props) => (
  <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
    <div className="font-label">
      <p className="text-[10px] text-muted uppercase leading-none mb-1">Char Count</p>
      <p className="text-lg text-primary leading-none">{characterCount}<span className="text-xs text-on-surface-variant">/300</span></p>
    </div>
    <button
      onClick={onCopy}
      className="px-6 md:px-8 py-3 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest hover:bg-white transition-all active:scale-95 flex items-center gap-2"
    >
      Copy Proposal
    </button>
  </div>
);
