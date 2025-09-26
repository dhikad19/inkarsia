import { useState, useRef, useEffect } from "react";

export default function ImageColorPicker({
  imageSrc,
  onPick,
}: {
  imageSrc: string;
  onPick: (color: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [pickerPos, setPickerPos] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const ctx = canvasRef.current!.getContext("2d");
      if (!ctx) return;
      canvasRef.current!.width = img.width;
      canvasRef.current!.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, [imageSrc]);

  const handleMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    const data = ctx.getImageData(x, y, 1, 1).data;
    const hex =
      "#" +
      [data[0], data[1], data[2]]
        .map((c) => c.toString(16).padStart(2, "0"))
        .join("");

    setHoverColor(hex);
    setPickerPos({ x, y });
  };

  const handleClick = () => {
    if (hoverColor) onPick(hoverColor);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMove}
        onClick={handleClick}
        className="w-full max-h-80 border rounded"
      />
      {pickerPos && (
        <div
          className="absolute w-6 h-6 rounded-full border-2 border-white pointer-events-none"
          style={{
            left: pickerPos.x - 12,
            top: pickerPos.y - 12,
            background: hoverColor || "transparent",
          }}
        />
      )}
      {hoverColor && (
        <div className="mt-2 text-sm font-mono">
          Hover: <span style={{ color: hoverColor }}>{hoverColor}</span>
        </div>
      )}
    </div>
  );
}
