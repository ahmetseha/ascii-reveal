import type { AsciiFrameOptions, AsciiRevealDirection } from "./types";

export const DEFAULT_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+-=?";

const segment = (value: string): string[] => {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const Segmenter = Intl.Segmenter;
    return Array.from(
      new Segmenter(undefined, { granularity: "grapheme" }).segment(value),
      ({ segment }) => segment,
    );
  }
  return Array.from(value);
};

const random = (seed: number): (() => number) => {
  let value = seed | 0;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let mixed = Math.imul(value ^ (value >>> 15), 1 | value);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4_294_967_296;
  };
};

const isFixed = (
  value: string,
  spaces: boolean,
  punctuation: boolean,
): boolean =>
  (spaces && /\s/u.test(value)) || (punctuation && /\p{P}/u.test(value));

const matchTargetCase = (character: string, target: string): string => {
  const lower = target.toLowerCase();
  const upper = target.toUpperCase();
  if (lower === upper) return character;
  if (target === lower) return character.toLowerCase();
  if (target === upper) return character.toUpperCase();
  return character;
};

const revealOrder = (
  indexes: number[],
  direction: AsciiRevealDirection,
  seed: number | undefined,
  textLength: number,
): number[] => {
  if (direction === "right") return indexes.slice().reverse();
  if (direction === "center") {
    const center = (textLength - 1) / 2;
    return indexes
      .slice()
      .sort((a, b) => Math.abs(a - center) - Math.abs(b - center) || a - b);
  }
  if (direction === "random") {
    const output = indexes.slice();
    const next = seed === undefined ? Math.random : random(seed);
    for (let index = output.length - 1; index > 0; index -= 1) {
      const target = Math.floor(next() * (index + 1));
      [output[index], output[target]] = [output[target]!, output[index]!];
    }
    return output;
  }
  return indexes;
};

/** Splits text into user-perceived characters when Intl.Segmenter is available. */
export const segmentText = segment;

/** Generates one animation frame without reading or writing the DOM. */
export const generateAsciiFrame = (options: AsciiFrameOptions): string => {
  if (!options.text) return "";

  const progress = Math.min(
    1,
    Math.max(0, Number.isFinite(options.progress) ? options.progress : 0),
  );
  if (progress === 1) return options.text;

  const text = segment(options.text);
  const characters = segment(
    options.characters?.length ? options.characters : DEFAULT_CHARACTERS,
  );
  const fixed = text.map((value) =>
    isFixed(
      value,
      options.preserveSpaces ?? true,
      options.preservePunctuation ?? false,
    ),
  );
  const changeable = text.flatMap((_, index) => (fixed[index] ? [] : [index]));
  const order = revealOrder(
    changeable,
    options.direction ?? "left",
    options.seed,
    text.length,
  );
  const revealed = new Set(
    order.slice(0, Math.floor(changeable.length * progress)),
  );
  const frameSeed =
    (options.seed ?? Math.floor(Math.random() * 2_147_483_647)) ^
    Math.floor(progress * 1_000_003);
  const next = random(frameSeed);

  return text
    .map((value, index) => {
      if (fixed[index] || revealed.has(index)) return value;
      return matchTargetCase(
        characters[Math.floor(next() * characters.length)] ?? "A",
        value,
      );
    })
    .join("");
};
