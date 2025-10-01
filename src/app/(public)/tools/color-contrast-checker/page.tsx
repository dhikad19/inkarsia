"use client";
import { useState } from "react";
import ColorPicker from "@/components/Public/Tools/ColorContrastChecker/ColorPicker";
import Preview from "@/components/Public/Tools/ColorContrastChecker/Preview";
import Results from "@/components/Public/Tools/ColorContrastChecker/Results";
import { contrastRatio, wcagEvaluation } from "@/lib/contrast";

export default function ColorContrastPage() {
  const [fg, setFg] = useState("#BDBDBD");
  const [bg, setBg] = useState("#FFFFFF");

  const ratio = contrastRatio(fg, bg);
  const { normalText, largeText, enhanced } = wcagEvaluation(ratio);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Color Contrast Checker</h1>

      <div className="space-y-3">
        <ColorPicker label="Foreground" value={fg} onChange={setFg} />
        <ColorPicker label="Background" value={bg} onChange={setBg} />
      </div>

      <Preview fg={fg} bg={bg} />

      <Results
        ratio={ratio}
        normal={normalText}
        large={largeText}
        enhanced={enhanced}
      />
    </div>
  );
}
