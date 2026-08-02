# AsciiReveal

Accessible ASCII text reveal animations for JavaScript, React, and Vue.

```text
B%#L&ING  ->  BUILDING
```

[![CI](https://github.com/ahmetseha/ascii-reveal/actions/workflows/ci.yml/badge.svg)](https://github.com/ahmetseha/ascii-reveal/actions/workflows/ci.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-a6ff75.svg)](LICENSE)

AsciiReveal briefly scrambles text, then reveals the original value character by character. It is small, dependency-light, SSR-safe, and respects reduced-motion preferences by default.

## Install

Choose the package for your project:

```sh
npm install @ascii-reveal/core   # Vanilla JavaScript / TypeScript
npm install @ascii-reveal/react  # React 18+
npm install @ascii-reveal/vue    # Vue 3.3+
```

## Quick start

### JavaScript

```ts
import { createAsciiReveal } from "@ascii-reveal/core";

const element = document.querySelector<HTMLElement>("h1");
if (!element) throw new Error("Heading not found");

const reveal = createAsciiReveal(element, {
  text: "SYSTEM ONLINE",
  characters: "ascii",
  trigger: "mount",
  direction: "left",
  duration: 700,
});
```

### React

```tsx
import { AsciiReveal } from "@ascii-reveal/react";

export function Title() {
  return (
    <AsciiReveal
      as="h1"
      text="BUILD SOMETHING MEMORABLE"
      trigger="hover"
      characters="symbols"
    />
  );
}
```

### Vue

```vue
<script setup lang="ts">
import { AsciiReveal } from "@ascii-reveal/vue";
</script>

<template>
  <AsciiReveal
    as="h1"
    text="EXPLORE THE ARCHIVE"
    trigger="in-view"
    characters="binary"
  />
</template>
```

## Main options

| Option       | Values                                           | Default |
| ------------ | ------------------------------------------------ | ------- |
| `characters` | `ascii`, `binary`, `symbols`, or a custom string | `ascii` |
| `trigger`    | `mount`, `hover`, `focus`, `in-view`, `manual`   | `mount` |
| `direction`  | `left`, `right`, `center`, `random`              | `left`  |
| `duration`   | milliseconds                                     | `700`   |
| `delay`      | milliseconds                                     | `0`     |
| `replay`     | replay when triggered again                      | `true`  |
| `seed`       | deterministic random seed                        | random  |

The core controller provides `play()`, `reset()`, `finish()`, `update()`, and `destroy()`. React exports `AsciiReveal` and `useAsciiReveal`; Vue exports `AsciiReveal` and `useAsciiReveal`.

## Accessibility

The animated value is hidden from assistive technologies while the final text remains available to screen readers. Keyboard focus is supported, Unicode text is handled safely, and `prefers-reduced-motion` is respected unless explicitly disabled.

## Documentation

- [Complete API](apps/docs/docs/api.md)
- [Accessibility guide](apps/docs/docs/guide/accessibility.md)
- [Core package](packages/core/README.md)
- [React package](packages/react/README.md)
- [Vue package](packages/vue/README.md)

## Development

```sh
pnpm install
pnpm test:unit
pnpm test:e2e
pnpm build
```

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).

MIT licensed.
