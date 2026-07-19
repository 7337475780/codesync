import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from '@/lib/ai/types/chat';
import { AICodeBlock } from './AICodeBlock';
import { cn } from '@codesync/ui/utils/cn';

interface AIChatMessageProps {
  message: ChatMessage;
}

export function AIChatMessage({ message }: AIChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn("flex gap-3 py-4", isUser ? "" : "border-y border-[#2d2d2d] bg-[#252526]/50")}>
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
        ) : (
          <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 overflow-hidden text-sm text-gray-300 leading-relaxed space-y-4 prose prose-invert max-w-none prose-p:my-1 prose-pre:my-0 prose-pre:p-0 prose-pre:bg-transparent">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              
              if (!inline && match) {
                return (
                  <AICodeBlock 
                    language={language} 
                    value={String(children).replace(/\n$/, '')} 
                  />
                );
              }
              
              return (
                <code className={cn("px-1.5 py-0.5 rounded-md bg-[#2d2d2d] text-blue-300 font-mono text-[13px]", className)} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
