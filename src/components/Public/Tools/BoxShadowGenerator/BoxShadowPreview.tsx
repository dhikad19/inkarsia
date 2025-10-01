"use client";
import React from "react";
import { ShadowLayer } from "@/lib/types";

interface Props {
  layers: ShadowLayer[];
}

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

export default function BoxShadowPreview({ layers }: Props) {
  const boxShadow = layers
    .map(
      (l) =>
        `${l.inset ? "inset " : ""}${l.offsetX}px ${l.offsetY}px ${l.blur}px ${
          l.spread
        }px ${hexToRgba(l.color, l.opacity)}`
    )
    .join(", ");

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-48 h-48 rounded-xl bg-white" style={{ boxShadow }} />
    </div>
  );
}
