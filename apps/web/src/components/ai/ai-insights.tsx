"use client";

import React from 'react';
import { Lightbulb, Terminal, FileCode2, PackageOpen } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';
import { useAiStore } from '@/store/ai-store';

export const AiInsights = () => {
  const { addMessage, appendStream, finishStream, isStreaming } = useAiStore();

  const handleAction = (prompt: string) => {
    if (isStreaming) return;
    addMessage({ role: 'user', content: prompt });
    setTimeout(() => {
      addMessage({ role: 'assistant', content: '', isStreaming: true });
      let count = 0;
      const chunks = [
        "Analyzing... ",
        "Based on the codebase, ",
        "everything looks good!\n\n```typescript\n// Example generated based on action\nconsole.log('Action complete');\n```\n",
      ];
      const interval = setInterval(() => {
        if (count < chunks.length) {
          appendStream(chunks[count]);
          count++;
        } else {
          clearInterval(interval);
          finishStream();
        }
      }, 500);
    }, 600);
  };

  return (
    <div className="w-80 flex-shrink-0 border-l border-border bg-surface h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-warning" />
        <h2 className="font-semibold">AI Insights</h2>
      </div>

      <div className="p-4 overflow-y-auto space-y-6 scrollbar-thin">
        <div>
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Context Aware</h3>
          <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
            <p className="text-sm text-text-secondary mb-3 leading-relaxed">
              I notice you're working in the <code className="text-xs bg-muted px-1 py-0.5 rounded text-primary">apps/web</code> directory. Here are some suggested actions:
            </p>
            <div className="space-y-2">
              <Button onClick={() => handleAction("Review recent changes in apps/web")} disabled={isStreaming} variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                <FileCode2 className="w-3.5 h-3.5 mr-2" /> Review recent changes
              </Button>
              <Button onClick={() => handleAction("Generate test cases for the current context")} disabled={isStreaming} variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                <Terminal className="w-3.5 h-3.5 mr-2" /> Generate test cases
              </Button>
              <Button onClick={() => handleAction("Check dependencies for known vulnerabilities")} disabled={isStreaming} variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                <PackageOpen className="w-3.5 h-3.5 mr-2" /> Check dependencies
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Repository Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Security Score</span>
              <span className="font-semibold text-success">98/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div className="bg-success h-1.5 rounded-full w-[98%]"></div>
            </div>
            
            <div className="flex items-center justify-between text-sm pt-2">
              <span className="text-text-secondary">Code Coverage</span>
              <span className="font-semibold text-warning">74%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div className="bg-warning h-1.5 rounded-full w-[74%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
