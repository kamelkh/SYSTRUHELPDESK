# Basher — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — SYSTRU TECHNOLOGY SaaS (Israel)
- **Helpdesk phases:** Phase 3 (Admin shell — first internal dashboard), later phases add ticket system
- **User roles:** ADMIN (full access), SALES (leads/quotes), TECH (tickets/incidents)
- **WhatsApp integration:** Turk is building WhatsApp lib — Basher to design ticket-from-WhatsApp flow

## Helpdesk Ticket Model (Proposed)

```
Ticket {
  id, title, description,
  status: OPEN | IN_PROGRESS | PENDING | RESOLVED | CLOSED,
  priority: CRITICAL | HIGH | MEDIUM | LOW,
  assignedTo: User (TECH role),
  customer: Customer,
  sla: { responseDeadline, resolutionDeadline },
  createdAt, updatedAt, resolvedAt,
  source: PORTAL | WHATSAPP | EMAIL | PHONE
}
```

## SLA Targets (Proposed for SYSTRU)

- Critical: 1h response, 4h resolution
- High: 4h response, 8h resolution
- Medium: 8h response, 24h resolution
- Low: 24h response, 72h resolution

## Learnings

