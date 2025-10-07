"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function ImageUploader({
  setImage,
}: {
  setImage: (img: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="secondary" onClick={handleClick}>
        Upload Custom Image
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}
