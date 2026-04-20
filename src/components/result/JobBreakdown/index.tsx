import React, { useState } from "react";
import { ProposalResponse } from "../../../lib/main";
import { JobBreakdownCard } from "./components/JobBreakdownCard";
import { JobBreakdownModal } from "./components/JobBreakdownModal";

interface Props {
  data: ProposalResponse["job_breakdown"];
}

export const JobBreakdown = ({ data }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <JobBreakdownCard data={data} onExpand={() => setIsExpanded(true)} />
      <JobBreakdownModal data={data} isExpanded={isExpanded} onClose={() => setIsExpanded(false)} />
    </>
  );
};
