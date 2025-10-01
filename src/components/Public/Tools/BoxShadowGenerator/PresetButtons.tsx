"use client";
import React from "react";
import { ShadowLayer } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface Props {
  onSelect: (layers: ShadowLayer[]) => void;
}

const presets: { name: string; layers: ShadowLayer[] }[] = [
  {
    name: "Soft",
    layers: [
      {
        offsetX: 0,
        offsetY: 8,
        blur: 24,
        spread: -4,
        color: "#00000033",
        inset: false,
        opacity: 0,
      },
    ],
  },
  {
    name: "Neon",
    layers: [
      {
        offsetX: 0,
        offsetY: 0,
        blur: 20,
        spread: 0,
        color: "#00ffff",
        inset: false,
        opacity: 0,
      },
    ],
  },
  {
    name: "Neumorphism",
    layers: [
      {
        offsetX: 6,
        offsetY: 6,
        blur: 16,
        spread: 0,
        color: "#00000020",
        inset: false,
        opacity: 0,
      },
      {
        offsetX: -6,
        offsetY: -6,
        blur: 16,
        spread: 0,
        color: "#ffffffcc",
        inset: false,
        opacity: 0,
      },
    ],
  },
  {
    name: "Hard Drop",
    layers: [
      {
        offsetX: 0,
        offsetY: 12,
        blur: 0,
        spread: 0,
        color: "#00000080",
        inset: false,
        opacity: 0,
      },
    ],
  },
  {
    name: "Layered Card",
    layers: [
      {
        offsetX: 0,
        offsetY: 2,
        blur: 4,
        spread: 0,
        color: "#00000022",
        inset: false,
        opacity: 0,
      },
      {
        offsetX: 0,
        offsetY: 8,
        blur: 16,
        spread: -4,
        color: "#00000033",
        inset: false,
        opacity: 0,
      },
    ],
  },
];

export default function PresetButtons({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((p) => (
        <Button
          key={p.name}
          size="sm"
          variant="secondary"
          onClick={() => onSelect(p.layers)}
        >
          {p.name}
        </Button>
      ))}
    </div>
  );
}
