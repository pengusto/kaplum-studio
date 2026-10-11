"use client";
import { motion, useReducedMotion } from "motion/react";

// Static surfaces; only catalogue cards have a short, once-per-mount entrance.
export default function StudioCard({ children, className = "", style, ...props }) {
  const reduced = useReducedMotion();
  const reveal = className.includes("example-card");
  return <motion.div className={`studio-card ${className}`} style={style}
    initial={reveal && !reduced ? { opacity: 0, y: 8 } : false}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.05 }}
    transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }} {...props}>
    {children}
  </motion.div>;
}
