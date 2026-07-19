"use client";

import React, { useState } from 'react';
import { Check, Copy, Play } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

interface CodeBlockProps {
  language: string;
  value: string;
}

export const CodeBlock = ({ language, value }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden border border-border/50 bg-black text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/50">
        <span className="text-xs font-mono text-text-muted capitalize">{language}</span>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs text-text-muted hover:text-text-primary"
            onClick={copyToClipboard}
          >
            {isCopied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
            {isCopied ? 'Copied' : 'Copy'}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs text-primary hover:text-primary hover:bg-primary/10"
          >
            <Play className="w-3.5 h-3.5 mr-1" />
            Apply
          </Button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto text-gray-300 font-mono text-[13px] leading-relaxed">
        <pre><code>{value}</code></pre>
      </div>
    </div>
  );
};
