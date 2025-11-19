export default function Preview({ config }: any) {
  const {
    blur,
    brightness,
    contrast,
    saturation,
    backgroundColor,
    backgroundOpacity,
    borderColor,
    borderOpacity,
    borderRadius,
  } = config;

  return (
    <div
      className="w-full h-64 rounded-xl overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/scenery.jpg')",
      }}
    >
      <div
        className="w-80 h-40 mt-10 mx-auto flex items-center justify-center text-white text-lg font-semibold"
        style={{
          backdropFilter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
          background: `${backgroundColor}${Math.round(
            backgroundOpacity * 255
          ).toString(16)}`,
          border: `1px solid ${borderColor}${Math.round(
            borderOpacity * 255
          ).toString(16)}`,
          borderRadius: borderRadius,
        }}
      >
        Glassmorphism
      </div>
    </div>
  );
}
