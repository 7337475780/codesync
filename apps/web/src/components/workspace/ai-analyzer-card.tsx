"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, ShieldCheck, Zap, Server, Code, FolderTree, FileCode, CheckCircle2, Box, Cpu, AlertTriangle, Package } from 'lucide-react';
import { useWorkspaceLaunchStore } from '@/store/workspace-launch-store';
import { AiRecommendationItem, AIRecommendation } from './ai-recommendation-item';

const MOCK_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'rec-1',
    title: 'Missing Prisma Connection Pooling',
    severity: 'high',
    description: 'Your DATABASE_URL does not include connection pooling parameters. This can lead to connection exhaustion in serverless environments.',
    fix: 'DATABASE_URL="postgresql://user:password@host:5432/db?connection_limit=5&pool_timeout=10"',
    impact: 'Prevents database connection drops during traffic spikes. Improves query latency by 15%.'
  },
  {
    id: 'rec-2',
    title: 'Unused Dependencies Detected',
    severity: 'medium',
    description: 'The package `lodash` is installed but no imports were found across your 147 scanned files. Removing it will reduce node_modules size.',
    fix: 'npm uninstall lodash',
    impact: 'Reduces install time by ~1.2s and bundle size by up to 24KB.'
  },
  {
    id: 'rec-3',
    title: 'Circular Dependency in Components',
    severity: 'medium',
    description: '`src/components/layout/Header.tsx` and `src/components/layout/Sidebar.tsx` import each other, which can cause module resolution errors.',
    fix: 'Extract shared types/constants into a separate `layout.types.ts` file and import from there.',
    impact: 'Prevents runtime crashes and improves Webpack HMR performance.'
  },
  {
    id: 'rec-4',
    title: 'Duplicate Code: Date Formatting',
    severity: 'low',
    description: 'Found 4 instances of identical `Intl.DateTimeFormat` logic in `UserCard.tsx`, `PostItem.tsx`, and `ProfileHeader.tsx`.',
    fix: 'export const formatDate = (date: Date) => new Intl.DateTimeFormat("en-US").format(date);',
    impact: 'Improves maintainability. Reduces duplicate bundle overhead.'
  }
];

