"use client";

const presets = {
  frosted: {
    blur: 20,
    brightness: 120,
    contrast: 110,
    saturation: 140,
    backgroundColor: "#ffffff",
    backgroundOpacity: 0.15,
    borderColor: "#ffffff",
    borderOpacity: 0.2,
    borderRadius: 6,
  },
  subtle: {
    blur: 5,
    brightness: 105,
    contrast: 100,
    saturation: 110,
    backgroundColor: "#ffffff",
    backgroundOpacity: 0.1,
    borderColor: "#ffffff",
    borderOpacity: 0.1,
    borderRadius: 6,
  },
  strong: {
    blur: 30,
    brightness: 140,
    contrast: 130,
    saturation: 180,
    backgroundColor: "#ffffff",
    backgroundOpacity: 0.25,
    borderColor: "#ffffff",
    borderOpacity: 0.3,
    borderRadius: 6,
  },
  vibrant: {
    blur: 25,
    brightness: 150,
    contrast: 140,
    saturation: 250,
    backgroundColor: "#ffffff",
    backgroundOpacity: 0.3,
    borderColor: "#ffffff",
    borderOpacity: 0.35,
    borderRadius: 6,
  },
};

export default function Presets({ setConfig }: any) {
  return (
    <div className="p-5 border rounded-xl">
      <h2 className="text-xl font-semibold mb-3">Preset Styles</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(presets).map(([key, cfg]) => {
          const bgHEX =
            cfg.backgroundColor +
            Math.round(cfg.backgroundOpacity * 255)
              .toString(16)
              .padStart(2, "0");
          const borderHEX =
            cfg.borderColor +
            Math.round(cfg.borderOpacity * 255)
              .toString(16)
              .padStart(2, "0");

          return (
            <div
              key={key}
              onClick={() => setConfig(cfg)}
              className="group rounded-lg overflow-hidden border hover:shadow-lg transition bg-black relative"
            >
              {/* Background thumbnail */}
              <div
                className="w-full h-32 bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/assets/scenery.jpg')" }}
              >
                {/* Glass preview box */}
                <div
                  className="w-40 h-20 mx-auto flex items-center justify-center text-[10px] text-white"
                  style={{
                    backdropFilter: `
                      blur(${cfg.blur}px)
                      brightness(${cfg.brightness}%)
                      contrast(${cfg.contrast}%)
                      saturate(${cfg.saturation}%)
                    `,
                    background: bgHEX,
                    border: `1px solid ${borderHEX}`,
                    borderRadius: cfg.borderRadius,
                  }}
                >
                  {key}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
