import SliderControl from "./SliderControl";

export default function BackgroundControls({ config, setConfig }: any) {
  return (
    <div className="p-5 border rounded-xl space-y-5">
      <h2 className="text-xl font-semibold">Background & Border</h2>

      {/* Background Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Background Color</label>
        <input
          type="color"
          value={config.backgroundColor}
          onChange={(e) =>
            setConfig((c: any) => ({ ...c, backgroundColor: e.target.value }))
          }
        />
      </div>

      {/* Background Opacity */}
      <SliderControl
        label="Background Opacity"
        value={config.backgroundOpacity}
        min={0}
        max={1}
        step={0.01}
        onChange={(v: number) =>
          setConfig((c: any) => ({ ...c, backgroundOpacity: v }))
        }
      />

      {/* Border Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Border Color</label>
        <input
          type="color"
          value={config.borderColor}
          onChange={(e) =>
            setConfig((c: any) => ({ ...c, borderColor: e.target.value }))
          }
        />
      </div>

      {/* Border Opacity */}
      <SliderControl
        label="Border Opacity"
        value={config.borderOpacity}
        min={0}
        max={1}
        step={0.01}
        onChange={(v: number) =>
          setConfig((c: any) => ({ ...c, borderOpacity: v }))
        }
      />

      {/* Border Radius */}
      <SliderControl
        label="Border Radius"
        value={config.borderRadius}
        min={0}
        max={50}
        step={1}
        onChange={(v: number) =>
          setConfig((c: any) => ({ ...c, borderRadius: v }))
        }
      />
    </div>
  );
}
