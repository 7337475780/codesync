import React from 'react';
import { useEditorLayoutStore } from '@/store/editor-layout-store';
import { Bot, X, Sparkles, Send } from 'lucide-react';

export function AiPanel() {
  const { aiPanelVisible, setAiPanelVisible } = useEditorLayoutStore();

  if (!aiPanelVisible) return null;

  return (
    <div className="w-full h-full bg-[#252526] border-l border-[#2d2d2d] flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2d2d2d] shrink-0">
        <div className="flex items-center gap-2 text-gray-300 font-medium">
          <Bot className="w-4 h-4 text-purple-400" />
          <span>AI Assistant</span>
        </div>
        <button 
          onClick={() => setAiPanelVisible(false)}
          className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="bg-[#1e1e1e] p-3 rounded-lg border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-200">Context Active</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            I'm ready to help you code. I have context on your current workspace and active files.
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-[#2d2d2d] shrink-0">
        <div className="relative">
          <textarea 
            placeholder="Ask me anything..." 
            className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg pl-3 pr-10 py-2.5 text-sm text-white placeholder-gray-500 resize-none outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all custom-scrollbar"
            rows={2}
          />
          <button className="absolute right-2 bottom-2.5 p-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-colors">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
