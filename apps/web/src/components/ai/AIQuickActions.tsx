import React, { useState } from 'react';
import { Sparkles, Zap, GitCommit, TestTube, FileText, Bug } from 'lucide-react';
import { useAIStore } from '@/store/ai-store';
import { useChatStore } from '@/store/chat-store';

interface QuickAction {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  prompt: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'explain', icon: Sparkles, label: 'Explain Code', prompt: 'Explain what the currently open file does.' },
  { id: 'optimize', icon: Zap, label: 'Optimize', prompt: 'Review the current file and suggest performance optimizations.' },
  { id: 'commit', icon: GitCommit, label: 'Commit Message', prompt: 'Generate a conventional commit message for my current changes.' },
  { id: 'tests', icon: TestTube, label: 'Generate Tests', prompt: 'Generate unit tests for the currently open file.' },
  { id: 'docs', icon: FileText, label: 'Generate Docs', prompt: 'Generate JSDoc documentation for all functions in the current file.' },
  { id: 'bugs', icon: Bug, label: 'Find Bugs', prompt: 'Analyze the current file and identify potential bugs, null pointer exceptions, and security issues.' },
];

export function AIQuickActions() {
  const { provider } = useAIStore();
  const { createConversation, addMessage, setStreaming, activeConversationId, appendStreamChunk } = useChatStore();

  const handleQuickAction = async (action: QuickAction) => {
    if (!provider) return;
    
    let convId = activeConversationId;
    if (!convId) {
      convId = createConversation();
    }

    addMessage(convId, { role: 'user', content: action.prompt });
    
    const placeholderId = crypto.randomUUID();
    addMessage(convId, { role: 'assistant', content: '', id: placeholderId, timestamp: Date.now() } as any);
    
    setStreaming(true);
    
    try {
      let lastContent = '';
      await provider.streamChat(
        [{ role: 'user', content: action.prompt, id: '1', timestamp: Date.now() }],
        undefined,
        (chunk) => {
          const newContent = chunk.content.slice(lastContent.length);
          lastContent = chunk.content;
          appendStreamChunk(convId!, placeholderId, newContent);
        }
      );
    } finally {
      setStreaming(false);
    }
  };

  return (
    <div className="px-4 pb-4">
      <p className="text-[11px] text-gray-500 mb-2 uppercase tracking-wider">Quick Actions</p>
      <div className="grid grid-cols-2 gap-1.5">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className="flex items-center gap-2 p-2 text-xs text-gray-300 bg-[#2d2d2d] hover:bg-[#3e3e42] rounded-md transition-colors text-left"
            >
              <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
