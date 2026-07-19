"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, Circle, Loader2, XCircle, AlertTriangle } from 'lucide-react';
import { useWorkspaceLaunchStore } from '@/store/workspace-launch-store';
import { mockProvisionProvider } from '@/lib/provisioning/mock-provider';
import { ProvisionStatus } from '@/lib/provisioning/types';

const PIPELINE_ORDER: { id: ProvisionStatus; label: string }[] = [
  { id: 'QUEUED', label: 'Queued' },
  { id: 'ALLOCATING_VM', label: 'Allocating VM' },
  { id: 'PREPARING_FILESYSTEM', label: 'Preparing Filesystem' },
  { id: 'DOWNLOADING_BASE_IMAGE', label: 'Downloading Base Image' },
  { id: 'INITIALIZING_RUNTIME', label: 'Initializing Runtime' },
  { id: 'CLONING_REPOSITORY', label: 'Cloning Repository' },
  { id: 'SCANNING_REPOSITORY', label: 'Scanning Repository' },
  { id: 'DETECTING_FRAMEWORK', label: 'Detecting Framework' },
  { id: 'INSTALLING_DEPENDENCIES', label: 'Installing Dependencies' },
  { id: 'GENERATING_AI_CONTEXT', label: 'Generating AI Context' },
  { id: 'BUILDING_PROJECT', label: 'Building Project' },
  { id: 'RUNNING_HEALTH_CHECKS', label: 'Running Health Checks' },
  { id: 'STARTING_SERVICES', label: 'Starting Services' },
  { id: 'READY', label: 'Ready' }
];

export const ProvisionTimeline = ({ projectId }: { projectId: string }) => {
  const { status, setStatus } = useWorkspaceLaunchStore();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Start provisioning mockup on mount
    const workspaceId = `mock-ws-${projectId}`;
    const unsubscribeStatus = mockProvisionProvider.streamStatus(workspaceId, (newStatus) => {
      setStatus(newStatus);
    });

    mockProvisionProvider.start(workspaceId);

    return () => {
      unsubscribeStatus();
      mockProvisionProvider.cancel(workspaceId);
    };
  }, [projectId, setStatus]);

  const currentIndex = PIPELINE_ORDER.findIndex(p => p.id === status);

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm h-full overflow-y-auto">
      <h3 className="text-lg font-bold mb-6">Provisioning Status</h3>
      
      <div className="space-y-4">
        {PIPELINE_ORDER.map((step, index) => {
          const isCompleted = index < currentIndex || status === 'READY';
          const isCurrent = index === currentIndex && status !== 'READY' && status !== 'FAILED' && status !== 'STOPPED';
          const isFailed = status === 'FAILED' && index === currentIndex;
          const isStopped = status === 'STOPPED' && index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div key={step.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background mt-0.5">
                  {isCompleted ? (
                    <motion.div initial={{ scale: shouldReduceMotion ? 1 : 0 }} animate={{ scale: 1 }} transition={{ duration: shouldReduceMotion ? 0 : 0.2 }} className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </motion.div>
                  ) : isFailed ? (
                    <motion.div initial={{ scale: shouldReduceMotion ? 1 : 0 }} animate={{ scale: 1 }} transition={{ duration: shouldReduceMotion ? 0 : 0.2 }} className="w-5 h-5 rounded-full bg-destructive/20 text-destructive flex items-center justify-center">
                      <XCircle className="w-4 h-4" />
                    </motion.div>
                  ) : isStopped ? (
                    <motion.div initial={{ scale: shouldReduceMotion ? 1 : 0 }} animate={{ scale: 1 }} transition={{ duration: shouldReduceMotion ? 0 : 0.2 }} className="w-5 h-5 rounded-full bg-muted-foreground/20 text-muted-foreground flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </motion.div>
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground/30 stroke-[2]" />
                  )}
                </div>
                {index < PIPELINE_ORDER.length - 1 && (
                  <div className={`w-[2px] h-6 mt-1 rounded-full transition-colors duration-500 ${isCompleted ? 'bg-primary/50' : isFailed ? 'bg-destructive/50' : 'bg-border'}`} />
                )}
              </div>
              
              <div className="pt-0.5 flex-1 pb-1">
                <p className={`text-sm font-medium transition-colors duration-300 ${isCompleted ? 'text-foreground' : isFailed ? 'text-destructive font-bold' : isStopped ? 'text-muted-foreground font-bold' : isCurrent ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                  {step.label}
                </p>
                <AnimatePresence>
                  {isFailed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                      className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md"
                    >
                      <p className="text-xs text-destructive font-mono">
                        Error: Failed to execute {step.label.toLowerCase()}. Connection timed out.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
