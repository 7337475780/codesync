"use client";

import { motion } from "framer-motion";

export function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Mesh Gradient */}
      <div className="absolute inset-0 bg-[#000000]" />
      <div className="absolute top-0 -left-1/4 w-[150%] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3b82f6]/20 via-[#000000] to-[#000000] opacity-40" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      
      {/* Floating Shapes */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-[#3b82f6]/10 rounded-full blur-[100px]"
      />
      
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[#8b5cf6]/10 rounded-full blur-[120px]"
      />
    </div>
  );
}
