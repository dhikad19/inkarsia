"use client";

import { cn } from "@/lib/utils";
import { PRESETS, ShadowLayer, buildPreset, toBoxShadow } from "./utils";

type Props = {
  layers: ShadowLayer[];
  onSelect: (layers: ShadowLayer[]) => void;
};

export default function PresetButtons({ layers, onSelect }: Props) {
  const current = toBoxShadow(layers);

  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((p) => {
        const isActive = current === p.css;
        return (
          <button
            key={p.name}
            type="button"
            onClick={() => onSelect(buildPreset(p.name))}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {p.name}
          </button>
        );
      })}
    </div>
  );
}
