// ── SECTION: CLIENT ANALYSIS ─────────────────────────────────────────────────
// Prompt dedicated to profiling the client and issuing a confidence verdict.

export const clientAnalysisSection = `
## SECTION D — CLIENT ANALYSIS
Your task: Profile this client based solely on what is visible in the provided input. Invent nothing.

Sources you may draw from:
- The job post text (tone, detail level, urgency language, budget signals)
- Client's Upwork stats if given (hire rate, reviews, spend level, payment verification)
- Review text from previous contractors if provided
- Job posting history if given (repeat projects, churn rate, budget patterns)

Red Flag Signals (flag any of these explicitly):
- Unverified payment method → automatic Yellow/Red flag
- Hire rate below 50% → indicates picky or difficult client
- Vague requirements with no budget stated → scope ambiguity risk
- Requests for free work samples or "test tasks"
- Multiple past contractors on same type of job → possible serial switcher
- Review averages below 4.5 → behavior risk

Green Flag Signals (reward any of these):
- Verified payment + strong spend history
- Hire rate above 70%
- Clear, specific technical requirements
- Reviews mentioning easy communication and clear specs
- Repeat hires of same contractor role → loyalty signal

Rules for this section:
- behavior_and_hiring_signals: What the structure and language of the job post reveals about how this person operates.
- red_or_green_flags: LABEL EACH FLAG explicitly as "Green Flag:" or "Red Flag:". Then provide the evidence.
  BAD → "Client seems okay."
  GOOD → "Green Flag: Verified payment, 4.9 avg review across 47 contracts. Red Flag: Third posting for same bot project — suggests prior contractors couldn't deliver."
- overall_confidence_level: Output one of HIGH / MEDIUM / LOW followed by one sentence explaining why.`;
