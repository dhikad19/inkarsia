"use client";

import { useState } from "react";
import RibbonPreview from "@/components/Public/Tools/RibbonGenerator/ribbon-preview";
import RibbonGenerator from "@/components/Public/Tools/RibbonGenerator/ribbon-generator";
import RibbonCSS from "@/components/Public/Tools/RibbonGenerator/ribbon-css";
import { RibbonConfig } from "@/components/Public/Tools/RibbonGenerator/ribbon-types";

export default function RibbonPage() {
  const [config, setConfig] = useState<RibbonConfig>({
    type: "corner",
    color: "#ef4444",
    height: 30,
    position: "right",
    text: "SALE",
  });

  return (
    <div className="container mx-auto py-10 grid md:grid-cols-3 gap-8">
      <div className="col-span-2">
        <RibbonPreview config={config} />
      </div>

      <div>
        <RibbonGenerator config={config} setConfig={setConfig} />
        <RibbonCSS config={config} />
      </div>
    </div>
  );
}
