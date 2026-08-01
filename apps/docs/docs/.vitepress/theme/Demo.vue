<script setup lang="ts">
import {
  createAsciiReveal,
  type AsciiRevealControls,
  type AsciiRevealDirection,
  type AsciiRevealTrigger,
} from "@ascii-reveal/core";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";

const characterSets = {
  ASCII: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+-=?",
  Binary: "01",
  Symbols: "!<>-_\/[]{}—=+*^?#",
} as const;

const settings = reactive({
  text: "MAKE TEXT FEEL ALIVE",
  trigger: "mount" as AsciiRevealTrigger,
  direction: "random" as AsciiRevealDirection,
  duration: 700,
  characters: characterSets.ASCII,
  seed: 42,
});

const element = ref<HTMLElement | null>(null);
const status = ref("ready");
const copyLabel = ref("Copy");
let controls: AsciiRevealControls | undefined;

const options = () => ({
  ...settings,
  onStart: () => {
    status.value = "playing";
  },
  onComplete: () => {
    status.value = "complete";
  },
});

const generatedCode = computed(
  () =>
    `createAsciiReveal(element, ${JSON.stringify(
      {
        text: settings.text,
        trigger: settings.trigger,
        direction: settings.direction,
        duration: settings.duration,
        ...(settings.characters === characterSets.ASCII
          ? {}
          : { characters: settings.characters }),
        seed: settings.seed,
      },
      null,
      2,
    )});`,
);

const play = () => void controls?.play();

const selectCharacterSet = (name: keyof typeof characterSets) => {
  settings.characters = characterSets[name];
};

const copyCode = async () => {
  await navigator.clipboard.writeText(
    `import { createAsciiReveal } from "@ascii-reveal/core";\n\n${generatedCode.value}`,
  );
  copyLabel.value = "Copied";
  window.setTimeout(() => {
    copyLabel.value = "Copy";
  }, 1200);
};

onMounted(() => {
  if (!element.value) return;
  controls = createAsciiReveal(element.value, options());
});

watch(
  settings,
  () => {
    status.value = "ready";
    controls?.update(options());
  },
  { deep: true },
);

onBeforeUnmount(() => controls?.destroy());
</script>

<template>
  <div class="inline-playground">
    <div class="inline-controls">
      <label class="inline-field inline-field--text">
        <span>Text</span>
        <input v-model="settings.text" aria-label="Text" />
      </label>

      <fieldset>
        <legend>Trigger</legend>
        <div class="inline-segments">
          <button
            v-for="value in ['mount', 'hover', 'focus', 'manual']"
            :key="value"
            type="button"
            :class="{ 'is-active': settings.trigger === value }"
            :aria-pressed="settings.trigger === value"
            @click="settings.trigger = value as AsciiRevealTrigger"
          >
            {{ value }}
          </button>
        </div>
      </fieldset>

      <fieldset>
        <legend>Direction</legend>
        <div class="inline-segments">
          <button
            v-for="value in ['left', 'right', 'center', 'random']"
            :key="value"
            type="button"
            :class="{ 'is-active': settings.direction === value }"
            :aria-pressed="settings.direction === value"
            @click="settings.direction = value as AsciiRevealDirection"
          >
            {{ value }}
          </button>
        </div>
      </fieldset>

      <fieldset>
        <legend>Characters</legend>
        <div class="inline-segments inline-segments--three">
          <button
            v-for="(_, name) in characterSets"
            :key="name"
            type="button"
            :class="{
              'is-active': settings.characters === characterSets[name],
            }"
            :aria-pressed="settings.characters === characterSets[name]"
            @click="selectCharacterSet(name)"
          >
            {{ name }}
          </button>
        </div>
      </fieldset>

      <label class="inline-range">
        <span
          >Duration <strong>{{ settings.duration }} ms</strong></span
        >
        <input
          v-model.number="settings.duration"
          type="range"
          min="100"
          max="1800"
          step="50"
        />
      </label>
    </div>

    <section class="inline-preview" aria-label="Live preview">
      <div class="inline-reveal-card">
        <button
          ref="element"
          type="button"
          aria-label="Replay the configured ASCII reveal"
          @click="play"
        >
          MAKE TEXT FEEL ALIVE
        </button>
      </div>
      <button
        class="inline-play-toggle"
        type="button"
        :aria-label="
          status === 'playing' ? 'Animation playing' : 'Replay animation'
        "
        @click="play"
      >
        <span aria-hidden="true">{{ status === "playing" ? "Ⅱ" : "▶" }}</span>
      </button>
    </section>

    <section class="inline-code" aria-label="Generated code">
      <pre><code>{{ generatedCode }}</code></pre>
      <button type="button" @click="copyCode">{{ copyLabel }}</button>
    </section>
  </div>
</template>
