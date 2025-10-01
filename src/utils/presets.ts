export const presetLayouts = {
  "Header - Main - Footer": (cols: number, rows: number) => [
    { name: "header", r1: 1, r2: 1 },
    { name: "main", r1: 2, r2: rows - 1 },
    { name: "footer", r1: rows, r2: rows },
  ],
  "Sidebar - Layout": (cols: number, rows: number) => {
    const sidebarWidth = Math.max(1, Math.floor(cols * 0.25));
    return [
      { name: "sidebar", c1: 1, c2: sidebarWidth, r1: 1, r2: rows - 1 },
      { name: "header", r1: 1, r2: 1, c1: sidebarWidth + 1, c2: cols },
      { name: "main", r1: 2, r2: rows - 1, c1: sidebarWidth + 1, c2: cols },
      { name: "footer", r1: rows, r2: rows, c1: 1, c2: cols },
    ];
  },
  "Holy Grail": (cols: number, rows: number) => {
    const leftWidth = Math.max(1, Math.floor(cols * 0.2));
    const rightStart = Math.max(2, cols - Math.floor(cols * 0.2) + 1);
    return [
      { name: "header", r1: 1, r2: 1, c1: 1, c2: cols },
      { name: "left", c1: 1, c2: leftWidth, r1: 2, r2: rows - 1 },
      {
        name: "main",
        r1: 2,
        r2: rows - 1,
        c1: leftWidth + 1,
        c2: rightStart - 1,
      },
      { name: "right", c1: rightStart, c2: cols, r1: 2, r2: rows - 1 },
      { name: "footer", r1: rows, r2: rows, c1: 1, c2: cols },
    ];
  },
};

export const AREA_COLORS: Record<string, string> = {
  header: "border-blue-500",
  main: "border-green-500",
  footer: "border-gray-500",
  sidebar: "border-yellow-500",
  left: "border-yellow-500",
  right: "border-purple-500",
};
