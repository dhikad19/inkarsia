import type { CSSProperties } from "react";

export type GlassConfig = {
  blur: number;
  brightness: number;
  contrast: number;
  saturation: number;
  backgroundColor: string;
  backgroundOpacity: number;
  borderColor: string;
  borderOpacity: number;
  borderRadius: number;
};

export type NumericKey = {
  [K in keyof GlassConfig]: GlassConfig[K] extends number ? K : never;
}[keyof GlassConfig];

export const DEFAULT_CONFIG: GlassConfig = {
  blur: 10,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  backgroundColor: "#ffffff",
  backgroundOpacity: 0.15,
  borderColor: "#ffffff",
  borderOpacity: 0.3,
  borderRadius: 16,
};

// gambar + gradient sebagai fallback kalau gambar gagal dimuat
export const PREVIEW_BACKGROUND =
  "url('/assets/scenery.jpg'), linear-gradient(135deg, #6366f1, #ec4899)";

export type SliderField = {
  key: NumericKey;
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
};

export const BACKDROP_SLIDERS: SliderField[] = [
  { key: "blur", label: "Blur", min: 0, max: 40, step: 1, unit: "px" },
  {
    key: "brightness",
    label: "Brightness",
    min: 50,
    max: 200,
    step: 1,
    unit: "%",
  },
  { key: "contrast", label: "Contrast", min: 50, max: 200, step: 1, unit: "%" },
  {
    key: "saturation",
    label: "Saturation",
    min: 0,
    max: 300,
    step: 1,
    unit: "%",
  },
];

export const hexToRgba = (hex: string, alpha: number) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

export const backdropFilterValue = (c: GlassConfig) =>
  `blur(${c.blur}px) brightness(${c.brightness}%) contrast(${c.contrast}%) saturate(${c.saturation}%)`;

export const getGlassStyle = (c: GlassConfig): CSSProperties => ({
  backdropFilter: backdropFilterValue(c),
  WebkitBackdropFilter: backdropFilterValue(c),
  background: hexToRgba(c.backgroundColor, c.backgroundOpacity),
  border: `1px solid ${hexToRgba(c.borderColor, c.borderOpacity)}`,
  borderRadius: c.borderRadius,
});

export const buildCss = (c: GlassConfig) => `.backdrop-box {
  background: ${hexToRgba(c.backgroundColor, c.backgroundOpacity)};
  border: 1px solid ${hexToRgba(c.borderColor, c.borderOpacity)};
  border-radius: ${c.borderRadius}px;
  -webkit-backdrop-filter: ${backdropFilterValue(c)};
  backdrop-filter: ${backdropFilterValue(c)};
}`;

export type Preset = { name: string; config: GlassConfig };

export const PRESETS: Preset[] = [
  { name: "Default", config: DEFAULT_CONFIG },
  {
    name: "Subtle",
    config: {
      blur: 5,
      brightness: 105,
      contrast: 100,
      saturation: 110,
      backgroundColor: "#ffffff",
      backgroundOpacity: 0.1,
      borderColor: "#ffffff",
      borderOpacity: 0.1,
      borderRadius: 6,
    },
  },
  {
    name: "Frosted",
    config: {
      blur: 20,
      brightness: 120,
      contrast: 110,
      saturation: 140,
      backgroundColor: "#ffffff",
      backgroundOpacity: 0.15,
      borderColor: "#ffffff",
      borderOpacity: 0.2,
      borderRadius: 6,
    },
  },
  {
    name: "Strong",
    config: {
      blur: 30,
      brightness: 140,
      contrast: 130,
      saturation: 180,
      backgroundColor: "#ffffff",
      backgroundOpacity: 0.25,
      borderColor: "#ffffff",
      borderOpacity: 0.3,
      borderRadius: 6,
    },
  },
  {
    name: "Vibrant",
    config: {
      blur: 25,
      brightness: 150,
      contrast: 140,
      saturation: 250,
      backgroundColor: "#ffffff",
      backgroundOpacity: 0.3,
      borderColor: "#ffffff",
      borderOpacity: 0.35,
      borderRadius: 6,
    },
  },
];

export const isSameConfig = (a: GlassConfig, b: GlassConfig) =>
  (Object.keys(a) as (keyof GlassConfig)[]).every((k) => a[k] === b[k]);
