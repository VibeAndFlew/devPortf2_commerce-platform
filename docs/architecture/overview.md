# Architecture Overview

> System architecture, component hierarchy, and data flow for the MERIDIAN Procurement Ecosystem.

---

## System Design

MERIDIAN is built on Next.js 16 App Router, leveraging React Server Components for optimal performance and Client Components for interactive features.

### Rendering Strategy

| Strategy | Application | Modules |
|---|---|---|
| **Static (SSG)** | Pre-rendered at build time | Public catalog pages, documentation |
| **Dynamic (SSR)** | Rendered per request | Authenticated pages, dashboards, data tables |
| **Client-side** | Rendered in browser after load | Interactive forms, real-time updates, animations |

### Server Components

Server Components are the default in Next.js 16 App Router. They:

- Fetch data directly from databases or APIs without exposing credentials to the client
- Reduce client-side JavaScript bundle size
- Enable automatic code splitting per route
- Stream HTML progressively to the browser

### Client Components

Client Components are isolated with `"use client"` directive for:

- Interactive UI (modals, dropdowns, toasts)
- Framer Motion animations
- TanStack Table interactivity (sorting, filtering, pagination)
- Form validation feedback

---

## Route Architecture

```
src/app/
├── layout.tsx            # Root layout (html, body, providers)
├── page.tsx              # Dashboard (home)
├── catalogs/             # Catalog management
│   ├── page.tsx          #   List view
│   ├── [id]/page.tsx     #   Detail view
│   └── new/page.tsx      #   Create form
├── vendors/              # Vendor relations
│   ├── page.tsx
│   └── [id]/page.tsx
├── inventory/            # Inventory tracking
│   ├── page.tsx
│   └── [sku]/page.tsx
├── orders/               # Order processing
│   ├── page.tsx
│   └── [id]/page.tsx
├── procurement/          # Procurement workflow
│   ├── page.tsx
│   └── [id]/page.tsx
├── warehouses/           # Warehouse logistics
│   ├── page.tsx
│   └── [id]/page.tsx
├── billing/              # Billing automation
│   ├── page.tsx
│   ├── invoices/page.tsx
│   └── payments/page.tsx
├── profile/              # User profile
│   └── page.tsx
└── settings/             # App settings
    └── page.tsx
```

---

## Component Architecture

### Layout Components

```
AppShell
├── Sidebar          # Navigation sidebar (client)
├── TopNav           # Top navigation bar (client)
└── MainContent      # Page content wrapper
```

### Page Components

Each route follows a consistent pattern:

```
PageLayout
├── PageHeader       # Title, actions, breadcrumbs
├── KPIGrid          # Metric cards (optional)
├── DataTable        # TanStack Table (client)
├── DetailPanel      # Tabs: Overview | Activity | Related
└── ActionModals     # Create, edit, delete dialogs
```

---

## Data Flow

### Server → Client

```
Database / API
    ↓
Server Component (fetch)
    ↓
RSC Payload (serialized)
    ↓
Client receives HTML + RSC stream
    ↓
Browser renders
```

### Client → Server

```
User Interaction
    ↓
Client Component (event handler)
    ↓
Server Action / API Route (POST, PUT, DELETE)
    ↓
Database mutation
    ↓
Response → Client state update
```

---

## State Management

| Concern | Approach |
|---|---|
| Server data | React Server Components with fetch |
| Form state | Local `useState` with Zod validation |
| UI state | React Context (theme, sidebar) |
| Cache | Next.js data cache + optional Redis |
| Optimistic updates | Client-side state before server confirmation |

---

## Error Handling

- **error.tsx** — Per-route error boundaries with retry and fallback UI
- **loading.tsx** — Skeleton loading states during page transitions
- **not-found.tsx** — Custom 404 pages per route segment
- **Global error** — Root error boundary for uncaught exceptions

---

## Performance

- **Route segment config** — per-page caching and rendering directives
- **Image optimization** — Next.js Image component with AVIF/WebP
- **Dynamic imports** — Heavy components loaded on interaction
- **Streaming** — Suspense boundaries with loading fallbacks
