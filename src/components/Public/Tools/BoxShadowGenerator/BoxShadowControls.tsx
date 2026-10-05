"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ShadowLayer } from "./utils";

type Props = {
  layers: ShadowLayer[];
  onChange: (layers: ShadowLayer[]) => void;
};

function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <Input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || 0))}
          className="h-7 w-16 px-2 text-right text-xs"
        />
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}

function ColorField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setDraft(value), [value]);
  useEffect(() => setMounted(true), []);

  // hanya hex 6 digit yang valid yang diteruskan ke state
  const commit = (v: string) => {
    setDraft(v);
    if (/^#[0-9a-f]{6}$/i.test(v)) onChange(v.toLowerCase());
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">Color</Label>
      <div className="flex items-center gap-2">
        {mounted ? (
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-10 shrink-0 cursor-pointer rounded-md border bg-transparent p-1"
          />
        ) : (
          // placeholder dengan ukuran sama, supaya layout tidak loncat
          <div className="h-9 w-10 shrink-0 rounded-md border" />
        )}
        <Input
          value={draft}
          maxLength={7}
          onChange={(e) => commit(e.target.value)}
          className="h-9 font-mono text-xs"
        />
      </div>
    </div>
  );
}

export default function BoxShadowControls({ layers, onChange }: Props) {
  const update = <K extends keyof ShadowLayer>(
    i: number,
    key: K,
    value: ShadowLayer[K],
  ) =>
    onChange(layers.map((l, idx) => (idx === i ? { ...l, [key]: value } : l)));

  const move = (i: number, dir: -1 | 1) => {
    const target = i + dir;
    if (target < 0 || target >= layers.length) return;
    const next = [...layers];
    [next[i], next[target]] = [next[target], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {layers.map((layer, i) => (
        <div
          key={layer.id}
          className="space-y-4 rounded-xl border bg-muted/40 p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Layer {i + 1}</h3>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                aria-label="Move layer up"
                disabled={i === 0}
                onClick={() => move(i, -1)}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                aria-label="Move layer down"
                disabled={i === layers.length - 1}
                onClick={() => move(i, 1)}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                aria-label="Delete layer"
                disabled={layers.length === 1}
                onClick={() => onChange(layers.filter((_, idx) => idx !== i))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SliderField
              label="Horizontal (X)"
              value={layer.offsetX}
              min={-50}
              max={50}
              onChange={(v) => update(i, "offsetX", v)}
            />
            <SliderField
              label="Vertical (Y)"
              value={layer.offsetY}
              min={-50}
              max={50}
              onChange={(v) => update(i, "offsetY", v)}
            />
            <SliderField
              label="Blur"
              value={layer.blur}
              min={0}
              max={100}
              onChange={(v) => update(i, "blur", v)}
            />
            <SliderField
              label="Spread"
              value={layer.spread}
              min={-50}
              max={50}
              onChange={(v) => update(i, "spread", v)}
            />
            <ColorField
              value={layer.color}
              onChange={(v) => update(i, "color", v)}
            />
            <SliderField
              label="Opacity"
              value={layer.opacity}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => update(i, "opacity", v)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id={`${layer.id}-inset`}
              checked={layer.inset}
              onCheckedChange={(v) => update(i, "inset", v)}
            />
            <Label htmlFor={`${layer.id}-inset`} className="text-sm">
              Inset
            </Label>
          </div>
        </div>
      ))}
    </div>
  );
}
