import { type AsciiRevealOptions } from "@ascii-reveal/core";
import { AsciiReveal } from "@ascii-reveal/react";
import { createElement } from "react";

const props: AsciiRevealOptions = {
  text: "seha",
  characters: "ascii",
  trigger: "manual",
};

createElement(AsciiReveal, props);
