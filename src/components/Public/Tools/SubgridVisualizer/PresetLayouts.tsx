"use client";

import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

type Preset = {
  name: string;
  description: string;
  cols: string;
  rows: string;
  items: number;
};

const presets: Preset[] = [
  {
    name: "Basic Subgrid",
    description: "Header with subgrid",
    cols: "repeat(3, 1fr)",
    rows: "auto auto",
    items: 6,
  },
  {
    name: "Card Grid",
    description: "Cards with aligned content",
    cols: "repeat(2, 1fr)",
    rows: "repeat(2, auto)",
    items: 4,
  },
  {
    name: "Nested Subgrid",
    description: "Multiple levels",
    cols: "1fr 2fr 1fr",
    rows: "auto",
    items: 3,
  },
  {
    name: "Form Layout",
    description: "Aligned form fields",
    cols: "1fr 3fr",
    rows: "repeat(3, auto)",
    items: 6,
  },
];

export default function PresetLayouts({
  onSelect,
}: {
  onSelect: (preset: Preset) => void;
}) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-semibold mb-4">Preset Layouts</h2>
      <div className="grid grid-cols-4 gap-4">
        {presets.map((preset, i) => (
          <Card
            key={i}
            className="p-3 cursor-pointer hover:border-primary"
            onClick={() => onSelect(preset)}
          >
            <div className="h-16 bg-muted mb-2 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">
                {preset.name}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {preset.description}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
