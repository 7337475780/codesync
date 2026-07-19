import { create } from 'zustand';
import { Collaborator } from '@/lib/collaboration/types/presence';

interface PresenceState {
  collaborators: Collaborator[];
  activeUsers: number;
  setCollaborators: (collaborators: Collaborator[]) => void;
  getCollaborator: (id: string) => Collaborator | undefined;
}

export const usePresenceStore = create<PresenceState>((set, get) => ({
  collaborators: [],
  activeUsers: 0,
  setCollaborators: (collaborators) => set({ 
    collaborators, 
    activeUsers: collaborators.filter(c => c.status === 'online' || c.status === 'idle').length 
  }),
  getCollaborator: (id) => get().collaborators.find(c => c.id === id),
}));
