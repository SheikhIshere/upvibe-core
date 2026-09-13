import React from "react";
import { BentoItem } from "../../../BentoItem";
import { ProposalResponse } from "../../../../lib/main";

interface Props {
  data: ProposalResponse["job_breakdown"];
  onExpand: () => void;
}

export const JobBreakdownCard = ({ data, onExpand }: Props) => (
  <BentoItem
    indexLabel="01"
    className="w-full h-full flex flex-col bg-[#050505] p-5 border border-outline-variant font-label text-[#555] cursor-pointer"
    onClick={onExpand}
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
);
