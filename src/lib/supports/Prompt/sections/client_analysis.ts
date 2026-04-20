// ── SECTION: CLIENT ANALYSIS ─────────────────────────────────────────────────
// Prompt dedicated to profiling the client and issuing a strict confidence verdict.

export const clientAnalysisSection = `
## SECTION D — CLIENT ANALYSIS
Your task: Profile this client based solely on the provided input to determine if they are a good or bad client. Invent nothing. Base your analysis strictly on real, visible data.

Analyze the client using exactly these 4 terms. Label each section clearly.

1. Budget vs. Project Scope:
- Compare the offered budget against the technical reality and engineering hours required for the deliverables.
- Explicitly flag if the compensation is completely disconnected from the requested scope (e.g., demanding a full ETL pipeline for $40).

2. Client Account History:
- Evaluate account age, hire rate, and payment verification.
- Red Flags: Unverified payment, hire rate below 50%, or a brand-new account paired with an unrealistic budget.
- Green Flags: Verified payment, hire rate above 70%, established spend history, and repeat hires.

3. Clarity of Requirements:
- Assess the technical depth of the job description. 
- Are the tech stack, deliverables, and workflow clearly defined? 
- Note if clear requirements are paired with a bad budget (often indicates copy-pasted text or intentional lowballing).

4. Client Engagement:
- Look at current job activity: when it was last viewed, number of proposals, and active interviews.
- Determine if the client is actively monitoring the post and serious about hiring, or just fishing for free consulting.

Final Verdict:
- Open with a clear declaration: "Good Client", "Moderate Client", or "Bad Client".
- Provide exactly one concise sentence justifying this decision based on the combined weight of the 4 terms above.
`;
