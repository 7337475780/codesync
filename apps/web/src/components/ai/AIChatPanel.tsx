import React, { useEffect, useRef } from 'react';
import { useChatStore } from '@/store/chat-store';
import { AIChatMessage } from './AIChatMessage';
import { AIInput } from './AIInput';
import { AIQuickActions } from './AIQuickActions';
import { Bot, Plus, X } from 'lucide-react';
import { useEditorLayoutStore } from '@/store/editor-layout-store';

export function AIChatPanel() {
  const { aiPanelVisible, setAiPanelVisible } = useEditorLayoutStore();
  const { getActiveConversation, createConversation, conversations } = useChatStore();
  const activeConversation = getActiveConversation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversations.length === 0) {
      createConversation();
    }
  }, [conversations.length, createConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  if (!aiPanelVisible) return null;

  return (
    <div className="w-full border-l border-[#2d2d2d] bg-[#252526] flex flex-col h-full overflow-hidden z-10">
      <div className="h-9 border-b border-[#2d2d2d] bg-[#2d2d2d] flex items-center justify-between px-3 shrink-0">
        <div className="flex items-center gap-2 text-gray-300">
          <Bot className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider font-semibold">CodeSync AI</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => createConversation()}
            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
            title="New Chat"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setAiPanelVisible(false)}
            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
            title="Close AI Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {!activeConversation || activeConversation.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 select-none">
            <Bot className="w-12 h-12 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">How can I help you?</h3>
            <p className="text-sm text-gray-300 max-w-[250px]">
              I can explain code, generate features, fix bugs, and answer questions about your workspace.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {activeConversation.messages.map((message) => (
              <AIChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {activeConversation && activeConversation.messages.length === 0 && (
        <AIQuickActions />
      )}

      <AIInput />
    </div>
  );
}
