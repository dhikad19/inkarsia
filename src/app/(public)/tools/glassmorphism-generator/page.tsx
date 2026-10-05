"use client";

import { useState } from "react";
import ToolLayout from "@/components/Public/Tools/ToolLayout";
import Preview from "@/components/Public/Tools/GlassmorphismGenerator/Preview";
import BackdropControls from "@/components/Public/Tools/GlassmorphismGenerator/BackdropControls";
import BackgroundControls from "@/components/Public/Tools/GlassmorphismGenerator/BackgroundControls";
import Presets from "@/components/Public/Tools/GlassmorphismGenerator/Preset";
import GeneratedCSS from "@/components/Public/Tools/GlassmorphismGenerator/GenerateCss";
import {
  DEFAULT_CONFIG,
  type GlassConfig,
} from "@/components/Public/Tools/GlassmorphismGenerator/utils";

export default function GlassmorphismPage() {
  const [config, setConfig] = useState<GlassConfig>(DEFAULT_CONFIG);

  const update = <K extends keyof GlassConfig>(key: K, value: GlassConfig[K]) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  return (
    <ToolLayout
      title="Glassmorphism Generator"
      description="Tweak backdrop filter, background, and border to craft a glass effect, then copy the CSS.">
      <Presets config={config} onSelect={setConfig} />
      <Preview config={config} />

      <div className="grid gap-6 md:grid-cols-2">
        <BackdropControls config={config} onChange={update} />
        <BackgroundControls config={config} onChange={update} />
      </div>

      <GeneratedCSS config={config} />
    </ToolLayout>
  );
}
