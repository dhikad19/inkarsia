"use client";

import React, { useState } from "react";
import CalculateAspectRatio from "./CalculateAspectRatio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Aspect = {
  ratio: string;
  decimal: number;
  percent: number;
  w: number;
  h: number;
};

type Props = {
  mode: "calculate" | "scale" | "find";
  width: number;
  height: number;
  aspect: Aspect;
  onChangeWidth: (v: number) => void;
  onChangeHeight: (v: number) => void;
};

/**
 * This component handles all calculator logic for each mode:
 * - calculate ratio
 * - scale dimensions
 * - find dimension from aspect ratio
 */
export default function CalculatorForm({
  mode,
  width,
  height,
  aspect,
  onChangeWidth,
  onChangeHeight,
}: Props) {
  const [scale, setScale] = useState<number>(100);
  const [findType, setFindType] = useState<"width" | "height">("width");
  const [findValue, setFindValue] = useState<number>(1920);

  const handleScale = () => {
    onChangeWidth(Math.round(width * (scale / 100)));
    onChangeHeight(Math.round(height * (scale / 100)));
  };

  const handleFind = () => {
    if (findType === "width") {
      const newHeight = Math.round(findValue / aspect.decimal);
      onChangeWidth(findValue);
      onChangeHeight(newHeight);
    } else {
      const newWidth = Math.round(findValue * aspect.decimal);
      onChangeWidth(newWidth);
      onChangeHeight(findValue);
    }
  };

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
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Current Width</Label>
            <Input type="number" value={width} readOnly />
          </div>
          <div>
            <Label>Current Height</Label>
            <Input type="number" value={height} readOnly />
          </div>
          <div>
            <Label>Scale (%)</Label>
            <Input
              type="number"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value || 0))}
            />
          </div>
        </div>
        <Button onClick={handleScale}>Apply Scale</Button>
      </div>
    );
  }

  if (mode === "find") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Find by</Label>
            <select
              className="border rounded px-2 py-1 w-full bg-background"
              value={findType}
              onChange={(e) =>
                setFindType(e.target.value as "width" | "height")
              }
            >
              <option value="width">Width</option>
              <option value="height">Height</option>
            </select>
          </div>
          <div>
            <Label>{findType === "width" ? "Width (px)" : "Height (px)"}</Label>
            <Input
              type="number"
              value={findValue}
              onChange={(e) => setFindValue(Number(e.target.value || 0))}
            />
          </div>
        </div>
        <Button onClick={handleFind}>Calculate Other Side</Button>
      </div>
    );
  }

  return null;
}
