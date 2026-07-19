"use client";

import React, { useEffect, useMemo } from 'react';
import { useNotificationStore } from '@/store/notification-store';
import { NotificationList } from '@/components/notifications/notification-list';
import { NotificationSettings } from '@/components/notifications/notification-settings';
import { Button } from '@codesync/ui/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function NotificationsPage() {
  const { 
    notifications, 
    initialize, 
    activeCategory, 
    searchQuery,
    markAllAsRead
  } = useNotificationStore();

  useEffect(() => {
    if (notifications.length === 0) {
      initialize();
    }
  }, [initialize, notifications.length]);

  const filteredNotifications = useMemo(() => {
    let filtered = notifications.filter(n => n.status !== 'archived');

    if (activeCategory === 'Unread') {
      filtered = filtered.filter(n => n.status === 'unread');
    } else if (activeCategory !== 'All') {
      filtered = filtered.filter(n => n.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.message.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [notifications, activeCategory, searchQuery]);

  const unreadCount = filteredNotifications.filter(n => n.status === 'unread').length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">
          {activeCategory === 'All' ? 'All Notifications' : activeCategory}
          {unreadCount > 0 && (
            <span className="ml-2 text-sm font-normal text-text-muted">
              ({unreadCount} unread)
            </span>
          )}
        </h2>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => markAllAsRead()} className="text-text-muted hover:text-text-primary">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
          <NotificationSettings />
        </div>
      </div>
      
      <NotificationList notifications={filteredNotifications} />
    </div>
  );
}
