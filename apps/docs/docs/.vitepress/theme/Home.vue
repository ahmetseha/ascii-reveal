<script setup lang="ts">
import Demo from "./Demo.vue";
</script>

<template>
  <main class="micro-home">
    <header class="micro-hero">
      <nav class="micro-links" aria-label="External links">
        <a
          href="https://github.com/YOUR_GITHUB_ORG/ascii-reveal"
          aria-label="GitHub repository"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 .7A11.3 11.3 0 0 0 8.4 22.8c.6.1.8-.3.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6A4.7 4.7 0 0 1 6 8.5c-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.1 1.2a10.7 10.7 0 0 1 5.7 0c2.2-1.5 3.1-1.2 3.1-1.2.6 1.6.2 2.9.1 3.2a4.7 4.7 0 0 1 1.3 3.3c0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.3 11.3 0 0 0 12 .7Z"
            />
          </svg>
        </a>
        <a
          href="https://www.npmjs.com/org/ascii-reveal"
          aria-label="npm package"
        >
          <span>npm</span>
        </a>
      </nav>
      <div class="micro-mark" aria-hidden="true">
        <span>A*</span>
      </div>
      <h1>AsciiReveal</h1>
      <p>Accessible ASCII text reveal animation for the web.</p>
    </header>

    <section class="micro-section" aria-labelledby="installation-title">
      <h2 id="installation-title">Installation</h2>
      <div class="micro-command">
        <code>pnpm add @ascii-reveal/core</code>
        <span>core · 2.5 kB budget</span>
      </div>
    </section>

    <section class="micro-section" aria-labelledby="usage-title">
      <h2 id="usage-title">Usage</h2>
      <div class="micro-code">
        <pre><code><span class="code-keyword">import</span> { createAsciiReveal } <span class="code-keyword">from</span> <span class="code-string">"@ascii-reveal/core"</span>;

createAsciiReveal(element, {
  text: <span class="code-string">"MAKE TEXT FEEL ALIVE"</span>,
  direction: <span class="code-string">"random"</span>,
});</code></pre>
      </div>
    </section>

    <section
      class="micro-section micro-section--playground"
      aria-labelledby="playground-title"
    >
      <h2 id="playground-title">Playground</h2>
      <Demo />
    </section>

    <footer class="micro-footer">
      <span>Made by</span> <strong>Ahmet Seha</strong>
    </footer>
  </main>
</template>
