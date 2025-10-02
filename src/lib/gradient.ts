import { ColorStop, GradientState } from "./types";

// util: generate unique id
export const uid = (prefix = "") =>
  prefix + Math.random().toString(36).slice(2, 9);

export function defaultStops() {
  return [
    { id: uid("s"), color: "#667EEA", pos: 0 },
    { id: uid("s"), color: "#764BA2", pos: 100 },
  ];
}

export function makeGradientCss(state: GradientState) {
  const stops = state.stops
    .slice()
    .sort((a, b) => a.pos - b.pos)
    .map((s) => `${s.color} ${s.pos}%`)
    .join(", ");

  if (state.type === "linear") {
    return `background: linear-gradient(${state.angle}deg, ${stops});`;
  }

  if (state.type === "radial") {
    const shape = state.radialShape ?? "ellipse";
    const pos = state.radialPos ?? "center";
    return `background: radial-gradient(${shape} at ${pos}, ${stops});`;
  }

  // color-mix: fallback to linear mix of two stops
  if (state.type === "color-mix") {
    // simplest: use color-mix() if supported, else linear fallback
    const [a, b] = state.stops;
    if (a && b) {
      return `background: color-mix(in srgb, ${a.color} ${a.pos}%, ${b.color} ${
        100 - a.pos
      }%); /* fallback */\nbackground: linear-gradient(90deg, ${stops});`;
    }
    return `background: linear-gradient(90deg, ${stops});`;
  }

  return "";
}
