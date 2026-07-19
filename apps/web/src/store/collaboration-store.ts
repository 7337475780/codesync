import { create } from 'zustand';
import { CollaborationProvider } from '@/lib/collaboration/providers/CollaborationProvider';

interface CollaborationState {
  provider: CollaborationProvider | null;
  isConnected: boolean;
  workspaceId: string | null;
  setProvider: (provider: CollaborationProvider) => void;
  setConnected: (connected: boolean, workspaceId?: string) => void;
}

export const useCollaborationStore = create<CollaborationState>((set) => ({
  provider: null,
  isConnected: false,
  workspaceId: null,
  setProvider: (provider) => set({ provider }),
  setConnected: (isConnected, workspaceId) => set((state) => ({ 
    isConnected, 
    workspaceId: workspaceId || state.workspaceId 
  })),
}));
