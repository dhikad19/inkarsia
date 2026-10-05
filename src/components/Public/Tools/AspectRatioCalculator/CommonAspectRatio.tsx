"use client";

import { cn } from "@/lib/utils";
import { Aspect } from "./utils";

const COMMON = [
  { ratio: "16:9", label: "HD", w: 16, h: 9 },
  { ratio: "4:3", label: "Standard", w: 4, h: 3 },
  { ratio: "1:1", label: "Square", w: 1, h: 1 },
  { ratio: "21:9", label: "Ultrawide", w: 21, h: 9 },
  { ratio: "9:16", label: "Vertical", w: 9, h: 16 },
  { ratio: "3:2", label: "Photo", w: 3, h: 2 },
  { ratio: "2.39:1", label: "Cinematic", w: 239, h: 100 },
];

type Props = {
  aspect: Aspect;
  onSelect: (w: number, h: number) => void;
};

export default function CommonAspectRatios({ aspect, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {COMMON.map((c) => {
        // bandingkan lewat perkalian silang, bukan string
        const isActive = aspect.w * c.h === aspect.h * c.w;
        // skala supaya sisi terpanjang ≈ 1920px, rasio tetap persis
        const k = Math.max(1, Math.round(1920 / Math.max(c.w, c.h)));

        return (
          <button
            key={c.ratio}
            type="button"
            onClick={() => onSelect(c.w * k, c.h * k)}
            className={cn(
              "flex flex-col items-center rounded-xl border px-3 py-2.5 transition-colors",
              isActive
                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                : "hover:bg-muted",
            )}
          >
            <span className="text-sm font-medium">{c.ratio}</span>
            <span
              className={cn(
                "text-[11px]",
                isActive ? "opacity-70" : "text-muted-foreground",
              )}
            >
              {c.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
