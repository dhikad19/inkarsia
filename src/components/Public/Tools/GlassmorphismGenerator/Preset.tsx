"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  PREVIEW_BACKGROUND,
  PRESETS,
  getGlassStyle,
  isSameConfig,
  type GlassConfig,
} from "./utils";

type Props = {
  config: GlassConfig;
  onSelect: (config: GlassConfig) => void;
};

export default function Presets({ config, onSelect }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preset Styles</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {PRESETS.map((preset) => {
          const active = isSameConfig(config, preset.config);
          return (
            <button
              key={preset.name}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(preset.config)}
              className={cn(
                "overflow-hidden rounded-lg border transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active && "ring-2 ring-primary",
              )}>
              <div
                className="flex h-28 items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: PREVIEW_BACKGROUND }}>
                <div
                  className="flex h-16 w-28 items-center justify-center text-xs text-white"
                  style={getGlassStyle(preset.config)}>
                  {preset.name}
                </div>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
