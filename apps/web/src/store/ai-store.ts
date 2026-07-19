import { create } from 'zustand';
import { AIProvider } from '@/lib/ai/types/provider';

// --- New Phase 4.7 interface ---
interface AIState {
  provider: AIProvider | null;
  selectedModel: string;
  totalTokensUsed: number;
  setProvider: (provider: AIProvider) => void;
  setSelectedModel: (model: string) => void;
  incrementTokens: (amount: number) => void;
}

export const useAIStore = create<AIState>((set) => ({
  provider: null,
  selectedModel: 'CodeSync Default',
  totalTokensUsed: 0,
  setProvider: (provider) => set({ provider }),
  setSelectedModel: (selectedModel) => set({ selectedModel }),
  incrementTokens: (amount) => set((state) => ({ totalTokensUsed: state.totalTokensUsed + amount })),
}));

// --- Legacy types for backwards-compatibility with /dashboard/ai components ---
export type AiMode = 'chat' | 'project-analysis' | 'code-review' | 'bug-finder' | 'architecture-planner' | 'generate';

export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

interface LegacyAiState {
  activeMode: AiMode;
  messages: AiMessage[];
  isStreaming: boolean;
  isContextModalOpen: boolean;
  isLibraryModalOpen: boolean;
  libraryTab: string;
  isUsageModalOpen: boolean;
  setMode: (mode: AiMode) => void;
  addMessage: (msg: Omit<AiMessage, 'id' | 'timestamp'>) => void;
  appendStream: (chunk: string) => void;
  finishStream: () => void;
  setContextModalOpen: (open: boolean) => void;
  setLibraryModalOpen: (open: boolean, tab?: string) => void;
  setUsageModalOpen: (open: boolean) => void;
}

export const useAiStore = create<LegacyAiState>((set) => ({
  activeMode: 'chat',
  messages: [],
  isStreaming: false,
  isContextModalOpen: false,
  isLibraryModalOpen: false,
  libraryTab: 'history',
  isUsageModalOpen: false,
  setMode: (mode) => set({ activeMode: mode }),
  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, { ...msg, id: crypto.randomUUID(), timestamp: Date.now() }],
    isStreaming: msg.isStreaming ?? state.isStreaming,
  })),
  appendStream: (chunk) => set((state) => {
    const messages = [...state.messages];
    const last = messages[messages.length - 1];
    if (last && last.role === 'assistant') {
      messages[messages.length - 1] = { ...last, content: last.content + chunk };
    }
    return { messages };
  }),
  finishStream: () => set((state) => {
    const messages = state.messages.map((m, i) =>
      i === state.messages.length - 1 ? { ...m, isStreaming: false } : m
    );
    return { messages, isStreaming: false };
  }),
  setContextModalOpen: (isContextModalOpen) => set({ isContextModalOpen }),
  setLibraryModalOpen: (isLibraryModalOpen, tab) => set({ isLibraryModalOpen, ...(tab ? { libraryTab: tab } : {}) }),
  setUsageModalOpen: (isUsageModalOpen) => set({ isUsageModalOpen }),
}));

