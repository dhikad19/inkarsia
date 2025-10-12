// /components/NameResolver.tsx
import namer from "color-namer";

/**
 * Synchronous helper (color-namer exports sync) to get a pretty name.
 * Try several palettes in order of preference.
 */
export function nameForHex(hex: string) {
  try {
    const res = namer(hex);
    const preferred = ["ntc", "pantone", "html", "basic", "roygbiv"];
    for (const p of preferred) {
      if (res[p] && res[p].length > 0 && res[p][0].name) return res[p][0].name;
    }
    // fallback to first available
    const groups = Object.values(res) as any[];
    if (groups.length && groups[0] && groups[0][0] && groups[0][0].name) {
      return groups[0][0].name;
    }
  } catch (e) {
    // ignore and fallback later
  }
  // caller should fallback if needed
  return null;
}
