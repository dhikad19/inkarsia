"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Paintbrush,
  Wrench,
  Wand2,
  Scissors,
  LayoutGrid,
  Type,
  Ruler,
  Palette,
  Search,
} from "lucide-react";

export default function ToolsList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "UI", "Color", "Icon", "Typography", "Utility"];

  const tools = [
    {
      name: "Aspect Ratio Calculator",
      slug: "aspect-ratio-calculator",
      description:
        "Easily calculate and maintain consistent aspect ratios for your layouts and images.",
      category: "Utility",
    },
    {
      name: "Border Radius Fixer",
      slug: "border-radius-fixer",
      description:
        "Automatically harmonize corner radii across multiple elements to keep your UI consistent.",
      category: "UI",
    },
    {
      name: "Border Radius Calculator",
      slug: "border-radius-calculator",
      description:
        "Find precise border-radius values and visual previews for your rounded components.",
      category: "UI",
    },
    {
      name: "Box Shadow Generator",
      slug: "box-shadow-generator",
      description:
        "Generate smooth, realistic CSS box shadows with live preview and fine-tuning controls.",
      category: "UI",
    },
    {
      name: "Clamp Generator",
      slug: "clamp-generator",
      description:
        "Build responsive CSS clamp() values for fluid typography, spacing, and sizing.",
      category: "Typography",
    },
    {
      name: "Color Blind Palette Suggestion",
      slug: "color-blind-pallete-suggestion",
      description:
        "Generate accessible color palettes that remain distinguishable for color-blind users.",
      category: "Color",
    },
    {
      name: "Color Contrast Checker",
      slug: "color-contrast-checker",
      description:
        "Check color contrast ratios to ensure WCAG-compliant text readability and accessibility.",
      category: "Color",
    },
    {
      name: "Cubic Bezier Editor",
      slug: "cubic-bezier",
      description:
        "Visualize and fine-tune CSS cubic-bezier easing functions for smooth animations.",
      category: "Animation",
    },
    {
      name: "Feature Detection Tool",
      slug: "feature-detection",
      description:
        "Quickly check browser support for modern web APIs, CSS features, and JavaScript methods.",
      category: "Utility",
    },
    {
      name: "Flexbox Playground",
      slug: "flexbox-playground",
      description:
        "Experiment with CSS Flexbox layouts interactively and learn how properties affect alignment.",
      category: "Layout",
    },
    {
      name: "Gradient Mixer",
      slug: "gradient-mixer",
      description:
        "Blend multiple colors to create smooth, layered gradients for backgrounds and effects.",
      category: "Color",
    },
    {
      name: "Grid Area Mapper",
      slug: "grid-area-mapper",
      description:
        "Design and visualize CSS Grid area layouts interactively with live code output.",
      category: "Layout",
    },
    {
      name: "Image Enhancer",
      slug: "image-enhancer",
      description:
        "Enhance image sharpness, contrast, and brightness directly in the browser using AI filters.",
      category: "Image",
    },
    {
      name: "Image Filter Playground",
      slug: "image-filter-playground",
      description:
        "Play with CSS filter effects like blur, contrast, and hue-rotate on your images in real-time.",
      category: "Image",
    },
    {
      name: "Palette Generator",
      slug: "palette-generator",
      description:
        "Generate cohesive color palettes from an image or base color using multiple harmony rules.",
      category: "Color",
    },
    {
      name: "Subgrid Visualizer",
      slug: "subgrid-visualizzer",
      description:
        "Understand how CSS Subgrid works by visualizing parent and child grid alignments.",
      category: "Layout",
    },
    {
      name: "Clip Path Shapes",
      slug: "clip-path-shapes",
      description:
        "Generate and preview custom CSS clip-path shapes with intuitive drag controls.",
      category: "UI",
    },
    {
      name: "Glassmorphism Generator",
      slug: "glassmorphism-generator",
      description:
        "Create modern glass-like UI components with blur, transparency, and layered effects.",
      category: "UI",
    },
    {
      name: "Metallic Generator",
      slug: "metalic-generator",
      description:
        "Design metallic gradients and textures for buttons, icons, and surfaces using CSS layers.",
      category: "UI",
    },
  ];

  // const tools = [
  //   {
  //     name: "Border Radius Harmonizer",
  //     description: "Samakan border radius antar elemen agar tampak seimbang.",
  //     icon: Ruler,
  //     category: "UI",
  //     url: "/tools/border-radius-harmonizer",
  //   },
  //   {
  //     name: "Color Palette Extractor",
  //     description: "Ambil palet warna dari gambar atau desain.",
  //     icon: Palette,
  //     category: "Color",
  //     url: "/tools/color-palette-extractor",
  //   },
  //   {
  //     name: "Icon Resizer",
  //     description: "Ubah ukuran icon SVG secara proporsional dengan cepat.",
  //     icon: Scissors,
  //     category: "Icon",
  //     url: "/tools/icon-resizer",
  //   },
  //   {
  //     name: "UI Layout Grid Maker",
  //     description: "Buat grid responsif untuk desain antarmuka.",
  //     icon: LayoutGrid,
  //     category: "UI",
  //     url: "/tools/layout-grid-maker",
  //   },
  //   {
  //     name: "Typography Scale Helper",
  //     description: "Bangun hierarki teks yang harmonis dengan skala tipografi.",
  //     icon: Type,
  //     category: "Typography",
  //     url: "/tools/typography-scale-helper",
  //   },
  //   {
  //     name: "Shadow Generator",
  //     description: "Ciptakan bayangan realistis untuk komponen UI.",
  //     icon: Wand2,
  //     category: "UI",
  //     url: "/tools/shadow-generator",
  //   },
  //   {
  //     name: "Component Inspector",
  //     description: "Periksa jarak dan ukuran antar komponen desain.",
  //     icon: Wrench,
  //     category: "Utility",
  //     url: "/tools/component-inspector",
  //   },
  //   {
  //     name: "Hue Shift Tool",
  //     description: "Eksperimen dengan rotasi hue untuk variasi warna.",
  //     icon: Paintbrush,
  //     category: "Color",
  //     url: "/tools/hue-shift-tool",
  //   },
  // ];

  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      activeCategory === "All" || tool.category === activeCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Tentukan jumlah kolom berdasarkan jumlah hasil
  const gridColsClass =
    filteredTools.length >= 4
      ? "lg:grid-cols-4 sm:grid-cols-2 grid-cols-1"
      : filteredTools.length === 3
      ? "md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
      : filteredTools.length === 2
      ? "sm:grid-cols-2 grid-cols-1"
      : "grid-cols-1";

  return (
    <section className="space-y-6">
      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className="rounded-full text-sm"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className={`grid gap-4 ${gridColsClass}`}>
        {filteredTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Card
              key={index}
              className="group transition hover:shadow-lg hover:border-primary/30"
            >
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{tool.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link href={tool.url}>Open Tool</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredTools.length === 0 && (
        <p className="text-muted-foreground text-sm text-center py-6">
          No tools found for “{searchTerm}” in category “{activeCategory}”
        </p>
      )}
    </section>
  );
}
