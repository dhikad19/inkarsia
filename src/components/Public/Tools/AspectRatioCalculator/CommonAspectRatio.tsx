// components/aspect-ratio/CommonAspectRatios.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const COMMON = [
  { name: "16:9 (HD)", w: 16, h: 9 },
  { name: "4:3 (Standard)", w: 4, h: 3 },
  { name: "1:1 (Square)", w: 1, h: 1 },
  { name: "21:9 (Ultrawide)", w: 21, h: 9 },
  { name: "9:16 (Vertical)", w: 9, h: 16 },
  { name: "3:2 (Photo)", w: 3, h: 2 },
  { name: "2.39:1 (Cinematic)", w: 239, h: 100 }, // approximate cinematic
];

type Props = {
  onSelect: (w: number, h: number) => void;
  activeRatio?: string;
};

export default function CommonAspectRatios({ onSelect, activeRatio }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {COMMON.map((c) => {
        const ratioStr = `${c.w}:${c.h}`;
        return (
          <Button
            key={c.name}
            variant={activeRatio === ratioStr ? "default" : "outline"}
            onClick={() => onSelect(c.w * 100, c.h * 100)} // scale up to give sensible defaults
            size="sm"
          >
            <div className="flex flex-col items-center">
              <span className="text-xs">{ratioStr}</span>
              <span className="text-[11px] text-muted-foreground">
                {c.name.split(" ")[1] || c.name}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
