"use client";

import { useState, useEffect } from "react";
import PaletteEditor from "@/components/Public/Tools/ColorBlindPalleteSugestion/PalleteEditor";
import PalettePreview from "@/components/Public/Tools/ColorBlindPalleteSugestion/PalettePreview";
import SimulatorControls from "@/components/Public/Tools/ColorBlindPalleteSugestion/SimulatorControls";
import { defaultPalettes } from "@/lib/palettes";
import { generatePaletteFor } from "@/lib/utils";

export default function Page() {
  const [palette, setPalette] = useState<string[]>(defaultPalettes[0].colors);
  const [name, setName] = useState(defaultPalettes[0].name);
  const [sim, setSim] = useState<
    "normal" | "protanopia" | "deuteranopia" | "tritanopia"
  >("normal");

  useEffect(() => {
    const newPalette = generatePaletteFor(sim);
    setPalette(newPalette);
  }, [sim]);

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-1">
          <PaletteEditor
            palette={palette}
            setPalette={setPalette}
            name={name}
            setName={setName}
          />
          <div className="mt-4">
            <h3 className="font-semibold">Simulasi buta warna</h3>
            <SimulatorControls sim={sim} setSim={setSim} />
          </div>
        </section>

        <section className="md:col-span-2">
          <PalettePreview palette={palette} name={name} sim={sim} />
        </section>
      </div>

      <footer className="mt-8 text-sm text-slate-500">
        <p>
          Built with accessibility-first design. Sponsorship / affiliate:{" "}
          <a className="text-sky-600" href="#">
            Color Tools
          </a>
        </p>
      </footer>
    </main>
  );
}
