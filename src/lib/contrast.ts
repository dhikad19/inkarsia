export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function hexToRgb(hex: string): [number, number, number] | null {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  }
  if (c.length !== 6) return null;

  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);

  return [r, g, b];
}

export function contrastRatio(fg: string, bg: string): number {
  const L1 = getLuminance(fg);
  const L2 = getLuminance(bg);
  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  return Math.round(ratio * 100) / 100;
}

export function wcagEvaluation(ratio: number) {
  return {
    normalText: ratio >= 4.5 ? "Pass AA" : "Fail AA",
    largeText: ratio >= 3 ? "Pass AA" : "Fail AA",
    enhanced: ratio >= 7 ? "Pass AAA" : "Fail AAA",
  };
}
