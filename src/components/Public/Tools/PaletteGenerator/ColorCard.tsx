// /components/ColorCard.tsx
"use client";
import React, { useState } from "react";
import { ColorItem } from "@/utils/colors";
import copy from "copy-to-clipboard";
import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
extend([mixPlugin]);
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  color: ColorItem;
  onToggleLock: (id: string) => void;
  onToggleLike: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (hex: string) => void;
  dragHandleProps?: any; // <-- tambahan baru
};

export default function ColorCard({
  color,
  onToggleLock,
  onToggleLike,
  onDelete,
  onCopy,
  dragHandleProps, // <-- terima handle dari parent
}: Props) {
  const [showShades, setShowShades] = useState(false);
  const base = colord(color.hex);

  const shades = Array.from(
    new Set([
      ...Array.from({ length: 10 }, (_, i) =>
        base.mix("#ffffff", (10 - i) * 0.06).toHex()
      ),
      base.toHex(),
      ...Array.from({ length: 9 }, (_, i) =>
        base.mix("#000000", (i + 1) * 0.06).toHex()
      ),
    ])
  );

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border dark:border-slate-700 flex flex-col">
      <div
        className="relative h-44 md:h-56 flex flex-col items-center justify-center overflow-hidden"
        style={{ background: color.hex }}>
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
          <div className="flex gap-2">
            <button
              onClick={() => onToggleLock(color.id)}
              className={`p-2 rounded-md bg-white/60 backdrop-blur ${
                color.locked ? "ring-2 ring-blue-400" : ""
              }`}
              title="Lock">
              {color.locked ? "🔒" : "🔓"}
            </button>
            <button
              onClick={() => onToggleLike(color.id)}
              className={`p-2 rounded-md bg-white/60 backdrop-blur ${
                color.liked ? "ring-2 ring-pink-400" : ""
              }`}
              title="Like">
              ❤️
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                copy(color.hex);
                onCopy(color.hex);
              }}
              className="p-2 rounded-md bg-white/60"
              title="Copy hex">
              📋
            </button>
            <button
              onClick={() => onDelete(color.id)}
              className="p-2 rounded-md bg-white/60 hover:bg-red-100"
              title="Delete">
              🗑️
            </button>
          </div>
        </div>

        <div className="text-center px-3 py-2 rounded-md bg-black/30 backdrop-blur-sm">
          <div className="text-white font-semibold text-base md:text-lg capitalize">
            {color.name}
          </div>
          <div
            onClick={() => {
              copy(color.hex);
              onCopy(color.hex);
            }}
            className="mt-2 cursor-pointer select-none text-xs md:text-sm font-mono text-white"
            title="Click to copy">
            {color.hex}
          </div>
        </div>

        {/* Tombol drag handle */}
        <button
          {...dragHandleProps} // ← gunakan drag handle props dari SortableItem
          className="absolute bottom-2 right-2 z-50 text-xs md:text-sm px-3 py-1 bg-white/80 rounded-md font-medium hover:bg-white/90 transition cursor-grab active:cursor-grabbing select-none"
          title="Drag to reorder">
          ↔️
        </button>

        {/* Toggle Shades */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowShades((prev) => !prev);
          }}
          className="absolute bottom-2 right-12 z-50 text-xs md:text-sm px-3 py-1 bg-white/80 rounded-md font-medium hover:bg-white/90 transition cursor-pointer select-none">
          {showShades ? "Hide shades ▲" : "Show shades ▼"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showShades && (
          <motion.div
            key="shades"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col w-full overflow-hidden">
            {shades.map((shade, i) => {
              const isParent = shade.toLowerCase() === color.hex.toLowerCase();
              return (
                <div
                  key={`${shade}-${i}`}
                  className={`h-8 md:h-9 relative group transition-transform hover:scale-[1.02] ${
                    isParent ? "ring-2 ring-white dark:ring-sky-400 z-10" : ""
                  }`}
                  style={{ backgroundColor: shade }}
                  onClick={() => {
                    copy(shade);
                    onCopy(shade);
                  }}
                  title={isParent ? "Parent color" : "Click to copy"}>
                  <span className="absolute inset-0 flex items-center justify-center text-xs md:text-sm font-mono text-white bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity">
                    {shade}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
