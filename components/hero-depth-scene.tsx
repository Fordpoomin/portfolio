"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export function HeroDepthScene() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const layerOneX = useSpring(mouseX, { stiffness: 80, damping: 18 });
  const layerOneY = useSpring(mouseY, { stiffness: 80, damping: 18 });
  const layerTwoX = useSpring(mouseX, { stiffness: 55, damping: 16 });
  const layerTwoY = useSpring(mouseY, { stiffness: 55, damping: 16 });
  const layerThreeX = useSpring(mouseX, { stiffness: 38, damping: 15 });
  const layerThreeY = useSpring(mouseY, { stiffness: 38, damping: 15 });

  const beam = useMotionTemplate`radial-gradient(circle at calc(50% + ${layerOneX}px) calc(50% + ${layerOneY}px), rgba(255,255,255,0.18), transparent 180px)`;

  useEffect(() => {
    function handleMove(event: PointerEvent) {
      const px = event.clientX / window.innerWidth - 0.5;
      const py = event.clientY / window.innerHeight - 0.5;
      mouseX.set(px * 44);
      mouseY.set(py * 34);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => window.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: beam }}
      />
      <motion.div
        aria-hidden
        className="hero-orb hero-orb--one"
        style={{ x: layerOneX, y: layerOneY }}
      />
      <motion.div
        aria-hidden
        className="hero-orb hero-orb--two"
        style={{ x: layerTwoX, y: layerTwoY }}
      />
      <motion.div
        aria-hidden
        className="hero-panel hero-panel--left"
        style={{ x: layerThreeX, y: layerThreeY }}
      />
      <motion.div
        aria-hidden
        className="hero-panel hero-panel--right"
        style={{ x: layerTwoX, y: layerTwoY }}
      />
      <div aria-hidden className="hero-grid-mask pointer-events-none absolute inset-0" />
    </div>
  );
}
