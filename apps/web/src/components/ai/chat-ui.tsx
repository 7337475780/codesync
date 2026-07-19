"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAiStore } from '@/store/ai-store';
import { MessageBubble } from './message-bubble';
import { AiInsights } from './ai-insights';
import { Send, Paperclip, X } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatUI = () => {
  const { messages, isStreaming, addMessage, appendStream, finishStream, activeMode, setContextModalOpen } = useAiStore();
  const contextFiles: Array<{ id: string; filename: string }> = [];
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isStreaming]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    // Add user message
    addMessage({
      role: 'user',
      content: input,
    });
    
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: '',
        isStreaming: true
      });
      
      let count = 0;
      const chunks = [
        "I'll help you with that! ",
        "Based on the context provided, ",
        "here is what we can do.\n\n```typescript\nfunction setup() {\n  console.log('AI generated code!');\n}\n```\n\n",
        "Let me know if you want any modifications!"
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

  const getPlaceholder = () => {
    switch(activeMode) {
      case 'code-review': return "Paste code or attach a file to review...";
      case 'project-analysis': return "Ask about project architecture, dependencies...";
      case 'bug-finder': return "Describe the bug or paste the error stack trace...";
      case 'architecture-planner': return "Describe the feature you want to design...";
      case 'generate': return "Describe the component or function to generate...";
      default: return "Ask anything about your codebase...";
    }
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div className="flex-1 flex flex-col h-full bg-background relative">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scroll-smooth pb-32">
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg: import('@/store/ai-store').AiMessage) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <div className="bg-surface border border-border shadow-lg rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
              
              {/* Context Files Indicator */}
              {contextFiles.length > 0 && (
                <div className="px-3 py-2 border-b border-border/50 bg-muted/20 flex gap-2 overflow-x-auto scrollbar-hide">
                  {contextFiles.map((file: { id: string; filename: string }) => (
                    <div key={file.id} className="flex items-center gap-1.5 bg-card border border-border rounded-md px-2 py-1 text-xs text-text-secondary whitespace-nowrap">
                      <Paperclip className="w-3 h-3 text-text-muted" />
                      {file.filename}
                      <button onClick={() => {}} className="hover:text-destructive transition-colors ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex items-end p-2 gap-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setContextModalOpen(true)}
                  className="h-10 w-10 shrink-0 rounded-lg text-text-muted hover:text-text-primary hover:bg-muted"
                  title="Attach Context"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
                
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none outline-none resize-none max-h-48 min-h-[40px] py-2.5 text-[15px] placeholder:text-text-muted text-text-primary scrollbar-thin leading-relaxed"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                
                <Button 
                  type="submit" 
                  disabled={!input.trim() || isStreaming}
                  className={`h-10 w-10 shrink-0 rounded-lg flex items-center justify-center transition-all ${
                    input.trim() && !isStreaming ? 'bg-primary text-white hover:bg-primary/90' : 'bg-muted text-text-muted'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
            <div className="text-center mt-2 text-xs text-text-muted">
              CodeSync AI can make mistakes. Verify critical code before deploying.
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden xl:block">
        <AiInsights />
      </div>
    </div>
  );
};
