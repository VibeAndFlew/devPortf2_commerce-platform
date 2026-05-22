# Getting Started

> Local development setup for the MERIDIAN platform.

---

## Prerequisites

- **Node.js** 20.x LTS or later
- **npm** 10.x or later
- **Git** 2.x or later
- Code editor (VS Code recommended)

---

## Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd meridian-commerce

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:4002](http://localhost:4002) in your browser.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev -p 4002` | Start development server |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | Run ESLint |
| `typecheck` | `tsc --noEmit` | TypeScript type check |
| `format` | `prettier --write .` | Format code with Prettier |
| `clean` | `rimraf .next node_modules` | Clean build artifacts |

---

## Project Structure

```
meridian-commerce/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── (dashboard)/ # Dashboard layout
│   │   ├── catalogs/    # Catalog module
│   │   ├── vendors/     # Vendor module
│   │   ├── inventory/   # Inventory module
│   │   ├── orders/      # Orders module
│   │   ├── procurement/ # Procurement module
│   │   ├── warehouses/  # Warehouse module
│   │   ├── billing/     # Billing module
│   │   ├── profile/     # User profile
│   │   └── settings/    # App settings
│   ├── components/
│   │   ├── ui/          # shadcn/ui primitives
│   │   └── layout/      # App shell components
│   ├── lib/             # Utilities and helpers
│   └── providers/       # React context providers
├── docs/                # Documentation
├── next.config.ts       # Next.js configuration
├── vercel.json          # Vercel deployment config
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

---

## Development Workflow

1. **Create a feature branch** from `main`
2. **Implement changes** following code conventions
3. **Run typecheck** to verify types: `npm run typecheck`
4. **Run lint** to verify code style: `npm run lint`
5. **Build** to verify compilation: `npm run build`
6. **Commit** using conventional commits
7. **Push** and open a pull request

---

## Editor Setup

### VS Code

Recommended extensions:

- **Tailwind CSS IntelliSense** — Tailwind class autocomplete
- **ESLint** — Inline linting
- **Prettier** — Code formatting
- **TypeScript + JavaScript** — Built-in TS support

### tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "module": "ESNext",
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Environment Variables

See [Environment Setup](../deployment/environment.md) for a full list of environment variables and their descriptions.

Key variables for development:

```
NEXT_PUBLIC_APP_URL=http://localhost:4002
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```
