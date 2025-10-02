"use client";

import { useState } from "react";
import GridConfig from "./GridConfig";
import PresetLayouts from "./PresetLayouts";
import InteractiveVisualizer from "./Visualizer";
import GeneratedCSS from "./GenerateCss";

export default function SubgridVisualizer() {
  const [cols, setCols] = useState("repeat(3, 1fr)");
  const [rows, setRows] = useState("repeat(2, auto)");
  const [gap, setGap] = useState(16);
  const [items, setItems] = useState(6);

  const [activePreset, setActivePreset] = useState("Card Grid");
  const [showLines, setShowLines] = useState(true);
  const [showNumbers, setShowNumbers] = useState(false);

  const handlePreset = (preset: any) => {
    setCols(preset.cols);
    setRows(preset.rows);
    setItems(preset.items);
    setActivePreset(preset.name);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">Subgrid Visualizer</h1>
      <GridConfig
        cols={cols}
        rows={rows}
        gap={gap}
        setCols={setCols}
        setRows={setRows}
        setGap={setGap}
      />
      <PresetLayouts onSelect={handlePreset} active={activePreset} />
      <InteractiveVisualizer
        cols={cols}
        rows={rows}
        gap={gap}
        items={items}
        showLines={showLines}
        setShowLines={setShowLines}
        showNumbers={showNumbers}
        setShowNumbers={setShowNumbers}
      />
      <GeneratedCSS cols={cols} rows={rows} gap={gap} />
    </div>
  );
}
