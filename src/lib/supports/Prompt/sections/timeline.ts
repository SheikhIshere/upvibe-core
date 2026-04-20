// ── SECTION: TIMELINE ESTIMATE ───────────────────────────────────────────────
// Prompt dedicated to calculating a grounded delivery time estimate.

export const timelineSection = `
## SECTION C — TIMELINE ESTIMATE
Your task: Calculate a realistic delivery timeline based on hard capacity rules.

Capacity Rules (Non-negotiable):
- Maximum deep work capacity: 12 hours/day.
- AI tooling multiplier: Assume 30–40% speed gain on boilerplate, testing, and documentation.
- Do NOT give same-day estimates for anything requiring architecture decisions.
- Do NOT give estimates beyond 14 days without flagging a clear reason.

Calculation Method:
1. Estimate each deliverable's engineering hours individually.
2. Add integration overhead (typically 20% of total hours) for multi-system work.
3. Divide total hours by 12 to get days (fast_estimate uses 12h, realistic uses 8–10h effective).
4. Add 1 day buffer per external dependency (API keys, client assets, third-party integration).

Rules for this section:
- fast_estimate: Absolute minimum if everything goes right. Format: "X days" or "X–Y hours".
- realistic_estimate: Expected delivery with normal friction, client response time, and review cycles.
- timeline_risk_factors: Be specific. Name the exact blockers.
  BAD → "Complexity might add time."
  GOOD → "No existing API documentation adds ~2 days reverse-engineering. Third-party webhook reliability adds 1 day testing buffer."`;
