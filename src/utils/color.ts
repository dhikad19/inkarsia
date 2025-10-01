export function parseHexColor(hex: string): { color: string; opacity: number } {
  if (hex.length === 9) {
    const r = hex.slice(1, 3);
    const g = hex.slice(3, 5);
    const b = hex.slice(5, 7);
    const a = parseInt(hex.slice(7, 9), 16) / 255;
    return { color: `#${r}${g}${b}`, opacity: parseFloat(a.toFixed(2)) };
  }
  return { color: hex, opacity: 1 };
}
