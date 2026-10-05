"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Params, sizeAt } from "./utils";

const MIN_VIEWPORT = 280;
const MAX_VIEWPORT = 1920;

type Props = { params: Params; disabled: boolean };

export default function PreviewText({ params, disabled }: Props) {
  const [viewport, setViewport] = useState(768);
  const [text, setText] = useState(
    "Make type scale with the viewport, safely. Edit this text.",
  );

  const size = disabled ? 16 : sizeAt(params, viewport);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">
            Simulated viewport
          </Label>
          <span className="text-xs font-medium tabular-nums">
            {viewport}px → {size.toFixed(1)}px
          </span>
        </div>
        <Slider
          min={MIN_VIEWPORT}
          max={MAX_VIEWPORT}
          step={1}
          value={[viewport]}
          onValueChange={([v]) => setViewport(v)}
        />
      </div>

      <div className="min-h-32 rounded-xl border bg-muted/40 p-4">
        <textarea
          rows={3}
          className="w-full resize-none bg-transparent leading-tight outline-none"
          style={{ fontSize: `${size}px` }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Geser slider untuk melihat ukuran font di lebar layar yang berbeda.
      </p>
    </div>
  );
}
