import { create } from 'zustand';
import { ChatConversation, ChatMessage } from '@/lib/ai/types/chat';
import { nanoid } from 'nanoid';

interface ChatState {
  conversations: ChatConversation[];
  activeConversationId: string | null;
  isStreaming: boolean;
  
  createConversation: () => string;
  setActiveConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  appendStreamChunk: (conversationId: string, messageId: string, chunk: string) => void;
  setStreaming: (isStreaming: boolean) => void;
  getActiveConversation: () => ChatConversation | undefined;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  activeConversationId: null,
  isStreaming: false,

  createConversation: () => {
    const id = nanoid();
    set((state) => ({
      conversations: [
        {
          id,
          title: 'New Conversation',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        ...state.conversations,
      ],
      activeConversationId: id,
    }));
    return id;
  },

  setActiveConversation: (id) => set({ activeConversationId: id }),

  addMessage: (conversationId, message) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === conversationId 
        ? { 
            ...conv, 
            updatedAt: Date.now(),
            messages: [...conv.messages, { ...message, id: nanoid(), timestamp: Date.now() }] 
          }
        : conv
    )
  })),

  appendStreamChunk: (conversationId, messageId, chunk) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === conversationId 
        ? {
            ...conv,
            messages: conv.messages.map(msg => 
              msg.id === messageId 
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          }
        : conv
    )
  })),

  setStreaming: (isStreaming) => set({ isStreaming }),
  
  getActiveConversation: () => {
    const { conversations, activeConversationId } = get();
    return conversations.find(c => c.id === activeConversationId);
  }
}));
