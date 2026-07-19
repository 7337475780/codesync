import { create } from 'zustand';

export type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: 'mention' | 'invite' | 'deployment' | 'comment' | 'update';
  createdAt: string;
};

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (n) => set((state) => {
    const newNotif: Notification = {
      ...n,
      id: Math.random().toString(36).substr(2, 9),
      read: false,
      createdAt: new Date().toISOString(),
    };
    return {
      notifications: [newNotif, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    };
  }),
  markAsRead: (id) => set((state) => {
    const notifs = state.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    return {
      notifications: notifs,
      unreadCount: notifs.filter(n => !n.read).length,
    };
  }),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0,
  })),
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
