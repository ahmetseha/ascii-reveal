# @ascii-reveal/core

Framework-independent, accessible ASCII text reveal animations. See the [repository documentation](https://github.com/YOUR_GITHUB_ORG/ascii-reveal) for usage and API details.

```ts
import { createAsciiReveal } from "@ascii-reveal/core";

const controls = createAsciiReveal(document.querySelector("h1")!, {
  text: "SYSTEM ONLINE",
  trigger: "manual",
});

await controls.play();
```
