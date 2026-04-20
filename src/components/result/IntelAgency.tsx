import { BentoItem } from "../BentoItem";
import { ProposalResponse } from "../../lib/main";

interface Props {
  data: ProposalResponse["client_analysis"];
}

export const IntelAgency = ({ data }: Props) => (
  <BentoItem
    indexLabel="02"
    className="w-full h-full flex flex-col justify-between bg-surface p-5 border border-outline"
  >
    <div className="flex-grow flex flex-col justify-between space-y-4">
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-outline pb-2">
          <span className="text-[11px] text-muted uppercase font-label">Confidence</span>
          <span className="text-xl font-label text-primary">{data.overall_confidence_level}</span>
        </div>
        <div className="space-y-2">
          {data.red_or_green_flags.slice(0, 3).map((flag, i) => {
            const isRed = flag.toLowerCase().includes("red") || flag.toLowerCase().includes("unverified");
            return (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className={`min-w-[6px] h-1.5 rounded-full ${isRed ? 'bg-red-500' : 'bg-success'}`}></span>
                <span className="text-on-surface-variant font-body">{flag}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-3 bg-surface-container-lowest border-l-2 border-primary">
        <p className="text-[10px] uppercase text-muted mb-1 font-label">Signals</p>
        <p className="text-[11px] font-label uppercase truncate text-on-surface-variant">
          {data.behavior_and_hiring_signals[0] || "No definitive patterns established."}
        </p>
      </div>
    </div>
  </BentoItem>
);
