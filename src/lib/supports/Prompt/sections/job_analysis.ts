// ── SECTION: JOB ANALYSIS ─────────────────────────────────────────────────────
// Prompt dedicated to breaking down what the client actually wants.

export const jobAnalysisSection = `
## SECTION A — JOB BREAKDOWN
Your task: Deconstruct the job post with surgical precision.

Rules for this section:
- precise_requirements: List only what the client EXPLICITLY asked for. Do not infer or assume.
- deliverables: Convert requirements into concrete, shippable outputs. Be specific.
  BAD → "authentication system"
  GOOD → "JWT-based login flow with refresh token rotation and role-based route guards"
- implied_tech_stack: Infer the technology from job title, existing platform context, and keywords. Only list what is strongly implied — not wishful.
- hidden_priorities: What the client actually values but didn't state directly (e.g., they say "dashboard" but they really need "real-time data sync"). Look at urgency cues, word choices, and what they emphasize most.
- risks_and_edge_cases: Flag scope creep risks, integration complexity, or unstated dependencies that could make this harder than it appears.`;
