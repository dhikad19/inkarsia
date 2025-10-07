import React from "react";

export default function PreviewImage({
  image,
  filters,
}: {
  image: string;
  filters: Record<string, number>;
}) {
  const filterStyle = `
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    saturate(${filters.saturate}%)
    sepia(${filters.sepia}%)
    grayscale(${filters.grayscale}%)
    invert(${filters.invert}%)
    hue-rotate(${filters.hue}deg)
    opacity(${filters.opacity}%)
    blur(${filters.blur}px)
  `;

  return (
    <div className="bg-muted p-4 rounded-md flex justify-center">
      <img
        src={image}
        alt="Preview"
        style={{ filter: filterStyle, maxHeight: "300px", borderRadius: "8px" }}
      />
    </div>
  );
}
