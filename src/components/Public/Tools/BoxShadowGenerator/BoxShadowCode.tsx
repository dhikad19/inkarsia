"use client";
import React from "react";
import { ShadowLayer } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface Props {
  layers: ShadowLayer[];
}

export default function BoxShadowCode({ layers }: Props) {
  const cssCode = `box-shadow: ${layers
    .map(
      (l) =>
        `${l.inset ? "inset " : ""}${l.offsetX}px ${l.offsetY}px ${l.blur}px ${
          l.spread
        }px ${l.color}`
    )
    .join(", ")};`;

  return (
    <div className="bg-muted/20 rounded-lg p-3 space-y-2">
      <pre className="text-xs whitespace-pre-wrap">{cssCode}</pre>
      <Button size="sm" onClick={() => navigator.clipboard.writeText(cssCode)}>
        Copy CSS
      </Button>
    </div>
  );
}
