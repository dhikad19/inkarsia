"use client";

import Preview from "@/components/Public/Tools/GlassmorphismGenerator/Preview";
import BackdropControls from "@/components/Public/Tools/GlassmorphismGenerator/BackdropControls";
import BackgroundControls from "@/components/Public/Tools/GlassmorphismGenerator/BackgroundControls";
import Presets from "@/components/Public/Tools/GlassmorphismGenerator/Preset";
import GeneratedCSS from "@/components/Public/Tools/GlassmorphismGenerator/GenerateCss";
import { useState } from "react";

export default function GlassmorphismPage() {
  const [config, setConfig] = useState({
    blur: 10,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    backgroundColor: "#ffffff",
    backgroundOpacity: 0.15,
    borderColor: "#ffffff",
    borderOpacity: 0.3,
    borderRadius: 16,
  });

  return (
    <div className="p-10 space-y-10">
      <h1 className="text-3xl font-bold">Glassmorphism Generator</h1>

      <Preview config={config} />

      <BackdropControls config={config} setConfig={setConfig} />

      <BackgroundControls config={config} setConfig={setConfig} />

      <Presets setConfig={setConfig} />

      <GeneratedCSS config={config} />
    </div>
  );
}
