import React from "react";

export const ArtifactHeader = () => (
  <>
    <div className="absolute top-0 right-0 p-2 text-[8px] font-label text-primary/20 uppercase">
      High Priority Artifact // Encrypted Output
    </div>
    <div className="flex items-center gap-2 mb-6">
      <span className="text-[10px] font-label text-primary uppercase tracking-[0.3em]">The Artifact</span>
      <div className="h-px flex-grow bg-gradient-to-r from-primary to-transparent"></div>
    </div>
  </>
);
