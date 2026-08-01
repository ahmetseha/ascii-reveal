# React

```tsx
import { AsciiReveal } from "@ascii-reveal/react";

export function ProjectLink() {
  return (
    <AsciiReveal
      as="button"
      text="VIEW PROJECT"
      trigger="hover"
      direction="random"
      characters="01"
      seed={42}
      className="project-link"
    />
  );
}
```

All ordinary element attributes are forwarded. A normal ref receives the HTML element; `controlsRef` receives manual controls. `useAsciiReveal(options)` returns `{ ref, controls }` for custom components. The adapter creates the core controller only in an effect, making server rendering and hydration stable.
