"use client";

export default function PreviewBox({ borderRadius }: { borderRadius: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center rounded-xl border bg-muted/40 p-6">
        <div
          className="aspect-square w-full max-w-xs bg-foreground transition-[border-radius] duration-200"
          style={{ borderRadius }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Persentase dihitung dari ukuran kotak. Kalau dua sudut bersebelahan
        totalnya melebihi 100%, browser otomatis memperkecil radiusnya.
      </p>
    </div>
  );
}
