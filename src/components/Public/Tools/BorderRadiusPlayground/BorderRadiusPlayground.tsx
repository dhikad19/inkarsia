"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/Public/Tools/CodeBlock";
import PresetStyles from "./PresetStyle";
import PreviewBox from "./PreviewBox";
import CornerControls from "./CornerControl";
import {
  Axis,
  CornerKey,
  DEFAULT_RADIUS,
  Radius,
  toBorderRadius,
} from "./utils";

export default function BorderRadiusPlayground() {
  const [radius, setRadius] = useState<Radius>(DEFAULT_RADIUS);

  const handleChange = (corner: CornerKey, axis: Axis, value: number) => {
    setRadius((prev) => ({
      ...prev,
      [corner]: { ...prev[corner], [axis]: value },
    }));
  };

  const value = toBorderRadius(radius);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Presets</CardTitle>
          </CardHeader>
          <CardContent>
            <PresetStyles radius={radius} onSelect={setRadius} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Corners</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5"
              onClick={() => setRadius(DEFAULT_RADIUS)}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </CardHeader>
          <CardContent>
            <CornerControls radius={radius} onChange={handleChange} />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 lg:sticky lg:top-24">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <PreviewBox borderRadius={value} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Generated CSS</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock label="CSS" code={`border-radius: ${value};`} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
