# Agent guidance

AsciiReveal is a narrow micro-library for progressively revealing one final text string through temporary ASCII characters. Version 1 excludes AI, image-to-ASCII conversion, canvas/WebGL, timelines, and broader animation features.

## Architecture and boundaries

- `packages/core` owns frame generation, timing, triggers, and DOM accessibility behavior.
- `packages/react` and `packages/vue` are thin SSR-safe lifecycle adapters. Never duplicate core animation logic there.
- `apps/playground` is the Vite development harness; `apps/docs` is the VitePress site.
- Public packages must add no third-party runtime dependencies. Do not commit generated build output, secrets, or local agent configuration.

## Required standards

- Keep strict TypeScript, Unicode correctness, deterministic seeded output, predictable cleanup, and exact final text.
- Animated visual text stays hidden from assistive technology; stable final text remains available. Preserve keyboard triggers and reduced-motion behavior.
- Budgets are 2.5 kB gzip for core and 1.5 kB for each adapter excluding its framework and core. Never raise limits without explicit maintainer approval.
- Public API changes require focused tests, updated docs, and a Changeset. Prefer small, focused pull requests.

## Commands

Use `pnpm dev`, `pnpm build`, `pnpm test:unit`, `pnpm test:e2e`, `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm size`, `pnpm docs:build`, and `pnpm check:exports` before handoff.
