import { create } from 'zustand';

export type Role = 'user' | 'assistant' | 'system';
export type AiMode = 'chat' | 'project-analysis' | 'code-review' | 'bug-finder' | 'architecture-planner' | 'generate';

export interface AiMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface AiContextFile {
  id: string;
  filename: string;
  content?: string;
  language?: string;
}

interface AiState {
  messages: AiMessage[];
  isStreaming: boolean;
  activeMode: AiMode;
  contextFiles: AiContextFile[];
  
  // Modals
  isContextModalOpen: boolean;
  isLibraryModalOpen: boolean;
  isUsageModalOpen: boolean;
  libraryTab: 'history' | 'saved' | 'library';
  
  // Actions
  addMessage: (msg: Omit<AiMessage, 'id' | 'timestamp'>) => void;
  appendStream: (content: string) => void;
  finishStream: () => void;
  setMode: (mode: AiMode) => void;
  addContextFile: (file: AiContextFile) => void;
  removeContextFile: (id: string) => void;
  clearChat: () => void;
  setContextModalOpen: (open: boolean) => void;
  setLibraryModalOpen: (open: boolean, tab?: 'history' | 'saved' | 'library') => void;
  setUsageModalOpen: (open: boolean) => void;
}

export const useAiStore = create<AiState>((set) => ({
  messages: [
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your Enterprise AI Assistant. How can I help you with your codebase today?',
      timestamp: new Date().toISOString(),
    }
  ],
  isStreaming: false,
  activeMode: 'chat',
  contextFiles: [],
  isContextModalOpen: false,
  isLibraryModalOpen: false,
  isUsageModalOpen: false,
  libraryTab: 'library',

  addMessage: (msg) => set((state) => ({
    messages: [
      ...state.messages, 
      { 
        ...msg, 
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString()
      }
    ],
    isStreaming: msg.isStreaming || false,
  })),

  appendStream: (content) => set((state) => {
    const newMessages = [...state.messages];
    const lastMsg = newMessages[newMessages.length - 1];
    if (lastMsg && lastMsg.role === 'assistant' && lastMsg.isStreaming) {
      lastMsg.content += content;
    }
    return { messages: newMessages };
  }),

  finishStream: () => set((state) => {
    const newMessages = [...state.messages];
    const lastMsg = newMessages[newMessages.length - 1];
    if (lastMsg && lastMsg.role === 'assistant') {
      lastMsg.isStreaming = false;
    }
    return { messages: newMessages, isStreaming: false };
  }),

  setMode: (mode) => set({ activeMode: mode }),
  
  addContextFile: (file) => set((state) => ({
    contextFiles: state.contextFiles.find(f => f.id === file.id) 
      ? state.contextFiles 
      : [...state.contextFiles, file]
  })),

  removeContextFile: (id) => set((state) => ({
    contextFiles: state.contextFiles.filter(f => f.id !== id)
  })),

  clearChat: () => set({ 
    messages: [
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: 'Chat cleared. What would you like to work on next?',
        timestamp: new Date().toISOString(),
      }
    ],
    contextFiles: []
  }),

  setContextModalOpen: (open) => set({ isContextModalOpen: open }),
  setLibraryModalOpen: (open, tab) => set((state) => ({ 
    isLibraryModalOpen: open, 
    libraryTab: tab || state.libraryTab 
  })),
  setUsageModalOpen: (open) => set({ isUsageModalOpen: open }),
}));
