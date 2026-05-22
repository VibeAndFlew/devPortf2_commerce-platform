# Performance

> Performance optimization strategies for the MERIDIAN platform.

---

## Rendering Optimizations

### Static Generation (SSG)

Use for content that doesn't change frequently:

- **Catalog pages** — Product listings can be pre-rendered
- **Documentation** — Static markdown content
- **Public pages** — Landing, about, contact

Configure per route:

```ts
// Force static generation
export const dynamic = 'force-static';
```

### Incremental Static Regeneration (ISR)

For pages that need periodic updates:

```ts
// Revalidate every 60 seconds
export const revalidate = 60;
```

### Dynamic Rendering

For personalized or real-time content:

```ts
// Force dynamic per-request rendering
export const dynamic = 'force-dynamic';
```

---

## Image Optimization

- Next.js `<Image>` component with automatic AVIF/WebP conversion
- Configured remote patterns in `next.config.ts`
- Device sizes: 640, 768, 1024, 1280, 1536
- Image sizes: 16, 32, 48, 64, 96, 128, 256, 384
- Immutable cache headers for static images (`max-age=31536000`)

---

## Bundle Optimization

### Package Imports

Optimize package imports in `next.config.ts`:

```ts
experimental: {
  optimizePackageImports: [
    'lucide-react',
    '@radix-ui/react-dialog',
    '@tanstack/react-table',
  ]
}
```

### Dynamic Imports

Load heavy components lazily:

```ts
const DataTable = dynamic(() => import('@/components/DataTable'), {
  loading: () => <TableSkeleton />,
});
```

---

## Code Splitting

Next.js 16 App Router automatically code-splits per route group:

- Each route directory gets its own JavaScript bundle
- Shared components are extracted into common chunks
- Server Components contribute zero JavaScript to the client bundle

---

## Data Fetching

### Server Components

```ts
// Automatic deduplication
async function getCatalogs() {
  const res = await fetch(`${API_URL}/catalogs`, {
    next: { revalidate: 60 },
  });
  return res.json();
}
```

### Client Components

Use `fetch` with appropriate caching or dedicated data fetching libraries.

---

## Performance Budget

| Metric | Target |
|---|---|
| LCP | < 1.5s |
| FID | < 50ms |
| CLS | < 0.1 |
| TTI | < 2.0s |
| TTFB | < 300ms |
| Bundle size (initial) | < 150KB JS |
