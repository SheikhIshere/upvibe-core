import React from "react";

// ── FACTOR MINI ───────────────────────────────────────────────────────────────
// Small 2-line card used in the collapsed bento dashboard view.

interface FactorMiniProps {
  label: string;
  status: string;
}

export const FactorMini = ({ label, status }: FactorMiniProps) => (
  <div className="flex flex-col bg-white/[0.02] p-2.5 border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-colors">
    <span className="text-[8px] uppercase text-muted font-label mb-1 opacity-60 tracking-widest">{label}</span>
    <span className="text-[10px] text-on-surface-variant truncate font-body">{status}</span>
  </div>
);
