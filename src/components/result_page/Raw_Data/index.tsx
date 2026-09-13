import React from "react";
import { TerminalInputCard } from "./components/TerminalInputCard";
import { TerminalInputModal } from "./components/TerminalInputModal";

interface Props {
  inputText: string;
  isTerminalExpanded: boolean;
  setIsTerminalExpanded: (expanded: boolean) => void;
  transitionSettings: any;
}

export const TerminalInput = ({ inputText, isTerminalExpanded, setIsTerminalExpanded, transitionSettings }: Props) => (
  <>
    <TerminalInputCard inputText={inputText} onExpand={() => setIsTerminalExpanded(true)} />
    <TerminalInputModal inputText={inputText} isExpanded={isTerminalExpanded} onClose={() => setIsTerminalExpanded(false)} />
  </>
);
