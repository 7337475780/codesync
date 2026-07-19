import { create } from 'zustand';

interface WorkspaceState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  // Further dashboard-wide states can be added here
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
