import { create } from 'zustand';
import { ActivityEvent } from '@/lib/collaboration/types/activity';

interface ActivityState {
  events: ActivityEvent[];
  addEvent: (event: ActivityEvent) => void;
  clearEvents: () => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  events: [],
  addEvent: (event) => set((state) => ({ 
    events: [event, ...state.events].slice(0, 100) // Keep last 100 events
  })),
  clearEvents: () => set({ events: [] }),
}));
