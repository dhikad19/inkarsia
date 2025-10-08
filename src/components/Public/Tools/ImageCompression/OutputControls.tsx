"use client";

import imageCompression from "browser-image-compression";
import ico from "icojs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function OutputControls({
  imageFile,
  format,
  setFormat,
  quality,
  setQuality,
  setConvertedURL,
}: any) {
  const [isConverting, setIsConverting] = useState(false);

  const formats = ["png", "jpeg", "webp", "ico", "avif", "bmp"];

  const handleConvert = async () => {
    if (!imageFile) return;
    setIsConverting(true);

    try {
      if (format === "ico") {
        // 🔸 convert ke ICO pakai canvas + icojs
        const bitmap = await createImageBitmap(imageFile);
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(bitmap, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const icoBlob = await ico.encode([
          { data: imageData, width: canvas.width, height: canvas.height },
        ]);

        setConvertedURL(URL.createObjectURL(icoBlob));
      } else {
        // 🔸 selain ICO: pakai browser-image-compression
        const compressed = await imageCompression(imageFile, {
          fileType: `image/${format}`,
          initialQuality: quality / 100,
          maxWidthOrHeight: 2048,
        });
        setConvertedURL(URL.createObjectURL(compressed));
      }
    } catch (err) {
      console.error("Conversion failed:", err);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Output Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="mt-1 bg-[#1b1b1b] border-neutral-700 text-white">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent className="bg-[#1b1b1b] border-neutral-700 text-white">
              {formats.map((f) => (
                <SelectItem key={f} value={f}>
                  {f.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Quality ({quality}%)</Label>
          <Slider
            value={[quality]}
            onValueChange={(val) => setQuality(val[0])}
            max={100}
            step={5}
          />
        </div>
      </div>

      <Button
        onClick={handleConvert}
        disabled={isConverting}
        className="w-full mt-3"
      >
        {isConverting ? "Converting..." : "Convert Image"}
      </Button>
    </div>
  );
}
