import React from "react";
import { ProposalResponse } from "../../../lib/main";
import { PortfolioAnchorCard } from "./components/PortfolioAnchorCard";

interface Props {
  data: ProposalResponse["best_portfolio_match"];
}

export const PortfolioAnchor = ({ data }: Props) => (
  <PortfolioAnchorCard data={data} />
);
