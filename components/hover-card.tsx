"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverCard({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
