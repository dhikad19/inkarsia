export type RibbonStyle =
  | "flat"
  | "fold"
  | "shadow"
  | "stitched"
  | "double"
  | "gradient"
  | "outline";

export interface RibbonConfig {
  style: RibbonStyle;
  color: string;
  height: number;
  text: string;
}
