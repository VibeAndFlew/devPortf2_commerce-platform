# Vercel Deployment

> Deploying the MERIDIAN platform to Vercel.

---

## Prerequisites

- Vercel account (vercel.com)
- Git repository connected to Vercel
- Environment variables configured

## Quick Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel --prod
```

## vercel.json Configuration

The project includes a `vercel.json` at the root with security headers and framework settings:

```json
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

## Environment Variables

Configure in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Production URL | `https://meridian.vercel.app` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.meridian.com` |
| `AUTH_SECRET` | Auth encryption key | Generate with `openssl rand -base64 32` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `REDIS_URL` | Redis connection string | `redis://...` |

## Deployment Checklist

- [ ] Environment variables set in Vercel Dashboard
- [ ] Git repository connected
- [ ] Production branch set to `main`
- [ ] Preview deployments enabled for PRs
- [ ] Custom domain configured (if applicable)
- [ ] SSL/TLS automatic
- [ ] Monitoring integrated (Sentry, PostHog)

## Preview Deployments

Vercel automatically deploys preview environments for each pull request. Each preview gets a unique URL for testing.

## Custom Domains

1. Go to Vercel Dashboard → Project → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL provisioning (automatic)

## Troubleshooting

| Issue | Solution |
|---|---|
| Build timeout | Check for large dependencies, optimize imports |
| 404 on routes | Verify route group structure and file naming |
| Missing env vars | Check Vercel env variable configuration |
| Slow cold starts | Enable serverless function regions closest to users |
