"use client";

import { useMemo } from "react";
import { contrastRatio } from "@/lib/utils";

export default function PalettePreview({
  palette,
  name,
  sim,
}: {
  palette: string[];
  name: string;
  sim: string;
}) {
  const items = useMemo(
    () =>
      palette.map((c, i) => ({ hex: c, idx: i, contrast: contrastRatio(c) })),
    [palette]
  );

  const filterClass = sim === "normal" ? "" : `palette-sim--${sim}`;

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm text-slate-500">
              Preview palet dan pemeriksaan kontras.
            </p>
          </div>
          <div className="text-sm text-slate-600">{items.length} warna</div>
        </div>

        <div
          className={`mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-${Math.min(
            6,
            Math.max(3, items.length)
          )} gap-3 ${filterClass}`}
        >
          {items.map((it) => (
            <div key={it.idx} className="rounded overflow-hidden shadow">
              <div className="palette-swatch" style={{ background: it.hex }}>
                <div className="text-sm">{it.hex.toUpperCase()}</div>
              </div>
              <div className="p-2 bg-white flex justify-between items-center">
                <div className="text-xs">
                  Contrast: {it.contrast.toFixed(2)}
                </div>
                <div>
                  <button className="text-xs px-2 py-1 border rounded mr-2">
                    Copy
                  </button>
                  <button className="text-xs px-2 py-1 border rounded">
                    Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Preview pada UI</h3>
          <div
            className="mt-3 p-4 rounded"
            style={{ background: palette[0] || "#f3f4f6" }}
          >
            <h4 className="text-white font-bold">Judul aplikasi</h4>
            <p className="text-sm text-white/90">
              Contoh teks di atas latar utama.
            </p>
            <div className="mt-3">
              <button
                className="px-3 py-2 rounded"
                style={{ background: palette[1] || "#111827", color: "#fff" }}
              >
                Primary
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Simulator sederhana</h3>
          <p className="text-sm text-slate-600">
            Gunakan simulator buta warna untuk cek perbedaan visual.
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Sponsorship / Tools</h3>
          <p className="text-sm">
            Tautan afiliasi:{" "}
            <a className="text-sky-600" href="#">
              ColorAnalyzer Pro
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
