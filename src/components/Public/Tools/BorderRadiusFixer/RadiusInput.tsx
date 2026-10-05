"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const MAX_RADIUS = 100;

interface RadiusInputProps {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
}

export function RadiusInputs({
  id,
  label,
  value,
  min = 0,
  max = MAX_RADIUS,
  step = 1,
  onChange,
}: RadiusInputProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div className="space-y-2">
      <Label htmlFor={`${id}-input`}>{label}</Label>
      <div className="flex items-center gap-4">
        <Slider
          id={id}
          className="flex-1"
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={(val) => onChange(val[0])}
        />
        <Input
          id={`${id}-input`}
          type="number"
          min={min}
          max={max}
          className="w-20"
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || 0))}
        />
      </div>
    </div>
  );
}
