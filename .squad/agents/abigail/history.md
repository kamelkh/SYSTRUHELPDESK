# Abigail — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — SYSTRU TECHNOLOGY SaaS (Israel)
- **Docker:** `platform/Dockerfile` (multi-stage), `docker-compose.yml` (dev), `docker-compose.prod.yml` (prod)
- **Services:** Next.js app + MongoDB 7 + mongo-express (dev only)
- **Deployment guide:** `platform/docs/DEPLOYMENT.md` — full server setup docs
- **MongoDB port:** 27017 (local), mongo-express at 8081

## Infrastructure Checklist

- [ ] Dockerfile: verify non-root user, minimal image, correct NEXT_TELEMETRY_DISABLED
- [ ] docker-compose.prod.yml: verify mongo-express is NOT included in prod
- [ ] Nginx config: SSL termination, proxy_pass to Next.js on port 3000
- [ ] GitHub Actions: CI on push to main (lint → test → build)
- [ ] MongoDB backup: daily mongodump cron, off-site storage
- [ ] Sentry: add `@sentry/nextjs` before production launch
- [ ] Let's Encrypt: Certbot auto-renewal

## Production Server Stack

```
Internet → Nginx (443 HTTPS) → Next.js (3000) → MongoDB (27017)
```

## Learnings

