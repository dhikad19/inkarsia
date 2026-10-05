"use client";

import { RibbonConfig } from "./ribbon-types";

export default function RibbonPreview({ config }: { config: RibbonConfig }) {
  const base =
    "absolute top-[20px] right-[-60px] rotate-45 text-white px-16 py-1 font-semibold";

  const styles: any = {
    flat: "",

    shadow: "shadow-lg",

    stitched: "border-y-2 border-dashed border-white",

    gradient: "bg-gradient-to-r from-red-500 to-pink-500",

    outline: "border-2 border-white",

    double: "before:absolute before:inset-0 before:bg-black/20",

    fold: "after:absolute after:-bottom-2 after:left-0 after:border-t-[10px] after:border-l-[10px] after:border-r-[10px] after:border-transparent",
  };

  return (
    <div className="relative w-full h-64 bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
      <div
        className={`${base} ${styles[config.style]}`}
        style={{ background: config.color, height: config.height }}
      >
        {config.text}
      </div>

      <span className="text-slate-400">Preview</span>
    </div>
  );
}
