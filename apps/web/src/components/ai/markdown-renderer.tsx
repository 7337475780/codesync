"use client";

import React, { useMemo } from 'react';
import { CodeBlock } from './code-block';

export const MarkdownRenderer = ({ content }: { content: string }) => {
  const parsedContent = useMemo(() => {
    if (!content) return [];
    
    // Very simple markdown parser for code blocks
    const parts = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    
    let lastIndex = 0;
    let match;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }
      
      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2].trim()
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }
    
    return parts;
  }, [content]);

  return (
    <div className="text-[15px] leading-relaxed break-words space-y-4">
      {parsedContent.map((part, i) => {
        if (part.type === 'code') {
          return <CodeBlock key={i} language={part.language!} value={part.content} />;
        }
        
        // Very simple paragraph/inline code rendering
        return (
          <div key={i} className="whitespace-pre-wrap space-y-4">
            {part.content.split('\n\n').map((paragraph, pIdx) => {
              if (!paragraph.trim()) return null;
              
              // Handle inline code `code`
              const inlineParts = paragraph.split(/`([^`]+)`/g);
              
              return (
                <p key={pIdx} className="mb-2 last:mb-0 text-text-primary">
                  {inlineParts.map((inlinePart, inlineIdx) => {
                    if (inlineIdx % 2 === 1) {
                      return (
                        <code key={inlineIdx} className="bg-muted px-1.5 py-0.5 rounded text-sm text-primary font-mono mx-0.5">
                          {inlinePart}
                        </code>
                      );
                    }
                    // Basic bold **bold**
                    const boldParts = inlinePart.split(/\*\*([^*]+)\*\*/g);
                    return boldParts.map((bp, bIdx) => 
                      bIdx % 2 === 1 ? <strong key={bIdx} className="font-semibold">{bp}</strong> : bp
                    );
                  })}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
