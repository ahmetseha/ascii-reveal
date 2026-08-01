# Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { AsciiReveal } from "@ascii-reveal/vue";

const reveal = ref<InstanceType<typeof AsciiReveal> | null>(null);
</script>

<template>
  <AsciiReveal
    ref="reveal"
    as="button"
    text="EXPLORE THE ARCHIVE"
    trigger="focus"
    direction="left"
    data-section="archive"
  />
  <button @click="reveal?.play()">Replay</button>
</template>
```

Attributes are forwarded to the selected element. `useAsciiReveal(options)` exposes an element ref, a controls ref, and `play`, `reset`, and `finish` helpers. DOM initialization happens after mount for SSR-safe hydration.
