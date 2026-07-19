export type NotificationCategory = 'All' | 'Unread' | 'Mentions' | 'AI' | 'Deployments' | 'Projects' | 'Team' | 'GitHub';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';
export type NotificationStatus = 'unread' | 'read' | 'archived';

export interface NotificationAction {
  label: string;
  url?: string;
  type?: 'primary' | 'secondary' | 'danger';
}

export interface NotificationActor {
  name: string;
  avatarUrl?: string;
  id?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  status: NotificationStatus;
  createdAt: string; // ISO 8601
  actor?: NotificationActor;
  actions?: NotificationAction[];
  metadata?: Record<string, any>;
}

export interface NotificationGroup {
  id: string;
  title: string; // e.g., 'Today', 'Yesterday', 'Earlier this week'
  notifications: Notification[];
}
