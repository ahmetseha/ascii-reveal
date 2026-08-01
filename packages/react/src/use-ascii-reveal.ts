import { createAsciiReveal } from "@ascii-reveal/core";
import type {
  AsciiRevealControls,
  AsciiRevealOptions,
} from "@ascii-reveal/core";
import { useCallback, useEffect, useRef, useState } from "react";

export interface UseAsciiRevealResult<T extends HTMLElement = HTMLElement> {
  ref: (element: T | null) => void;
  controls: AsciiRevealControls | null;
}

export const useAsciiReveal = <T extends HTMLElement = HTMLElement>(
  options: AsciiRevealOptions,
): UseAsciiRevealResult<T> => {
  const [element, setElement] = useState<T | null>(null);
  const [controls, setControls] = useState<AsciiRevealControls | null>(null);
  const controlsRef = useRef<AsciiRevealControls | null>(null);
  const appliedOptionsRef = useRef<AsciiRevealOptions | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const ref = useCallback((node: T | null) => setElement(node), []);

  useEffect(() => {
    if (!element) return;
    const instance = createAsciiReveal(element, optionsRef.current);
    appliedOptionsRef.current = optionsRef.current;
    controlsRef.current = instance;
    setControls(instance);
    return () => {
      instance.destroy();
      controlsRef.current = null;
      setControls(null);
    };
  }, [element]);

  useEffect(() => {
    if (appliedOptionsRef.current === options) return;
    appliedOptionsRef.current = options;
    controlsRef.current?.update(options);
  }, [
    options.text,
    options.characters,
    options.duration,
    options.delay,
    options.fps,
    options.trigger,
    options.direction,
    options.preserveSpaces,
    options.preservePunctuation,
    options.startScrambled,
    options.replay,
    options.seed,
    options.respectReducedMotion,
    options.intersectionMargin,
    options.onStart,
    options.onUpdate,
    options.onComplete,
  ]);

  return { ref, controls };
};
