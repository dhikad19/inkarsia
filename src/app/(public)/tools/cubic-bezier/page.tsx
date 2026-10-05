"use client";

import { useState } from "react";
import ToolLayout from "@/components/Public/Tools/ToolLayout";
import PresetTimingFunctions from "@/components/Public/Tools/CubicBezier/PresetTimingFunctions";
import CurveEditor from "@/components/Public/Tools/CubicBezier/CurveEditor";
import AnimationPreview from "@/components/Public/Tools/CubicBezier/AnimationPreview";
import CompareTiming from "@/components/Public/Tools/CubicBezier/CompareTiming";
import GeneratedCSS from "@/components/Public/Tools/CubicBezier/GenerateCss";
import {
  DEFAULT_POINTS,
  toBezier,
  type BezierPoints,
} from "@/components/Public/Tools/CubicBezier/utils";

export default function CubicBezierStudio() {
  const [points, setPoints] = useState<BezierPoints>(DEFAULT_POINTS);
  const [duration, setDuration] = useState(2);

  const bezier = toBezier(points);

  return (
    <ToolLayout
      title="Cubic-Bezier Studio"
      description="Design custom CSS timing functions with a visual curve editor.">
      <PresetTimingFunctions value={points} onSelect={setPoints} />

      <div className="grid gap-6 md:grid-cols-2">
        <CurveEditor value={points} onChange={setPoints} />
        <AnimationPreview
          bezier={bezier}
          duration={duration}
          setDuration={setDuration}
        />
      </div>

      <CompareTiming bezier={bezier} duration={duration} />
      <GeneratedCSS bezier={bezier} duration={duration} />
    </ToolLayout>
  );
}
