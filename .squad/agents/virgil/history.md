# Virgil — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — SYSTRU TECHNOLOGY SaaS (Israel)
- **AI opportunity:** Phase 2 diagnostic scoring can use Claude for recommendation generation
- **Phase 6 AI opportunity:** Risk Assessment Engine can use LLM for natural-language report generation
- **GEO priority:** SYSTRU should appear when people ask AI assistants "who provides managed IT in Israel"

## AI Integration Points

1. **Phase 2 — Diagnostic Wizard:** scoring engine in `src/lib/diagnostic.ts` → could call Claude to generate personalized recommendations
2. **Phase 6 — Risk Assessment:** generate narrative sections of PDF report using Claude
3. **Ticket triage (post-Phase 3):** auto-classify tickets by priority and category using LLM

## GEO Strategy

- Add structured data (JSON-LD) to all public pages
- Ensure NAP (Name, Address, Phone) consistency across the site
- Create FAQ content that directly answers questions AI systems will be asked
- Build topical authority content for: managed IT Israel, CISO services Israel, cyber compliance

## Safety Rules

- Never send customer PII (name, email, phone) to Claude API
- Always validate and sanitize LLM output before rendering
- Cache diagnostic recommendations to reduce API cost

## Learnings

