import React from "react";

interface Props {
  text: string;
}

export const ArtifactContent = ({ text }: Props) => (
  <div className="flex-grow overflow-y-auto mb-6 pr-2 custom-scrollbar">
    <p className="text-lg md:text-xl font-medium leading-relaxed tracking-tight text-white whitespace-pre-wrap">
      {text}
    </p>
  </div>
);
