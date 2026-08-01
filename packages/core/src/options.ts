import { DEFAULT_CHARACTERS } from "./frame";
import type { AsciiRevealOptions, ResolvedAsciiRevealOptions } from "./types";

const nonNegative = (value: number | undefined, fallback: number): number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : fallback;

export const resolveOptions = (
  options: AsciiRevealOptions,
  previous?: ResolvedAsciiRevealOptions,
): ResolvedAsciiRevealOptions => ({
  text:
    typeof options.text === "string" ? options.text : (previous?.text ?? ""),
  characters: options.characters?.length
    ? options.characters
    : (previous?.characters ?? DEFAULT_CHARACTERS),
  duration: nonNegative(options.duration, previous?.duration ?? 700),
  delay: nonNegative(options.delay, previous?.delay ?? 0),
  fps: Math.max(1, nonNegative(options.fps, previous?.fps ?? 30)),
  trigger: options.trigger ?? previous?.trigger ?? "mount",
  direction: options.direction ?? previous?.direction ?? "left",
  preserveSpaces: options.preserveSpaces ?? previous?.preserveSpaces ?? true,
  preservePunctuation:
    options.preservePunctuation ?? previous?.preservePunctuation ?? false,
  startScrambled: options.startScrambled ?? previous?.startScrambled ?? true,
  replay: options.replay ?? previous?.replay ?? true,
  seed: options.seed ?? previous?.seed,
  respectReducedMotion:
    options.respectReducedMotion ?? previous?.respectReducedMotion ?? true,
  intersectionMargin:
    options.intersectionMargin ?? previous?.intersectionMargin ?? "0px",
  onStart: options.onStart ?? previous?.onStart,
  onUpdate: options.onUpdate ?? previous?.onUpdate,
  onComplete: options.onComplete ?? previous?.onComplete,
});
