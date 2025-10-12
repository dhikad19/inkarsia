// /components/Palette.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  ColorItem,
  makeRandomColorItem,
  makeRandomColorItemSync,
  generateShades,
} from "../utils/colors";
import ColorCard from "./ColorCard";
import PaletteControls from "./PaletteControls";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // we'll create this
import html2canvas from "html2canvas";

const STORAGE_KEY = "palette_v1";

export default function Palette({
  initialCount = 5,
}: {
  initialCount?: number;
}) {
  const [colors, setColors] = useState<ColorItem[]>(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_KEY)
          : null;
      if (raw) {
        const parsed = JSON.parse(raw) as ColorItem[];
        return parsed;
      }
    } catch (e) {
      // ignore
    }
    // fallback initial sync items
    return Array.from({ length: initialCount }).map(() =>
      makeRandomColorItemSync()
    );
  });

  const [toast, setToast] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  }, [colors]);

  // sensors for dnd-kit
  const sensors = useSensors(useSensor(PointerSensor));

  async function regenerate() {
    // only regenerate unlocked colors
    // use async factory to grab good names if color-namer available
    const next = await Promise.all(
      colors.map(async (c) => {
        if (c.locked) return c;
        const item = await makeRandomColorItem();
        // preserve like state? reset liked false
        return { ...item, liked: false, locked: false };
      })
    );
    setColors(next);
    showToast("Palette regenerated");
  }

  function regenerateSync() {
    setColors((prev) =>
      prev.map((c) => (c.locked ? c : makeRandomColorItemSync()))
    );
    showToast("Palette regenerated (sync)");
  }

  function randomizeNames() {
    // try to get new names via dynamic import; fallback will be applied in util
    (async () => {
      const next = await Promise.all(
        colors.map(async (c) => {
          const item = await makeRandomColorItem(); // this creates new color but we just need name; it's ok, we'll keep hex
          return { ...c, name: item.name };
        })
      );
      setColors(next);
      showToast("Names randomized");
    })();
  }

  function lockAll() {
    setColors((prev) => prev.map((c) => ({ ...c, locked: true })));
    showToast("All locked");
  }
  function unlockAll() {
    setColors((prev) => prev.map((c) => ({ ...c, locked: false })));
    showToast("All unlocked");
  }
  function toggleLock(id: string) {
    setColors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, locked: !c.locked } : c))
    );
  }
  function toggleLike(id: string) {
    setColors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, liked: !c.liked } : c))
    );
  }
  function deleteColor(id: string) {
    setColors((prev) => prev.filter((c) => c.id !== id));
  }
  function addColor() {
    makeRandomColorItem().then((newItem) => {
      setColors((prev) => [...prev, newItem]);
      showToast("Color added");
    });
  }

  // copy hex
  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      showToast(`${hex} copied`);
    } catch (e) {
      showToast("Copy failed");
    }
  };

  // export JSON
  function exportJSON() {
    const data = JSON.stringify(colors, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `palette-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("JSON downloaded");
  }

  // export PNG via html2canvas
  async function exportPNG() {
    if (!rootRef.current) return showToast("Nothing to export");
    try {
      // ensure white background for better png
      const node = rootRef.current;
      const canvas = await html2canvas(node, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      const data = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = data;
      a.download = `palette-${Date.now()}.png`;
      a.click();
      showToast("PNG exported");
    } catch (e) {
      showToast("Export failed");
    }
  }

  // small toast helper
  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

  // DnD handlers from @dnd-kit sortables
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColors((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // update a color's shades (if user wants to change shade intensity) - optional helper
  function updateColorShades(id: string, newShades: string[]) {
    setColors((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, shades: newShades, hex: newShades[0] } : c
      )
    );
  }

  return (
    <section className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Palette Generator</h1>
            <p className="text-sm text-slate-600">
              Drag to reorder, click hex to copy. Locked colors are preserved on
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
          />
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={addColor}
            className="px-3 py-2 rounded bg-white/90 border">
            + Add color
          </button>
          <button onClick={regenerateSync} className="px-3 py-2 rounded border">
            Regenerate (fast)
          </button>
        </div>

        <div ref={rootRef} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
              items={colors.map((c) => c.id)}
              strategy={rectSortingStrategy}>
              {colors.map((c) => (
                <SortableItem key={c.id} id={c.id}>
                  <ColorCard
                    color={c}
                    onToggleLock={toggleLock}
                    onToggleLike={toggleLike}
                    onDelete={deleteColor}
                    onCopy={copy}
                  />
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {toast && (
          <div className="fixed right-6 bottom-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </section>
  );
}
