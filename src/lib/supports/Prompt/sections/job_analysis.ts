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


// prompt-2
// ── SECTION: JOB ANALYSIS — FIXED (Now actually finds good clients)
// export const jobAnalysisSection = `
// ## SECTION A — JOB + CLIENT FORENSICS

// Your task: Brutally evaluate whether this job is worth applying to and exactly what the client wants.

// Rules:
// - precise_requirements: List ONLY what the client explicitly asked for. No assumptions.
// - deliverables: Turn requirements into concrete, shippable outputs (e.g. "Dockerized Scrapy spider with residential proxy rotation + cron on VPS" not "scraper").
// - implied_tech_stack: Only what is strongly implied by title + description.
// - hidden_priorities: What they really care about (speed, reliability, no maintenance, etc.).
// - risks_and_edge_cases: Real technical risks and scope-creep dangers.

// ## CLIENT VIABILITY CHECK (This is the part you were missing)
// - toxicity_score: 1–10 (1 = dream client, 10 = bottom-feeder/scammer)
// - financial_reality: Analyze total_spent vs avg_hourly_rate_paid. Are they cheapskates?
// - red_flags: New client? Hire rate <60%? Budget too low for scope? Total spent < $8k? Avg hourly < $25?
// - green_flags: Total spent ≥ $8k, hire rate ≥ 65%, avg hourly ≥ $25, realistic budget.
// - verdict: "TRAP — scroll past" or "GREEN — worth bidding" + exact reason in one sentence.

// Output this section BEFORE you generate any proposal. If verdict = TRAP, stop and say "Do not apply."`;