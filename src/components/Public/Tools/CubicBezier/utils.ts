export type BezierPoints = [x1: number, y1: number, x2: number, y2: number];

export const DEFAULT_POINTS: BezierPoints = [0.25, 0.1, 0.25, 1];

// x wajib 0..1 (aturan CSS), y boleh overshoot
export const X_MIN = 0;
export const X_MAX = 1;
export const Y_MIN = -0.6;
export const Y_MAX = 1.6;

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const round = (v: number, digits = 2) => {
  const f = 10 ** digits;
  return Math.round(v * f) / f;
};

export const toBezier = (points: BezierPoints) =>
  `cubic-bezier(${points.map((v) => round(v)).join(", ")})`;

export const isSamePoints = (a: BezierPoints, b: BezierPoints) =>
  a.every((v, i) => round(v) === round(b[i]));

export type Preset = {
  name: string;
  points: BezierPoints;
  /** keyword CSS bawaan, dipakai di halaman Compare */
  keyword?: string;
};

export const PRESETS: Preset[] = [
  { name: "Linear", points: [0, 0, 1, 1], keyword: "linear" },
  { name: "Ease", points: [0.25, 0.1, 0.25, 1], keyword: "ease" },
  { name: "Ease In", points: [0.42, 0, 1, 1], keyword: "ease-in" },
  { name: "Ease Out", points: [0, 0, 0.58, 1], keyword: "ease-out" },
  { name: "Ease In-Out", points: [0.42, 0, 0.58, 1], keyword: "ease-in-out" },
  { name: "Ease Out Expo", points: [0.16, 1, 0.3, 1] },
  { name: "Ease In Back", points: [0.36, 0, 0.66, -0.56] },
  { name: "Ease Out Back", points: [0.34, 1.56, 0.64, 1] },
  { name: "Ease In-Out Back", points: [0.68, -0.6, 0.32, 1.6] },
];

export const getCompareList = (bezier: string) => [
  ...PRESETS.filter((p) => p.keyword).map((p) => ({
    name: p.name,
    easing: p.keyword as string,
  })),
  { name: "Custom", easing: bezier },
];

export const buildCss = (
  bezier: string,
  duration: number,
) => `/* CSS Timing Function */
animation-timing-function: ${bezier};
transition-timing-function: ${bezier};

/* Example usage */
.element {
  transition: transform ${duration}s ${bezier};
}

@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

.animated {
  animation: slide ${duration}s ${bezier} forwards;
}`;
