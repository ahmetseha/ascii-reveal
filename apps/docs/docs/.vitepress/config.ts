import { defineConfig } from "vitepress";
import { repository } from "../../../../repo.config";

export default defineConfig({
  title: "AsciiReveal",
  titleTemplate: ":title · AsciiReveal",
  description: "Small, accessible ASCII text reveal animations.",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: { src: "/mark.svg", alt: "AsciiReveal" },
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Examples", link: "/examples" },
      { text: "API", link: "/api" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting started", link: "/guide/getting-started" },
          { text: "Core", link: "/guide/core" },
          { text: "React", link: "/guide/react" },
          { text: "Vue", link: "/guide/vue" },
          { text: "Accessibility", link: "/guide/accessibility" },
          { text: "Bundle size", link: "/guide/bundle-size" },
        ],
      },
      { text: "Examples", link: "/examples" },
      { text: "API", link: "/api" },
      { text: "Contributing", link: "/contributing" },
    ],
    socialLinks: [{ icon: "github", link: repository.url }],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Ahmet Seha",
    },
    search: { provider: "local" },
  },
  head: [["meta", { name: "theme-color", content: "#0b0d0c" }]],
});
