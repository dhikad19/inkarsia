import { PREVIEW_BACKGROUND, getGlassStyle, type GlassConfig } from "./utils";

export default function Preview({ config }: { config: GlassConfig }) {
  return (
    <div
      className="flex h-72 items-center justify-center overflow-hidden rounded-xl border bg-cover bg-center"
      style={{ backgroundImage: PREVIEW_BACKGROUND }}>
      <div
        className="flex h-40 w-80 max-w-[90%] items-center justify-center text-lg font-semibold text-white"
        style={getGlassStyle(config)}>
        Glassmorphism
      </div>
    </div>
  );
}
