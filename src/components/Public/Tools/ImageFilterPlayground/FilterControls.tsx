"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function FilterControls({
  filters,
  setFilters,
}: {
  filters: Record<string, number>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}) {
  const update = (key: string, val: number[]) =>
    setFilters((prev) => ({ ...prev, [key]: val[0] }));

  const resetAll = () =>
    setFilters({
      brightness: 100,
      contrast: 100,
      saturate: 100,
      sepia: 0,
      grayscale: 0,
      invert: 0,
      hue: 0,
      opacity: 100,
      blur: 0,
    });

  return (
    <div className="w-full bg-muted p-4 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filter Controls</h2>
        <Button size="sm" variant="outline" onClick={resetAll}>
          Reset All
        </Button>
      </div>

      {Object.entries(filters).map(([key, value]) => (
        <div key={key} className="flex items-center gap-3">
          <label className="capitalize w-24">{key}</label>
          <Slider
            value={[value]}
            min={key === "blur" ? 0 : 0}
            max={key === "hue" ? 360 : key === "blur" ? 10 : 200}
            step={1}
            onValueChange={(v) => update(key, v)}
          />
          <span className="w-12 text-right text-sm">{value}</span>
        </div>
      ))}
    </div>
  );
}
