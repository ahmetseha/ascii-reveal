# @ascii-reveal/vue

Accessible ASCII text reveal animations for Vue 3.3 and newer.

## Install

```sh
npm install @ascii-reveal/vue
```

## Component

```vue
<script setup lang="ts">
import { AsciiReveal } from "@ascii-reveal/vue";
</script>

<template>
  <AsciiReveal
    as="h1"
    text="EXPLORE THE ARCHIVE"
    characters="binary"
    trigger="in-view"
    direction="left"
    :duration="900"
    class="hero-title"
  />
</template>
```

The component accepts normal HTML attributes plus the animation options. Use `as` to choose the rendered element.

## Manual control

```vue
<script setup lang="ts">
import { useAsciiReveal } from "@ascii-reveal/vue";

const { element, play } = useAsciiReveal(() => ({
  text: "SYSTEM ONLINE",
  trigger: "manual",
}));
</script>

<template>
  <h1 ref="element">SYSTEM ONLINE</h1>
  <button @click="play">Replay</button>
</template>
```

## Common options

- `characters`: `ascii`, `binary`, `symbols`, or a custom string
- `trigger`: `mount`, `hover`, `focus`, `in-view`, or `manual`
- `direction`: `left`, `right`, `center`, or `random`
- `duration`, `delay`, `fps`, `replay`, and `seed`
- `onStart`, `onUpdate`, and `onComplete`

The package also exports `useAsciiReveal` for custom markup. Reduced-motion preferences and screen readers are handled by default.

See the [complete API](https://github.com/ahmetseha/ascii-reveal/blob/main/apps/docs/docs/api.md) and [project repository](https://github.com/ahmetseha/ascii-reveal).

MIT licensed.
