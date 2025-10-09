// components/aspect-ratio/CalculateAspectRatio.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Aspect = {
  ratio: string;
  decimal: number;
  percent: number;
  w: number;
  h: number;
};

type Props = {
  width: number;
  height: number;
  onChangeWidth: (v: number) => void;
  onChangeHeight: (v: number) => void;
  aspect: Aspect;
};

export default function CalculateAspectRatio({
  width,
  height,
  onChangeWidth,
  onChangeHeight,
  aspect,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Width (px)</Label>
          <Input
            type="number"
            value={width}
            onChange={(e) => onChangeWidth(Number(e.target.value || 0))}
            min={1}
          />
        </div>
        <div>
          <Label>Height (px)</Label>
          <Input
            type="number"
            value={height}
            onChange={(e) => onChangeHeight(Number(e.target.value || 0))}
            min={1}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 border rounded">
          <div className="text-xs text-muted-foreground">Aspect Ratio</div>
          <div className="font-medium text-lg">{aspect.ratio}</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-xs text-muted-foreground">Decimal</div>
          <div className="font-medium text-lg">{aspect.decimal}</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-xs text-muted-foreground">
            Percentage (padding-top)
          </div>
          <div className="font-medium text-lg">{aspect.percent}%</div>
        </div>
      </div>
    </div>
  );
}
