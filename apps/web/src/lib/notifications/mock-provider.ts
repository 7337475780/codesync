import { Notification, NotificationCategory, NotificationPriority, NotificationStatus } from './types';

const CATEGORIES: NotificationCategory[] = ['Mentions', 'AI', 'Deployments', 'Projects', 'Team', 'GitHub'];
const PRIORITIES: NotificationPriority[] = ['low', 'medium', 'high', 'critical'];

const MOCK_MESSAGES = [
  "Deployment #4204 to production failed.",
  "Your pull request was approved by @sarah.",
  "AI Analysis complete: 3 critical vulnerabilities found.",
  "New team member joined the workspace.",
  "Database backup completed successfully.",
  "Build time increased by 45% on the main branch.",
  "Review requested on #184: Implement notification center.",
  "Memory usage spiked in the staging environment.",
  "Project 'Zeus' was archived.",
  "You were mentioned in a comment."
];

const MOCK_ACTORS = [
  { name: 'System', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=System&backgroundColor=0D8ABC' },
  { name: 'Sarah Chen', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=SarahChen' },
  { name: 'Alex Wong', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AlexWong' },
  { name: 'CodeSync AI', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AI&backgroundColor=6366f1' },
  { name: 'GitHub Action', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GA&backgroundColor=24292e' }
];

export const generateMockNotifications = (count: number): Notification[] => {
  const notifications: Notification[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    // Generate dates spreading back over the last 30 days
    const date = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const priority = PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)];
    const status: NotificationStatus = Math.random() > 0.3 ? 'read' : 'unread';
    const message = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
    const actor = MOCK_ACTORS[Math.floor(Math.random() * MOCK_ACTORS.length)];

    notifications.push({
      id: `notif-${i}-${Date.now()}`,
      title: category,
      message,
      category,
      priority,
      status,
      createdAt: date.toISOString(),
      actor,
      actions: Math.random() > 0.7 ? [{ label: 'View Details', type: 'primary' }] : undefined
    });
  }

  // Sort descending by date
  return notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
