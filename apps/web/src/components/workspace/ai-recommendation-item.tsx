"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronRight, Wrench, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

export type Severity = 'high' | 'medium' | 'low';

export interface AIRecommendation {
  id: string;
  title: string;
  severity: Severity;
  description: string;
  fix: string;
  impact: string;
}

const severityConfig = {
  high: {
    icon: AlertCircle,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20'
  },
  medium: {
    icon: AlertTriangle,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20'
  },
  low: {
    icon: Info,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20'
  }
};

export const AiRecommendationItem = ({ rec }: { rec: AIRecommendation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const config = severityConfig[rec.severity];
  const Icon = config.icon;

  const handleApplyFix = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsApplying(true);
    // Mock apply fix
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
    }, 1500);
  };

  return (
    <div className={`border rounded-lg overflow-hidden transition-colors duration-200 ${isExpanded ? config.border : 'border-border'}`}>
      <button 
        aria-expanded={isExpanded}
        aria-controls={`rec-content-${rec.id}`}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between p-3 text-left hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isExpanded ? config.bg : 'bg-transparent'}`}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`w-4 h-4 shrink-0 ${config.color}`} />
          <span className={`text-sm font-medium ${isExpanded ? config.color : 'text-foreground'}`}>{rec.title}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
            {rec.severity}
          </span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`rec-content-${rec.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          >
            <div className="p-4 space-y-4 border-t border-border bg-card">
              <div>
                <h5 className="text-xs font-bold uppercase text-muted-foreground mb-1">Description</h5>
                <p className="text-sm text-foreground/80">{rec.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface p-3 rounded-md border border-white/5">
                  <h5 className="text-xs font-bold uppercase text-muted-foreground mb-2">Suggested Fix</h5>
                  <pre className="text-xs text-text-primary font-mono overflow-x-auto whitespace-pre-wrap">{rec.fix}</pre>
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase text-muted-foreground mb-1">Estimated Impact</h5>
                  <p className="text-sm text-foreground/80">{rec.impact}</p>
                  
                  <div className="mt-4">
                    <Button 
                      onClick={handleApplyFix}
                      disabled={isApplying || applied}
                      size="sm" 
                      className={`w-full ${applied ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                    >
                      {applied ? (
                        <>Fixed Successfully</>
                      ) : isApplying ? (
                        <>Applying Fix...</>
                      ) : (
                        <><Wrench className="w-3.5 h-3.5 mr-2" /> Apply Fix</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
