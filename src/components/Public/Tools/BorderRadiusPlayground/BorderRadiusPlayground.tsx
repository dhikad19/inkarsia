"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PresetStyles from "./PresetStyle";
import PreviewBox from "./PreviewBox";
import CornerControls from "./CornerControl";
import GeneratedCSS from "./GeneratedCss";
import { useState } from "react";

export default function BorderRadiusPlayground() {
  const [radius, setRadius] = useState({
    topLeft: { x: 50, y: 50 },
    topRight: { x: 50, y: 50 },
    bottomLeft: { x: 50, y: 50 },
    bottomRight: { x: 50, y: 50 },
  });

  const handleChange = (corner: string, axis: string, value: number) => {
    setRadius((prev) => ({
      ...prev,
      [corner]: { ...prev[corner], [axis]: value },
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Border-Radius Playground</CardTitle>
          <p className="text-sm text-muted-foreground">
            Create beautiful CSS border-radius effects with individual corner
            control.
          </p>
        </CardHeader>
      </Card>

      <PresetStyles setRadius={setRadius} />

      <PreviewBox radius={radius} />

      <CornerControls radius={radius} onChange={handleChange} />

      <GeneratedCSS radius={radius} />
    </div>
  );
}
