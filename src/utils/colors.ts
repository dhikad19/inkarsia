// /utils/colors.ts
export type ColorItem = {
  id: string;
  hex: string; // main color (uppercase)
  name: string; // color name (string)
  locked: boolean;
  liked: boolean;
  shades: string[]; // length = 6 (first = main)
};

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomHex() {
  const r = randInt(0, 255);
  const g = randInt(0, 255);
  const b = randInt(0, 255);
  return rgbToHex(r, g, b);
}

export function rgbToHex(r: number, g: number, b: number) {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function hslToHex(h: number, s: number, l: number) {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

/**
 * Generate 6 shades from a base hex.
 * Returns array where idx 0 is main (closest to original), rest are other shades.
 */
export function generateShades(hex: string, count = 6) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const shades: string[] = [];
  const spread = 36; // lightness spread
  const step = spread / (count - 1);
  const startL = Math.max(0, l - spread / 2);
  for (let i = 0; i < count; i++) {
    const L = Math.min(100, Math.max(0, startL + step * i));
    shades.push(hslToHex(h, s, L));
  }
  // put original at closest index
  let closestIdx = 0;
  let minDiff = Infinity;
  for (let i = 0; i < shades.length; i++) {
    const { r: rr, g: gg, b: bb } = hexToRgb(shades[i]);
    const { l: li } = rgbToHsl(rr, gg, bb);
    const diff = Math.abs(li - l);
    if (diff < minDiff) {
      minDiff = diff;
      closestIdx = i;
    }
  }
  shades[closestIdx] = hex.toUpperCase();
  const main = shades[closestIdx];
  const others = shades
    .slice(0, closestIdx)
    .concat(shades.slice(closestIdx + 1));
  return [main, ...others].map((s) => s.toUpperCase());
}

/* fallback names if color-namer not available */
const FALLBACK_NAMES = [
  "Prussian Blue",
  "Cerulean",
  "Crimson",
  "Poppy",
  "Cadmium Red",
  "Viridian",
  "Emerald",
  "Mint",
  "Coral",
  "Sunset",
  "Mauve",
  "Saffron",
  "Indigo",
  "Lavender",
  "Charcoal",
  "Slate",
  "Olive",
  "Azure",
  "Cobalt",
  "Magenta",
];

export function randomColorName() {
  const idx = randInt(0, FALLBACK_NAMES.length - 1);
  return FALLBACK_NAMES[idx];
}

export function cryptoRandomId() {
  return Math.random().toString(36).slice(2, 9);
}
