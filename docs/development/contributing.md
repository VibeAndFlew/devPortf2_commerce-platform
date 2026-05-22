# Contributing (Development)

> Development contribution guidelines for the MERIDIAN platform.

---

## Code of Conduct

All contributors must be respectful, constructive, and collaborative. See [CONTRIBUTING.md](../../CONTRIBUTING.md) for the full code of conduct.

---

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies
4. Create a feature branch

```bash
git checkout -b feat/my-feature
```

---

## Commit Convention

We use **Conventional Commits**:

```
<type>(<scope>): <description>
```

### Types

| Type | Use Case |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting |
| `refactor` | Code restructuring |
| `perf` | Performance improvement |
| `test` | Tests |
| `chore` | Dependencies, build |

### Scopes

| Scope | Module |
|---|---|
| `dashboard` | Dashboard |
| `catalog` | Catalogs |
| `vendor` | Vendors |
| `inventory` | Inventory |
| `order` | Orders |
| `procurement` | Procurement |
| `warehouse` | Warehouses |
| `billing` | Billing |
| `ui` | Shared UI |
| `deps` | Dependencies |
| `config` | Configuration |

---

## Code Style

### Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Components | PascalCase | `ProductTable` |
| Functions | camelCase | `formatCurrency` |
| Variables | camelCase | `totalAmount` |
| Constants | UPPER_CASE | `MAX_ITEMS` |
| Types | PascalCase | `OrderStatus` |
| Files | kebab-case | `product-table.tsx` |

### TypeScript

- Strict mode enabled
- No `any` — use proper types or `unknown`
- Prefer interfaces over type aliases for objects
- Use Zod for runtime validation

### React / Next.js

- Server Components by default
- `"use client"` only for interactive components
- Props typed with TypeScript interfaces
- Event handlers: `handle<Event>`

---

## PR Process

1. **Title**: Use conventional commit format
2. **Description**: What changed and why
3. **Screenshots**: For UI changes
4. **Checklist**:
   - [ ] Build passes (`npm run build`)
   - [ ] Types pass (`npm run typecheck`)
   - [ ] Lint passes (`npm run lint`)
5. **Review**: At least one approval required
6. **Merge**: Squash merge into `main`

---

## Documentation

- Update README for user-facing changes
- Update ARCHITECTURE for structural changes
- Update CHANGELOG with all notable changes
- Add JSDoc for public APIs

---

## Questions?

Open a [GitHub Discussion](https://github.com/your-org/meridian-commerce/discussions).
