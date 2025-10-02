"use client";
import React from "react";
import { GradientState } from "@/lib/types";
import { makeGradientCss } from "@/lib/gradient";

export default function GradientPreview({ state }: { state: GradientState }) {
  const css = makeGradientCss(state);

  return (
    <div className="panel bg-slate-800 rounded-lg p-4">
      <div className="text-sm mb-2 font-medium">Preview</div>
      <div
        className="h-48 rounded-lg shadow-lg overflow-hidden"
        style={{
          // apply computed background via inline style object
          // strip `background:` prefix from css helper
          background:
            css.split("background:").pop()?.trim().replace(/;$/, "") ??
            undefined,
        }}
      />
    </div>
  );
}
