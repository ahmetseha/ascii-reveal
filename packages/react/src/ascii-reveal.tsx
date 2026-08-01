import type {
  AsciiRevealControls,
  AsciiRevealOptions,
} from "@ascii-reveal/core";
import {
  createElement,
  forwardRef,
  useEffect,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from "react";
import { useAsciiReveal } from "./use-ascii-reveal";

const hidden = {
  border: 0,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
} as const;

type AnimationProps = Omit<AsciiRevealOptions, "text">;

export interface AsciiRevealProps
  extends AnimationProps, Omit<HTMLAttributes<HTMLElement>, "children"> {
  text: string;
  as?: ElementType;
  controlsRef?: Ref<AsciiRevealControls>;
}

const assignRef = <T,>(ref: Ref<T> | undefined, value: T | null) => {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
};

const AsciiRevealInner = (
  {
    text,
    as: Tag = "span",
    characters,
    duration,
    delay,
    fps,
    trigger,
    direction,
    preserveSpaces,
    preservePunctuation,
    startScrambled,
    replay,
    seed,
    respectReducedMotion,
    intersectionMargin,
    onStart,
    onUpdate,
    onComplete,
    controlsRef,
    ...attributes
  }: AsciiRevealProps,
  forwardedRef: Ref<HTMLElement>,
): ReactElement => {
  const options = {
    text,
    characters,
    duration,
    delay,
    fps,
    trigger,
    direction,
    preserveSpaces,
    preservePunctuation,
    startScrambled,
    replay,
    seed,
    respectReducedMotion,
    intersectionMargin,
    onStart,
    onUpdate,
    onComplete,
  } satisfies AsciiRevealOptions;
  const reveal = useAsciiReveal(options);

  useEffect(() => {
    assignRef(controlsRef, reveal.controls);
    return () => assignRef(controlsRef, null);
  }, [controlsRef, reveal.controls]);

  const ref = (element: HTMLElement | null) => {
    reveal.ref(element);
    assignRef(forwardedRef, element);
  };

  return createElement(
    Tag,
    { ...attributes, ref },
    createElement("span", { "aria-hidden": true }, text),
    createElement("span", { style: hidden }, text),
  );
};

export const AsciiReveal = forwardRef(AsciiRevealInner);
AsciiReveal.displayName = "AsciiReveal";
