"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function AnimationPreview({
  bezier,
  duration,
  setDuration,
}: {
  bezier: string;
  duration: number;
  setDuration: (v: number) => void;
}) {
  const [playing, setPlaying] = useState(false);

  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);
  const reset = () => {
    setPlaying(false);
    // trigger reflow supaya animasi reset
    void document.body.offsetHeight;
    setPlaying(true);
  };

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Animation Preview</h3>

      {/* Controls */}
      <div className="flex gap-2 mb-3">
        <Button onClick={play}>Play</Button>
        <Button onClick={pause} variant="outline">
          Pause
        </Button>
        <Button onClick={reset} variant="secondary">
          Reset
        </Button>
      </div>

      {/* Slider duration */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm">Duration:</span>
        <Slider
          value={[duration]}
          min={0.5}
          max={5}
          step={0.1}
          onValueChange={(v) => setDuration(v[0])}
          className="flex-1"
        />
        <span className="w-10 text-sm">{duration}s</span>
      </div>

      {/* Animation area */}
      <div className="h-16 relative mt-4 overflow-hidden w-full bg-black/10 rounded">
        <div
          className="w-8 h-8 rounded-full bg-primary absolute left-0 top-1/2 -translate-y-1/2"
          style={{
            animationName: "moveX",
            animationDuration: `${duration}s`,
            animationTimingFunction: bezier,
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            animationPlayState: playing ? "running" : "paused",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes moveX {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
