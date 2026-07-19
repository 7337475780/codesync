import { create } from 'zustand';
import { Notification, NotificationCategory } from '@/lib/notifications/types';
import { generateMockNotifications } from '@/lib/notifications/mock-provider';

interface NotificationState {
  notifications: Notification[];
  activeCategory: NotificationCategory | 'All';
  searchQuery: string;
  
  initialize: () => void;
  setActiveCategory: (category: NotificationCategory | 'All') => void;
  setSearchQuery: (query: string) => void;
  
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  archive: (id: string) => void;
  delete: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  activeCategory: 'All',
  searchQuery: '',

  initialize: () => {
    // Generate 5,000 mocked items to test virtualization
    set({ notifications: generateMockNotifications(5000) });
  },

  setActiveCategory: (category) => set({ activeCategory: category }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),

  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, status: 'read' } : n
    )
  })),

  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => 
      (state.activeCategory === 'All' || n.category === state.activeCategory)
        ? { ...n, status: 'read' }
        : n
    )
  })),

  archive: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, status: 'archived' } : n
    )
  })),

  delete: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  }))
}));
