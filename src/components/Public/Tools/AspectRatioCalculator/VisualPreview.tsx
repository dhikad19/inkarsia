"use client";

import { Aspect } from "./utils";

const STAGE_REM = 16; // tinggi area preview

export default function VisualPreview({ aspect }: { aspect: Aspect }) {
  const ratio = aspect.w / aspect.h;

  return (
    <div className="space-y-3">
      <div
        className="flex items-center justify-center rounded-xl border bg-muted/40 p-4"
        style={{ height: `${STAGE_REM + 2}rem` }}
      >
        <div
          className="flex items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-foreground/30 bg-background text-center"
          style={{
            aspectRatio: `${aspect.w} / ${aspect.h}`,
            // lebar dibatasi supaya tinggi tidak melebihi area preview
            width: `min(100%, ${(STAGE_REM * ratio).toFixed(3)}rem)`,
          }}
        >
          <div className="px-2">
            <div className="text-sm font-medium">
              {aspect.w} × {aspect.h}
            </div>
            <div className="text-xs text-muted-foreground">{aspect.ratio}</div>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Preview diperkecil agar muat, proporsinya tetap sama.
      </p>
    </div>
  );
}
