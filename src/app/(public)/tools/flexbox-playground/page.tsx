"use client";

import { useState } from "react";
import ToolLayout from "@/components/Public/Tools/ToolLayout";
import FlexContainer from "@/components/Public/Tools/FlexboxPlayground/FlexContainer";
import ContainerProperties from "@/components/Public/Tools/FlexboxPlayground/ContainerProperties";
import PresetLayouts from "@/components/Public/Tools/FlexboxPlayground/PresetLayouts";
import GeneratedCSS from "@/components/Public/Tools/FlexboxPlayground/GenerateCss";
import {
  DEFAULT_ITEM_COUNT,
  DEFAULT_PROPERTIES,
  MAX_ITEMS,
  MIN_ITEMS,
  resolvePreset,
  type FlexProperties,
  type Preset,
} from "@/components/Public/Tools/FlexboxPlayground/utils";

export default function FlexboxPlayground() {
  const [properties, setProperties] =
    useState<FlexProperties>(DEFAULT_PROPERTIES);
  const [count, setCount] = useState(DEFAULT_ITEM_COUNT);

  const changeProperty = <K extends keyof FlexProperties>(
    key: K,
    value: FlexProperties[K],
  ) => setProperties((prev) => ({ ...prev, [key]: value }));

  const applyPreset = (preset: Preset) => {
    setProperties(resolvePreset(preset));
    setCount(preset.items ?? DEFAULT_ITEM_COUNT);
  };

  const reset = () => {
    setProperties(DEFAULT_PROPERTIES);
    setCount(DEFAULT_ITEM_COUNT);
  };

  return (
    <ToolLayout
      title="Flexbox Playground"
      description="Experiment with flex container properties and copy the generated CSS.">
      <PresetLayouts properties={properties} onSelect={applyPreset} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FlexContainer
            count={count}
            properties={properties}
            onAdd={() => setCount((c) => Math.min(MAX_ITEMS, c + 1))}
            onRemove={() => setCount((c) => Math.max(MIN_ITEMS, c - 1))}
            onReset={reset}
          />
        </div>
        <ContainerProperties
          properties={properties}
          onChange={changeProperty}
        />
      </div>

      <GeneratedCSS properties={properties} />
    </ToolLayout>
  );
}
