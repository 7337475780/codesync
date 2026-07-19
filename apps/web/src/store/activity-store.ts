import { create } from 'zustand';
import type { ProjectActivity } from '@prisma/client';

export interface ActivityState {
  activities: Partial<ProjectActivity>[];
  isLoading: boolean;
  hasMore: boolean;
  setActivities: (activities: Partial<ProjectActivity>[]) => void;
  appendActivities: (activities: Partial<ProjectActivity>[]) => void;
  setLoading: (loading: boolean) => void;
  setHasMore: (hasMore: boolean) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  isLoading: false,
  hasMore: true,
  setActivities: (activities) => set({ activities }),
  appendActivities: (activities) => set((state) => ({ activities: [...state.activities, ...activities] })),
  setLoading: (loading) => set({ isLoading: loading }),
  setHasMore: (hasMore) => set({ hasMore }),
}));
