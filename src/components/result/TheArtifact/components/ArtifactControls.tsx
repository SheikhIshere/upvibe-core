import React from "react";
import { TTSButton } from "./tts/TTSButton";

interface Props {
  characterCount: number;
  textToRead: string;
  onCopy: () => void;
}

export const ArtifactControls = ({ characterCount, textToRead, onCopy }: Props) => (
  <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
    <div className="font-label">
      <p className="text-[10px] text-muted uppercase leading-none mb-1">Char Count</p>
      <p className="text-lg text-primary leading-none">{characterCount}<span className="text-xs text-on-surface-variant">/300</span></p>
    </div>
    <div className="flex gap-3">
      <TTSButton text={textToRead} />
      <button
        onClick={onCopy}
        className="w-12 h-12 flex items-center justify-center bg-primary text-on-primary rounded-full hover:bg-white transition-all active:scale-95 shadow-lg"
        title="Copy Proposal"
      >
        <span className="material-symbols-outlined text-xl">content_copy</span>
      </button>
    </div>
  </div>
);
