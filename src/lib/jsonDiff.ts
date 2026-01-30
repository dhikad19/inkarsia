// lib/jsonDiff.ts
export type DiffType = "missing" | "type" | "value";

export interface DiffItem {
  type: "missing" | "type" | "value";
  path: string;
  side: "left" | "right";
  line?: number; // 1-based
  endLine?: number; // optional
  left?: any;
  right?: any;
  leftLine?: number;
  rightLine?: number;
}

export function diffJson(left: any, right: any, path = ""): DiffItem[] {
  const diffs: DiffItem[] = [];

  if (typeof left !== typeof right) {
    diffs.push({ path, type: "type", left, right });
    return diffs;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const max = Math.max(left.length, right.length);
    for (let i = 0; i < max; i++) {
      if (!(i in left)) {
        diffs.push({
          path: `${path}[${i}]`,
          type: "missing",
          right: right[i],
        });
      } else if (!(i in right)) {
        diffs.push({
          path: `${path}[${i}]`,
          type: "missing",
          left: left[i],
        });
      } else {
        diffs.push(...diffJson(left[i], right[i], `${path}[${i}]`));
      }
    }
    return diffs;
  }

  if (typeof left === "object" && left !== null) {
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);

    keys.forEach((key) => {
      const newPath = path ? `${path}.${key}` : key;
      if (!(key in left)) {
        diffs.push({
          path: newPath,
          type: "missing",
          right: right[key],
        });
      } else if (!(key in right)) {
        diffs.push({
          path: newPath,
          type: "missing",
          left: left[key],
        });
      } else {
        diffs.push(...diffJson(left[key], right[key], newPath));
      }
    });

    return diffs;
  }

  if (left !== right) {
    diffs.push({ path, type: "value", left, right });
  }

  return diffs;
}
