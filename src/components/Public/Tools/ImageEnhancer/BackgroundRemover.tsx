"use client";
import React, { useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";

export default function BackgroundRemover() {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [resultURL, setResultURL] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageURL(url);
    setResultURL(null);
    setProgress(0);
    setError(null);
  };

  // ✅ Progress handler sesuai API baru (type, current, total)
  const handleProgress = (type: string, current: number, total: number) => {
    if (total > 0) {
      const percent = Math.round((current / total) * 100);
      setProgress(percent);
    } else {
      setProgress(0);
    }
  };

  const handleRemoveBackground = async () => {
    if (!imageURL) return;
    setProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const blob = await removeBackground(imageURL, {
        progress: handleProgress,
        model: "isnet_fp16",
        output: {
          quality: 0.98,
          format: "image/png",
        },
        refinement: {
          cleanEdges: true,
          smoothMask: true,
        },
      });

      const enhancedBlob = await smoothEdges(blob, imageURL);
      const url = URL.createObjectURL(enhancedBlob);
      setResultURL(url);
    } catch (err) {
      console.error("❌ Background removal failed:", err);
      setError("Failed to process image.");
    } finally {
      setProcessing(false);
      setProgress(100);
    }
  };

  // ✨ Feather smoothing dengan canvas blur
  const smoothEdges = async (blob: Blob, originalURL: string) => {
    return new Promise<Blob>((resolve) => {
      const img = new Image();
      const result = new Image();
      img.crossOrigin = "anonymous";
      result.crossOrigin = "anonymous";

      img.onload = () => {
        result.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
          })!;
          canvas.width = img.width;
          canvas.height = img.height;

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = "rgba(0,0,0,0)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Sedikit blur untuk memperhalus tepi
          ctx.filter = "blur(0.6px)";
          ctx.drawImage(result, 0, 0, canvas.width, canvas.height);
          ctx.filter = "none";

          canvas.toBlob((b) => resolve(b!), "image/png", 0.98);
        };
        result.src = URL.createObjectURL(blob);
      };
      img.src = originalURL;
    });
  };

  const handleDownload = () => {
    if (!resultURL) return;
    const a = document.createElement("a");
    a.href = resultURL;
    a.download = "background-removed.png";
    a.click();
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        🪄 AI Background Remover (Imgly v2 Stable)
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Upload Image
      </button>

      {imageURL && (
        <img
          src={imageURL}
          alt="Preview"
          className="w-64 h-auto rounded-md border border-gray-300 shadow-sm"
        />
      )}

      {processing && (
        <div className="w-64 mt-2 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <button
        disabled={!imageURL || processing}
        onClick={handleRemoveBackground}
        className={`px-4 py-2 rounded-lg text-white transition ${
          processing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {processing ? `Processing ${progress || 0}%...` : "Remove Background"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {resultURL && (
        <>
          <img
            src={resultURL}
            alt="Result"
            className="w-64 h-auto rounded-md border border-green-400 bg-gray-50 shadow-md"
          />
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Download PNG
          </button>
        </>
      )}
    </div>
  );
}
