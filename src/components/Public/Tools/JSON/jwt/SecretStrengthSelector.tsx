import { Button } from "@/components/ui/button";
import { SecretPreset } from "./types";

interface Props {
  presets: SecretPreset[];
  value: number;
  onChange: (bytes: number) => void;
}

export function SecretStrengthSelector({ presets, value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Secret strength</p>
      <div className="flex gap-2 flex-wrap">
        {presets.map((p) => (
          <Button
            key={p.bytes}
            type="button"
            size="sm"
            variant={value === p.bytes ? "default" : "outline"}
            onClick={() => onChange(p.bytes)}
          >
            {p.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
