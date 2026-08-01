import { createAsciiReveal } from "@ascii-reveal/core";
import type {
  AsciiRevealControls,
  AsciiRevealOptions,
} from "@ascii-reveal/core";
import {
  onScopeDispose,
  ref,
  shallowRef,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
  type ShallowRef,
} from "vue";

export interface UseAsciiRevealResult {
  element: Ref<HTMLElement | null>;
  controls: ShallowRef<AsciiRevealControls | null>;
  play(): Promise<void>;
  reset(): void;
  finish(): void;
}

export const useAsciiReveal = (
  options: MaybeRefOrGetter<AsciiRevealOptions>,
): UseAsciiRevealResult => {
  const element = ref<HTMLElement | null>(null);
  const controls = shallowRef<AsciiRevealControls | null>(null);
  let stopOptions: (() => void) | undefined;

  const stopElement = watch(
    element,
    (node, _previous, onCleanup) => {
      stopOptions?.();
      controls.value?.destroy();
      controls.value = node ? createAsciiReveal(node, toValue(options)) : null;
      if (controls.value) {
        let first = true;
        stopOptions = watch(
          () => toValue(options),
          (value) => {
            if (first) {
              first = false;
              return;
            }
            controls.value?.update(value);
          },
          { deep: true, immediate: true },
        );
      }
      onCleanup(() => controls.value?.destroy());
    },
    { flush: "post" },
  );

  onScopeDispose(() => {
    stopOptions?.();
    stopElement();
    controls.value?.destroy();
  });

  return {
    element,
    controls,
    play: () => controls.value?.play() ?? Promise.resolve(),
    reset: () => controls.value?.reset(),
    finish: () => controls.value?.finish(),
  };
};
