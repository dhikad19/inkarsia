"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FeatureSearchFilter({
  search,
  setSearch,
  filter,
  setFilter,
}: {
  search: string;
  setSearch: (s: string) => void;
  filter: string;
  setFilter: (f: any) => void;
}) {
  return (
    <div className="flex flex-wrap justify-between items-center gap-3">
      <Input
        placeholder="Search features..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
      />
      <div className="flex gap-2">
        {["all", "css", "js", "supported", "notSupported"].map((t) => (
          <Button
            key={t}
            variant={filter === t ? "default" : "outline"}
            onClick={() => setFilter(t as any)}
          >
            {t === "all" ? "All Features" : t.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  );
}
