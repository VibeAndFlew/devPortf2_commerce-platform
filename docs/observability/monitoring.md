# Monitoring

> System monitoring and error tracking for the MERIDIAN platform.

---

## Error Tracking (Sentry)

Sentry is configured for both client and server error tracking.

### Setup

1. Create a Sentry project
2. Add the DSN to environment variables:
   ```
   NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```
3. Install the Sentry Next.js SDK:
   ```
   npm install @sentry/nextjs
   ```

### Captured Events

- **Server errors** — API route errors, Server Component errors, unhandled rejections
- **Client errors** — React render errors, unhandled promise rejections
- **Performance traces** — Page load, route transitions, API calls
- **Replay** — Session replays for error reproduction (optional)

---

## Performance Monitoring

### Core Web Vitals

Track with `next/web-vitals`:

| Metric | Target | Description |
|---|---|---|
| LCP | < 1.5s | Largest Contentful Paint |
| FID | < 50ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |
| INP | < 200ms | Interaction to Next Paint |

### Custom Metrics

- API response times (p50, p95, p99)
- Server Component render durations
- Client-side hydration times
- Database query performance

---

## Logging

### Structured Logging

Server-side logs should follow a structured format:

```json
{
  "timestamp": "2026-05-22T14:23:01.000Z",
  "level": "info",
  "event": "order.fulfilled",
  "orderId": "ORD-0042",
  "duration": 234,
  "userId": "usr_abc123"
}
```

### Log Levels

| Level | Usage |
|---|---|
| `error` | Unhandled exceptions, system failures |
| `warn` | Degraded performance, recoverable issues |
| `info` | Significant business events (order placed, user created) |
| `debug` | Development-only diagnostic information |

---

## Alerting

### Alert Thresholds

| Metric | Warning | Critical |
|---|---|---|
| Error rate | > 1% | > 5% |
| P95 response time | > 500ms | > 2s |
| Uptime | < 99.9% | < 99.5% |
| Low stock items | > 10 | > 25 |

### Notification Channels

- Email to engineering team
- Slack webhook for critical alerts
- PagerDuty integration for Sev-1 incidents

---

## Health Checks

Expose a `/api/health` endpoint that returns:

```json
{
  "status": "healthy",
  "uptime": 123456,
  "version": "1.0.0",
  "checks": {
    "database": "connected",
    "redis": "connected"
  }
}
```
