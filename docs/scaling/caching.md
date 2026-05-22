# Caching

> Caching architecture and configuration for the MERIDIAN platform.

---

## Caching Layers

### 1. Next.js Data Cache

Automatic caching layer for `fetch` requests in Server Components:

```ts
// Cache with revalidation
fetch(url, { next: { revalidate: 60 } });

// No cache (dynamic data)
fetch(url, { cache: 'no-store' });

// Force cache (static data)
fetch(url, { cache: 'force-cache' });
```

### 2. Full Route Cache

Next.js automatically caches rendered routes at build time (static) or at request time (dynamic). Controlled via:

```ts
export const dynamic = 'force-static';
export const revalidate = 60; // ISR
```

### 3. CDN Cache

Static assets (images, fonts, compiled JS/CSS) are cached at the CDN edge:

| Asset Type | Cache Header |
|---|---|
| Images | `public, max-age=31536000, immutable` |
| Fonts | `public, max-age=31536000, immutable` |
| JS/CSS | `public, max-age=31536000, immutable` |
| HTML pages | `public, max-age=0, must-revalidate` |

### 4. Redis Cache (Optional)

For session storage and rate limiting:

```ts
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Cache API responses
await redis.setex(`catalog:${id}`, 300, JSON.stringify(data));
```

---

## Cache Invalidation Strategy

| Trigger | Cache Invalidated | Method |
|---|---|---|
| Build | Full route cache | Next.js build |
| ISR revalidation | Specific path | `revalidate` config |
| Manual | Any cached data | `revalidatePath()` / `revalidateTag()` |
| Mutation | Related data | Server Action post-mutation cleanup |

---

## Cache Configuration

### next.config.ts

```ts
const nextConfig = {
  // ...other config
};
```

### Route Segment Config

Per-page cache behavior:

```ts
// pages/catalogs/page.tsx
export const revalidate = 60;
export const dynamic = 'force-static';
```

---

## Best Practices

- Use `revalidate` sparingly — prefer `no-store` for truly dynamic data
- Set appropriate `stale-while-revalidate` headers for API responses
- Cache static assets aggressively (immutable cache)
- Monitor cache hit rates in production
- Use Redis for distributed caching when scaling horizontally
