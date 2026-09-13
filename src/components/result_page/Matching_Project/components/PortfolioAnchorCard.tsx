import React from "react";
import { BentoItem } from "../../../BentoItem";
import { ProposalResponse } from "../../../../lib/main";

interface Props {
  data: ProposalResponse["best_portfolio_match"];
}

export const PortfolioAnchorCard = ({ data }: Props) => (
  <BentoItem
    indexLabel="03"
    className="w-full h-full flex flex-col bg-surface p-5 border border-outline"
  >
    <h3 className="text-lg font-bold mb-1 truncate">{data.project_title}</h3>
    <p className="text-xs text-on-surface-variant mb-4 line-clamp-2">{data.justification_for_fit}</p>
    <div className="text-[10px] sm:text-[11px] font-label bg-surface-container-highest p-3 border border-outline-high text-primary uppercase">
      MATCH: PRIMARY // DIRECT OVERLAP
    </div>
  </BentoItem>
);
