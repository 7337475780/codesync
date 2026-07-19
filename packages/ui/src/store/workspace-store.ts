import { create } from 'zustand';

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  role: 'Owner' | 'Admin' | 'Developer' | 'Viewer';
  icon?: string;
  theme?: string;
};

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspace: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  activeWorkspace: null,
  setWorkspaces: (workspaces) => set({ workspaces }),
  setActiveWorkspace: (id) => set((state) => ({
    activeWorkspace: state.workspaces.find(w => w.id === id) || null
  })),
}));
