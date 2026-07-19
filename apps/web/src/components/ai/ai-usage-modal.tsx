"use client";

import React from 'react';
import { useAiStore } from '@/store/ai-store';
import { X, Activity, Zap, Coins, ArrowUpRight } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export const AiUsageModal = () => {
  const { isUsageModalOpen, setUsageModalOpen } = useAiStore();

  if (!isUsageModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-xl flex flex-col"
        >
          <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
            <h2 className="font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              AI Usage Dashboard
            </h2>
            <button onClick={() => setUsageModalOpen(false)} className="p-1 hover:bg-muted rounded-md text-text-muted hover:text-text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-text-muted mb-1">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium uppercase tracking-wider">Tokens Used</span>
                </div>
                <div className="text-3xl font-bold">142.5k</div>
                <div className="text-xs text-success flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> 12% vs last week
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-text-muted mb-1">
                  <Zap className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium uppercase tracking-wider">Prompts</span>
                </div>
                <div className="text-3xl font-bold">482</div>
                <div className="text-xs text-success flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> 5% vs last week
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-3">Model Usage Breakdown</h3>
              <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/50">
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">GPT-4 Turbo</span>
                    <span className="font-medium text-text-primary">68%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-[68%]"></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Claude 3.5 Sonnet</span>
                    <span className="font-medium text-text-primary">24%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full w-[24%]"></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">CodeLlama 70B</span>
                    <span className="font-medium text-text-primary">8%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[8%]"></div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="p-4 border-t border-border bg-muted/30 flex justify-end">
            <Button onClick={() => setUsageModalOpen(false)}>Close Dashboard</Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
