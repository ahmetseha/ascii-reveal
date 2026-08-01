import { generateAsciiFrame } from "./frame";
import { resolveOptions } from "./options";
import type { AsciiRevealControls, AsciiRevealOptions } from "./types";

const visuallyHidden: Partial<CSSStyleDeclaration> = {
  border: "0",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
};

/** Attaches an accessible ASCII reveal animation to an element. */
export const createAsciiReveal = (
  element: HTMLElement,
  initialOptions: AsciiRevealOptions,
): AsciiRevealControls => {
  let options = resolveOptions(initialOptions);
  let destroyed = false;
  let playing = false;
  let completed = false;
  let frameId = 0;
  let playPromise: Promise<void> | undefined;
  let resolvePlay: (() => void) | undefined;
  let observer: IntersectionObserver | undefined;
  const cleanups: Array<() => void> = [];
  const originalNodes = Array.from(element.childNodes);
  const visual = element.ownerDocument.createElement("span");
  const accessible = element.ownerDocument.createElement("span");
  visual.setAttribute("aria-hidden", "true");
  accessible.textContent = options.text;
  Object.assign(accessible.style, visuallyHidden);
  element.replaceChildren(visual, accessible);

  const render = (progress: number) => {
    const value =
      progress >= 1
        ? options.text
        : generateAsciiFrame({
            text: options.text,
            progress,
            characters: options.characters,
            direction: options.direction,
            preserveSpaces: options.preserveSpaces,
            preservePunctuation: options.preservePunctuation,
            seed: options.seed,
          });
    visual.textContent = value;
    options.onUpdate?.(value, progress);
  };

  const stop = () => {
    if (frameId && typeof cancelAnimationFrame === "function")
      cancelAnimationFrame(frameId);
    frameId = 0;
    playing = false;
  };

  const settlePlay = () => {
    resolvePlay?.();
    resolvePlay = undefined;
    playPromise = undefined;
  };

  const finish = () => {
    if (destroyed) return;
    const wasPlaying = playing;
    stop();
    render(1);
    completed = true;
    if (wasPlaying) options.onComplete?.();
    settlePlay();
  };

  const prefersReducedMotion = () =>
    options.respectReducedMotion &&
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const play = (): Promise<void> => {
    if (destroyed || (!options.replay && completed)) return Promise.resolve();
    if (playPromise) return playPromise;

    playPromise = new Promise<void>((resolve) => {
      resolvePlay = resolve;
    });
    playing = true;
    options.onStart?.();

    if (
      prefersReducedMotion() ||
      options.duration === 0 ||
      typeof requestAnimationFrame !== "function"
    ) {
      finish();
      return playPromise ?? Promise.resolve();
    }

    const startedAt = performance.now() + options.delay;
    const frameDuration = 1000 / options.fps;
    let lastFrame = Number.NEGATIVE_INFINITY;
    const tick = (now: number) => {
      if (!playing || destroyed) return;
      if (now < startedAt) {
        frameId = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startedAt;
      const progress = Math.min(1, elapsed / options.duration);
      if (progress === 1) {
        finish();
        return;
      }
      if (now - lastFrame >= frameDuration) {
        render(progress);
        lastFrame = now;
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return playPromise;
  };

  const reset = () => {
    if (destroyed) return;
    stop();
    settlePlay();
    completed = false;
    render(options.startScrambled ? 0 : 1);
  };

  const clearTriggers = () => {
    observer?.disconnect();
    observer = undefined;
    cleanups.splice(0).forEach((cleanup) => cleanup());
  };

  const listen = (type: string) => {
    const handler = () => void play();
    element.addEventListener(type, handler);
    cleanups.push(() => element.removeEventListener(type, handler));
  };

  const attachTrigger = () => {
    clearTriggers();
    if (destroyed || options.trigger === "manual") return;
    if (options.trigger === "mount") {
      void play();
    } else if (options.trigger === "hover") {
      listen("pointerenter");
      listen("focusin");
    } else if (options.trigger === "focus") {
      listen("focusin");
    } else if (typeof IntersectionObserver === "function") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) void play();
        },
        { rootMargin: options.intersectionMargin },
      );
      observer.observe(element);
    } else {
      void play();
    }
  };

  reset();
  attachTrigger();

  return {
    play,
    reset,
    finish,
    update(patch) {
      if (destroyed) return;
      const previousTrigger = options.trigger;
      const previousMargin = options.intersectionMargin;
      options = resolveOptions(
        { ...patch, text: patch.text ?? options.text },
        options,
      );
      accessible.textContent = options.text;
      reset();
      if (
        previousTrigger !== options.trigger ||
        previousMargin !== options.intersectionMargin
      ) {
        attachTrigger();
      } else if (options.trigger === "mount") {
        void play();
      }
    },
    destroy() {
      if (destroyed) return;
      clearTriggers();
      stop();
      settlePlay();
      element.replaceChildren(...originalNodes);
      destroyed = true;
    },
    get isPlaying() {
      return playing;
    },
  };
};
