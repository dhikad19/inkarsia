import { Slider } from "@/components/ui/slider";

export default function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      />
      <div className="text-xs opacity-70">{value}</div>
    </div>
  );
}
