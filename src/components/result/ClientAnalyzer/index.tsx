import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

import { BentoItem } from "../../BentoItem";
import { ProposalResponse } from "../../../lib/main";

import { GaugeMeter } from "./components/GaugeMeter";
import { FactorMini } from "./components/FactorMini";
import { FactorDetail, FactorStatus } from "./components/FactorDetail";

interface Props {
  data: ProposalResponse["client_analysis"];
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

const getMeterValue = (verdict: string) => {
  const v = verdict.toLowerCase();
  if (v.includes("good"))     return { val: 90, color: "#2E7D32", label: "Good Client" };
  if (v.includes("moderate")) return { val: 50, color: "#FDD835", label: "Moderate"    };
  return                             { val: 10, color: "#E53935", label: "Bad Client"  };
};

const analyzeTextStatus = (text: string): FactorStatus => {
  if (!text) return "neutral";
  const lower = text.toLowerCase();
  if (lower.match(/(good|verified|clear|realistic|reasonable|strong|high|excellent|sufficient)/)) return "success";
  if (lower.match(/(unclear|low|poor|bad|missing|unrealistic|weak|warning)/))                    return "danger";
  return "warning";
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export const ClientAnalyzer = ({ data }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const meter = getMeterValue(data.final_verdict);

  return (
    <>
      {/* ── BENTO CARD (collapsed view) ─────────────────────────────────── */}
      <BentoItem
        indexLabel="02"
        onClick={() => setIsExpanded(true)}
        className="w-full h-full flex flex-col bg-surface p-5 border border-outline cursor-pointer group hover:border-primary/30 transition-all overflow-hidden"
      >
        <div className="absolute top-5 right-5">
          <span className="material-symbols-outlined text-[10px] text-muted opacity-30 group-hover:opacity-100 transition-opacity">open_in_full</span>
        </div>

        <div className="flex-grow flex flex-col items-center gap-3">
          {/* Gauge */}
          <div className="w-full px-2 pt-2">
            <GaugeMeter value={meter.val} color={meter.color} />
          </div>

          {/* Verdict label */}
          <div className="text-center -mt-2">
            <span className="text-[9px] text-muted uppercase font-label tracking-widest block mb-0.5">Risk Assessment</span>
            <h3 className="text-sm font-bold font-label uppercase tracking-widest" style={{ color: meter.color }}>
              {meter.label}
            </h3>
          </div>

          {/* 4-Factor mini grid */}
          <div className="grid grid-cols-2 gap-2 w-full mt-1">
            <FactorMini label="Scope"   status={data.budget_vs_scope}       />
            <FactorMini label="History" status={data.account_history}        />
            <FactorMini label="Clarity" status={data.requirements_clarity}   />
            <FactorMini label="Engaged" status={data.engagement_level}       />
          </div>
        </div>
      </BentoItem>

      {/* ── DOSSIER MODAL (expanded view) ───────────────────────────────── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-3xl"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="w-full max-w-2xl bg-[#080808] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden rounded-[32px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5">
                <div>
                  <span className="text-[10px] font-label uppercase tracking-[0.4em] text-primary mb-1 block">Intelligence Protocol</span>
                  <h2 className="text-2xl font-headline font-bold">Counter-Party Analysis</h2>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors border border-outline-variant"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Body */}
              <div className="p-8 overflow-y-auto custom-scrollbar space-y-8 max-h-[70vh]">

                {/* Verdict section */}
                <section className="bg-gradient-to-br from-surface-container-low to-black p-8 rounded-3xl border border-outline relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px]" style={{ backgroundColor: meter.color + "22" }} />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <p className="text-xs text-muted uppercase font-label tracking-widest mb-2">Final Verdict</p>
                      <div className="mb-2 w-56">
                        <GaugeMeter value={meter.val} color={meter.color} />
                      </div>
                      <p className="text-2xl font-bold uppercase tracking-[0.1em] mb-3" style={{ color: meter.color }}>
                        {data.final_verdict}
                      </p>
                      <p className="text-sm text-on-surface-variant leading-relaxed italic border-l-2 border-primary/20 pl-4">
                        "{data.verdict_justification}"
                      </p>
                    </div>
                    <div
                      className="flex-shrink-0 w-20 h-20 rounded-full border-4 flex items-center justify-center bg-black/40 backdrop-blur-md"
                      style={{ borderColor: meter.color }}
                    >
                      <span className="material-symbols-outlined text-4xl" style={{ color: meter.color }}>
                        {meter.val >= 80 ? "shield_with_heart" : meter.val >= 40 ? "rule" : "warning"}
                      </span>
                    </div>
                  </div>
                </section>

                {/* 4-Factor detail cards */}
                <div className="grid grid-cols-1 gap-4">
                  <FactorDetail
                    label="Budget vs Scope"
                    content={data.budget_vs_scope}
                    icon="account_balance_wallet"
                    status={analyzeTextStatus(data.budget_vs_scope)}
                  />
                  <FactorDetail
                    label="Account Heritage"
                    content={data.account_history}
                    icon="verified_user"
                    status={analyzeTextStatus(data.account_history)}
                  />
                  <FactorDetail
                    label="Signal Clarity"
                    content={data.requirements_clarity}
                    icon="psychology_alt"
                    status={analyzeTextStatus(data.requirements_clarity)}
                  />
                  <FactorDetail
                    label="Operational Pulse"
                    content={data.engagement_level}
                    icon="monitoring"
                    status={analyzeTextStatus(data.engagement_level)}
                  />
                </div>
              </div>

              {/* Footer */}
              <footer className="p-6 text-center border-t border-white/5">
                <p className="text-[10px] font-label uppercase tracking-widest opacity-30">
                  © 2026 NUTCRACKERS STRATEGIC DOSSIER // EYES ONLY
                </p>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
