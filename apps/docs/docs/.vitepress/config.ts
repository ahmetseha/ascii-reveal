import { defineConfig } from "vitepress";
import { repository } from "../../../../repo.config";

export default defineConfig({
  title: "AsciiReveal",
  titleTemplate: ":title · AsciiReveal",
  description: "Small, accessible ASCII text reveal animations.",
  cleanUrls: true,
  lastUpdated: true,
  appearance: "force-dark",
  themeConfig: {
    logo: { src: "/mark.svg", alt: "AsciiReveal" },
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
  head: [
    ["link", { rel: "icon", href: "/mark.svg", type: "image/svg+xml" }],
    ["meta", { name: "theme-color", content: "#070708" }],
    ["meta", { name: "color-scheme", content: "dark" }],
  ],
});
