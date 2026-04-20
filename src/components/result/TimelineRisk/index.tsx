import React from "react";
import { ProposalResponse } from "../../../lib/main";
import { TimelineRiskCard } from "./components/TimelineRiskCard";

interface Props {
  data: ProposalResponse["time_estimate"];
}

export const TimelineRisk = ({ data }: Props) => (
  <TimelineRiskCard data={data} />
);
