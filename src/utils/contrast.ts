export function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

export function luminance([r, g, b]: number[]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function contrastRatio(color1: string, color2: string) {
  const lum1 = luminance(hexToRgb(color1));
  const lum2 = luminance(hexToRgb(color2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
}

export function getRatingScore(contrastValue: number): number {
  // Skor 0–100 (nonlinear)
  if (contrastValue >= 7) return 100;
  if (contrastValue >= 4.5) return 80;
  if (contrastValue >= 3) return 60;
  if (contrastValue >= 2) return 40;
  return 20;
}

export function getTextScore(contrastValue: number, threshold: number): number {
  // Normalisasi skor 0–5 untuk small/large text
  if (contrastValue >= threshold + 2) return 5;
  if (contrastValue >= threshold + 1) return 4;
  if (contrastValue >= threshold) return 3;
  if (contrastValue >= threshold - 0.5) return 2;
  return 1;
}
