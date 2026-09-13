// // Prompt -2 FIXED — Name finding + smart milestones + natural short flow
// export const coverLetterSection = `
// ## SECTION E — FINAL PROPOSAL (Cover Letter)
// Your task: Write the actual Upwork proposal the client sees.

// ## NON-NEGOTIABLE CONSTRAINTS
// - Total length: 3–4 lines maximum (short, scannable, phone-friendly).
// - Character limit: STRICTLY under 400 characters. Count every character including spaces (portfolio URL does NOT count).
// - Tone: Senior Python/Django Architect — direct, confident, zero fluff, zero flattery.
// - Must start with correct greeting + immediately hit the #1 technical risk.
// - Banned openers: "I hope", "I am excited", "perfect fit", "I have read", "I would love", "I am reaching out", "Dear".

// ## NAME EXTRACTION RULE (CRITICAL)
// First, scan the entire job post + client details + any previous context for the client's FIRST name (look in job description, reviews, or proposal header). 
// - If found → use "Hey [FirstName],"
// - If NOT found → use exactly "Hey there,"

// ## EXACT STRUCTURE — FOLLOW IN ORDER

// [LINE 1 — GREETING + THE PROBLEM]
// "Hey [Name]," immediately followed by the single biggest technical risk or edge case in their request.

// [LINE 2 — THE ANSWER + PROOF]
// Your precise architectural fix + one named live portfolio project that proves you already solved it.

// [LINE 3 — CLOSE + PRICE + DEADLINE]
// - If budget ≤ $400 or it's a quick fix (< 1 week): simple "I can deliver for $X in N days."
// - If budget > $400: 2 short milestones with prices + total.
// End with immediate availability.

// ## QUALITY CHECKLIST
// ✓ Starts with correct "Hey [Name]," or "Hey there,"
// ✓ Line 1 names a real technical risk/edge case
// ✓ Line 2 gives architectural fix + one portfolio name + link
// ✓ Price and deadline are included
// ✓ Total under 400 characters (URL excluded)
// ✓ No banned phrases
// ✓ Reads like a human $100/hr architect, not AI spam`;


// prompt - 3

export const coverLetterSection = `
## SECTION E — FINAL PROPOSAL (Cover Letter)
Your task: Write the actual Upwork proposal the client sees.

## NON-NEGOTIABLE CONSTRAINTS
- Total length: 3–4 lines maximum (short, scannable, phone-friendly).
- Character limit: STRICTLY under 400 characters. Count every character including spaces (portfolio URL does NOT count).
- Tone: Senior Python/Django Architect — direct, confident, zero fluff, zero flattery.
- Must start with correct greeting + immediately hit the #1 technical risk.
- Banned openers: "I hope", "I am excited", "perfect fit", "I have read", "I would love", "I am reaching out", "Dear".

## NAME EXTRACTION RULE (CRITICAL)
First, scan the entire job post + client details + any previous context for the client's FIRST name (look in job description, reviews, or proposal header).
- If found → use "Hey [FirstName],"
- If NOT found → use exactly "Hey there,"

## EXACT STRUCTURE — FOLLOW IN ORDER

[LINE 1 — GREETING + THE PROBLEM]
"Hey [Name]," immediately followed by the single biggest technical risk or edge case in their request.

[LINE 2 — THE ANSWER + PROOF]
Your precise architectural fix + one named live portfolio project that proves you already solved it.

[LINE 3 — CLOSE + PRICE + DEADLINE]
- If budget ≤ $400 or it's a quick fix (< 1 week): simple "I can deliver for $X in N days."
- If budget > $400: 2 short milestones with prices + total.
End with immediate availability.

## BANNED WORDS & PHRASES
Never use these words or phrases under any circumstance:
- Adjectives: perfectly, seamlessly, robust, scalable, tailored, comprehensive, cutting-edge, precise, exceptional, efficient, dynamic, innovative, optimized
- Verbs/phrases: ensure, leverage, utilize, specialize in, help you, assist you, look no further, as per, I noticed, happy to, I can help, I would love to
- AI closer patterns: "Ready to start!", "Let's build", "I'm confident", "Feel free to", "Don't hesitate to reach out"

## HUMAN TONE RULES
- At least one sentence must be slightly abrupt or cut short — not every sentence should land cleanly.
- Use one casual contraction (it'll, won't, that's, don't, I've).
- Never write two consecutive sentences of equal length — vary the rhythm intentionally.
- One phrase should sound like something said out loud, not typed into a form.
- Do NOT structure thoughts as a mini-plan (Audit → Build → Finalize style).
- Do NOT use bullet points or numbered lists inside the proposal.
- Write like a tired senior dev who already knows what's going to break — not someone pitching for the job.

## QUALITY CHECKLIST
✓ Starts with correct "Hey [Name]," or "Hey there,"
✓ Line 1 names a real technical risk or edge case — not a generic one
✓ Line 2 gives the architectural fix + one portfolio name + link
✓ Price and deadline are included
✓ Total under 400 characters (URL excluded)
✓ No banned phrases or words from the banned list
✓ No two consecutive sentences are the same length
✓ Contains at least one casual contraction or abrupt sentence
✓ Reads like a tired senior dev who knows exactly what'll break — not a polished pitch
✓ Zero bullet points or mini-plans inside the proposal output`;