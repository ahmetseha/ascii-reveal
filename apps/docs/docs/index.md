---
layout: doc
sidebar: false
aside: false
outline: false
---

# AsciiReveal

## One focused text-scramble animation

A small, accessible, framework-independent library that progressively reveals text through ASCII characters.

[Get started](/guide/getting-started) · [API reference](/api)

<ClientOnly>
  <AsciiDemo />
</ClientOnly>

## What it supports

- **Five triggers:** mount, hover, keyboard focus, viewport entry, or manual controls.
- **Three adapters:** use the DOM-first core directly or thin, SSR-safe adapters for React and Vue 3.
- **Accessibility built in:** assistive technology receives stable final text, and reduced-motion preferences are respected.

## Install

::: code-group

```sh [Core]
pnpm add @ascii-reveal/core
```

```sh [React]
pnpm add @ascii-reveal/react @ascii-reveal/core
```

```sh [Vue]
pnpm add @ascii-reveal/vue @ascii-reveal/core
```

:::

## Use it

::: code-group

```ts [Vanilla]
import { createAsciiReveal } from "@ascii-reveal/core";

createAsciiReveal(document.querySelector("h1")!, {
  text: "BUILD SOMETHING MEMORABLE",
});
```

```tsx [React]
import { AsciiReveal } from "@ascii-reveal/react";

<AsciiReveal text="BUILD SOMETHING MEMORABLE" />;
```

```vue [Vue]
<AsciiReveal text="BUILD SOMETHING MEMORABLE" />
```

:::

## Intentionally small

The enforced gzip budgets are 2.5 kB for core and 1.5 kB for each adapter, excluding its framework and core. AsciiReveal has no animation presets, timelines, image conversion, AI features, analytics, or cloud services.

[GitHub placeholder](https://github.com/YOUR_GITHUB_ORG/ascii-reveal) · [npm placeholder](https://www.npmjs.com/org/ascii-reveal) · MIT License
