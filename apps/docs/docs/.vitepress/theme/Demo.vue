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

const handlePreviewClick = () => {
  if (settings.trigger === "manual") play();
};

const triggerHint = computed(() => {
  if (settings.trigger === "hover") return "Hover the preview";
  if (settings.trigger === "focus") return "Focus the preview";
  if (settings.trigger === "manual") return "Click the preview";
  return "Runs when mounted";
});

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
      <div class="inline-controls__primary">
        <label class="inline-field inline-field--text">
          <span>Preview text</span>
          <input v-model="settings.text" aria-label="Text" />
        </label>

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

      <div class="inline-controls__options">
        <fieldset>
          <legend><span>01</span> Trigger</legend>
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
          <legend><span>02</span> Direction</legend>
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
          <legend><span>03</span> Characters</legend>
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
      </div>
    </div>

    <section class="inline-preview" aria-label="Live preview">
      <div class="inline-preview-meta">
        <span class="inline-preview-status"><i></i>{{ status }}</span>
        <span>{{ triggerHint }}</span>
      </div>
      <div class="inline-reveal-card">
        <button
          ref="element"
          type="button"
          aria-label="ASCII reveal preview"
          @click="handlePreviewClick"
        >
          MAKE TEXT FEEL ALIVE
        </button>
      </div>
    </section>

    <section class="inline-code" aria-label="Generated code">
      <div class="inline-code-head">
        <span>Generated configuration</span>
        <button type="button" @click="copyCode">{{ copyLabel }}</button>
      </div>
      <pre><code>{{ generatedCode }}</code></pre>
    </section>
  </div>
</template>
