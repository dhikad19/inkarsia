"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type Props = {
  cols: string;
  rows: string;
  gap: number;
  setCols: (val: string) => void;
  setRows: (val: string) => void;
  setGap: (val: number) => void;
};

export default function GridConfig({
  cols,
  rows,
  gap,
  setCols,
  setRows,
  setGap,
}: Props) {
  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h2 className="font-semibold">Grid Configuration</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Parent Grid Columns</Label>
          <Input value={cols} onChange={(e) => setCols(e.target.value)} />
        </div>
        <div>
          <Label>Parent Grid Rows</Label>
          <Input value={rows} onChange={(e) => setRows(e.target.value)} />
        </div>
      </div>
      <div>
        <Label>Grid Gap</Label>
        <Slider
          defaultValue={[gap]}
          max={64}
          step={4}
          onValueChange={(v) => setGap(v[0])}
        />
        <span>{gap}px</span>
      </div>
    </div>
  );
}
