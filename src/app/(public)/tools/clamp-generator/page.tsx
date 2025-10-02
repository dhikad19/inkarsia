"use client";

import { useState, useMemo } from "react";
import FontSizeForm from "@/components/Public/Tools/ClampGenerator/FontSizeForm";
import OutputBox from "@/components/Public/Tools/ClampGenerator/OutputBox";
import PreviewText from "@/components/Public/Tools/ClampGenerator/PreviewText";

export default function ClampGeneratorPage() {
  const [minFont, setMinFont] = useState(1.45);
  const [maxFont, setMaxFont] = useState(1.88);
  const [minWidth, setMinWidth] = useState(375);
  const [maxWidth, setMaxWidth] = useState(1444);
  const [unit, setUnit] = useState("rem");
  const [precision, setPrecision] = useState(6);

  const css = useMemo(() => {
    const slope = (maxFont - minFont) / (maxWidth - minWidth);
    const yAxis = -(minWidth * slope) + minFont;

    const slopeStr = slope.toFixed(precision);
    const yAxisStr = yAxis.toFixed(precision);

    return `font-size: clamp(${minFont}${unit}, calc(${yAxisStr}${unit} + ${slopeStr} * 100vw), ${maxFont}${unit});`;
  }, [minFont, maxFont, minWidth, maxWidth, unit, precision]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Clamp() Font-Size Generator</h1>

      <FontSizeForm
        minFont={minFont}
        setMinFont={setMinFont}
        maxFont={maxFont}
        setMaxFont={setMaxFont}
        minWidth={minWidth}
        setMinWidth={setMinWidth}
        maxWidth={maxWidth}
        setMaxWidth={setMaxWidth}
        unit={unit}
        setUnit={setUnit}
        precision={precision}
        setPrecision={setPrecision}
      />

      <OutputBox css={css} />

      <PreviewText css={css} />
    </div>
  );
}
