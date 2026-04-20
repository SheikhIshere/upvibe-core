// ── FORMAT / SECTIONS COMBINATOR ─────────────────────────────────────────────
// This file imports all dedicated section prompts and combines them into one
// exported string. main_prompt.ts imports ONLY this file for all section logic.
//
// To edit any section, go to sections/:
//   sections/job_analysis.ts    → How to break down the job
//   sections/portfolio_match.ts → How to select the best project
//   sections/timeline.ts        → How to estimate delivery time
//   sections/client_analysis.ts → How to profile and flag the client
//   sections/cover_letter.ts    → How to write the final proposal

import { jobAnalysisSection } from "./sections/job_analysis";
import { portfolioMatchSection } from "./sections/portfolio_match";
import { timelineSection } from "./sections/timeline";
import { clientAnalysisSection } from "./sections/client_analysis";
import { coverLetterSection } from "./sections/cover_letter";

export const outputFormat = `
# SECTION-BY-SECTION INSTRUCTIONS

${jobAnalysisSection}

${portfolioMatchSection}

${timelineSection}

${clientAnalysisSection}

${coverLetterSection}

FINAL MANDATE: Return ONLY the JSON object conforming to the provided schema. No markdown. No explanation outside the JSON.
`;
