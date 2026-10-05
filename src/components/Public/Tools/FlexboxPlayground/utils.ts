export const OPTIONS = {
  flexDirection: ["row", "row-reverse", "column", "column-reverse"],
  flexWrap: ["nowrap", "wrap", "wrap-reverse"],
  justifyContent: [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ],
  alignItems: ["stretch", "flex-start", "flex-end", "center", "baseline"],
  alignContent: [
    "normal",
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "stretch",
  ],
  gap: ["0px", "4px", "8px", "10px", "16px", "24px"],
} as const;

export type FlexProperties = {
  [K in keyof typeof OPTIONS]: (typeof OPTIONS)[K][number];
};

export type FlexPropertyKey = keyof FlexProperties;

export const DEFAULT_PROPERTIES: FlexProperties = {
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "stretch",
  alignContent: "normal",
  gap: "10px",
};

export const DEFAULT_ITEM_COUNT = 4;
export const MIN_ITEMS = 1;
export const MAX_ITEMS = 12;

export type Preset = {
  name: string;
  properties: Partial<FlexProperties>;
  items?: number;
};

export const PRESETS: Preset[] = [
  {
    name: "Center",
    properties: { justifyContent: "center", alignItems: "center" },
  },
  {
    name: "Space Between",
    properties: { justifyContent: "space-between" },
  },
  {
    name: "Column",
    properties: { flexDirection: "column", alignItems: "center" },
  },
  {
    name: "Wrap",
    properties: { flexWrap: "wrap", justifyContent: "space-around" },
    items: MAX_ITEMS,
  },
];

export const resolvePreset = (preset: Preset): FlexProperties => ({
  ...DEFAULT_PROPERTIES,
  ...preset.properties,
});

export const matchesPreset = (properties: FlexProperties, preset: Preset) => {
  const target = resolvePreset(preset);
  return (Object.keys(target) as FlexPropertyKey[]).every(
    (key) => properties[key] === target[key],
  );
};

/** flexDirection -> flex-direction */
export const toCssProp = (key: string) =>
  key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

export const buildCss = (properties: FlexProperties) =>
  [
    "display: flex;",
    ...Object.entries(properties).map(
      ([key, value]) => `${toCssProp(key)}: ${value};`,
    ),
  ].join("\n");
