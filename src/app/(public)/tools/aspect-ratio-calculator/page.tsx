"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolLayout from "@/components/Public/Tools/ToolLayout";
import SegmentedControl from "@/components/Public/Tools/SegmentedControl";
import CalculatorForm from "@/components/Public/Tools/AspectRatioCalculator/CalculatorForm";
import CommonAspectRatios from "@/components/Public/Tools/AspectRatioCalculator/CommonAspectRatio";
import VisualPreview from "@/components/Public/Tools/AspectRatioCalculator/VisualPreview";
import GeneratedCSS from "@/components/Public/Tools/AspectRatioCalculator/GenerateCss";
import {
  getAspect,
  Mode,
} from "@/components/Public/Tools/AspectRatioCalculator/utils";

const MODES: { value: Mode; label: string }[] = [
  { value: "calculate", label: "Calculate Ratio" },
  { value: "scale", label: "Scale Dimensions" },
  { value: "find", label: "Find Dimension" },
];

const FORM_TITLE: Record<Mode, string> = {
  calculate: "Calculate Aspect Ratio",
  scale: "Scale Dimensions",
  find: "Find Dimension",
};

export default function AspectRatioPage() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [mode, setMode] = useState<Mode>("calculate");

  const aspect = useMemo(() => getAspect(width, height), [width, height]);

  return (
    <ToolLayout
      title="Aspect Ratio Calculator"
      description="Calculate aspect ratios, scale dimensions, and generate CSS."
    >
      <SegmentedControl
        options={MODES}
        value={mode}
        onChange={setMode}
        className="w-full sm:w-auto"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">{FORM_TITLE[mode]}</CardTitle>
            </CardHeader>
            <CardContent>
              <CalculatorForm
                mode={mode}
                width={width}
                height={height}
                aspect={aspect}
                onChangeWidth={setWidth}
                onChangeHeight={setHeight}
              />
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Common Ratios</CardTitle>
            </CardHeader>
            <CardContent>
              <CommonAspectRatios
                aspect={aspect}
                onSelect={(w, h) => {
                  setWidth(w);
                  setHeight(h);
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Visual Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <VisualPreview aspect={aspect} />
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Generated CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <GeneratedCSS aspect={aspect} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
