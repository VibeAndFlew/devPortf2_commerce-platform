# Docker Deployment

> Containerizing the MERIDIAN platform with Docker.

---

## Prerequisites

- Docker installed (24+)
- Docker Compose (optional, for multi-service setups)

## Dockerfile

The project includes a production Dockerfile:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 4002
ENV PORT=4002
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

## Build and Run

```bash
# Build the image
docker build -t meridian-commerce .

# Run the container
docker run -p 4002:4002 \
  -e NEXT_PUBLIC_APP_URL=http://localhost:4002 \
  -e NEXT_PUBLIC_API_URL=http://api:8000 \
  -e AUTH_SECRET=your-secret \
  meridian-commerce
```

## Docker Compose

For local development with dependencies:

```yaml
# docker-compose.yml
version: "3.8"
services:
  web:
    build: .
    ports:
      - "4002:4002"
    environment:
      - NEXT_PUBLIC_APP_URL=http://localhost:4002
      - NEXT_PUBLIC_API_URL=http://api:8000
      - AUTH_SECRET=${AUTH_SECRET}
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/meridian
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: meridian
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

Run with:

```bash
docker compose up
```

## Production Considerations

- Use a reverse proxy (nginx, Traefik) in front of the Docker container
- Set memory limits: `--memory="512m" --cpus="1.0"`
- Configure health checks
- Use Docker secrets for sensitive environment variables
- Enable Docker buildKit for faster builds: `DOCKER_BUILDKIT=1 docker build .`
