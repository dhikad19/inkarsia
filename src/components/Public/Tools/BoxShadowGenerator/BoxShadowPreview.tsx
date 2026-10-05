"use client";

import { PreviewBg, ShadowLayer, toBoxShadow } from "./utils";

const BG: Record<PreviewBg, string> = {
  light: "#f4f4f5",
  dark: "#18181b",
};

type Props = {
  layers: ShadowLayer[];
  background: PreviewBg;
};

export default function BoxShadowPreview({ layers, background }: Props) {
  const bg = BG[background];

  return (
    <div
      className="flex h-72 items-center justify-center overflow-hidden rounded-xl border transition-colors"
      style={{ background: bg }}
    >
      <div
        className="h-40 w-40 rounded-2xl transition-shadow duration-200"
        style={{ background: bg, boxShadow: toBoxShadow(layers) }}
      />
    </div>
  );
}
