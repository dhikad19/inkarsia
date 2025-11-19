import SliderControl from "./SliderControl";

export default function BackdropControls({ config, setConfig }: any) {
  return (
    <div className="p-5 border rounded-xl space-y-5">
      <h2 className="text-xl font-semibold">Backdrop Filter Controls</h2>

      <SliderControl
        label="Blur"
        value={config.blur}
        min={0}
        max={40}
        step={1}
        onChange={(v: number) => setConfig((c: any) => ({ ...c, blur: v }))}
      />

      <SliderControl
        label="Brightness"
        value={config.brightness}
        min={50}
        max={200}
        step={1}
        onChange={(v: number) =>
          setConfig((c: any) => ({ ...c, brightness: v }))
        }
      />

      <SliderControl
        label="Contrast"
        value={config.contrast}
        min={50}
        max={200}
        step={1}
        onChange={(v: number) => setConfig((c: any) => ({ ...c, contrast: v }))}
      />

      <SliderControl
        label="Saturation"
        value={config.saturation}
        min={0}
        max={300}
        step={1}
        onChange={(v: number) =>
          setConfig((c: any) => ({ ...c, saturation: v }))
        }
      />
    </div>
  );
}
