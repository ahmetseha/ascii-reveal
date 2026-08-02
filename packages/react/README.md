# @ascii-reveal/react

Accessible ASCII text reveal animations for React 18 and newer.

## Install

```sh
npm install @ascii-reveal/react
```

## Component

```tsx
import { AsciiReveal } from "@ascii-reveal/react";

export function HeroTitle() {
  return (
    <AsciiReveal
      as="h1"
      text="BUILD SOMETHING MEMORABLE"
      characters="symbols"
      trigger="hover"
      direction="center"
      duration={900}
      className="hero-title"
    />
  );
}
```

The component accepts normal HTML attributes plus the animation options. Use `as` to choose the rendered element.

## Manual control

```tsx
import { useRef } from "react";
import { AsciiReveal, type AsciiRevealControls } from "@ascii-reveal/react";

export function ReplayableTitle() {
  const controls = useRef<AsciiRevealControls | null>(null);

  return (
    <>
      <AsciiReveal
        text="SYSTEM ONLINE"
        trigger="manual"
        controlsRef={controls}
      />
      <button onClick={() => controls.current?.play()}>Replay</button>
    </>
  );
}
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
