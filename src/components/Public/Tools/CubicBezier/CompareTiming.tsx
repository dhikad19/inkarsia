"use client";

import { Card } from "@/components/ui/card";

const compareList = {
  Linear: "linear",
  Ease: "ease",
  "Ease In": "ease-in",
  "Ease Out": "ease-out",
  "Ease In-Out": "ease-in-out",
};

export default function CompareTiming({ bezier }: { bezier: string }) {
  const extendedList = { ...compareList, Custom: bezier };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3">Compare Timing Functions</h3>
      <div className="space-y-3">
        {Object.entries(extendedList).map(([name, func]) => (
          <div key={name} className="flex items-center gap-3">
            <span className="w-20 text-sm">{name}</span>
            <div className="relative h-8 flex-1 overflow-hidden bg-black/5 rounded">
              <div
                className="absolute w-6 h-6 bg-primary rounded-full"
                style={{
                  animation: `moveX 2s ${func} infinite`,
                  animationDirection: "alternate",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* keyframes mengubah 'left' dari 0 → (100% - ball-size) */
        @keyframes moveX {
          from {
            left: 0;
          }
          /* 1.5rem = w-6 / h-6 (Tailwind default). Ganti jika ukuran bola berubah. */
          to {
            left: calc(100% - 1.5rem);
          }
        }
      `}</style>
    </Card>
  );
}
