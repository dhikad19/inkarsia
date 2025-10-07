"use client";

export default function PreviewBox({ radius }: any) {
  const borderRadius = `${radius.topLeft.x}% ${radius.topRight.x}% ${radius.bottomRight.x}% ${radius.bottomLeft.x}% / ${radius.topLeft.y}% ${radius.topRight.y}% ${radius.bottomRight.y}% ${radius.bottomLeft.y}%`;

  return (
    <div className="p-4 border rounded-lg">
      <div
        className="mx-auto w-80 h-80 bg-muted flex items-center justify-center text-muted-foreground font-medium transition-all duration-200 ease-in-out"
        style={{ borderRadius }}
      >
        BORDER RADIUS
      </div>
    </div>
  );
}
