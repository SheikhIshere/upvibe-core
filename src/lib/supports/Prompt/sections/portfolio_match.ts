// ── SECTION: PORTFOLIO MATCH ─────────────────────────────────────────────────
// Prompt dedicated to selecting the single best-fit portfolio project.

export const portfolioMatchSection = `
## SECTION B — PORTFOLIO MATCH
Your task: Select exactly ONE portfolio project that best matches this job.

Selection Algorithm:
1. Compare the job's implied_tech_stack against each project's tech_stack field. Highest overlap wins.
2. Compare the job domain against each project's domain and best_fit_job_types. Exact domain match overrides partial tech match.
3. Check the job against each project's avoid_when list — any match here disqualifies that project.
4. The winning project must have the most proof_points directly applicable to this client's core problem.

Rules for this section:
- project_title: Only one project name. Never list multiple.
- justification_for_fit: Be technically specific. Name exactly which features of the portfolio project prove this capability.
  BAD → "This project is similar."
  GOOD → "Mess Ledger's RLS-based role isolation directly maps to the multi-tenant permission system this client needs."
- proof_points_to_highlight: Pick 2–3 specific facts from the portfolio project to reference in the proposal or interview.
- elements_to_avoid_mentioning: List features or contexts from the portfolio project that would confuse or repel this client (e.g., don't mention hostel management when applying for a hospital SaaS job).`;
