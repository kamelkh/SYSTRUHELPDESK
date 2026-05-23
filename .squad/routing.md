# Work Routing

How to decide who handles what for SYSTRUHELPDESK.

## Routing Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| Architecture, scope, tech decisions | Danny | Phase decomposition, database design choices, API structure |
| Code review, PR approval | Danny | Review all PRs, enforce type safety and auth patterns |
| React components, pages, layouts | Rusty | Hero, Header, Footer, landing pages, admin UI |
| RTL/LTR rendering, i18n strings | Rusty + Tess | Component RTL layout, he.json/en.json content |
| MongoDB models, API routes | Linus | Mongoose schemas, route handlers, auth config |
| NextAuth, RBAC, session management | Linus | Credentials provider, JWT, role enforcement |
| SMTP, email, WhatsApp, PDF | Turk | nodemailer integration, WhatsApp API, PDF generation |
| Unit tests, integration tests, E2E | Livingston | Auth flows, API validation, Lighthouse audits |
| Security audit, OWASP review | Saul | Input validation review, injection risks, auth security |
| Risk assessment engine (Phase 6) | Saul + Frank | CISO risk model, scoring, PDF report |
| Privacy policy, consent, GDPR | Frank | Privacy notices, data retention, user rights |
| DPO report engine (Phase 6) | Frank + Saul | DPO risk assessment, Israeli Privacy Law compliance |
| Strategic advice, roadmap priorities | Reuben | Technology choices, SaaS scaling, vendor evaluation |
| Helpdesk ticket system, SLA | Basher | Ticket model, technician dashboard, SLA logic |
| UX design, user flows, wireframes | Yen | Component design, accessibility, design system |
| Visual design review | Yen | Check Rusty's implementations for design consistency |
| AI features, LLM integrations | Virgil | Claude API, diagnostic scoring, AI ticket triage |
| Israeli market, Hebrew UX review | Tess | Hebrew content quality, WhatsApp UX, local conventions |
| Technical SEO, meta tags, sitemaps | Isabel | generateMetadata(), JSON-LD, sitemap.ts, robots.ts |
| GEO, AI search visibility | Roman | AI citation strategy, AEO content, entity optimization |
| Docker, deployment, Nginx, CI/CD | Abigail | docker-compose, GitHub Actions, server config |
| Session logging | Scribe | Automatic — never needs routing |
| Work queue, backlog monitoring | Ralph | GitHub issues triage, PR status, "Ralph go" |

## Phase Routing

| Phase | Lead Agent | Supporting Agents |
|-------|-----------|-------------------|
| Phase 1 — Landing pages | Rusty | Yen (design), Tess (Hebrew), Isabel (SEO), Roman (GEO), Frank (privacy), Linus (POST /api/leads) |
| Phase 2 — Diagnostic wizard | Rusty + Linus | Virgil (scoring AI), Frank (consent), Livingston (tests), Basher (lead qualification) |
| Phase 3 — Admin shell | Linus + Rusty | Basher (helpdesk views), Saul (auth security), Yen (dashboard design) |
| Phase 4 — CRM | Linus | Rusty (UI), Basher (customer workflows), Frank (data privacy) |
| Phase 5 — Quote builder + PDF | Linus + Turk | Rusty (UI), Yen (print design), Reuben (pricing model) |
| Phase 6 — CISO/DPO engine | Saul + Frank | Linus (data model), Turk (PDF), Virgil (AI report), Yen (report design) |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Danny |
| `squad:{name}` | Pick up issue and complete the work | Named member |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, **Danny** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Danny's review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a feature is being built, spawn Livingston to write tests + Isabel for SEO meta simultaneously.
7. **Israeli mentality:** All agents move fast, communicate directly, ship iteratively.

