<script setup lang="ts">
import {
  createAsciiReveal,
  type AsciiRevealControls,
} from "@ascii-reveal/core";
import { onBeforeUnmount, onMounted, ref } from "vue";

const element = ref<HTMLElement | null>(null);
let controls: AsciiRevealControls | undefined;

onMounted(() => {
  if (!element.value) return;
  controls = createAsciiReveal(element.value, {
    text: "BUILD SOMETHING MEMORABLE",
    trigger: "mount",
    direction: "random",
    seed: 42,
  });
});

onBeforeUnmount(() => controls?.destroy());
</script>

<template>
  <div class="ascii-demo">
    <button ref="element" type="button" @click="controls?.play()">
      BUILD SOMETHING MEMORABLE
    </button>
    <span>Click to replay</span>
  </div>
</template>
