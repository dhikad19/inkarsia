import { ChildItem, ParentConfig } from "./types";

export const uid = (prefix = "") =>
  prefix + Math.random().toString(36).slice(2, 9);

export function defaultParentConfig(): ParentConfig {
  return {
    cols: "repeat(2, 1fr)",
    rows: "repeat(2, 110px)",
    gap: 16,
    childCount: 4,
  };
}

export function makeDefaultChildren(n: number) {
  return Array.from({ length: n }).map((_, i) => ({
    id: uid("c"),
    label: `Item ${i + 1}`,
    colStart: undefined,
    colSpan: 1,
    rowStart: undefined,
    rowSpan: 1,
    useSubgrid: false,
  })) as ChildItem[];
}

export function parentGridCss(cfg: ParentConfig) {
  return `display: grid;
grid-template-columns: ${cfg.cols};
grid-template-rows: ${cfg.rows};
gap: ${cfg.gap}px;`;
}

export function childCss(item: ChildItem) {
  const parts: string[] = [];
  if (item.colStart !== undefined)
    parts.push(`grid-column: ${item.colStart} / span ${item.colSpan ?? 1};`);
  else if (item.colSpan && item.colSpan > 1)
    parts.push(`grid-column: span ${item.colSpan};`);
  if (item.rowStart !== undefined)
    parts.push(`grid-row: ${item.rowStart} / span ${item.rowSpan ?? 1};`);
  else if (item.rowSpan && item.rowSpan > 1)
    parts.push(`grid-row: span ${item.rowSpan};`);
  if (item.useSubgrid)
    parts.push(
      `display: grid; grid-template-columns: subgrid; grid-template-rows: subgrid;`
    );
  return parts.join("\n");
}
