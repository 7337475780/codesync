import React, { useState, useRef, useEffect } from 'react';
import { Send, StopCircle, CornerDownLeft, Paperclip } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import { useAIStore } from '@/store/ai-store';

export function AIInput() {
  const [input, setInput] = useState('');
  const { provider } = useAIStore();
  const { 
    isStreaming, 
    setStreaming, 
    activeConversationId,
    createConversation,
    addMessage,
    appendStreamChunk
  } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = async () => {
    if (!input.trim() || isStreaming || !provider) return;

    let convId = activeConversationId;
    if (!convId) {
      convId = createConversation();
    }

    const messageContent = input.trim();
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Add user message
    addMessage(convId, { role: 'user', content: messageContent });
    
    // Create assistant message placeholder with a known id
    const msgId = crypto.randomUUID();
    // Use a direct push trick: add message with pre-set id via Zustand
    useChatStore.setState((state) => ({
      conversations: state.conversations.map(conv =>
        conv.id === convId
          ? {
              ...conv,
              messages: [...conv.messages, { id: msgId, role: 'assistant' as const, content: '', timestamp: Date.now() }]
            }
          : conv
      )
    }));
    
    setStreaming(true);

    try {
      let lastLength = 0;
      await provider.streamChat(
        [{ role: 'user', content: messageContent, id: '1', timestamp: Date.now() }],
        undefined,
        (chunk) => {
          const newContent = chunk.content.slice(lastLength);
          lastLength = chunk.content.length;
          if (newContent) appendStreamChunk(convId!, msgId, newContent);
        }
      );
    } catch (err) {
      appendStreamChunk(convId!, msgId, '\n\n**Error:** Failed to generate response.');
    } finally {
      setStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 border-t border-[#2d2d2d] bg-[#1e1e1e]">
      <div className="relative flex items-end gap-2 bg-[#2d2d2d] rounded-lg border border-[#3e3e42] p-2 focus-within:border-[#007fd4] transition-colors">
        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded hover:bg-white/5">
          <Paperclip className="w-4 h-4" />
        </button>
        
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask CodeSync AI..."
          className="flex-1 max-h-[120px] bg-transparent border-none outline-none resize-none text-sm text-gray-200 py-2 custom-scrollbar"
          rows={1}
        />

        <div className="flex items-center gap-1">
          {isStreaming ? (
            <button 
              onClick={() => setStreaming(false)}
              className="p-2 text-red-400 hover:text-red-300 transition-colors rounded hover:bg-red-500/10"
            >
              <StopCircle className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400 transition-colors rounded hover:bg-white/5"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-2 px-1">
        <span className="text-[10px] text-gray-500 flex items-center gap-1">
          <CornerDownLeft className="w-3 h-3" /> to send
        </span>
        <span className="text-[10px] text-gray-500">
          Powered by CodeSync AI
        </span>
      </div>
    </div>
  );
}
