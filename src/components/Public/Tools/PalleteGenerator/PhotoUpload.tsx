"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageColorPicker from "./Picker";

export default function PaletteFromImageDialog({
  open,
  setOpen,
  onAddColor,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onAddColor: (color: string) => void;
}) {
  const [tab, setTab] = useState<"upload" | "url" | "camera" | "stock">(
    "upload"
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // NEW: simpan src gambar terpilih
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Upload file
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const src = URL.createObjectURL(file);
    setImageSrc(src);
  };

  // URL
  const handleLoadFromUrl = () => {
    if (!url) return;
    setImageSrc(url);
  };

  // Camera
  useEffect(() => {
    if (tab === "camera") {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((s) => {
          setStream(s);
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(console.error);
    } else {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        setStream(null);
      }
    }
  }, [tab]);

  const captureFromCamera = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    setImageSrc(canvas.toDataURL());
  };

  // Stock image
  const stockImages = [
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Image picker</DialogTitle>
        </DialogHeader>

        {!imageSrc && (
          <>
            {/* Tabs */}
            <div className="border-b mb-4 flex space-x-4 text-sm">
              {["upload", "url", "camera", "stock"].map((t) => (
                <button
                  key={t}
                  className={`pb-2 capitalize ${
                    tab === t ? "border-b-2 border-black" : "text-gray-500"
                  }`}
                  onClick={() => setTab(t as any)}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Upload */}
            {tab === "upload" && (
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center text-gray-500 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
                <p>📂 Browse or drop image</p>
              </div>
            )}

            {/* URL */}
            {tab === "url" && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste image URL"
                  className="w-full border rounded p-2"
                />
                <button
                  onClick={handleLoadFromUrl}
                  className="px-3 py-2 bg-black text-white rounded"
                >
                  Load
                </button>
              </div>
            )}

            {/* Camera */}
            {tab === "camera" && (
              <div className="flex flex-col items-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="rounded-lg w-full max-h-64 bg-black"
                />
                <button
                  onClick={captureFromCamera}
                  className="mt-2 px-3 py-2 bg-black text-white rounded"
                >
                  Capture
                </button>
              </div>
            )}

            {/* Stock */}
            {tab === "stock" && (
              <div className="grid grid-cols-3 gap-2">
                {stockImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="rounded cursor-pointer"
                    onClick={() => setImageSrc(src)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Jika sudah ada imageSrc → tampilkan picker */}
        {imageSrc && (
          <ImageColorPicker
            imageSrc={imageSrc}
            onPick={(color) => {
              onAddColor(color);
              setOpen(false);
              setImageSrc(null); // reset supaya bisa pilih gambar lagi nanti
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
