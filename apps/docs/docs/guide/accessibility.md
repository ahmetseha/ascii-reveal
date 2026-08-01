# Accessibility

Every controller renders two text layers: the changing visual layer has `aria-hidden="true"`, while a visually hidden layer contains the stable final string. Random frames are never put in a live region, so screen readers do not announce each update.

The `hover` trigger also listens for `focusin`, and examples use visible `:focus-visible` outlines. Consumers remain responsible for choosing a semantic, keyboard-focusable element when the text is interactive.

When `respectReducedMotion` is enabled (the default) and the user requests reduced motion, the controller calls `onStart`, renders the exact final text, calls `onUpdate` with progress `1`, and then calls `onComplete` without scheduling animation frames.
