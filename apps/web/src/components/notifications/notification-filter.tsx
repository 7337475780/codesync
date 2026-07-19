import React from 'react';
import { useNotificationStore } from '@/store/notification-store';
import { NotificationCategory } from '@/lib/notifications/types';
import { Inbox, CheckCircle2, MessageSquare, Bot, Rocket, Folder, Users, Github } from 'lucide-react';
import { Input } from '@codesync/ui/components/ui/input';

const categories: { label: NotificationCategory | 'All'; icon: React.ReactNode }[] = [
  { label: 'All', icon: <Inbox className="w-4 h-4" /> },
  { label: 'Unread', icon: <CheckCircle2 className="w-4 h-4" /> },
  { label: 'Mentions', icon: <MessageSquare className="w-4 h-4" /> },
  { label: 'AI', icon: <Bot className="w-4 h-4" /> },
  { label: 'Deployments', icon: <Rocket className="w-4 h-4" /> },
  { label: 'Projects', icon: <Folder className="w-4 h-4" /> },
  { label: 'Team', icon: <Users className="w-4 h-4" /> },
  { label: 'GitHub', icon: <Github className="w-4 h-4" /> },
];

export const NotificationFilter = () => {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery, notifications } = useNotificationStore();

  const getUnreadCount = (category: NotificationCategory | 'All') => {
    if (category === 'All') return notifications.filter(n => n.status === 'unread').length;
    if (category === 'Unread') return 0;
    return notifications.filter(n => n.category === category && n.status === 'unread').length;
  };

  return (
    <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
      <div>
        <Input 
          placeholder="Search notifications..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-surface border-border"
          aria-label="Search notifications"
        />
      </div>

      <nav className="flex flex-col gap-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.label;
          const unreadCount = getUnreadCount(cat.label);
          
          return (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-muted/50 hover:text-text-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                {cat.icon}
                <span>{cat.label}</span>
              </div>
              {unreadCount > 0 && cat.label !== 'Unread' && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-muted'}`}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
