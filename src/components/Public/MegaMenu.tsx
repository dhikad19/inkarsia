"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    title: "UI Elements",
    previews: [
      "https://picsum.photos/id/1011/600/400",
      "https://picsum.photos/id/1015/600/400",
      "https://picsum.photos/id/1019/600/400",
    ],
  },
  {
    title: "Flows",
    previews: [
      "https://picsum.photos/id/1021/600/400",
      "https://picsum.photos/id/1025/600/400",
      "https://picsum.photos/id/1031/600/400",
    ],
  },
  {
    title: "Animations",
    previews: [
      "https://picsum.photos/id/1041/600/400",
      "https://picsum.photos/id/1051/600/400",
      "https://picsum.photos/id/1061/600/400",
    ],
  },
];

export default function MegaMenu() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Auto ganti gambar tiap 2.5 detik saat panel aktif
  useEffect(() => {
    if (activeIndex !== null) {
      const interval = setInterval(() => {
        setCarouselIndex(
          (prev) => (prev + 1) % menuItems[activeIndex].previews.length
        );
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [activeIndex]);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    setCarouselIndex(0); // reset ke awal tiap kali menu baru dihover
  };

  const handleMouseLeave = () => setActiveIndex(null);
  const handleMouseMove = (e: React.MouseEvent) =>
    setMousePos({ x: e.clientX, y: e.clientY });

  return (
    <div className="relative w-full">
      {/* Top Navbar */}
      <div className="flex gap-8 px-8 py-4 bg-neutral-900 text-white">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            className="relative text-sm font-medium hover:opacity-80"
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Floating Mega Menu Panel */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: mousePos.x + 12,
              top: mousePos.y + 16,
            }}
          >
            <div
              className="rounded-xl bg-black overflow-hidden shadow-2xl w-[320px] h-[200px] pointer-events-auto"
              onMouseEnter={() => handleMouseEnter(activeIndex!)}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={menuItems[activeIndex].previews[carouselIndex]}
                  src={menuItems[activeIndex].previews[carouselIndex]}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
