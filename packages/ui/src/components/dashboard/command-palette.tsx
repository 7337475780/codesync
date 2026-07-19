"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useSearchStore } from "../../store/search-store";
import { useRouter } from "next/navigation";
import { Search, FolderGit2, Copy, Users, Settings, Sparkles, Rocket, FileCode } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function CommandPalette() {
  const { isOpen, setOpen, query, setQuery } = useSearchStore();
  const router = useRouter();
  
  // Setup global keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl relative z-50 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <Command 
              className="flex flex-col w-full h-full max-h-[60vh]"
              shouldFilter={false} // We will implement fuzzy search later
            >
              <div className="flex items-center px-4 border-b border-white/5 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-4" />
                <Command.Input 
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search projects, templates, commands..." 
                  className="w-full bg-transparent text-white placeholder-gray-500 h-14 pl-10 pr-4 outline-none text-lg"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex px-2 py-1 bg-[#222] border border-white/5 rounded text-[10px] font-medium font-sans text-gray-400 absolute right-4">
                  ESC
                </kbd>
              </div>

              <Command.List className="overflow-y-auto custom-scrollbar p-2 h-full min-h-[300px]">
                <Command.Empty className="py-12 text-center text-sm text-gray-400">
                  No results found for "{query}".
                </Command.Empty>

                <Command.Group heading="Suggestions" className="px-2 text-xs font-medium text-gray-500 mb-2 mt-2">
                  <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/projects/new'))} className="flex items-center gap-3 px-3 py-3 text-sm text-gray-300 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer aria-selected:bg-[#8b5cf6]/20 aria-selected:text-white">
                    <FolderGit2 className="w-4 h-4 text-[#8b5cf6]" />
                    <span>Create New Project</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/templates'))} className="flex items-center gap-3 px-3 py-3 text-sm text-gray-300 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer aria-selected:bg-white/5 aria-selected:text-white">
                    <Copy className="w-4 h-4 text-blue-400" />
                    <span>Browse Starter Templates</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/ai'))} className="flex items-center gap-3 px-3 py-3 text-sm text-gray-300 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer aria-selected:bg-white/5 aria-selected:text-white">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Ask AI Assistant</span>
                  </Command.Item>
                </Command.Group>

                <Command.Separator className="h-px bg-white/5 my-2" />

                <Command.Group heading="Navigation" className="px-2 text-xs font-medium text-gray-500 mb-2 mt-2">
                  <Command.Item onSelect={() => runCommand(() => router.push('/dashboard'))} className="flex items-center gap-3 px-3 py-3 text-sm text-gray-300 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer aria-selected:bg-white/5 aria-selected:text-white">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span>Dashboard Home</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/deployments'))} className="flex items-center gap-3 px-3 py-3 text-sm text-gray-300 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer aria-selected:bg-white/5 aria-selected:text-white">
                    <Rocket className="w-4 h-4 text-emerald-400" />
                    <span>Deployments</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/team'))} className="flex items-center gap-3 px-3 py-3 text-sm text-gray-300 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer aria-selected:bg-white/5 aria-selected:text-white">
                    <Users className="w-4 h-4 text-pink-400" />
                    <span>Team & Members</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => router.push('/dashboard/settings'))} className="flex items-center gap-3 px-3 py-3 text-sm text-gray-300 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer aria-selected:bg-white/5 aria-selected:text-white">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span>Workspace Settings</span>
                  </Command.Item>
                </Command.Group>
                
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
