export type ShadowLayer = {
  id: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string; // selalu #rrggbb
  opacity: number; // 0 - 1
  inset: boolean;
};

export type PreviewBg = "light" | "dark";

export const MAX_LAYERS = 6;

let counter = 0;
const uid = () => `layer-${++counter}`;

export const createLayer = (
  overrides: Partial<Omit<ShadowLayer, "id">> = {},
): ShadowLayer => ({
  id: uid(),
  offsetX: 0,
  offsetY: 4,
  blur: 12,
  spread: 0,
  color: "#000000",
  opacity: 0.25,
  inset: false,
  ...overrides,
});

// Mendukung #rgb, #rgba, #rrggbb, #rrggbbaa
export function parseHex(hex: string): { color: string; opacity: number } {
  let h = hex.replace("#", "");
  if (h.length === 3 || h.length === 4) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const color = `#${h.slice(0, 6).toLowerCase()}`;
  const opacity =
    h.length === 8
      ? Math.round((parseInt(h.slice(6, 8), 16) / 255) * 100) / 100
      : 1;
  return { color, opacity };
}

export function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function toBoxShadow(layers: ShadowLayer[], separator = ", ") {
  return layers
    .map(
      (l) =>
        `${l.inset ? "inset " : ""}${l.offsetX}px ${l.offsetY}px ${l.blur}px ${
          l.spread
        }px ${hexToRgba(l.color, l.opacity)}`,
    )
    .join(separator);
}

export function toCss(layers: ShadowLayer[]) {
  return layers.length === 1
    ? `box-shadow: ${toBoxShadow(layers)};`
    : `box-shadow:\n  ${toBoxShadow(layers, ",\n  ")};`;
}

type RawLayer = Omit<ShadowLayer, "id" | "opacity">;

const raw = (
  offsetX: number,
  offsetY: number,
  blur: number,
  spread: number,
  hex: string,
  inset = false,
): RawLayer => ({ offsetX, offsetY, blur, spread, color: hex, inset });

const RAW_PRESETS: { name: string; layers: RawLayer[] }[] = [
  { name: "Soft", layers: [raw(0, 8, 24, -4, "#00000033")] },
  { name: "Floating", layers: [raw(0, 15, 35, -5, "#00000040")] },
  {
    name: "Layered Card",
    layers: [raw(0, 2, 4, 0, "#00000022"), raw(0, 8, 16, -4, "#00000033")],
  },
  {
    name: "Ambient",
    layers: [
      raw(0, 20, 50, -10, "#00000033"),
      raw(0, 10, 30, -15, "#00000022"),
    ],
  },
  { name: "Hard Drop", layers: [raw(0, 12, 0, 0, "#00000080")] },
  {
    name: "Neumorphism",
    layers: [raw(6, 6, 16, 0, "#00000020"), raw(-6, -6, 16, 0, "#ffffffcc")],
  },
  { name: "Inset Soft", layers: [raw(0, 2, 6, 2, "#00000033", true)] },
  { name: "Neon", layers: [raw(0, 0, 20, 0, "#00ffff")] },
  { name: "Glow", layers: [raw(0, 0, 25, 5, "#ff00ff88")] },
  {
    name: "Retro Pop",
    layers: [raw(4, 4, 0, 0, "#ff0000aa"), raw(8, 8, 0, 0, "#0000ffaa")],
  },
];

// Membuat layer baru (dengan id baru) dari sebuah preset
export const buildPreset = (name: string): ShadowLayer[] =>
  (RAW_PRESETS.find((p) => p.name === name)?.layers ?? []).map((l) => {
    const { color, opacity } = parseHex(l.color);
    return createLayer({ ...l, color, opacity });
  });

export const PRESETS = RAW_PRESETS.map((p) => ({
  name: p.name,
  css: toBoxShadow(buildPreset(p.name)), // untuk deteksi preset aktif
}));
