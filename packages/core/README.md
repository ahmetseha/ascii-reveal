# @ascii-reveal/core

Framework-independent, accessible ASCII text reveal animations for JavaScript and TypeScript.

## Install

```sh
npm install @ascii-reveal/core
```

## Usage

```ts
import { createAsciiReveal } from "@ascii-reveal/core";

const element = document.querySelector<HTMLElement>("h1");
if (!element) throw new Error("Heading not found");

const reveal = createAsciiReveal(element, {
  text: "SYSTEM ONLINE",
  characters: "ascii",
  trigger: "manual",
  direction: "left",
  duration: 700,
});

document.querySelector("button")?.addEventListener("click", () => {
  reveal.play();
});
```

`createAsciiReveal()` returns these controls:

```ts
reveal.play();
reveal.reset();
reveal.finish();
reveal.update({ text: "ACCESS GRANTED", characters: "binary" });
reveal.destroy();
```

## Options

| Option       | Values                                           | Default  |
| ------------ | ------------------------------------------------ | -------- |
| `text`       | final text                                       | required |
| `characters` | `ascii`, `binary`, `symbols`, or a custom string | `ascii`  |
| `trigger`    | `mount`, `hover`, `focus`, `in-view`, `manual`   | `mount`  |
| `direction`  | `left`, `right`, `center`, `random`              | `left`   |
| `duration`   | milliseconds                                     | `700`    |
| `delay`      | milliseconds                                     | `0`      |
| `fps`        | animation frames per second                      | `30`     |
| `replay`     | replay when triggered again                      | `true`   |
| `seed`       | deterministic random seed                        | random   |

Spaces are preserved and reduced-motion preferences are respected by default. The package is SSR-safe and supports both ESM and CommonJS.

See the [complete API](https://github.com/ahmetseha/ascii-reveal/blob/main/apps/docs/docs/api.md) and [project repository](https://github.com/ahmetseha/ascii-reveal).

MIT licensed.
