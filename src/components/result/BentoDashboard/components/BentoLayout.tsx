import React from "react";
import { JobBreakdown } from "../../JobBreakdown";
import { ClientAnalyzer } from "../../ClientAnalyzer";
import { PortfolioAnchor } from "../../PortfolioAnchor";
import { TimelineRisk } from "../../TimelineRisk";
import { TerminalInput } from "../../TerminalInput";
import { TheArtifact } from "../../TheArtifact";
import { ProposalResponse } from "../../../../lib/main";

interface Props {
  artifact: ProposalResponse;
  inputText: string;
  isTerminalExpanded: boolean;
  setIsTerminalExpanded: (expanded: boolean) => void;
  transitionSettings: any;
  onCopy: () => void;
}

export const BentoLayout = ({
  artifact,
  inputText,
  isTerminalExpanded,
  setIsTerminalExpanded,
  transitionSettings,
  onCopy,
}: Props) => (
  <div className="w-full flex flex-col gap-4 flex-grow mb-8 pb-32 overflow-visible relative">
    {/* Background Ambient Layer */}
    <div className="absolute inset-0 dust-grain pointer-events-none z-0"></div>

    {/* Row 1 */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="col-span-1 lg:col-span-4">
        <JobBreakdown data={artifact.job_breakdown} />
      </div>
      <div className="col-span-1 lg:col-span-3">
        <ClientAnalyzer data={artifact.client_analysis} />
      </div>
      <div className="col-span-1 lg:col-span-5">
        <PortfolioAnchor data={artifact.best_portfolio_match} />
      </div>
    </div>

    {/* Row 2 */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow">
      <div className="col-span-1 lg:col-span-4 flex flex-col gap-4">
        <TimelineRisk data={artifact.time_estimate} />
        <TerminalInput
          inputText={inputText}
          isTerminalExpanded={isTerminalExpanded}
          setIsTerminalExpanded={setIsTerminalExpanded}
          transitionSettings={transitionSettings}
        />
      </div>
      <div className="col-span-1 lg:col-span-8 flex flex-col">
        <TheArtifact data={artifact.final_proposal} onCopy={onCopy} />
      </div>
    </div>
  </div>
);
