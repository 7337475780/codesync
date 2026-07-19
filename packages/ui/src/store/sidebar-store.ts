import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  setMobileOpen: (open: boolean) => void;
  activeWorkspaceId: string | null;
  setActiveWorkspace: (id: string) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileOpen: false,
      activeWorkspaceId: null,
      toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setMobileOpen: (open) => set({ isMobileOpen: open }),
      setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),
    }),
    {
      name: 'codesync-sidebar',
      partialize: (state) => ({ isCollapsed: state.isCollapsed, activeWorkspaceId: state.activeWorkspaceId }),
    }
  )
);
