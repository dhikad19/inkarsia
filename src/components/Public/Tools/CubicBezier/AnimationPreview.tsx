"use client";

import { useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import AnimatedBall from "./AnimatedBall";

type Props = {
  bezier: string;
  duration: number;
  setDuration: (v: number) => void;
};

export default function AnimationPreview({
  bezier,
  duration,
  setDuration,
}: Props) {
  const [playing, setPlaying] = useState(true);
  const [runId, setRunId] = useState(0);

  const reset = () => {
    setRunId((n) => n + 1);
    setPlaying(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Animation Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause /> : <Play />}
            {playing ? "Pause" : "Play"}
          </Button>
          <Button size="sm" variant="outline" onClick={reset}>
            <RotateCcw />
            Reset
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="duration">Duration</Label>
            <span className="text-sm tabular-nums text-muted-foreground">
              {duration.toFixed(1)}s
            </span>
          </div>
          <Slider
            id="duration"
            value={[duration]}
            min={0.5}
            max={5}
            step={0.1}
            onValueChange={([v]) => setDuration(v)}
          />
        </div>

        <div className="relative h-16 overflow-hidden rounded-lg bg-muted">
          <div className="relative mx-2 h-full">
            <AnimatedBall
              easing={bezier}
              duration={duration}
              playing={playing}
              runId={runId}
              className="size-8"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
