import React from "react";
import { BentoItem } from "../../BentoItem";
import { ProposalResponse } from "../../../lib/main";
import { ArtifactHeader } from "./components/ArtifactHeader";
import { ArtifactContent } from "./components/ArtifactContent";
import { ArtifactControls } from "./components/ArtifactControls";

interface Props {
  data: ProposalResponse["final_proposal"];
  onCopy: () => void;
}

export const TheArtifact = ({ data, onCopy }: Props) => (
  <BentoItem
    className="w-full h-full flex flex-col bg-surface-container-highest p-8 border border-primary shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden relative"
  >
    <div className="flex flex-col h-full">
      <ArtifactHeader />
      <ArtifactContent text={data.proposal_text} />
      <ArtifactControls characterCount={data.character_count} textToRead={data.proposal_text} onCopy={onCopy} />
    </div>
  </BentoItem>
);
