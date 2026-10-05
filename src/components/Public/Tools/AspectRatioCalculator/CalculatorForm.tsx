"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SegmentedControl from "@/components/Public/Tools/SegmentedControl";
import CalculateAspectRatio from "./CalculateAspectRatio";
import { Aspect, Mode } from "./utils";

type Props = {
  mode: Mode;
  width: number;
  height: number;
  aspect: Aspect;
  onChangeWidth: (v: number) => void;
  onChangeHeight: (v: number) => void;
};

const toNum = (v: string) => Math.max(0, Number(v) || 0);

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-muted/40 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
}

export default function CalculatorForm({
  mode,
  width,
  height,
  aspect,
  onChangeWidth,
  onChangeHeight,
}: Props) {
  const [scale, setScale] = useState(100);
  const [findType, setFindType] = useState<"width" | "height">("width");
  const [findValue, setFindValue] = useState(1920);

  if (mode === "calculate") {
    return (
      <CalculateAspectRatio
        width={width}
        height={height}
        onChangeWidth={onChangeWidth}
        onChangeHeight={onChangeHeight}
        aspect={aspect}
      />
    );
  }

  if (mode === "scale") {
    const factor = scale / 100;
    const newW = Math.max(1, Math.round(aspect.w * factor));
    const newH = Math.max(1, Math.round(aspect.h * factor));

    return (
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Scale (%)</Label>
          <Input
            type="number"
            min={1}
            value={scale || ""}
            onChange={(e) => setScale(toNum(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Result label="Current" value={`${aspect.w} × ${aspect.h}`} />
          <Result label="Result" value={`${newW} × ${newH}`} />
        </div>
        <Button
          disabled={scale <= 0}
          onClick={() => {
            onChangeWidth(newW);
            onChangeHeight(newH);
          }}
        >
          Apply Scale
        </Button>
      </div>
    );
  }

  // mode === "find"
  const value = Math.round(findValue);
  const other =
    findType === "width"
      ? Math.round((value * aspect.h) / aspect.w)
      : Math.round((value * aspect.w) / aspect.h);
  const result =
    findType === "width" ? { w: value, h: other } : { w: other, h: value };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Find by</Label>
          <SegmentedControl
            options={[
              { value: "width", label: "Width" },
              { value: "height", label: "Height" },
            ]}
            value={findType}
            onChange={setFindType}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label>{findType === "width" ? "Width (px)" : "Height (px)"}</Label>
          <Input
            type="number"
            min={1}
            value={findValue || ""}
            onChange={(e) => setFindValue(toNum(e.target.value))}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Ratio" value={aspect.ratio} />
        <Result
          label={findType === "width" ? "Height" : "Width"}
          value={`${other} px`}
        />
      </div>
      <Button
        disabled={result.w < 1 || result.h < 1}
        onClick={() => {
          onChangeWidth(result.w);
          onChangeHeight(result.h);
        }}
      >
        Apply Dimensions
      </Button>
    </div>
  );
}
