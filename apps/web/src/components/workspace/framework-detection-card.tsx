import React from 'react';
import { Layers, FileCode, CheckCircle2 } from 'lucide-react';

export const FrameworkDetectionCard = () => {
  return (
    <div className="bg-card border rounded-xl overflow-hidden">
      <div className="p-6 border-b bg-muted/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Framework Detected</h3>
            <p className="text-sm text-muted-foreground">Automatically configured runtime environment</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold">Next.js</span>
          <div className="flex items-center text-sm text-green-500 mt-1">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            98% Confidence
          </div>
        </div>
      </div>
      <div className="p-6 bg-background">
        <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-4 tracking-wider">Detection Sources</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2 p-2 rounded border bg-muted/30">
            <FileCode className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">package.json</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded border bg-muted/30">
            <FileCode className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">next.config.ts</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded border bg-muted/30">
            <FileCode className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">app/</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded border bg-muted/30">
            <FileCode className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">src/</span>
          </div>
        </div>
      </div>
    </div>
  );
};
