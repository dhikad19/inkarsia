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

const toHex = (rgb: number[]) =>
  "#" + rgb.map((n) => Math.round(n).toString(16).padStart(2, "0")).join("");

function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// Dipotong (bukan dibulatkan) supaya 4.496 tidak tampil "4.50" padahal gagal
export const formatRatio = (r: number) =>
  (Math.floor(r * 100) / 100).toFixed(2);

export const CHECKS = [
  { label: "Normal text", level: "AA", min: 4.5 },
  { label: "Large text", level: "AA", min: 3 },
  { label: "UI components", level: "AA", min: 3 },
  { label: "Normal text", level: "AAA", min: 7 },
  { label: "Large text", level: "AAA", min: 4.5 },
];

export function getLevel(ratio: number): string {
  if (ratio >= 7) return "Excellent";
  if (ratio >= 4.5) return "Good";
  if (ratio >= 3) return "Fair";
  return "Poor";
}

const mix = (hex: string, target: [number, number, number], t: number) =>
  toHex(toRgb(hex).map((c, i) => c + (target[i] - c) * t));

/** Geser warna teks ke arah hitam/putih sampai mencapai kontras target. */
export function suggestText(
  text: string,
  bg: string,
  target = 4.5,
): string | null {
  const directions: [number, number, number][] = [
    [0, 0, 0],
    [255, 255, 255],
  ];
  const candidates = directions
    .map((dir) => {
      for (let t = 0; t <= 1.0001; t += 0.01) {
        const c = mix(text, dir, Math.min(t, 1));
        if (contrastRatio(c, bg) >= target) return { c, t };
      }
      return null;
    })
    .filter((x): x is { c: string; t: number } => x !== null);

  if (!candidates.length) return null;
  // pilih yang perubahannya paling kecil
  return candidates.sort((a, b) => a.t - b.t)[0].c;
}