export const AiAnalyzerCard = () => {
  const { status } = useWorkspaceLaunchStore();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'insights'>('overview');
  
  const showAnalyzer = ['GENERATING_AI_CONTEXT', 'BUILDING_PROJECT', 'RUNNING_HEALTH_CHECKS', 'STARTING_SERVICES', 'READY'].includes(status);

  if (!showAnalyzer) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, height: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
        animate={{ opacity: 1, height: 'auto', scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, type: shouldReduceMotion ? 'tween' : 'spring' }}
        className="bg-card border border-primary/20 rounded-xl overflow-hidden shadow-sm"
      >
        <div className="bg-primary/10 px-6 py-4 border-b border-primary/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-primary font-semibold">
            <Sparkles className="w-5 h-5" />
            <span>AI Project Analysis Complete</span>
          </div>
          
          <div className="flex space-x-2 bg-background/50 p-1 rounded-lg border border-primary/10">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === 'overview' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === 'architecture' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Architecture
            </button>
            <button 
              onClick={() => setActiveTab('insights')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === 'insights' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Insights ({MOCK_RECOMMENDATIONS.length})
            </button>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Scores */}
                  <div className="bg-muted/50 p-4 rounded-xl border flex flex-col items-center justify-center text-center">
                    <ShieldCheck className="w-5 h-5 text-green-500 mb-2" />
                    {status === 'READY' ? <span className="text-2xl font-bold">96/100</span> : <div className="h-8 w-16 bg-muted-foreground/20 rounded animate-pulse" />}
                    <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Security Score</span>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl border flex flex-col items-center justify-center text-center">
                    <Zap className="w-5 h-5 text-blue-500 mb-2" />
                    {status === 'READY' ? <span className="text-2xl font-bold">92/100</span> : <div className="h-8 w-16 bg-muted-foreground/20 rounded animate-pulse" />}
                    <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Performance Score</span>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl border flex flex-col items-center justify-center text-center">
                    <Code className="w-5 h-5 text-purple-500 mb-2" />
                    {status === 'READY' ? <span className="text-2xl font-bold">A-</span> : <div className="h-8 w-12 bg-muted-foreground/20 rounded animate-pulse" />}
                    <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Complexity Score</span>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl border flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
                    {status === 'READY' ? <span className="text-2xl font-bold">98/100</span> : <div className="h-8 w-16 bg-muted-foreground/20 rounded animate-pulse" />}
                    <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Maintainability</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Detected Environment</h4>
                    <div className="bg-muted/30 border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground flex items-center"><Box className="w-4 h-4 mr-2" /> Framework</span>
                        <span className="font-medium">Next.js 14.1.0</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground flex items-center"><Cpu className="w-4 h-4 mr-2" /> Runtime</span>
                        <span className="font-medium">Node.js (v20.11.1)</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground flex items-center"><Package className="w-4 h-4 mr-2" /> Package Manager</span>
                        <span className="font-medium">pnpm (v8.15.3)</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground flex items-center"><FileCode className="w-4 h-4 mr-2" /> Language</span>
                        <span className="font-medium">TypeScript (98.4%)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Build Stats Projection</h4>
                    <div className="bg-muted/30 border rounded-lg p-4 space-y-3 h-[148px] flex flex-col justify-center">
                       <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Est. Build Time</span>
                        <span className="font-mono font-medium">~ 42s</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-primary w-1/3 h-1.5 rounded-full" /></div>
                      
                      <div className="flex justify-between items-center text-sm mt-4">
                        <span className="text-muted-foreground">Est. Bundle Size</span>
                        <span className="font-mono font-medium">184 KB</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-blue-500 w-2/5 h-1.5 rounded-full" /></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'architecture' && (
              <motion.div 
                key="architecture"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Architecture Summary</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed bg-muted/30 p-4 rounded-lg border">
                    This is a full-stack Next.js application utilizing the App Router paradigm. It implements a monolithic frontend-backend pattern where API routes and Server Actions co-exist with React Server Components. State management is handled globally via Zustand, and the UI relies on Radix UI primitives and Tailwind CSS for styling. Database operations are strictly typed via Prisma ORM connected to a PostgreSQL instance.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Folder Structure</h4>
                    <div className="bg-surface text-text-secondary p-4 rounded-lg font-mono text-xs border border-white/10 leading-relaxed overflow-x-auto h-64">
                      <div className="flex items-center text-blue-400 mb-1"><FolderTree className="w-3 h-3 mr-2" /> src/</div>
                      <div className="pl-4 border-l border-white/10 ml-1.5 flex items-center py-0.5"><FolderTree className="w-3 h-3 mr-2 text-blue-400" /> app/</div>
                      <div className="pl-8 border-l border-white/10 ml-1.5 flex items-center py-0.5"><Code className="w-3 h-3 mr-2 text-text-muted" /> layout.tsx</div>
                      <div className="pl-8 border-l border-white/10 ml-1.5 flex items-center py-0.5"><Code className="w-3 h-3 mr-2 text-text-muted" /> page.tsx</div>
                      <div className="pl-4 border-l border-white/10 ml-1.5 flex items-center py-0.5"><FolderTree className="w-3 h-3 mr-2 text-blue-400" /> components/</div>
                      <div className="pl-8 border-l border-white/10 ml-1.5 flex items-center py-0.5"><FolderTree className="w-3 h-3 mr-2 text-blue-400" /> ui/</div>
                      <div className="pl-4 border-l border-white/10 ml-1.5 flex items-center py-0.5"><FolderTree className="w-3 h-3 mr-2 text-blue-400" /> lib/</div>
                      <div className="pl-8 border-l border-white/10 ml-1.5 flex items-center py-0.5"><Code className="w-3 h-3 mr-2 text-text-muted" /> utils.ts</div>
                      <div className="pl-4 border-l border-white/10 ml-1.5 flex items-center py-0.5"><FolderTree className="w-3 h-3 mr-2 text-blue-400" /> store/</div>
                      <div className="flex items-center text-text-muted mt-2"><Code className="w-3 h-3 mr-2" /> package.json</div>
                      <div className="flex items-center text-text-muted py-0.5"><Code className="w-3 h-3 mr-2" /> prisma/schema.prisma</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Dependency Graph (Top Level)</h4>
                    <div className="bg-muted/30 border p-4 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                      {/* Mock visual graph */}
                      <div className="absolute top-1/4 left-1/4 p-2 bg-primary/10 border border-primary/20 rounded-md text-xs font-medium z-10">UI Components</div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-sm font-bold z-10 shadow-sm shadow-blue-500/10">App Router</div>
                      <div className="absolute bottom-1/4 right-1/4 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-xs font-medium z-10">Prisma Client</div>
                      
                      {/* Connecting lines mocked via svg */}
                      <svg className="absolute inset-0 w-full h-full stroke-muted-foreground/30 stroke-2" style={{ strokeDasharray: '4 4' }}>
                        <line x1="30%" y1="30%" x2="50%" y2="50%" />
                        <line x1="70%" y1="70%" x2="50%" y2="50%" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'insights' && (
              <motion.div 
                key="insights"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="space-y-3"
              >
                {MOCK_RECOMMENDATIONS.map(rec => (
                  <AiRecommendationItem key={rec.id} rec={rec} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
