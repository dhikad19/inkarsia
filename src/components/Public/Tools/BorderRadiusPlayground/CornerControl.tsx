"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Axis, CornerKey, MAX, Radius } from "./utils";

const CORNERS: { key: CornerKey; label: string }[] = [
  { key: "topLeft", label: "Top left" },
  { key: "topRight", label: "Top right" },
  { key: "bottomLeft", label: "Bottom left" },
  { key: "bottomRight", label: "Bottom right" },
];

const AXES: { axis: Axis; label: string }[] = [
  { axis: "x", label: "Horizontal" },
  { axis: "y", label: "Vertical" },
];

type Props = {
  radius: Radius;
  onChange: (corner: CornerKey, axis: Axis, value: number) => void;
};

export default function CornerControls({ radius, onChange }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {CORNERS.map(({ key, label }) => (
        <div key={key} className="space-y-4 rounded-xl border bg-muted/40 p-4">
          <h3 className="text-sm font-medium">{label}</h3>
          {AXES.map(({ axis, label: axisLabel }) => (
            <div key={axis} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">
                  {axisLabel}
                </Label>
                <span className="text-xs font-medium tabular-nums">
                  {radius[key][axis]}%
                </span>
              </div>
              <Slider
                min={0}
                max={MAX}
                step={1}
                value={[radius[key][axis]]}
                onValueChange={([v]) => onChange(key, axis, v)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
