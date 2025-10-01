import { Cell } from "./types";

export function makeCells(cols: number, rows: number): Cell[] {
  const out: Cell[] = [];
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      out.push({ id: `r${r}c${c}`, row: r, col: c, area: null });
    }
  }
  return out;
}
