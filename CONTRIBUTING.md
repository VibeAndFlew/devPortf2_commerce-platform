# MERIDIAN — Contributing

> Contribution guidelines for the MERIDIAN Procurement Ecosystem platform.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

We expect all contributors to be respectful, constructive, and collaborative. Harassment, personal attacks, or disruptive behavior will not be tolerated.

---

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/meridian-commerce.git
   cd meridian-commerce
   ```
3. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
4. Create a branch:
   ```bash
   git checkout -b feat/my-feature
   ```
5. Start developing:
   ```bash
   npm run dev
   ```

---

## Development Workflow

1. **Pull latest** from `main` before starting work
2. **Create a feature branch** from `main`
3. **Make changes** following code style
4. **Run typecheck**: `npm run typecheck`
5. **Run lint**: `npm run lint`
6. **Build** to verify compilation: `npm run build`
7. **Commit** using conventional commits
8. **Push** and open a PR against `main`

---

## Commit Convention

We use **Conventional Commits** for all commit messages:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Usage |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only |
| `style` | Formatting, missing semicolons, etc. |
| `refactor` | Code change that neither fixes nor adds |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build, CI, dependencies |
| `ci` | CI configuration changes |

### Scopes

| Scope | Module |
|---|---|
| `dashboard` | Dashboard page |
| `catalog` | Catalog management |
| `vendor` | Vendor relations |
| `inventory` | Inventory tracking |
| `order` | Order processing |
| `procurement` | Procurement workflow |
| `warehouse` | Warehouse logistics |
| `billing` | Billing automation |
| `ui` | Shared components |
| `deps` | Dependencies |
| `config` | Build/tooling configuration |

### Examples

```
feat(catalog): add bulk SKU import
fix(inventory): correct low-stock threshold calculation
docs(api): document webhook payload schema
refactor(ui): consolidate button variants
chore(deps): upgrade framer-motion to v12
```

---

## Pull Request Process

1. **Title**: Use conventional commit format (e.g., `feat(catalog): add bulk SKU import`)
2. **Description**: Include:
   - What changed and why
   - Screenshots for UI changes
   - Related issue numbers
3. **Checklist**:
   - [ ] Code compiles (`npm run build`)
   - [ ] TypeScript passes (`npm run typecheck`)
   - [ ] Lint passes (`npm run lint`)
   - [ ] No new warnings
   - [ ] Documentation updated if needed
4. **Review**: At least one approval required before merge
5. **Merge**: Squash merge into `main`

---

## Code Style

### TypeScript

- **Strict mode** enabled — no `any` unless absolutely necessary and annotated with `// eslint-disable-next-line`
- **Naming**: `camelCase` for variables/functions, `PascalCase` for components/types, `UPPER_CASE` for constants
- **Exports**: Prefer named exports over default exports

### React / Next.js

- **Server Components** by default — add `"use client"` only when needed
- **Props** typed with TypeScript interfaces (prefixed with `I` is optional, but consistent naming)
- **Event handlers** prefixed with `handle` (e.g., `handleSubmit`)
- **State setters** follow `set<Name>` convention

### CSS / Tailwind

- Use Tailwind utility classes directly
- Extract repeated patterns into component variants via `cva()`
- Avoid custom CSS unless absolutely necessary
- Follow the spacing scale defined in DESIGN_SYSTEM.md

### File Organization

```
- One component per file
- colocated tests next to components: `Component.test.tsx`
- Page files in `app/<route>/page.tsx`
- Shared components in `components/ui/`
- Layout components in `components/layout/`
```

---

## Testing

- **Unit tests**: Vitest with React Testing Library
- **Run tests**: `npm run test`
- **Coverage**: Aim for >80% on new code
- **What to test**:
  - Client component interactions
  - Utility functions
  - Form validation schemas
  - API route handlers (future)

---

## Documentation

- Update `README.md` for user-facing changes
- Update `ARCHITECTURE.md` for structural changes
- Add JSDoc comments for public APIs and utility functions
- Document environment variables in `.env.example`
- Keep `CHANGELOG.md` up to date

---

## Questions?

Open a [GitHub Discussion](https://github.com/your-org/meridian-commerce/discussions) or ask in issues.
