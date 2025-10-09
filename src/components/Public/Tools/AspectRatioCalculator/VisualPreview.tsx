// components/aspect-ratio/VisualPreview.tsx
"use client";

import React from "react";

type Aspect = {
  ratio: string;
  decimal: number;
  percent: number;
  w: number;
  h: number;
};

type Props = {
  width: number;
  height: number;
  aspect: Aspect;
};

export default function VisualPreview({ width, height, aspect }: Props) {
  // padding-top trick for responsive box
  const paddingTop = `${aspect.percent}%`;

  return (
    <div>
      <div className="mb-3 text-sm text-muted-foreground">
        Preview (relative size)
      </div>

      <div className="border rounded-md p-4 bg-surface-2">
        <div className="max-w-full mx-auto" style={{ width: "100%" }}>
          <div
            className="relative rounded-md overflow-hidden border"
            style={{ maxWidth: 560, margin: "0 auto" }}
          >
            <div style={{ width: "100%", position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  paddingTop,
                  background: "linear-gradient(180deg,#081018,#0b1a1a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="text-center text-white/80">
                    <div className="text-xs">PREVIEW</div>
                    <div className="text-sm font-medium">
                      {width} × {height}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1">
                      {aspect.ratio}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-3">
          Tip: Preview uses the padding-top trick so height scales with width.
        </div>
      </div>
    </div>
  );
}
