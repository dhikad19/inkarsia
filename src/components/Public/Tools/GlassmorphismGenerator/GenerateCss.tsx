export default function GeneratedCSS({ config }: any) {
  const css = `
.backdrop-box {
  backdrop-filter: blur(${config.blur}px) brightness(${
    config.brightness
  }%) contrast(${config.contrast}%) saturate(${config.saturation}%);
  background: ${config.backgroundColor}${Math.round(
    config.backgroundOpacity * 255
  ).toString(16)};
  border: 1px solid ${config.borderColor}${Math.round(
    config.borderOpacity * 255
  ).toString(16)};
  border-radius: ${config.borderRadius}px;
}
  `.trim();

  return (
    <div className="p-5 border rounded-xl">
      <h2 className="text-xl font-semibold mb-3">Generated CSS</h2>
      <textarea
        className="w-full h-40 p-3 rounded bg-black/20 text-white"
        readOnly
        value={css}
      />
    </div>
  );
}
