# Environment Setup

> Environment variables and configuration for the MERIDIAN platform.

---

## Environment Files

| File | Purpose | Tracked in Git |
|---|---|---|
| `.env.example` | Template with all variables | Yes |
| `.env.local` | Local development overrides | No |
| `.env.production` | Production variables | No |

## Variables Reference

### App Configuration

| Variable | Default | Required | Description |
|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | `http://localhost:4002` | Yes | Public-facing application URL |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api` | Yes | Backend API base URL |

### Authentication

| Variable | Default | Required | Description |
|---|---|---|---|
| `AUTH_SECRET` | — | Production | Encryption secret for session tokens (generate with `openssl rand -base64 32`) |
| `AUTH_URL` | `http://localhost:4002` | Yes | Auth callback URL |

### Database

| Variable | Default | Required | Description |
|---|---|---|---|
| `DATABASE_URL` | — | Production | PostgreSQL connection string |
| `REDIS_URL` | — | Optional | Redis connection string for caching and sessions |

### Features

| Variable | Default | Required | Description |
|---|---|---|---|
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `true` | No | Enable product analytics |
| `NEXT_PUBLIC_ENABLE_REALTIME` | `true` | No | Enable real-time features |

### Observability

| Variable | Default | Required | Description |
|---|---|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | — | Optional | PostHog project API key |
| `NEXT_PUBLIC_SENTRY_DSN` | — | Optional | Sentry DSN for error tracking |

## Setup Instructions

### Local Development

```bash
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
```

### Production

Set environment variables via your deployment platform:
- **Vercel**: Dashboard → Project → Settings → Environment Variables
- **Docker**: `-e` flags or Docker Compose environment section

## Security Notes

- Never commit `.env.local` or `.env.production` to version control
- Rotate `AUTH_SECRET` periodically
- Use secrets manager for production credentials (Vercel Environment Variables, AWS Secrets Manager)
- Restrict database access to trusted IPs in production
