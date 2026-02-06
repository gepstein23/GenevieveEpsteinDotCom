# CLAUDE.md

## Project Overview

Personal portfolio website for Genevieve Epstein — a React + TypeScript single-page application with scroll-based navigation, animated effects, and glassmorphism design.

**Live site:** genevieveepstein.com

## Tech Stack

- **Framework:** React 19 with TypeScript ~5.9
- **Build:** Vite 7 with SWC (`@vitejs/plugin-react-swc`)
- **Styling:** SASS/SCSS modules (CSS Modules with `camelCaseOnly` convention)
- **Animation:** Motion (Framer Motion), tsParticles, vanilla-tilt
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint 9 with TypeScript ESLint

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Type-check (`tsc -b`) then Vite production build
- `npm run lint` — Run ESLint
- `npm run test` — Run Vitest in watch mode
- `npm run test:run` — Run Vitest once (CI-friendly)
- `npm run test:coverage` — Run tests with coverage

## Project Structure

```
src/
  components/    # Reusable UI components (Navigation, ProjectCard, GlowCard, etc.)
  sections/      # Full-page sections (Hero, About, Projects, Resume, Contact)
  data/          # Content and configuration (content.ts is the single source of truth)
  config/        # Feature flags (featureFlags.ts)
  context/       # React context providers (CursorContext)
  hooks/         # Custom hooks (useMousePosition, usePrefersReducedMotion, useMediaQuery)
  styles/        # Global SCSS: variables, mixins, reset, typography, animations
  types/         # Shared TypeScript types
  assets/        # Images (headshots, photos)
  test/          # Test setup and utilities
```

## Key Conventions

- **Path alias:** `@` maps to `src/` (e.g., `import Foo from '@/components/Foo/Foo'`)
- **Content:** All user-facing strings live in `src/data/content.ts` — edit there, not in components
- **Feature flags:** Toggle features via `src/config/featureFlags.ts`
- **Styling:** Each component has its own `.module.scss` file; use design tokens from `_variables.scss`
- **Design tokens:** Colors use CSS custom properties (`--color-accent-pink`, `--color-accent-cyan`, `--color-accent-purple`, `--color-bg`, etc.)
- **Responsive:** Mobile-first with breakpoint mixins (`sm`, `md`, `lg`, `xl`) from `_mixins.scss`
- **Components:** One component per folder, co-located with its SCSS module and test file
- **Types:** Shared types in `src/types/index.ts`; component-specific props defined inline

## Design System

- **Colors:** Dark theme — background `#0a0a0f`, pink `#ff006e`, cyan `#00f5d4`, purple `#7b2ff7`
- **Fonts:** Space Grotesk (headings), Inter (body), JetBrains Mono (code/mono)
- **Effects:** Glassmorphism, mouse-following glow, 3D tilt on cards, scroll-triggered reveals
- **Transitions:** Fast 150ms, Base 300ms, Slow 500ms
