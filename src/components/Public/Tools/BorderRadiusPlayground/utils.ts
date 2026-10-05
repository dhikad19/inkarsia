export type CornerKey = "topLeft" | "topRight" | "bottomRight" | "bottomLeft";
export type Axis = "x" | "y";
export type Radius = Record<CornerKey, { x: number; y: number }>;

export const MAX = 100;

// urutan sesuai shorthand CSS: TL TR BR BL
const ORDER: CornerKey[] = ["topLeft", "topRight", "bottomRight", "bottomLeft"];

const all = (x: number, y = x): Radius => ({
  topLeft: { x, y },
  topRight: { x, y },
  bottomRight: { x, y },
  bottomLeft: { x, y },
});

export const DEFAULT_RADIUS: Radius = all(30);

export const PRESETS: { name: string; radius: Radius }[] = [
  { name: "None", radius: all(0) },
  { name: "Medium", radius: all(16) },
  { name: "Large", radius: all(32) },
  { name: "Circle", radius: all(50) },
  {
    name: "Leaf",
    radius: {
      topLeft: { x: 0, y: 0 },
      topRight: { x: 50, y: 50 },
      bottomRight: { x: 0, y: 0 },
      bottomLeft: { x: 50, y: 50 },
    },
  },
  {
    name: "Organic",
    radius: {
      topLeft: { x: 60, y: 60 },
      topRight: { x: 40, y: 30 },
      bottomRight: { x: 30, y: 70 },
      bottomLeft: { x: 70, y: 40 },
    },
  },
];

export const isSameRadius = (a: Radius, b: Radius) =>
  ORDER.every((k) => a[k].x === b[k].x && a[k].y === b[k].y);

// Shorthand CSS: 1, 2, 3, atau 4 nilai, mana yang paling ringkas
function shorthand([a, b, c, d]: number[]): string {
  if (a === b && b === c && c === d) return `${a}%`;
  if (a === c && b === d) return `${a}% ${b}%`;
  if (b === d) return `${a}% ${b}% ${c}%`;
  return `${a}% ${b}% ${c}% ${d}%`;
}

export function toBorderRadius(r: Radius): string {
  const h = shorthand(ORDER.map((k) => r[k].x));
  const v = shorthand(ORDER.map((k) => r[k].y));
  return h === v ? h : `${h} / ${v}`;
}
