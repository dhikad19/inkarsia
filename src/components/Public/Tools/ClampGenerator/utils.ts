export type Unit = "rem" | "em" | "px";

export type Params = {
  minFont: number;
  maxFont: number;
  minWidth: number; // px
  maxWidth: number; // px
  unit: Unit;
  precision: number;
};

export const DEFAULTS: Params = {
  minFont: 1,
  maxFont: 2,
  minWidth: 320,
  maxWidth: 1280,
  unit: "rem",
  precision: 4,
};

const ROOT_PX = 16;
const scaleOf = (unit: Unit) => (unit === "px" ? 1 : ROOT_PX);

// bulatkan lalu buang nol di belakang: 1.5000 -> "1.5"
const fmt = (n: number, precision: number) =>
  Number(n.toFixed(precision)).toString();

export function getError(p: Params): string | null {
  if (!(p.minFont > 0) || !(p.maxFont > 0))
    return "Font sizes must be greater than 0.";
  if (!(p.minWidth > 0) || !(p.maxWidth > 0))
    return "Viewport widths must be greater than 0.";
  if (p.maxWidth <= p.minWidth)
    return "Max viewport width must be larger than min viewport width.";
  return null;
}

// Garis lurus: ukuran font = intercept + slope * lebar viewport
function line(p: Params) {
  const scale = scaleOf(p.unit);
  const w1 = p.minWidth / scale;
  const w2 = p.maxWidth / scale;
  const slope = (p.maxFont - p.minFont) / (w2 - w1); // tanpa satuan
  const intercept = p.minFont - slope * w1; // dalam satuan font
  return { slope, intercept, scale };
}

export function generateClamp(p: Params): string {
  const { slope, intercept } = line(p);
  const slopeVw = slope * 100;

  const lo = Math.min(p.minFont, p.maxFont);
  const hi = Math.max(p.minFont, p.maxFont);

  const preferred = `${fmt(intercept, p.precision)}${p.unit} ${
    slopeVw < 0 ? "-" : "+"
  } ${fmt(Math.abs(slopeVw), p.precision)}vw`;

  return `font-size: clamp(${fmt(lo, p.precision)}${p.unit}, ${preferred}, ${fmt(
    hi,
    p.precision,
  )}${p.unit});`;
}

// Ukuran font (dalam px) pada lebar viewport tertentu, untuk preview
export function sizeAt(p: Params, viewportPx: number): number {
  const { slope, intercept, scale } = line(p);
  const lo = Math.min(p.minFont, p.maxFont);
  const hi = Math.max(p.minFont, p.maxFont);
  const value = intercept + slope * (viewportPx / scale);
  return Math.min(hi, Math.max(lo, value)) * scale;
}
