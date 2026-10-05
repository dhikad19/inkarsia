"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PRESETS,
  matchesPreset,
  type FlexProperties,
  type Preset,
} from "./utils";

type Props = {
  properties: FlexProperties;
  onSelect: (preset: Preset) => void;
};

export default function PresetLayouts({ properties, onSelect }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preset Layouts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const active = matchesPreset(properties, preset);
          return (
            <Button
              key={preset.name}
              size="sm"
              variant={active ? "default" : "outline"}
              aria-pressed={active}
              onClick={() => onSelect(preset)}>
              {preset.name}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
