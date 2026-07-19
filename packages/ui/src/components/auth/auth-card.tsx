"use client";

import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative w-full max-w-md p-8 rounded-2xl overflow-hidden",
        "bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.08]",
        "shadow-[0_0_80px_rgba(59,130,246,0.07)]",
        className
      )}
    >
      {/* Soft Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Background Noise/Mesh subtle hint */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
