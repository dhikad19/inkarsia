"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PRESETS, isSamePoints, type BezierPoints } from "./utils";

type Props = {
  value: BezierPoints;
  onSelect: (points: BezierPoints) => void;
};

export default function PresetTimingFunctions({ value, onSelect }: Props) {
  return (
    <Card>
      <CardContent className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const active = isSamePoints(value, preset.points);
          return (
            <Button
              key={preset.name}
              size="sm"
              variant={active ? "default" : "outline"}
              aria-pressed={active}
              onClick={() => onSelect(preset.points)}>
              {preset.name}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
