import React from "react";
import FeatureCard from "./FeatureCard";
import { Feature } from "@/lib/features";

export default function FeatureList({
  features,
  search,
  filter,
}: {
  features: Feature[];
  search: string;
  filter: string;
}) {
  const filtered = features.filter((f) => {
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (filter === "css" && f.category !== "CSS") return false;
    if (filter === "js" && f.category !== "JavaScript") return false;
    if (filter === "supported" && !f.supported) return false;
    if (filter === "notSupported" && f.supported) return false;
    return true;
  });

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {filtered.map((f) => (
        <FeatureCard key={f.name} feature={f} />
      ))}
    </div>
  );
}
