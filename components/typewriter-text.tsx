"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TypewriterText({
  text,
  className,
  speed = 34
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);

    let frame: number;
    let timeout: ReturnType<typeof setTimeout>;

    function step(index: number) {
      timeout = setTimeout(() => {
        setVisibleCount(index);

        if (index < text.length) {
          frame = requestAnimationFrame(() => step(index + 1));
        }
      }, speed);
    }

    step(1);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [text, speed]);

  return (
    <span className={className}>
      {text.slice(0, visibleCount)}
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
        className="ml-1 inline-block h-[0.9em] w-[0.08em] rounded-full bg-current align-[-0.08em]"
      />
    </span>
  );
}
