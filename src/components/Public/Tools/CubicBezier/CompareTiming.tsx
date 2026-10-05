"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getCompareList } from "./utils";
import AnimatedBall from "./AnimatedBall";

type Props = { bezier: string; duration: number };

export default function CompareTiming({ bezier, duration }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare Timing Functions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {getCompareList(bezier).map(({ name, easing }) => (
          <div key={name} className="flex items-center gap-3">
            <span
              className={cn(
                "w-24 shrink-0 text-sm text-muted-foreground",
                name === "Custom" && "font-medium text-foreground",
              )}>
              {name}
            </span>
            <div className="relative h-8 flex-1 overflow-hidden rounded-md bg-muted">
              <div className="relative mx-1 h-full">
                <AnimatedBall
                  easing={easing}
                  duration={duration}
                  className="size-6"
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
