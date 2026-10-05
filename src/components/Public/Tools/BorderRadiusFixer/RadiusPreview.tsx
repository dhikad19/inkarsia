interface RadiusPreviewProps {
  parentRadius: number;
  padding: number;
  childRadius: number;
}

export function RadiusPreview({
  parentRadius,
  padding,
  childRadius,
}: RadiusPreviewProps) {
  return (
    <div className="flex items-center justify-center rounded-xl border bg-muted/40 p-6">
      <div
        className="h-56 w-72 max-w-full border bg-background transition-all duration-200"
        style={{ borderRadius: parentRadius, padding }}
      >
        <div
          className="h-full w-full bg-foreground transition-all duration-200"
          style={{ borderRadius: childRadius }}
        />
      </div>
    </div>
  );
}
