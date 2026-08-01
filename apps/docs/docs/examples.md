# Examples

## Hover and keyboard focus

```ts
createAsciiReveal(link, {
  text: "VIEW PROJECT",
  trigger: "hover",
  direction: "random",
  seed: 42,
});
```

The hover trigger also responds to `focusin`.

## Focus only

```ts
createAsciiReveal(inputLabel, { text: "SEARCH ARCHIVE", trigger: "focus" });
```

## In view

```ts
createAsciiReveal(sectionHeading, {
  text: "SELECTED WORK",
  trigger: "in-view",
  intersectionMargin: "0px 0px -15%",
});
```

## Seeded binary animation

```tsx
<AsciiReveal
  text="DEPLOY READY"
  characters="binary"
  direction="random"
  seed={42}
/>
```

## Custom character set

```vue
<AsciiReveal text="TERMINAL READY" characters="01_/" :duration="900" />
```

## Manual and reduced motion

```ts
const reveal = createAsciiReveal(element, {
  text: "READY",
  trigger: "manual",
  respectReducedMotion: true,
});

await reveal.play();
```
