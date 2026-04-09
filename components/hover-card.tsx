"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverCard({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rotateX = useSpring(0, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const background = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.12), transparent 42%)`;

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    glowX.set(px * 100);
    glowY.set(py * 100);
    rotateX.set((0.5 - py) * 8);
    rotateY.set((px - 0.5) * 10);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.012 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("relative overflow-hidden [transform-style:preserve-3d]", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}
