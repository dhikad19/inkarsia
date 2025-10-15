"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Expand, X } from "lucide-react";

interface PreviewProps {
  textColor: string;
  bgColor: string;
}

export default function ColorPreview({ textColor, bgColor }: PreviewProps) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      {/* Preview Box */}
      <div
        className="relative flex flex-col items-center justify-center rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
        style={{ backgroundColor: bgColor, color: textColor }}
        onClick={() => setFullscreen(true)}
      >
        <button
          className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg"
          title="Expand"
        >
          <Expand className="w-4 h-4 text-white" />
        </button>

        <div className="text-center p-8">
          <h2 className="text-xl font-semibold mb-2">Quote n. 16</h2>
          <p className="text-sm mb-4">
            Even if you’re on the right track, you’ll get run over if you just
            sit there.
          </p>
          <p className="font-bold text-sm">Will Rogers</p>
        </div>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-[100vw] h-[100vh] rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-2xl"
              style={{ backgroundColor: bgColor, color: textColor }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <button
                onClick={() => setFullscreen(false)}
                className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-lg"
                title="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="text-center p-10">
                <h2 className="text-3xl font-semibold mb-4">Quote n. 16</h2>
                <p className="text-lg mb-6 max-w-lg">
                  Even if you’re on the right track, you’ll get run over if you
                  just sit there.
                </p>
                <p className="font-bold text-lg">Will Rogers</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
