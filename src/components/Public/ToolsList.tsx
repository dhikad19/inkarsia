"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Paintbrush,
  Wrench,
  Wand2,
  LayoutGrid,
  Type,
  Ruler,
  Palette,
  Search,
  Grid,
  Image,
  Droplet,
  Shapes,
  Contrast,
  Activity,
  Gauge,
  Layers,
  Sparkles,
  Award,
  ArrowUpRight,
  SearchX,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tool = {
  name: string;
  slug: string; // harus sama dengan nama folder di app/(public)/tools/
  description: string;
  category: string;
  icon: LucideIcon;
};

const tools: Tool[] = [
  {
    name: "Aspect Ratio Calculator",
    slug: "aspect-ratio-calculator",
    description:
      "Easily calculate and maintain consistent aspect ratios for your layouts and images.",
    category: "Utility",
    icon: Ruler,
  },
  {
    name: "Border Radius Fixer",
    slug: "border-radius-fixer",
    description:
      "Automatically harmonize corner radii across multiple elements to keep your UI consistent.",
    category: "UI",
    icon: Wrench,
  },
  {
    name: "Border Radius Playground",
    slug: "border-radius-playground",
    description:
      "Find precise border-radius values and visual previews for your rounded components.",
    category: "UI",
    icon: Ruler,
  },
  {
    name: "Box Shadow Generator",
    slug: "box-shadow-generator",
    description:
      "Generate smooth, realistic CSS box shadows with live preview and fine-tuning controls.",
    category: "UI",
    icon: Layers,
  },
  {
    name: "Clamp Generator",
    slug: "clamp-generator",
    description:
      "Build responsive CSS clamp() values for fluid typography, spacing, and sizing.",
    category: "Typography",
    icon: Type,
  },
  {
    name: "Color Blind Palette Suggestion",
    slug: "color-blind-palette-sugestion",
    description:
      "Generate accessible color palettes that remain distinguishable for color-blind users.",
    category: "Color",
    icon: Droplet,
  },
  {
    name: "Color Contrast Checker",
    slug: "color-contrast-checker",
    description:
      "Check color contrast ratios to ensure WCAG-compliant text readability and accessibility.",
    category: "Color",
    icon: Contrast,
  },
  {
    name: "Cubic Bezier Editor",
    slug: "cubic-bezier",
    description:
      "Visualize and fine-tune CSS cubic-bezier easing functions for smooth animations.",
    category: "Animation",
    icon: Activity,
  },
  {
    name: "Feature Detection Tool",
    slug: "feature-detection",
    description:
      "Quickly check browser support for modern web APIs, CSS features, and JavaScript methods.",
    category: "Utility",
    icon: Gauge,
  },
  {
    name: "Flexbox Playground",
    slug: "flexbox-playground",
    description:
      "Experiment with CSS Flexbox layouts interactively and learn how properties affect alignment.",
    category: "Layout",
    icon: LayoutGrid,
  },
  {
    name: "Glassmorphism Generator",
    slug: "glassmorphism-generator",
    description:
      "Create modern glass-like UI components with blur, transparency, and layered effects.",
    category: "UI",
    icon: Wand2,
  },
  {
    name: "Gradient Mixer",
    slug: "gradient-mixer",
    description:
      "Blend multiple colors to create smooth, layered gradients for backgrounds and effects.",
    category: "Color",
    icon: Palette,
  },
  {
    name: "Grid Area Mapper",
    slug: "grid-area-mapper",
    description:
      "Design and visualize CSS Grid area layouts interactively with live code output.",
    category: "Layout",
    icon: Grid,
  },
  {
    name: "Image Enhancer",
    slug: "image-enhancer",
    description:
      "Enhance image sharpness, contrast, and brightness directly in the browser using AI filters.",
    category: "Image",
    icon: Sparkles,
  },
  {
    name: "Image Filter Playground",
    slug: "image-filter-playground",
    description:
      "Play with CSS filter effects like blur, contrast, and hue-rotate on your images in real-time.",
    category: "Image",
    icon: Image,
  },
  {
    name: "Palette Generator",
    slug: "palette-generator",
    description:
      "Generate cohesive color palettes from an image or base color using multiple harmony rules.",
    category: "Color",
    icon: Paintbrush,
  },
  {
    name: "Ribbon Generator",
    slug: "ribbon-generator",
    description:
      "Create CSS ribbons and badges with adjustable shape, size, and color.",
    category: "UI",
    icon: Award,
  },
  {
    name: "Subgrid Visualizer",
    slug: "subgrid-visualizer",
    description:
      "Understand how CSS Subgrid works by visualizing parent and child grid alignments.",
    category: "Layout",
    icon: Grid,
  },
];

const categories = [
  "All",
  ...Array.from(new Set(tools.map((t) => t.category))),
];

export default function ToolsList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: tools.length };
    tools.forEach((t) => {
      map[t.category] = (map[t.category] ?? 0) + 1;
    });
    return map;
  }, []);

  const filteredTools = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-11 rounded-xl"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                    : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {cat}
                <span
                  className={cn(
                    "rounded-full px-1.5 text-xs",
                    isActive
                      ? "bg-white/20 text-white dark:bg-black/10 dark:text-black"
                      : "bg-muted",
                  )}
                >
                  {counts[cat]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Card className="h-full rounded-2xl transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-primary/40">
                  <CardContent className="p-5 flex h-full flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-xl bg-muted text-muted-foreground transition-colors group-hover:text-foreground">
                        <Icon className="w-5 h-5" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <h2 className="font-semibold text-lg leading-tight">
                        {tool.name}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {tool.description}
                      </p>
                    </div>

                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {tool.category}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-16 text-center">
          <SearchX className="h-8 w-8 text-muted-foreground" />
          <p className="font-medium">No tools found</p>
          <p className="text-sm text-muted-foreground">
            {searchTerm
              ? `Nothing matches “${searchTerm}” in ${activeCategory}.`
              : `There are no tools in ${activeCategory} yet.`}
          </p>
        </div>
      )}
    </section>
  );
}
