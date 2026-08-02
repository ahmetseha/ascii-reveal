import { AsciiReveal, type AsciiRevealProps } from "@ascii-reveal/vue";
import { h } from "vue";

const props: AsciiRevealProps = {
  text: "seha",
  characters: "binary",
  trigger: "manual",
};

h(AsciiReveal, props);
