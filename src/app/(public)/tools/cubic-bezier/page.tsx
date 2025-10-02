"use client";

import { useState } from "react";
import PresetTimingFunctions from "@/components/Public/Tools/CubicBezier/PresetTimingFunctions";
import CurveEditor from "@/components/Public/Tools/CubicBezier/CurveEditor";
import AnimationPreview from "@/components/Public/Tools/CubicBezier/AnimationPreview";
import CompareTiming from "@/components/Public/Tools/CubicBezier/CompareTiming";
import GeneratedCSS from "@/components/Public/Tools/CubicBezier/GenerateCss";

export default function CubicBezierStudio() {
  const [p1x, setP1x] = useState(0.25);
  const [p1y, setP1y] = useState(0.1);
  const [p2x, setP2x] = useState(0.25);
  const [p2y, setP2y] = useState(1.0);
  const [duration, setDuration] = useState(2);

  const bezier = `cubic-bezier(${p1x}, ${p1y}, ${p2x}, ${p2y})`;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Cubic-Bezier Studio</h1>
      <p className="text-muted-foreground">
        Design custom CSS timing functions with a visual curve editor.
      </p>

      <PresetTimingFunctions
        setP1x={setP1x}
        setP1y={setP1y}
        setP2x={setP2x}
        setP2y={setP2y}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <CurveEditor
          p1x={p1x}
          p1y={p1y}
          p2x={p2x}
          p2y={p2y}
          setP1x={setP1x}
          setP1y={setP1y}
          setP2x={setP2x}
          setP2y={setP2y}
        />
        <AnimationPreview
          bezier={bezier}
          duration={duration}
          setDuration={setDuration}
        />
      </div>

      <CompareTiming bezier={bezier} />
      <GeneratedCSS bezier={bezier} duration={duration} />
    </div>
  );
}
