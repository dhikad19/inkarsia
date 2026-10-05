export type Mode = "calculate" | "scale" | "find";

export type Aspect = {
  w: number; // lebar (px), sudah dibulatkan & minimal 1
  h: number; // tinggi (px)
  rw: number; // rasio tereduksi, mis. 16
  rh: number; // mis. 9
  ratio: string; // "16:9"
  decimal: number;
  percent: number; // untuk padding-top
};

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export function getAspect(width: number, height: number): Aspect {
  const w = Math.max(1, Math.round(width) || 1);
  const h = Math.max(1, Math.round(height) || 1);
  const g = gcd(w, h);
  const rw = w / g;
  const rh = h / g;
  return {
    w,
    h,
    rw,
    rh,
    ratio: `${rw}:${rh}`,
    decimal: Number((w / h).toFixed(3)),
    percent: Number(((h / w) * 100).toFixed(3)),
  };
}
