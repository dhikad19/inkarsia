import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import chroma from "chroma-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function contrastRatio(hex: string) {
  try {
    return chroma.contrast(hex, "#ffffff");
  } catch (e) {
    return 1;
  }
}

export function generatePaletteFor(
  mode: "normal" | "protanopia" | "deuteranopia" | "tritanopia"
) {
  const safePalettes = {
    normal: [
      "#E69F00",
      "#56B4E9",
      "#009E73",
      "#F0E442",
      "#0072B2",
      "#D55E00",
      "#CC79A7",
      "#000000",
    ],
    protanopia: [
      "#0072B2",
      "#E69F00",
      "#56B4E9",
      "#009E73",
      "#F0E442",
      "#D55E00",
      "#CC79A7",
      "#000000",
    ],
    deuteranopia: [
      "#009E73",
      "#56B4E9",
      "#E69F00",
      "#F0E442",
      "#0072B2",
      "#D55E00",
      "#CC79A7",
      "#000000",
    ],
    tritanopia: [
      "#E69F00",
      "#009E73",
      "#56B4E9",
      "#F0E442",
      "#0072B2",
      "#D55E00",
      "#CC79A7",
      "#000000",
    ],
  };

  const base = safePalettes[mode];
  return base.map((c) =>
    chroma(c)
      .set("hsl.l", Math.random() * 0.4 + 0.3)
      .hex()
  );
}

export function suggestionsFor(palette: string[]) {
  if (palette.length === 0)
    return ["#0B3D91", "#FFB703", "#FB8500", "#A0D2DB", "#303030"];
  const base = palette[0];
  const h = chroma(base).get("hsl.h") || 200;
  const generated = [
    chroma.hsl(h, 0.7, 0.25).hex(),
    chroma.hsl((h + 60) % 360, 0.65, 0.5).hex(),
    chroma.hsl((h + 130) % 360, 0.6, 0.45).hex(),
    chroma.hsl((h + 200) % 360, 0.45, 0.65).hex(),
    "#111827",
  ];
  return generated;
}
