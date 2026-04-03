"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 42, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function AnimateInView({
  children,
  className,
  delay = 0,
  amount = 0.22
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={defaultVariants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
