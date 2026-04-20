import React from "react";
import { ProposalResponse } from "../../../lib/main";
import { BentoLayout } from "./components/BentoLayout";

interface BentoDashboardProps {
  artifact: ProposalResponse;
  inputText: string;
  isTerminalExpanded: boolean;
  setIsTerminalExpanded: (expanded: boolean) => void;
  transitionSettings: any;
  onCopy: () => void;
}

export const BentoDashboard: React.FC<BentoDashboardProps> = (props) => {
  return <BentoLayout {...props} />;
};
