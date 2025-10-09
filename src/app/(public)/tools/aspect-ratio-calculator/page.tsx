// app/aspect-ratio/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CalculatorMode from "@/components/Public/Tools/AspectRatioCalculator/CalculatorMode";
import CalculateAspectRatio from "@/components/Public/Tools/AspectRatioCalculator/CalculateAspectRatio";
import CommonAspectRatios from "@/components/Public/Tools/AspectRatioCalculator/CommonAspectRatio";
import VisualPreview from "@/components/Public/Tools/AspectRatioCalculator/VisualPreview";
import GeneratedCSS from "@/components/Public/Tools/AspectRatioCalculator/GenerateCss";
import CalculatorForm from "@/components/Public/Tools/AspectRatioCalculator/CalculatorForm";

export default function AspectRatioPage() {
  // state lifted to page so all components share it
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [mode, setMode] = useState<"calculate" | "scale" | "find">("calculate");

  const aspect = useMemo(() => {
    // reduce ratio
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const w = Math.max(1, Math.round(width));
    const h = Math.max(1, Math.round(height));
    const g = gcd(w, h);
    const ratio = `${w / g}:${h / g}`;
    const decimal = Number((w / h).toFixed(3));
    const percent = Number(((h / w) * 100).toFixed(3)); // for padding-top
    return { ratio, decimal, percent, w, h };
  }, [width, height]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Aspect-Ratio Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Calculate aspect ratios, scale dimensions, and generate CSS. Click
            common ratios to apply.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <CalculatorMode mode={mode} onChangeMode={(m) => setMode(m)} />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calculate Aspect Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {mode === "calculate"
                      ? "Calculate Aspect Ratio"
                      : mode === "scale"
                      ? "Scale Dimensions"
                      : "Find Dimension"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalculatorForm
                    mode={mode}
                    width={width}
                    height={height}
                    onChangeWidth={setWidth}
                    onChangeHeight={setHeight}
                    aspect={aspect}
                  />
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Aspect Ratios</CardTitle>
            </CardHeader>
            <CardContent>
              <CommonAspectRatios
                onSelect={(w, h) => {
                  setWidth(w);
                  setHeight(h);
                }}
                activeRatio={aspect.ratio}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <GeneratedCSS aspect={aspect} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Visual Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <VisualPreview width={width} height={height} aspect={aspect} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
