export type AsciiRevealTrigger =
  "mount" | "hover" | "focus" | "in-view" | "manual";

export type AsciiRevealDirection = "left" | "right" | "center" | "random";

export type AsciiRevealCharacterPreset = "ascii" | "binary" | "symbols";

export type AsciiRevealCharacters =
  AsciiRevealCharacterPreset | (string & Record<never, never>);

export interface AsciiRevealOptions {
  text: string;
  characters?: AsciiRevealCharacters;
  duration?: number;
  delay?: number;
  fps?: number;
  trigger?: AsciiRevealTrigger;
  direction?: AsciiRevealDirection;
  preserveSpaces?: boolean;
  preservePunctuation?: boolean;
  startScrambled?: boolean;
  replay?: boolean;
  seed?: number;
  respectReducedMotion?: boolean;
  intersectionMargin?: string;
  onStart?: () => void;
  onUpdate?: (value: string, progress: number) => void;
  onComplete?: () => void;
}

export interface AsciiFrameOptions {
  text: string;
  progress: number;
  characters?: AsciiRevealCharacters;
  direction?: AsciiRevealDirection;
  preserveSpaces?: boolean;
  preservePunctuation?: boolean;
  seed?: number;
}

export interface AsciiRevealControls {
  play(): Promise<void>;
  reset(): void;
  finish(): void;
  update(options: Partial<AsciiRevealOptions>): void;
  destroy(): void;
  readonly isPlaying: boolean;
}

export interface ResolvedAsciiRevealOptions {
  text: string;
  characters: string;
  duration: number;
  delay: number;
  fps: number;
  trigger: AsciiRevealTrigger;
  direction: AsciiRevealDirection;
  preserveSpaces: boolean;
  preservePunctuation: boolean;
  startScrambled: boolean;
  replay: boolean;
  seed?: number;
  respectReducedMotion: boolean;
  intersectionMargin: string;
  onStart?: () => void;
  onUpdate?: (value: string, progress: number) => void;
  onComplete?: () => void;
}
