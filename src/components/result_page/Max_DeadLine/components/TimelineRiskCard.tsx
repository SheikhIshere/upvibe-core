import React from "react";
import { BentoItem } from "../../../BentoItem";
import { ProposalResponse } from "../../../../lib/main";

interface Props {
  data: ProposalResponse["time_estimate"];
}

export const TimelineRiskCard = ({ data }: Props) => (
  <BentoItem
    indexLabel="04"
    className="w-full h-auto bg-surface p-5 border border-outline flex flex-col justify-center"
  >
    <p className="text-[10px] text-muted uppercase font-label leading-none mb-2">Estimated Timeline</p>
    <p className="text-sm font-bold uppercase tracking-tight text-primary">
      {data.realistic_estimate}
    </p>
  </BentoItem>
);
