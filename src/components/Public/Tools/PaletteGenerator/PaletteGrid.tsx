"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
extend([mixPlugin]);

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import ColorCard from "./ColorCard";
import PaletteControls from "./PaletteControls";
import { ColorItem } from "@/utils/colors";
import useLocalStorageState from "use-local-storage-state";
import { nameForHex } from "./NameResolver";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import {
  cryptoRandomId,
  generateShades,
  randomColorName,
  randomHex,
} from "@/utils/colors";
import copy from "copy-to-clipboard";

export default function PaletteGrid({
  initialCount = 5,
}: {
  initialCount?: number;
}) {
  const MAX_COLORS = 10;
  const [colors, setColors] = useLocalStorageState<ColorItem[]>("palette_v1", {
    defaultValue: [],
  });
  const [toast, setToast] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Saat pertama kali load, coba baca warna dari URL hash
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const hexes = hash.split("-").filter(Boolean);
      const arr: ColorItem[] = hexes.map((hex) => {
        const normalizedHex = hex.startsWith("#") ? hex : `#${hex}`;
        const shades = generateShades(normalizedHex, 6);
        return {
          id: cryptoRandomId(),
          hex: shades[0],
          name: nameForHex(shades[0]) ?? randomColorName(),
          locked: false,
          liked: false,
          shades,
        };
      });
      if (arr.length > 0) setColors(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (colors.length === 0) return;
    const hexString = colors.map((c) => c.hex.replace("#", "")).join("-");
    window.history.replaceState(null, "", `#${hexString}`);
  }, [colors]);

  // === INIT ===
  useEffect(() => {
    if (!colors || colors.length === 0) {
      const arr: ColorItem[] = Array.from({ length: initialCount }).map(() => {
        const hex = randomHex();
        const shades = generateShades(hex, 6);
        return {
          id: cryptoRandomId(),
          hex: shades[0],
          name: nameForHex(shades[0]) ?? randomColorName(),
          locked: false,
          liked: false,
          shades,
        } as ColorItem;
      });
      setColors(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // === DND ===
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setColors((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  // === TOAST ===
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1700);
  };

  // === ACTIONS ===
  const regenerate = () => {
    setColors((prev) =>
      prev.map((c) => {
        if (c.locked) return c;
        const hex = randomHex();
        const shades = generateShades(hex, 6);
        return {
          id: cryptoRandomId(),
          hex: shades[0],
          name: nameForHex(shades[0]) ?? randomColorName(),
          locked: false,
          liked: false,
          shades,
        };
      })
    );
    showToast("Regenerated (unlocked)");
  };

  const randomizeNames = () => {
    setColors((prev) =>
      prev.map((c) => ({ ...c, name: nameForHex(c.hex) ?? randomColorName() }))
    );
    showToast("Names updated");
  };

  const lockAll = () => {
    setColors((prev) => prev.map((c) => ({ ...c, locked: true })));
    showToast("All locked");
  };
  const unlockAll = () => {
    setColors((prev) => prev.map((c) => ({ ...c, locked: false })));
    showToast("All unlocked");
  };

  const toggleLock = (id: string) =>
    setColors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, locked: !c.locked } : c))
    );

  const toggleLike = (id: string) =>
    setColors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, liked: !c.liked } : c))
    );

  const deleteColor = (id: string) => {
    setColors((prev) => prev.filter((c) => c.id !== id));
    showToast("Deleted");
  };

  const addColor = async () => {
    if (colors.length >= MAX_COLORS) return showToast("Max colors reached");
    const hex = randomHex();
    const shades = generateShades(hex, 6);
    setColors((prev) => [
      ...prev,
      {
        id: cryptoRandomId(),
        hex: shades[0],
        name: nameForHex(shades[0]) ?? randomColorName(),
        locked: false,
        liked: false,
        shades,
      },
    ]);
    showToast("Added color");
  };

  const copyHex = (hex: string) => {
    copy(hex);
    showToast(`${hex} copied`);
  };

  const exportJSON = () => {
    const data = JSON.stringify(colors, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    saveAs(blob, `palette-${Date.now()}.json`);
    showToast("JSON downloaded");
  };

  const exportPNG = async () => {
    if (!containerRef.current) return showToast("Nothing to export");
    try {
      const node = containerRef.current;
      const blob = await htmlToImage.toBlob(node, {
        cacheBust: true,
        useCORS: true,
        pxWidth: node.scrollWidth * 2,
        pxHeight: node.scrollHeight * 2,
      });
      if (!blob) throw new Error("Export failed");
      saveAs(blob, `palette-${Date.now()}.png`);
      showToast("PNG exported");
    } catch {
      showToast("Export failed");
    }
  };

  // === BLEND BUTTON POS ===
  const blendPositions =
    colors.length < MAX_COLORS
      ? colors.slice(0, -1).map((_, i) => (i + 1) / colors.length)
      : [];

  const addMixedColor = (leftId: string, rightId: string) => {
    setColors((prev) => {
      if (prev.length >= MAX_COLORS) {
        showToast("Max colors reached");
        return prev;
      }
      const leftIndex = prev.findIndex((c) => c.id === leftId);
      const rightIndex = prev.findIndex((c) => c.id === rightId);
      if (leftIndex === -1 || rightIndex === -1) return prev;
      const mixedHex = colord(prev[leftIndex].hex)
        .mix(prev[rightIndex].hex, 0.5)
        .toHex();
      const shades = generateShades(mixedHex, 6);
      const newColor: ColorItem = {
        id: cryptoRandomId(),
        hex: shades[0],
        name: nameForHex(shades[0]) ?? randomColorName(),
        locked: false,
        liked: false,
        shades,
      };
      const newColors = [...prev];
      newColors.splice(rightIndex, 0, newColor);
      return newColors;
    });
    showToast("Mixed color added");
  };

  // === UI ===
  return (
    <div className="relative w-full">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold">Palette Generator</h2>
          <p className="text-sm text-slate-600">
            Generate up to 10 colors. Drag to reorder, lock to protect from
            regenerate.
          </p>
        </div>
        <PaletteControls
          onGenerate={regenerate}
          onRandomizeNames={randomizeNames}
          onLockAll={lockAll}
          onUnlockAll={unlockAll}
          onExportJSON={exportJSON}
          onExportPNG={exportPNG}
          onAddColor={addColor}
          disableAdd={colors.length >= MAX_COLORS}
        />
      </div>

      {/* Container warna utama (flex responsive) */}
      <div
        ref={containerRef}
        className="
    w-full 
    flex flex-col 
    md:grid 
    transition-all 
    gap-2 md:gap-0
  "
        style={{
          gridTemplateColumns: `repeat(${colors.length}, 1fr)`,
        }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToHorizontalAxis]}>
          <SortableContext
            items={colors.map((c) => c.id)}
            strategy={rectSortingStrategy}>
            {colors.map((c) => (
              <SortableItem id={c.id} key={c.id}>
                <ColorCard
                  color={c}
                  onToggleLock={toggleLock}
                  onToggleLike={toggleLike}
                  onDelete={deleteColor}
                  onCopy={copyHex}
                />
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Tombol blend muncul di hover antar warna */}
      {colors.length < MAX_COLORS &&
        blendPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 flex items-center justify-center pointer-events-none"
            style={{
              left: `${pos * 100}%`,
              transform: "translateX(-50%)",
              width: "12%",
            }}>
            <div className="group relative flex items-center justify-center w-full h-full pointer-events-auto">
              <div className="absolute inset-0 cursor-pointer" />
              <button
                onClick={() => addMixedColor(colors[i].id, colors[i + 1].id)}
                className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 bg-white border border-gray-300 shadow-md rounded-full w-9 h-9 flex items-center justify-center text-lg hover:bg-sky-50 z-[999]"
                title="Blend colors">
                ＋
              </button>
            </div>
          </div>
        ))}

      {/* Toast */}
      {toast && (
        <div className="fixed right-6 bottom-6 bg-black/90 text-white px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
