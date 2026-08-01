# AsciiReveal

```text
   ASCII / REVEAL
   B%#L&ING → BUILDING
```

[![CI](https://github.com/YOUR_GITHUB_ORG/ascii-reveal/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_GITHUB_ORG/ascii-reveal/actions/workflows/ci.yml) [![MIT License](https://img.shields.io/badge/license-MIT-a6ff75.svg)](LICENSE) [![changesets](https://img.shields.io/badge/managed%20with-Changesets-176de3.svg)](https://github.com/changesets/changesets)

AsciiReveal is a small, accessible, framework-independent library that temporarily scrambles text with ASCII characters and progressively reveals the final string.

> Animated demo placeholder: the documentation homepage contains the live, reduced-motion-aware demo once the site is running.

## Install

```sh
pnpm add @ascii-reveal/core
# or: pnpm add @ascii-reveal/react @ascii-reveal/core
# or: pnpm add @ascii-reveal/vue @ascii-reveal/core
```

## Use

```ts
import { createAsciiReveal } from "@ascii-reveal/core";

const reveal = createAsciiReveal(document.querySelector("h1")!, {
  text: "SYSTEM ONLINE",
  trigger: "manual",
  characters: "binary",
  duration: 900,
});

button.addEventListener("click", () => reveal.play());
```

```tsx
import { AsciiReveal } from "@ascii-reveal/react";

<AsciiReveal text="BUILD SOMETHING MEMORABLE" />;
```

```vue
<script setup lang="ts">
import { AsciiReveal } from "@ascii-reveal/vue";
</script>

<template><AsciiReveal text="EXPLORE THE ARCHIVE" /></template>
```

## API at a glance

Core exports `createAsciiReveal(element, options)` and the DOM-free `generateAsciiFrame(options)`. React and Vue export an `AsciiReveal` component and a `useAsciiReveal` hook/composable. All adapters share mount, hover, focus, in-view, and manual triggers; left, right, center, and seeded-random directions; the `ascii`, `binary`, and `symbols` presets; and custom character sets.

The controller exposes `play`, `reset`, `finish`, `update`, `destroy`, and readonly `isPlaying`. See the [full API](apps/docs/docs/api.md).

## Accessibility and size

Animated frames are hidden from assistive technology while stable final text remains readable. Hover demos work with keyboard focus, and reduced-motion preferences are respected by default. See the [accessibility guide](apps/docs/docs/guide/accessibility.md).

CI enforces gzip budgets of **2.5 kB** for core and **1.5 kB** for each adapter, excluding its framework and core. Published packages have no third-party animation or utility runtime dependencies.

AsciiReveal targets modern browsers with `requestAnimationFrame`; in-view animations use `IntersectionObserver` with a no-polyfill fallback. `Intl.Segmenter` is preferred for grapheme-safe Unicode and emoji handling, with `Array.from` as the fallback. Imports are SSR-safe.

## Develop

```sh
pnpm install
pnpm dev
pnpm test:unit
pnpm test:e2e
pnpm build
pnpm size
```

Read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a change and [SECURITY.md](SECURITY.md) before reporting a vulnerability. Repository and npm URL placeholders are centralized in [`repo.config.ts`](repo.config.ts); replace them before publishing.

AsciiReveal is independent and is not affiliated with any other animation library. Licensed under the [MIT License](LICENSE).
