"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import FlexContainer from "@/components/Public/Tools/FlexboxPlayground/FlexContainer";
import ContainerProperties from "@/components/Public/Tools/FlexboxPlayground/ContainerProperties";
import PresetLayouts from "@/components/Public/Tools/FlexboxPlayground/PresetLayouts";
import GeneratedCSS from "@/components/Public/Tools/FlexboxPlayground/GenerateCss";

export default function Page() {
  const [items, setItems] = useState<number[]>([1, 2, 3, 4]);
  const [properties, setProperties] = useState({
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "normal",
    gap: "10px",
  });

  const addItem = () => setItems((prev) => [...prev, prev.length + 1]);
  const removeItem = () => setItems((prev) => prev.slice(0, -1));
  const reset = () => setItems([1, 2, 3, 4]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-6 space-y-6">
      <Card className="p-4 bg-[#111] border border-neutral-800 space-y-4">
        <FlexContainer
          items={items}
          properties={properties}
          onAdd={addItem}
          onRemove={removeItem}
          onReset={reset}
        />
      </Card>

      <Card className="p-4 bg-[#111] border border-neutral-800">
        <ContainerProperties
          properties={properties}
          setProperties={setProperties}
        />
      </Card>

      <Card className="p-4 bg-[#111] border border-neutral-800">
        <PresetLayouts setProperties={setProperties} />
      </Card>

      <Card className="p-4 bg-[#111] border border-neutral-800">
        <GeneratedCSS properties={properties} />
      </Card>
    </div>
  );
}
