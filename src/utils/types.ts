export type Cell = {
  id: string;
  row: number;
  col: number;
  area?: string | null;
};

export type Area = {
  id: string;
  name: string;
  color?: string;
  cells: string[];
};
