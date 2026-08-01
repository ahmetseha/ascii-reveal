# Getting started

AsciiReveal animates one final string without turning your UI into an animation system. Choose the package for your environment, then pass the same options across core, React, and Vue.

## Vanilla JavaScript

```js
import { createAsciiReveal } from "@ascii-reveal/core";

const heading = document.querySelector("h1");
const reveal = createAsciiReveal(heading, { text: "SYSTEM ONLINE" });
```

## TypeScript

```ts
import { createAsciiReveal, type AsciiRevealOptions } from "@ascii-reveal/core";

const options: AsciiRevealOptions = {
  text: "SYSTEM ONLINE",
  direction: "left",
  duration: 900,
};

const reveal = createAsciiReveal(
  document.querySelector<HTMLElement>("h1")!,
  options,
);
```

Call `destroy()` before permanently removing a core-controlled element. Framework adapters do this automatically.
