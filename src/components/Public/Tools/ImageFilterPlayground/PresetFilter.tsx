"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { presets } from "@/lib/filters";

export default function PresetFilters({
  setFilters,
}: {
  setFilters: (f: any) => void;
}) {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Preset Filters</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {presets.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            onClick={() => setFilters(preset.values)}
          >
            {preset.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
