import React from "react";
import ImageEnhancer from "@/components/Public/Tools/ImageEnhancer/BackgroundRemover";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="py-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          AI Image Enhancement Tool
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Powered by TensorFlow.js — Remove background & auto-enhance images
          directly in your browser.
        </p>
        <ImageEnhancer />
      </div>
    </main>
  );
}
