"use client";
import React, { useState } from "react";
import { ShadowLayer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { parseHexColor } from "@/utils/colors";

interface Props {
  onSelect: (layers: ShadowLayer[]) => void;
}

const rawPresets: { name: string; layers: Omit<ShadowLayer, "opacity">[] }[] = [
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
      },
      {
        offsetX: -6,
        offsetY: -6,
        blur: 16,
        spread: 0,
        color: "#ffffffcc",
        inset: false,
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
      },
      {
        offsetX: 0,
        offsetY: 8,
        blur: 16,
        spread: -4,
        color: "#00000033",
        inset: false,
      },
    ],
  },
  {
    name: "Floating",
    layers: [
      {
        offsetX: 0,
        offsetY: 15,
        blur: 35,
        spread: -5,
        color: "#00000040",
        inset: false,
      },
    ],
  },
  {
    name: "Glow",
    layers: [
      {
        offsetX: 0,
        offsetY: 0,
        blur: 25,
        spread: 5,
        color: "#ff00ff88",
        inset: false,
      },
    ],
  },
  {
    name: "Inset Soft",
    layers: [
      {
        offsetX: 0,
        offsetY: 2,
        blur: 6,
        spread: 2,
        color: "#00000033",
        inset: true,
      },
    ],
  },
  {
    name: "Retro Pop",
    layers: [
      {
        offsetX: 4,
        offsetY: 4,
        blur: 0,
        spread: 0,
        color: "#ff0000aa",
        inset: false,
      },
      {
        offsetX: 8,
        offsetY: 8,
        blur: 0,
        spread: 0,
        color: "#0000ffaa",
        inset: false,
      },
    ],
  },
  {
    name: "Ambient",
    layers: [
      {
        offsetX: 0,
        offsetY: 20,
        blur: 50,
        spread: -10,
        color: "#00000033",
        inset: false,
      },
      {
        offsetX: 0,
        offsetY: 10,
        blur: 30,
        spread: -15,
        color: "#00000022",
        inset: false,
      },
    ],
  },
];

export default function PresetButtons({ onSelect }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (name: string, rawLayers: any[]) => {
    const parsedLayers: ShadowLayer[] = rawLayers.map((l) => {
      const { color, opacity } = parseHexColor(l.color);
      return { ...l, color, opacity };
    });

    setActive(name);
    onSelect(parsedLayers);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {rawPresets.map((p) => (
        <Button
          key={p.name}
          size="sm"
          variant={active === p.name ? "default" : "secondary"}
          onClick={() => handleClick(p.name, p.layers)}>
          {p.name}
        </Button>
      ))}
    </div>
  );
}
