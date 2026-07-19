import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DashboardState {
  projectViewMode: 'grid' | 'list';
  setProjectViewMode: (mode: 'grid' | 'list') => void;
  showWidgets: boolean;
  toggleWidgets: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      projectViewMode: 'grid',
      showWidgets: true,
      setProjectViewMode: (mode) => set({ projectViewMode: mode }),
      toggleWidgets: () => set((state) => ({ showWidgets: !state.showWidgets })),
    }),
    {
      name: 'codesync-dashboard',
    }
  )
);
