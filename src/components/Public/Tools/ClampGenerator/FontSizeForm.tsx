"use client";

import { TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SegmentedControl from "@/components/Public/Tools/SegmentedControl";
import { Params, Unit } from "./utils";

type Props = {
  params: Params;
  onChange: (p: Params) => void;
  error: string | null;
};

const UNITS: { value: Unit; label: string }[] = [
  { value: "rem", label: "rem" },
  { value: "em", label: "em" },
  { value: "px", label: "px" },
];

const toNum = (v: string) => Math.max(0, Number(v) || 0);

function NumberField({
  label,
  value,
  step,
  onChange,
}: {
  label: string;
  value: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type="number"
        min={0}
        step={step}
        value={value || ""}
        onChange={(e) => onChange(toNum(e.target.value))}
      />
    </div>
  );
}

export default function FontSizeForm({ params, onChange, error }: Props) {
  const set = <K extends keyof Params>(key: K, value: Params[K]) =>
    onChange({ ...params, [key]: value });

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Font unit</Label>
        <SegmentedControl
          options={UNITS}
          value={params.unit}
          onChange={(v) => set("unit", v)}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberField
          label={`Min font size (${params.unit})`}
          value={params.minFont}
          step={0.05}
          onChange={(v) => set("minFont", v)}
        />
        <NumberField
          label={`Max font size (${params.unit})`}
          value={params.maxFont}
          step={0.05}
          onChange={(v) => set("maxFont", v)}
        />
        <NumberField
          label="Min viewport (px)"
          value={params.minWidth}
          onChange={(v) => set("minWidth", v)}
        />
        <NumberField
          label="Max viewport (px)"
          value={params.maxWidth}
          onChange={(v) => set("maxWidth", v)}
        />
      </div>

      <div className="space-y-2">
        <Label>Precision (decimal digits)</Label>
        <Input
          type="number"
          min={0}
          max={8}
          className="w-24"
          value={params.precision}
          onChange={(e) =>
            set(
              "precision",
              Math.min(8, Math.max(0, Math.round(Number(e.target.value) || 0))),
            )
          }
        />
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border bg-muted/40 p-3 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
