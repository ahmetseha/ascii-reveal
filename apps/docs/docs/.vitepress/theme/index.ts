import DefaultTheme from "vitepress/theme";
import type { App } from "vue";
import Demo from "./Demo.vue";
import Home from "./Home.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("AsciiDemo", Demo);
    app.component("AsciiHome", Home);
  },
};
