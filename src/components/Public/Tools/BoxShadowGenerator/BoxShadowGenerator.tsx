"use client";

import { useState } from "react";
import { Plus, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/Public/Tools/CodeBlock";
import SegmentedControl from "@/components/Public/Tools/SegmentedControl";
import PresetButtons from "./PresetButtons";
import BoxShadowControls from "./BoxShadowControls";
import BoxShadowPreview from "./BoxShadowPreview";
import {
  MAX_LAYERS,
  PreviewBg,
  ShadowLayer,
  createLayer,
  toCss,
} from "./utils";

export default function BoxShadowGenerator() {
  const [layers, setLayers] = useState<ShadowLayer[]>(() => [createLayer()]);
  const [background, setBackground] = useState<PreviewBg>("light");

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
      <div className="min-w-0 space-y-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Presets</CardTitle>
          </CardHeader>
          <CardContent>
            <PresetButtons layers={layers} onSelect={setLayers} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Layers</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5"
                onClick={() => setLayers([createLayer()])}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5"
                disabled={layers.length >= MAX_LAYERS}
                onClick={() => setLayers([...layers, createLayer()])}
              >
                <Plus className="h-3.5 w-3.5" />
                Add layer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <BoxShadowControls layers={layers} onChange={setLayers} />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 lg:sticky lg:top-24">
        <Card className="rounded-2xl">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Preview</CardTitle>
            <SegmentedControl
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={background}
              onChange={setBackground}
            />
          </CardHeader>
          <CardContent>
            <BoxShadowPreview layers={layers} background={background} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Generated CSS</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock label="CSS" code={toCss(layers)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
