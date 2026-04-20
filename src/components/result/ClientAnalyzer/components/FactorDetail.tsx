import React from "react";

// ── FACTOR DETAIL ─────────────────────────────────────────────────────────────
// Full-size card with conditional status styling used inside the modal dossier.
// Status icons: check_circle (success), warning (warning), cancel (danger).

export type FactorStatus = "success" | "warning" | "danger" | "neutral";

interface FactorDetailProps {
  label:   string;
  content: string;
  icon:    string;
  status?: FactorStatus;
}

const STATUS_CONFIG: Record<FactorStatus, { color: string; border: string; icon: string }> = {
  success: { color: "text-[#8BC34A]", border: "border-[#8BC34A]/30", icon: "check_circle"           },
  warning: { color: "text-[#FDD835]", border: "border-[#FDD835]/30", icon: "warning"                },
  danger:  { color: "text-[#E53935]", border: "border-[#E53935]/30", icon: "cancel"                 },
  neutral: { color: "text-primary",   border: "border-white/10",     icon: "radio_button_unchecked" },
};

export const FactorDetail = ({ label, content, icon, status = "neutral" }: FactorDetailProps) => {
  const style = STATUS_CONFIG[status];

  return (
    <div className={`p-6 bg-white/[0.02] border ${style.border} rounded-2xl flex gap-6 hover:bg-white/[0.04] transition-all relative overflow-hidden group`}>

      {/* Icon badge */}
      <div className={`w-12 h-12 rounded-2xl bg-black/50 flex items-center justify-center border ${style.border} flex-shrink-0 z-10 shadow-inner`}>
        <span className={`material-symbols-outlined text-2xl ${style.color}`}>{icon}</span>
      </div>

      {/* Text */}
      <div className="z-10 flex-grow pr-10">
        <h4 className="text-[10px] font-label uppercase text-muted mb-2 tracking-[0.2em]">{label}</h4>
        <p className="text-sm text-on-surface-variant leading-relaxed">{content}</p>
      </div>

      {/* Status check/cross indicator — top right corner */}
      <div className="absolute top-6 right-6 z-10">
        <span className={`material-symbols-outlined text-2xl ${style.color} opacity-90`}>
          {style.icon}
        </span>
      </div>
    </div>
  );
};
