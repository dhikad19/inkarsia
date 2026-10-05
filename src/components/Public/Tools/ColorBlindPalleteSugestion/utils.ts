export type Sim = "normal" | "protanopia" | "deuteranopia" | "tritanopia";

export const SIMS: { value: Sim; label: string; hint: string }[] = [
  { value: "normal", label: "Normal", hint: "Typical vision" },
  { value: "protanopia", label: "Protanopia", hint: "Red-weak" },
  { value: "deuteranopia", label: "Deuteranopia", hint: "Green-weak" },
  { value: "tritanopia", label: "Tritanopia", hint: "Blue-weak" },
];

export const MAX_COLORS = 8;

// Palet yang dirancang agar tetap mudah dibedakan
export const PRESETS: { name: string; colors: string[] }[] = [
  {
    name: "Okabe-Ito",
    colors: [
      "#000000",
      "#e69f00",
      "#56b4e9",
      "#009e73",
      "#f0e442",
      "#0072b2",
      "#d55e00",
      "#cc79a7",
    ],
  },
  {
    name: "Tol Bright",
    colors: [
      "#4477aa",
      "#ee6677",
      "#228833",
      "#ccbb44",
      "#66ccee",
      "#aa3377",
      "#bbbbbb",
    ],
  },
  {
    name: "Tol Vibrant",
    colors: [
      "#ee7733",
      "#0077bb",
      "#33bbee",
      "#ee3377",
      "#cc3311",
      "#009988",
      "#bbbbbb",
    ],
  },
];

/** Terima #rgb / #rrggbb (dengan atau tanpa #), kembalikan #rrggbb atau null. */
export function normalizeHex(input: string): string | null {
  const m = input.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(m)) {
    return (
      "#" +
      m
        .split("")
        .map((c) => c + c)
        .join("")
    );
  }
  return /^[0-9a-f]{6}$/.test(m) ? "#" + m : null;
}

const toRgb = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

const toLinear = (c: number) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const toSrgb = (c: number) => {
  const v = Math.min(1, Math.max(0, c));
  const s = v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055;
  return Math.round(s * 255);
};

// Matriks Machado et al. (2009), severity 1.0, dipakai pada RGB linear
const MATRICES: Record<Exclude<Sim, "normal">, number[][]> = {
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.3039],
  ],
};

export function simulate(hex: string, sim: Sim): string {
  if (sim === "normal") return hex;
  const lin = toRgb(hex).map(toLinear);
  const m = MATRICES[sim];
  const out = m.map((row) =>
    toSrgb(row[0] * lin[0] + row[1] * lin[1] + row[2] * lin[2]),
  );
  return "#" + out.map((n) => n.toString(16).padStart(2, "0")).join("");
}

function toLab(hex: string): [number, number, number] {
  const [r, g, b] = toRgb(hex).map(toLinear);
  const x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047;
  const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}

export function deltaE(a: string, b: string): number {
  const [l1, a1, b1] = toLab(a);
  const [l2, a2, b2] = toLab(b);
  return Math.sqrt((l1 - l2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}

export const SIMILAR_BELOW = 15;

export type Pair = { i: number; j: number; de: number };

/** Pasangan warna yang sulit dibedakan setelah disimulasikan. */
export function findSimilarPairs(colors: string[], sim: Sim): Pair[] {
  const simulated = colors.map((c) => simulate(c, sim));
  const pairs: Pair[] = [];
  for (let i = 0; i < simulated.length; i++) {
    for (let j = i + 1; j < simulated.length; j++) {
      const de = deltaE(simulated[i], simulated[j]);
      if (de < SIMILAR_BELOW) pairs.push({ i, j, de });
    }
  }
  return pairs.sort((a, b) => a.de - b.de);
}

export function toCssVars(name: string, colors: string[]): string {
  const label = name.replace(/\*\//g, "").trim() || "Palette";
  const vars = colors.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n");
  return `/* ${label} */\n:root {\n${vars}\n}`;
}
