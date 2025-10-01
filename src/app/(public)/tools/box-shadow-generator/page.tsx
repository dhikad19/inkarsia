"use client";

import React, { useState } from "react";
import { ShadowLayer } from "@/lib/types";
import BoxShadowPreview from "@/components/Public/Tools/BoxShadowGenerator/BoxShadowPreview";
import BoxShadowControls from "@/components/Public/Tools/BoxShadowGenerator/BoxShadowControls";
import BoxShadowCode from "@/components/Public/Tools/BoxShadowGenerator/BoxShadowCode";
import PresetButtons from "@/components/Public/Tools/BoxShadowGenerator/PresetButtons";

export default function BoxShadowGeneratorPage() {
  const [layers, setLayers] = useState<ShadowLayer[]>([
    {
      offsetX: 0,
      offsetY: 4,
      blur: 6,
      spread: 0,
      color: "#000000",
      opacity: 0.3,
      inset: false,
    },
  ]);

  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-2xl font-bold">🎨 CSS Box-Shadow Generator</h1>
      <p className="text-muted-foreground">
        Create beautiful shadows with multiple layers. Real-time preview &
        presets.
      </p>

      <PresetButtons onSelect={setLayers} />

      <div className="grid md:grid-cols-2 gap-8">
        <BoxShadowControls layers={layers} onChange={setLayers} />
        <BoxShadowPreview layers={layers} />
      </div>

      <BoxShadowCode layers={layers} />
    </div>
  );
}
