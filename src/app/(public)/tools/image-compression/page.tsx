"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import ConverterPanel from "@/components/Public/Tools/ImageCompression/ConverterPanel";
import ImagePreview from "@/components/Public/Tools/ImageCompression/ImagePreview";
import OutputControls from "@/components/Public/Tools/ImageCompression/OutputControls";
import DownloadResult from "@/components/Public/Tools/ImageCompression/DownloadResult";

export default function ImageConverterPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [convertedURL, setConvertedURL] = useState<string | null>(null);
  const [format, setFormat] = useState<string>("png");
  const [quality, setQuality] = useState<number>(90);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-6 space-y-6">
      <Card className="p-4 bg-[#111] border border-neutral-800 text-center">
        <h1 className="text-xl font-bold">Universal Image Converter</h1>
        <p className="text-sm text-neutral-400">
          Convert between PNG, JPG, WEBP, ICO, AVIF, and more — right in your
          browser.
        </p>
      </Card>

      <Card className="p-4 bg-[#111] border border-neutral-800 space-y-4">
        <ConverterPanel setImageFile={setImageFile} />
        {imageFile && (
          <>
            <ImagePreview imageFile={imageFile} />
            <OutputControls
              imageFile={imageFile}
              format={format}
              setFormat={setFormat}
              quality={quality}
              setQuality={setQuality}
              setConvertedURL={setConvertedURL}
            />
          </>
        )}
        {convertedURL && <DownloadResult url={convertedURL} format={format} />}
      </Card>
    </div>
  );
}
