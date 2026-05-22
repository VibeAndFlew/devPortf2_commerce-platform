# MERIDIAN — Architecture

> Architecture overview for the MERIDIAN Procurement Ecosystem platform.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Route Design](#route-design)
- [Component Hierarchy](#component-hierarchy)
- [Data Flow](#data-flow)
- [Module Design](#module-design)

---

## Architecture Overview

MERIDIAN follows a **layered architecture** built on Next.js 16 App Router. Server Components handle data fetching and static rendering, while Client Components are isolated to interactive UI elements.

### High-Level Diagram

```mermaid
graph TB
    subgraph Client
        A[Browser] --> B[Next.js Client Bundle]
        B --> C[Client Components]
        C --> D[React Context / State]
    end

    subgraph Server
        E[Next.js Server] --> F[App Router]
        F --> G[Server Components]
        F --> H[API Routes]
        G --> I[RSC Payload]
        H --> J[JSON Response]
    end

    subgraph Data
        K[(PostgreSQL)]
        L[(Redis Cache)]
        M[REST / GraphQL API]
    end

    G --> M
    H --> M
    C --> H
    M --> K
    M --> L
    I --> B
    J --> C
```

### Rendering Strategy

| Strategy | Use Case | Modules |
|---|---|---|
| **Static (SSG)** | Public catalog pages, marketing | Catalog (read-only), docs |
| **Dynamic (SSR)** | Authenticated pages, dashboards | Dashboard, Orders, Procurement |
| **Client-side** | Real-time interactions, mutations | Inventory updates, forms |

---

## Route Design

The application exposes the following route groups under `src/app/`:

```mermaid
graph LR
    A["/ (Dashboard)"] --> B["/catalogs"]
    A --> C["/vendors"]
    A --> D["/inventory"]
    A --> E["/orders"]
    A --> F["/procurement"]
    A --> G["/warehouses"]
    A --> H["/billing"]
    A --> I["/profile"]
    A --> J["/settings"]

    B --> B1["/catalogs/[id]"]
    B --> B2["/catalogs/new"]
    C --> C1["/vendors/[id]"]
    D --> D1["/inventory/[sku]"]
    E --> E1["/orders/[id]"]
    F --> F1["/procurement/[id]"]
    G --> G1["/warehouses/[id]"]
    H --> H1["/billing/invoices"]
    H --> H2["/billing/payments"]
```

### Route Group Convention

```
src/app/
├── (dashboard)/         # Dashboard layout with shell
│   └── page.tsx
├── catalogs/            # Catalog management
│   ├── page.tsx
│   ├── [id]/page.tsx
│   └── new/page.tsx
├── vendors/             # Vendor relations
│   ├── page.tsx
│   └── [id]/page.tsx
├── inventory/           # Inventory tracking
│   ├── page.tsx
│   └── [sku]/page.tsx
├── orders/              # Order processing
│   ├── page.tsx
│   └── [id]/page.tsx
├── procurement/         # Procurement workflow
│   ├── page.tsx
│   └── [id]/page.tsx
├── warehouses/          # Warehouse logistics
│   ├── page.tsx
│   └── [id]/page.tsx
├── billing/             # Billing automation
│   ├── page.tsx
│   ├── invoices/page.tsx
│   └── payments/page.tsx
├── profile/             # User profile
│   └── page.tsx
└── settings/            # App settings
    └── page.tsx
```

---

## Component Hierarchy

```mermaid
graph TD
    RootLayout --> AppShell
    AppShell --> Sidebar
    AppShell --> TopNav
    AppShell --> MainContent

    MainContent --> PageContainer
    PageContainer --> PageHeader
    PageContainer --> DataTable
    PageContainer --> KPIGrid
    PageContainer --> DetailPanel

    DataTable --> TableToolbar
    DataTable --> TanStackTable
    DataTable --> TablePagination

    KPIGrid --> KPICard
    KPICard --> StatIcon
    KPICard --> StatValue
    KPICard --> StatTrend

    DetailPanel --> TabsContainer
    TabsContainer --> OverviewTab
    TabsContainer --> ActivityTab
    TabsContainer --> RelatedTab
```

### Component Layers

| Layer | Description | Server/Client |
|---|---|---|
| **Layout** | RootLayout, AppShell, Sidebar, TopNav | Mixed |
| **Pages** | Route entry points, data fetching | Server by default |
| **Composed** | Page-specific sections (KPIGrid, DataTable) | Client |
| **Primitives** | shadcn/ui (Button, Dialog, Table, etc.) | Client |

---

## Data Flow

### Server Component Data Flow

```mermaid
sequenceDiagram
    participant B as Browser
    participant N as Next.js Server
    participant SC as Server Component
    participant DB as Database/API

    B->>N: Navigate to /catalogs
    N->>SC: Render Server Component
    SC->>DB: Fetch catalogs data
    DB-->>SC: JSON response
    SC->>N: Serialize RSC payload
    N-->>B: Stream HTML + RSC
```

### Client Component Data Flow

```mermaid
sequenceDiagram
    participant B as Browser
    participant CC as Client Component
    participant API as API Route
    participant DB as Database

    B->>CC: User clicks "Create Order"
    CC->>API: POST /api/orders
    API->>DB: Insert order
    DB-->>API: Order record
    API-->>CC: JSON response
    CC->>B: Update UI (optimistic)
```

---

## Module Design

### Dashboard Module

- **Purpose**: Central KPI monitoring and quick actions
- **Data sources**: Aggregated counts from all modules
- **Key components**: KPIGrid, RecentOrders, VendorChart, InventoryAlerts
- **Rendering**: SSR with client-side refresh interval

### Catalog Module

- **Purpose**: Product and SKU management
- **Data sources**: Products table, categories, suppliers
- **Key components**: CatalogTable, ProductForm, VariantEditor, PricingPanel
- **Rendering**: SSR for list, SSR for detail, client for mutations

### Inventory Module

- **Purpose**: Real-time stock tracking and alerts
- **Data sources**: Inventory ledger, warehouse allocations
- **Key components**: InventoryTable, StockAlertBadge, TransferForm
- **Rendering**: SSR with WebSocket updates (future)

### Order Module

- **Purpose**: Order lifecycle management
- **Data sources**: Orders, line items, shipments
- **Key components**: OrderTable, OrderDetail, FulfillmentPanel
- **Rendering**: SSR with optimistic client updates

---

## Error Boundaries

Each route segment wraps its page content in an error boundary:

```
app/
├── error.tsx           # Root error boundary
├── catalogs/
│   ├── error.tsx       # Catalog-specific error
│   └── loading.tsx     # Catalog skeleton
```

---

## State Management

| Concern | Solution | Scope |
|---|---|---|
| Server state | Server Components + RSC Payload | Page-level |
| Client state | React `useState` / `useReducer` | Component-level |
| UI state | React Context | Theme, sidebar |
| Form state | Zod + local state | Form-level |
| Cache | Next.js `fetch` cache + Redis | Data layer |

---

## Performance Considerations

- **Route Segment Config**: `export const dynamic = 'force-dynamic'` on interactive pages
- **Streaming**: Use `loading.tsx` for Suspense boundaries per route
- **Image Optimization**: Next.js `<Image>` with remote patterns configured
- **Bundle Splitting**: Dynamic imports for heavy components (data tables, charts)
