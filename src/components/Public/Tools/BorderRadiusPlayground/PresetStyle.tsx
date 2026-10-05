"use client";

import { cn } from "@/lib/utils";
import { PRESETS, Radius, isSameRadius } from "./utils";

type Props = {
  radius: Radius;
  onSelect: (r: Radius) => void;
};

export default function PresetStyles({ radius, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((p) => {
        const isActive = isSameRadius(radius, p.radius);
        return (
          <button
            key={p.name}
            type="button"
            onClick={() => onSelect(p.radius)}
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
