import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SliderControl from "./SliderControl";
import { BACKDROP_SLIDERS, type GlassConfig } from "./utils";

type Props = {
  config: GlassConfig;
  onChange: <K extends keyof GlassConfig>(
    key: K,
    value: GlassConfig[K],
  ) => void;
};

export default function BackdropControls({ config, onChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backdrop Filter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {BACKDROP_SLIDERS.map(({ key, ...field }) => (
          <SliderControl
            key={key}
            id={key}
            {...field}
            value={config[key]}
            onChange={(v) => onChange(key, v)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
