import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SliderControl from "./SliderControl";
import type { GlassConfig } from "./utils";

type Props = {
  config: GlassConfig;
  onChange: <K extends keyof GlassConfig>(
    key: K,
    value: GlassConfig[K],
  ) => void;
};

function ColorField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-3">
        <Input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-14 cursor-pointer p-1"
        />
        <span className="font-mono text-xs uppercase text-muted-foreground">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function BackgroundControls({ config, onChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Background & Border</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <ColorField
          id="backgroundColor"
          label="Background Color"
          value={config.backgroundColor}
          onChange={(v) => onChange("backgroundColor", v)}
        />
        <SliderControl
          id="backgroundOpacity"
          label="Background Opacity"
          value={config.backgroundOpacity}
          min={0}
          max={1}
          step={0.01}
          onChange={(v) => onChange("backgroundOpacity", v)}
        />
        <ColorField
          id="borderColor"
          label="Border Color"
          value={config.borderColor}
          onChange={(v) => onChange("borderColor", v)}
        />
        <SliderControl
          id="borderOpacity"
          label="Border Opacity"
          value={config.borderOpacity}
          min={0}
          max={1}
          step={0.01}
          onChange={(v) => onChange("borderOpacity", v)}
        />
        <SliderControl
          id="borderRadius"
          label="Border Radius"
          value={config.borderRadius}
          min={0}
          max={50}
          step={1}
          unit="px"
          onChange={(v) => onChange("borderRadius", v)}
        />
      </CardContent>
    </Card>
  );
}
