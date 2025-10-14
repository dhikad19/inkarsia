import { motion } from "framer-motion";

interface RadiusPreviewProps {
  parentRadius: number;
  padding: number;
  childRadius: number;
}

export function RadiusPreview({
  parentRadius,
  padding,
  childRadius,
}: RadiusPreviewProps) {
  return (
    <div className="flex justify-center mt-8">
      <motion.div
        animate={{ borderRadius: parentRadius }}
        className="bg-indigo-100 relative w-72 h-56 flex items-center justify-center transition-all"
        style={{
          borderRadius: `${parentRadius}px`,
          padding: `${padding}px`,
        }}
      >
        <motion.div
          animate={{ borderRadius: childRadius }}
          className="bg-indigo-500 w-full h-full transition-all"
          style={{
            borderRadius: `${childRadius}px`,
          }}
        />
      </motion.div>
    </div>
  );
}
