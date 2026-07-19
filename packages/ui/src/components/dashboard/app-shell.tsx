"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { useSidebarStore } from "../../store/sidebar-store";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CommandPalette } from "./command-palette";

export function AppShell({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebarStore();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex h-screen bg-background overflow-hidden text-text-primary selection:bg-primary/30">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div 
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
          isCollapsed ? "ml-[72px]" : "ml-0 lg:ml-[260px]"
        )}
      >
        <Topbar />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
          {/* Main layout container with animations wrapper */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10, filter: shouldReduceMotion ? "none" : "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: shouldReduceMotion ? "none" : "blur(0px)" }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10, filter: shouldReduceMotion ? "none" : "blur(4px)" }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="w-full h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Command Palette */}
      <CommandPalette />
    </div>
  );
}
