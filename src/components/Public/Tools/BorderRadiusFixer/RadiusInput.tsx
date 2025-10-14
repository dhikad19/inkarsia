"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  max = 100,
  step = 1,
  onChange,
}: RadiusInputProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="flex items-center gap-3">
        <Slider
          id={id}
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={(val) => onChange(val[0])}
        />
        <Input
          id={`${id}-input`}
          type="number"
          className="w-20"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
