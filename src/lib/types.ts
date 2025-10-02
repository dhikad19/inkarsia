export interface ShadowLayer {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

export type GradientType = "linear" | "radial" | "color-mix";

export type ColorStop = {
  id: string;
  color: string;
  pos: number;
};

export type GradientState = {
  type: GradientType;
  angle: number;
  stops: ColorStop[];
  radialShape?: "ellipse" | "circle";
  radialPos?: string;
};

export type ChildItem = {
  id: string;
  label: string;
  colStart?: number;
  colSpan?: number;
  rowStart?: number;
  rowSpan?: number;
  useSubgrid?: boolean;
};

export type ParentConfig = {
  cols: number | string;
  rows: number | string;
  gap: number;
  childCount: number;
};
