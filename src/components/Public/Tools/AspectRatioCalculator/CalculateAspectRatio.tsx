"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Aspect } from "./utils";

type Props = {
  width: number;
  height: number;
  onChangeWidth: (v: number) => void;
  onChangeHeight: (v: number) => void;
  aspect: Aspect;
};

const toNum = (v: string) => Math.max(0, Number(v) || 0);

export default function CalculateAspectRatio({
  width,
  height,
  onChangeWidth,
  onChangeHeight,
  aspect,
}: Props) {
  const stats = [
    { label: "Ratio", value: aspect.ratio },
    { label: "Decimal", value: aspect.decimal },
    { label: "Padding-top", value: `${aspect.percent}%` },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Width (px)</Label>
          <Input
            type="number"
            min={1}
            value={width || ""}
            onChange={(e) => onChangeWidth(toNum(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label>Height (px)</Label>
          <Input
            type="number"
            min={1}
            value={height || ""}
            onChange={(e) => onChangeHeight(toNum(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="truncate text-lg font-medium">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
