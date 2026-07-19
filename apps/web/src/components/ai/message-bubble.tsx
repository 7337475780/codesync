"use client";

import React from 'react';
import { AiMessage } from '@/store/ai-store';
import { MarkdownRenderer } from './markdown-renderer';
import { StreamingUI } from './streaming-ui';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const MessageBubble = ({ message }: { message: AiMessage }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 p-4 rounded-xl ${isUser ? 'bg-transparent' : 'bg-surface border border-border/50'}`}
    >
      <div className="shrink-0 mt-0.5">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-sm">
            <User className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Bot className="w-4 h-4" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0 pt-1.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm">{isUser ? 'You' : 'CodeSync AI'}</span>
          <span className="text-[10px] text-text-muted">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <MarkdownRenderer content={message.content} />
        
        {message.isStreaming && <StreamingUI />}
      </div>
    </motion.div>
  );
};
