"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  easing: string;
  duration: number;
  playing?: boolean;
  /** ubah nilainya untuk me-restart animasi dari awal */
  runId?: number;
  className?: string;
};

export default function AnimatedBall({
  easing,
  duration,
  playing = true,
  runId = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  // buat animasi (dan buat ulang saat reset)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // left 0→100% + translateX 0→-100% = bola selalu pas di dalam container
    const anim = el.animate(
      [
        { left: "0%", transform: "translateX(0)" },
        { left: "100%", transform: "translateX(-100%)" },
      ],
      { duration: 1000, iterations: Infinity, direction: "alternate" },
    );
    animRef.current = anim;
    return () => {
      anim.cancel();
      animRef.current = null;
    };
  }, [runId]);

  // update timing tanpa restart animasi
  useEffect(() => {
    animRef.current?.effect?.updateTiming({
      duration: duration * 1000,
      easing,
    });
  }, [easing, duration, runId]);

  useEffect(() => {
    const anim = animRef.current;
    if (!anim) return;
    if (playing) anim.play();
    else anim.pause();
  }, [playing, runId]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-y-0 my-auto rounded-full bg-primary",
        className,
      )}
    />
  );
}
