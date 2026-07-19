import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ViewMode = 'grid' | 'list';

interface DashboardState {
  projectViewMode: ViewMode;
  setProjectViewMode: (mode: ViewMode) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      projectViewMode: 'grid',
      setProjectViewMode: (mode) => set({ projectViewMode: mode }),
    }),
    {
      name: 'codesync-dashboard-storage',
    }
  )
);
