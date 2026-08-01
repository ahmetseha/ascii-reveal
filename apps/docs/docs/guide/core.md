# Core

`@ascii-reveal/core` contains the full animation engine. It has no framework or runtime dependency and does not access browser globals during import, so it is safe to import during SSR.

## Manual controls

```ts
const reveal = createAsciiReveal(element, {
  text: "SYSTEM ONLINE",
  trigger: "manual",
  characters: "binary",
  duration: 900,
});

button.addEventListener("click", () => reveal.play());
reveal.reset();
reveal.finish();
reveal.update({ direction: "right" });
reveal.destroy();
```

## Pure frame generation

```ts
import { generateAsciiFrame } from "@ascii-reveal/core";

generateAsciiFrame({ text: "BUILDING", progress: 0.5, seed: 42 });
```

The utility uses `Intl.Segmenter` when available and falls back to `Array.from`.
