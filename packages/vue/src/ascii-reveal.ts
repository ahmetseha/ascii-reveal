import type {
  AsciiRevealCharacters,
  AsciiRevealDirection,
  AsciiRevealTrigger,
} from "@ascii-reveal/core";
import {
  computed,
  defineComponent,
  h,
  type CSSProperties,
  type PropType,
} from "vue";
import { useAsciiReveal } from "./use-ascii-reveal";

const hidden: CSSProperties = {
  border: 0,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
};

export const AsciiReveal = defineComponent({
  name: "AsciiReveal",
  inheritAttrs: false,
  props: {
    text: { type: String, required: true },
    as: { type: String, default: "span" },
    characters: String as PropType<AsciiRevealCharacters>,
    duration: Number,
    delay: Number,
    fps: Number,
    trigger: String as PropType<AsciiRevealTrigger>,
    direction: String as PropType<AsciiRevealDirection>,
    preserveSpaces: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    preservePunctuation: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    startScrambled: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    replay: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    seed: Number,
    respectReducedMotion: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    intersectionMargin: String,
    onStart: Function as PropType<() => void>,
    onUpdate: Function as PropType<(value: string, progress: number) => void>,
    onComplete: Function as PropType<() => void>,
  },
  setup(props, { attrs, expose }) {
    const options = computed(() => ({
      text: props.text,
      characters: props.characters,
      duration: props.duration,
      delay: props.delay,
      fps: props.fps,
      trigger: props.trigger,
      direction: props.direction,
      preserveSpaces: props.preserveSpaces,
      preservePunctuation: props.preservePunctuation,
      startScrambled: props.startScrambled,
      replay: props.replay,
      seed: props.seed,
      respectReducedMotion: props.respectReducedMotion,
      intersectionMargin: props.intersectionMargin,
      onStart: props.onStart,
      onUpdate: props.onUpdate,
      onComplete: props.onComplete,
    }));
    const reveal = useAsciiReveal(options);
    expose(reveal);

    return () =>
      h(props.as, { ...attrs, ref: reveal.element }, [
        h("span", { "aria-hidden": "true" }, props.text),
        h("span", { style: hidden }, props.text),
      ]);
  },
});
