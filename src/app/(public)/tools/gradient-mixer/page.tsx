"use client";
import React, { useEffect, useState } from "react";
import { GradientState } from "@/lib/types";
import { defaultStops, uid } from "@/lib/gradient";
import GradientPreview from "@/components/gradient-mixer/GradientPreview";
import GradientControls from "@/components/gradient-mixer/GradientControls";
import ColorStops from "@/components/gradient-mixer/ColorStops";
import PresetGradients from "@/components/gradient-mixer/PresetGradients";
import GeneratedCss from "@/components/gradient-mixer/GeneratedCss";

const initialState: GradientState = {
  type: "linear",
  angle: 90,
  stops: defaultStops(),
  radialShape: "ellipse",
  radialPos: "center",
};

export default function Page() {
  const [state, setState] = useState<GradientState>(initialState);

  // load state from ?g=... if present (share)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const g = params.get("g");
      if (g) {
        const parsed = JSON.parse(decodeURIComponent(g));
        // ensure basic shape
        if (parsed && parsed.stops) {
          // ensure ids
          const stops = parsed.stops.map((s: any) => ({
            ...s,
            id: s.id ?? uid("s"),
          }));
          setState({ ...initialState, ...parsed, stops });
        }
      }
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyPreset = (p: Partial<GradientState>) => {
    const stops = p.stops
      ? p.stops.map((s: any) => ({ ...s, id: s.id ?? uid("s") }))
      : state.stops;
    setState((s) => ({ ...s, ...p, stops }));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gradient Mixer</h1>
      <p className="text-sm text-muted-foreground">
        Create stunning CSS gradients with visual controls.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <GradientPreview state={state} />
          <GradientControls state={state} setState={setState} />
          <ColorStops state={state} setState={setState} />
        </div>

        <div className="space-y-4">
          <PresetGradients apply={applyPreset} />
          <GeneratedCss state={state} />
        </div>
      </div>
    </div>
  );
}
