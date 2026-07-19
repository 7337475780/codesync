import { create } from 'zustand';
import { WorkspaceContext } from '@/lib/ai/types/provider';

interface ContextState {
  isAutoContextEnabled: boolean;
  manualContext: WorkspaceContext;
  
  setAutoContext: (enabled: boolean) => void;
  updateManualContext: (context: Partial<WorkspaceContext>) => void;
}

export const useContextStore = create<ContextState>((set) => ({
  isAutoContextEnabled: true,
  manualContext: { openFiles: [] },
  
  setAutoContext: (enabled) => set({ isAutoContextEnabled: enabled }),
  updateManualContext: (context) => set((state) => ({ 
    manualContext: { ...state.manualContext, ...context } 
  })),
}));
