"use client";

import { useState } from "react";
import PresetLayouts from "@/components/Public/Tools/SubgridVisualizer/PresetLayouts";
import InteractiveVisualizer from "@/components/Public/Tools/SubgridVisualizer/Visualizer";

export default function Page() {
  const [cols, setCols] = useState("repeat(3, 1fr)");
  const [rows, setRows] = useState("auto auto");
  const [gap, setGap] = useState(8);
  const [items, setItems] = useState(6);

  const [showLines, setShowLines] = useState(true);
  const [showNumbers, setShowNumbers] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Preset */}
      <PresetLayouts
        onSelect={(preset) => {
          setCols(preset.cols);
          setRows(preset.rows);
          setItems(preset.items);
        }}
      />

      {/* Visualizer */}
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
    </div>
  );
}
