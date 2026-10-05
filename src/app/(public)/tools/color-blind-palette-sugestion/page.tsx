"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolLayout from "@/components/Public/Tools/ToolLayout";
import PaletteEditor from "@/components/Public/Tools/ColorBlindPalleteSugestion/PalleteEditor";
import PalettePreview from "@/components/Public/Tools/ColorBlindPalleteSugestion/PalettePreview";
import SimulatorControls from "@/components/Public/Tools/ColorBlindPalleteSugestion/SimulatorControls";
import { cn } from "@/lib/utils";
import {
  PRESETS,
  Sim,
} from "@/components/Public/Tools/ColorBlindPalleteSugestion/utils";

export default function Page() {
  const [palette, setPalette] = useState<string[]>(PRESETS[0].colors);
  const [name, setName] = useState(PRESETS[0].name);
  const [sim, setSim] = useState<Sim>("protanopia");

  return (
    <ToolLayout
      title="Color Blind Palette Suggestion"
      description="Build a palette, then preview how it looks to people with different types of color blindness.">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <div className="min-w-0 space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">
                Color-blind safe presets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const isActive = palette.join() === p.colors.join();
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        setPalette([...p.colors]);
                        setName(p.name);
                      }}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                        isActive
                          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}>
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Your palette</CardTitle>
            </CardHeader>
            <CardContent>
              <PaletteEditor
                palette={palette}
                setPalette={setPalette}
                name={name}
                setName={setName}
              />
            </CardContent>
          </Card>
        </div>

        <div className="min-w-0 space-y-6 lg:sticky lg:top-24">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <SimulatorControls sim={sim} setSim={setSim} />
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <PalettePreview palette={palette} name={name} sim={sim} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
