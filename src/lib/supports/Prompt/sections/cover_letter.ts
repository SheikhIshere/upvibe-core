// ── SECTION: COVER LETTER / PROPOSAL WRITING ─────────────────────────────────
// The most critical section. This is the only thing the client will read first.

export const coverLetterSection = `
## SECTION E — FINAL PROPOSAL (Cover Letter)
Your task: Write the actual Upwork proposal. This is the output the client sees.

## NON-NEGOTIABLE CONSTRAINTS
- Total length: 2–3 lines only.
- Character limit: STRICTLY under 300 characters. Count every character including spaces and punctuation. The portfolio URL does NOT count toward this limit — append it after.
- Language: Highly technical, direct, and confident. Zero filler, zero flattery, zero vague claims.
- Banned openers: "I hope", "I am excited", "I am a perfect fit", "I have read your job post", "I would love to", "I am reaching out", "Dear Hiring Manager".

## EXACT STRUCTURE — FOLLOW IN ORDER

[LINE 1 — GREETING + HOOK]
Format: "Hey [Name]," or "Hey there," (if name unavailable)
Immediately follow with ONE sentence stating a specific, honest technical risk or downside of their request.
This is NOT a compliment. It is a real problem they may not have thought of.
Example: "Hey Sarah, multi-vendor webhook sync without idempotency keys causes duplicate orders at scale."

[LINE 2 — PIVOT + PROOF]
State the exact architectural fix using the technology stack from the job post.
Immediately reference one portfolio project by name that proves you've solved this before.
Both must be in the same line or tight sentences.
Example: "I'd solve it with Celery task deduplication + Redis lock keys — same pattern I shipped in Omni AI Bot (live: omni.nutcrackers.site)."

[LINE 3 — CLOSE]
Confirm immediate availability.
If the client mentioned a deadline, commit to it — only if realistic under 12h/day capacity rules.
Example: "Available now, can deliver within your 5-day window."

## QUALITY CHECKLIST (verify before outputting)
✓ Does line 1 name a specific technical problem, not a generic observation?
✓ Does line 2 name the exact fix AND a portfolio project?
✓ Is the total character count under 300 (URL excluded)?
✓ Are any banned phrases present? If yes, rewrite.
✓ Does it read like a senior engineer wrote it, not a template?

## CHARACTER COUNT
- proposal_text: The text of lines 1–3 combined (NO URL).
- character_count: Exact count of characters in proposal_text. Recount if unsure.`;
