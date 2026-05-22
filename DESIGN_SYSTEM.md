# MERIDIAN — Design System

> Design philosophy, color palette, typography, and component patterns for the MERIDIAN Procurement Ecosystem.

---

## Philosophy

MERIDIAN follows a **clean enterprise commerce** aesthetic — functional, uncluttered, and accessible. The interface prioritizes data density without sacrificing readability, using generous whitespace and a restrained color palette.

**Core principles:**
- **Clarity over decoration** — every visual element serves a purpose
- **Data-first** — tables, metrics, and lists are the primary interface
- **Consistent rhythm** — spacing, typography, and color follow strict tokens
- **Accessible by default** — AA contrast ratios, focus indicators, semantic HTML

---

## Color Palette

### Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-brand-50` | `#eef2ff` | Background tint |
| `--color-brand-100` | `#e0e7ff` | Hover state background |
| `--color-brand-500` | `#6366f1` | Primary accent, buttons, links |
| `--color-brand-600` | `#4f46e5` | Active state, hover |
| `--color-brand-700` | `#4338ca` | Pressed state |

### Neutral Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-neutral-50` | `#f8fafc` | Page background |
| `--color-neutral-100` | `#f1f5f9` | Card background, sidebar |
| `--color-neutral-200` | `#e2e8f0` | Borders, dividers |
| `--color-neutral-300` | `#cbd5e1` | Disabled, placeholder |
| `--color-neutral-500` | `#64748b` | Secondary text |
| `--color-neutral-700` | `#334155` | Body text |
| `--color-neutral-900` | `#0f172a` | Headings, primary text |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#22c55e` | Stock OK, fulfilled |
| `--color-warning` | `#f59e0b` | Low stock, pending |
| `--color-danger` | `#ef4444` | Out of stock, overdue |
| `--color-info` | `#3b82f6` | Informational badges |

### Surface Colors (Dark Mode — Future)

| Token | Hex |
|---|---|
| `--surface-primary` | `#0f172a` |
| `--surface-secondary` | `#1e293b` |
| `--surface-tertiary` | `#334155` |

---

## Typography

### Font Family

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `xs` | 0.75rem (12px) | 400 | 1.5 | Caption, meta |
| `sm` | 0.875rem (14px) | 400 | 1.5 | Table cells, body |
| `base` | 1rem (16px) | 400 | 1.5 | Body text |
| `lg` | 1.125rem (18px) | 500 | 1.4 | Card titles |
| `xl` | 1.25rem (20px) | 600 | 1.3 | Section headers |
| `2xl` | 1.5rem (24px) | 700 | 1.2 | Page titles |
| `3xl` | 1.875rem (30px) | 700 | 1.2 | Dashboard hero |

---

## Spacing

Uses Tailwind's default spacing scale (4px base unit):

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Tight icon padding |
| `space-2` | 8px | Button padding, table cell gap |
| `space-3` | 12px | Card padding (compact) |
| `space-4` | 16px | Section padding, modal padding |
| `space-6` | 24px | Card padding (default) |
| `space-8` | 32px | Page section gap |
| `space-12` | 48px | Page padding |

---

## Component Patterns

### Cards

```tsx
// Standard card surface
<div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
```

### Tables

- **Header**: Sticky, `bg-neutral-50`, `text-sm font-medium text-neutral-500`
- **Rows**: Alternating `bg-white` / `bg-neutral-50` on hover
- **Cells**: `py-3 px-4 text-sm text-neutral-700`

### Buttons

| Variant | Classes |
|---|---|
| Primary | `bg-indigo-500 text-white hover:bg-indigo-600` |
| Secondary | `bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50` |
| Ghost | `text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100` |
| Danger | `bg-red-500 text-white hover:bg-red-600` |

### Badges

```tsx
// Status badges
<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
  {/* bg-green-100 text-green-800 | bg-yellow-100 text-yellow-800 | bg-red-100 text-red-800 */}
</span>
```

### Forms

- **Label**: `text-sm font-medium text-neutral-700`
- **Input**: `rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm`
- **Error**: `text-xs text-red-500 mt-1`
- **Hint**: `text-xs text-neutral-500 mt-1`

### Loading States

- **Skeleton**: `animate-pulse rounded bg-neutral-200`
- **Spinner**: `animate-spin text-indigo-500` (Lucide `Loader2`)

---

## Animation Guidelines

- **Page transitions**: Framer Motion `fadeIn` (300ms, ease-out)
- **Hover effects**: `transition-colors duration-150`
- **Modals**: Fade + scale (200ms)
- **Dropdowns**: Fade + slide (150ms)
- **Data refresh**: Gentle pulse on updated values

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|---|---|---|
| `sm` | 640px | Stack KPIs vertically |
| `md` | 768px | Show sidebar |
| `lg` | 1024px | Full data table columns |
| `xl` | 1280px | Multi-panel layouts |

---

## Accessibility

- All interactive elements reachable via keyboard
- Focus indicators: `focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`
- ARIA labels on icon-only buttons
- Color not used as sole indicator (accompany with text/icon)
- `prefers-reduced-motion` respected for animations
