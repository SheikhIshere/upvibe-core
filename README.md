# Proposal Writer ⚡

> An AI-powered Upwork proposal engine. Paste a job post, get a precision-crafted cover letter, job breakdown, client analysis, and timeline estimate — in seconds.

---

## What It Does

- **Job Breakdown** — Deconstructs the job post into precise requirements, deliverables, implied tech stack, hidden priorities, and scope risks
- **Portfolio Match** — Automatically selects the single best-fit portfolio project using a domain + stack overlap algorithm
- **Timeline Estimate** — Calculates fast and realistic delivery times based on a 12h/day capacity model
- **Client Analysis** — Profiles the client with Red/Green flag signals based on job post data only. No hallucination
- **Cover Letter** — Generates a 2–3 line, under-300-character Upwork proposal using the Trust/Authority hook structure

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Animation | Framer Motion (`motion/react`) |
| AI Engine | Google Gemini (`@google/genai`) with model fallback chain |
| Styling | Custom dark theme, glassmorphism, mouse-tracking glow |

---

## Run Locally

**Prerequisites:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Add your Gemini API key
cp .env.example .env
# Then edit .env and set GEMINI_API_KEY="your_key_here"

# 3. Start the dev server
npm run dev
```

App runs at `http://localhost:3000`

---

## Project Structure

```
src/
├── App.tsx                          # Root orchestrator + UI state machine
├── components/
│   ├── CylinderInput.tsx            # Animated input with mouse-tracking glow
│   ├── InputButton.tsx              # Dual-icon spring-animated action button
│   ├── BentoItem.tsx                # Shared bento card wrapper
│   └── result/
│       ├── BentoDashboard.tsx       # Bento grid layout for result sections
│       ├── JobBreakdown.tsx         # Requirements + stack + hidden priorities
│       ├── IntelAgency.tsx          # Client analysis + confidence level
│       ├── PortfolioAnchor.tsx      # Best project match display
│       ├── TimelineRisk.tsx         # Delivery time estimate
│       ├── TerminalInput.tsx        # Input echo with fullscreen modal
│       └── TheArtifact.tsx          # Final generated proposal
└── lib/
    ├── main.ts                      # AI generation engine + model fallback loop
    └── supports/
        ├── engin_model.ts           # Gemini model fallback chain config
        ├── erros.ts                 # Centralized error handling
        ├── output_schema.ts         # Structured JSON response schema
        └── Prompt/
            ├── main_prompt.ts       # Mega assembler → systemInstruction
            ├── persona.ts           # AI role + schema enforcement
            ├── rules.ts             # Goals + execution constraints
            ├── format.ts            # Sections combinator
            ├── personal_words.ts    # Portfolio data (single source of truth)
            └── sections/
                ├── job_analysis.ts
                ├── portfolio_match.ts
                ├── timeline.ts
                ├── client_analysis.ts
                └── cover_letter.ts
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | Your Google Gemini API key |
| `APP_URL` | Optional | Deployment URL (defaults to localhost) |
