"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TextMorphProps {
  width?: number | string;
  height?: number;
  phrases?: string[];
  color?: string;
  backgroundColor?: string;
  fontFamily?: string;
}
function GeneratingLoader({
  width = "",
  height = 100,
  phrases = [
    "Analyzing data...",
    "Processing inputs...",
    "Generating response...",
    "Thinking...",
    "Learning patterns...",
    "Optimizing solution...",
  ],
  color = "oklch(0.623 0.214 259.815)",
  backgroundColor = "#f9fafb", // gray-50
  fontFamily = "monospace",
}: TextMorphProps) {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [targetPhrase, setTargetPhrase] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    // Set initial phrase
    setTargetPhrase(phrases[2]);

    const interval = setInterval(
      () => {
        if (isDeleting) {
          // Deleting characters
          if (currentPhrase.length > 0) {
            setCurrentPhrase((prev) => prev.substring(0, prev.length - 1));
          } else {
            setIsDeleting(false);
            // Move to next phrase
            const nextIndex = (phraseIndex + 1) % phrases.length;
            setPhraseIndex(nextIndex);
            setTargetPhrase(phrases[nextIndex]);
          }
        } else {
          // Adding characters
          if (currentPhrase.length < targetPhrase.length) {
            setCurrentPhrase((prev) =>
              targetPhrase.substring(0, prev.length + 1)
            );
          } else {
            // Wait before starting to delete
            setTimeout(() => {
              setIsDeleting(true);
            }, 1500);
          }
        }
      },
      isDeleting ? 50 : 100
    ); // Type slower than delete

    return () => clearInterval(interval);
  }, [currentPhrase, targetPhrase, isDeleting, phraseIndex, phrases]);

  return (
    <div
      style={{
        width: width ? `${width}px` : "100%",
        height: `${height}px`,
        backgroundColor,
        color,
        fontFamily,
      }}
      className="flex items-center justify-center rounded-lg w-full relative overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <motion.span
            className="text-xl font-medium inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentPhrase}
          >
            {currentPhrase}
          </motion.span>
          <motion.span
            className="inline-block ml-1 w-2 h-5 bg-current"
            animate={{
              opacity: [1, 0, 1],
              transition: { repeat: Number.POSITIVE_INFINITY, duration: 0.8 },
            }}
          />
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
            animate={{
              y: [0, -20 - Math.random() * 30],
              opacity: [0.2, 0],
              transition: {
                duration: 1 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: Math.random() * 3,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default GeneratingLoader;
