"use client";
import React from "react";
import { ShadowLayer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ArrowUp, ArrowDown, X } from "lucide-react";

interface Props {
  layers: ShadowLayer[];
  onChange: (layers: ShadowLayer[]) => void;
}

export default function BoxShadowControls({ layers, onChange }: Props) {
  const updateLayer = (i: number, key: keyof ShadowLayer, value: any) => {
    const newLayers = [...layers];
    newLayers[i] = { ...newLayers[i], [key]: value };
    onChange(newLayers);
  };

  const moveLayer = (i: number, dir: "up" | "down") => {
    const newLayers = [...layers];
    const target = dir === "up" ? i - 1 : i + 1;
    if (target < 0 || target >= layers.length) return;
    [newLayers[i], newLayers[target]] = [newLayers[target], newLayers[i]];
    onChange(newLayers);
  };

  return (
    <div className="space-y-6">
      {layers.map((layer, i) => (
        <div key={i} className="rounded-lg border p-4 space-y-4 bg-muted/20">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm">Layer {i + 1}</h3>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => moveLayer(i, "up")}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => moveLayer(i, "down")}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                disabled={layers.length === 1}
                onClick={() => onChange(layers.filter((_, idx) => idx !== i))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Horizontal & Vertical */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs block mb-1">Horizontal (X)</label>
              <Slider
                value={[layer.offsetX]}
                min={-50}
                max={50}
                onValueChange={([v]) => updateLayer(i, "offsetX", v)}
              />
              <Input
                type="number"
                value={layer.offsetX}
                onChange={(e) =>
                  updateLayer(i, "offsetX", Number(e.target.value))
                }
              />
            </div>

            <div>
              <label className="text-xs block mb-1">Vertical (Y)</label>
              <Slider
                value={[layer.offsetY]}
                min={-50}
                max={50}
                onValueChange={([v]) => updateLayer(i, "offsetY", v)}
              />
              <Input
                type="number"
                value={layer.offsetY}
                onChange={(e) =>
                  updateLayer(i, "offsetY", Number(e.target.value))
                }
              />
            </div>
          </div>

          {/* Blur & Spread */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs block mb-1">Blur</label>
              <Slider
                value={[layer.blur]}
                min={0}
                max={100}
                onValueChange={([v]) => updateLayer(i, "blur", v)}
              />
              <Input
                type="number"
                value={layer.blur}
                onChange={(e) => updateLayer(i, "blur", Number(e.target.value))}
              />
            </div>

            <div>
              <label className="text-xs block mb-1">Spread</label>
              <Slider
                value={[layer.spread]}
                min={-50}
                max={50}
                onValueChange={([v]) => updateLayer(i, "spread", v)}
              />
              <Input
                type="number"
                value={layer.spread}
                onChange={(e) =>
                  updateLayer(i, "spread", Number(e.target.value))
                }
              />
            </div>
          </div>

          {/* Color + Opacity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs block mb-1">Color</label>
              <Input
                type="color"
                value={layer.color}
                onChange={(e) => updateLayer(i, "color", e.target.value)}
              />
              <Input
                type="text"
                value={layer.color}
                onChange={(e) => updateLayer(i, "color", e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs block mb-1">Opacity</label>
              <Slider
                value={[layer.opacity ?? 1]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={([v]) => updateLayer(i, "opacity", v)}
              />
              <Input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={layer.opacity ?? 1}
                onChange={(e) =>
                  updateLayer(i, "opacity", parseFloat(e.target.value))
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={layer.inset}
              onCheckedChange={(v) => updateLayer(i, "inset", v)}
            />
            <span className="text-xs">Inset</span>
          </div>
        </div>
      ))}
    </div>
  );
}
