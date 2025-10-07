"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ImageUploader from "@/components/Public/Tools/ImageFilterPlayground/ImageUploader";
import PreviewImage from "@/components/Public/Tools/ImageFilterPlayground/PreviewImage";
import FilterControls from "@/components/Public/Tools/ImageFilterPlayground/FilterControls";
import PresetFilters from "@/components/Public/Tools/ImageFilterPlayground/PresetFilter";
import GeneratedCSS from "@/components/Public/Tools/ImageFilterPlayground/GenerateCss";

export default function Page() {
  const [image, setImage] = useState<string>("/default.jpg");
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
    grayscale: 0,
    invert: 0,
    hue: 0,
    opacity: 100,
    blur: 0,
  });

  return (
    <main className="min-h-screen bg-background p-6 flex flex-col gap-6">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="flex flex-col items-center gap-4">
          <ImageUploader setImage={setImage} />
          <PreviewImage image={image} filters={filters} />
          <FilterControls filters={filters} setFilters={setFilters} />
          <PresetFilters setFilters={setFilters} />
          <GeneratedCSS filters={filters} />
        </CardContent>
      </Card>
    </main>
  );
}
