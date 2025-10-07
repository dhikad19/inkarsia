"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export default function GeneratedCSS({
  filters,
}: {
  filters: Record<string, number>;
}) {
  const css = `
.my-filtered-image {
  filter: brightness(${filters.brightness}%)
          contrast(${filters.contrast}%)
          saturate(${filters.saturate}%)
          sepia(${filters.sepia}%)
          grayscale(${filters.grayscale}%)
          invert(${filters.invert}%)
          hue-rotate(${filters.hue}deg)
          opacity(${filters.opacity}%)
          blur(${filters.blur}px);
}
`;

  const copyCSS = () => {
    navigator.clipboard.writeText(css);
  };

  return (
    <div className="bg-muted p-4 rounded-lg flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Generated CSS</h2>
        <Button size="sm" onClick={copyCSS}>
          Copy CSS
        </Button>
      </div>
      <pre className="text-sm bg-background p-3 rounded-md overflow-auto">
        {css}
      </pre>
    </div>
  );
}
