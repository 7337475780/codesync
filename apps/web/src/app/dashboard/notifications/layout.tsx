"use client";

import React from 'react';
import { NotificationFilter } from '@/components/notifications/notification-filter';
import { Bell } from 'lucide-react';

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-8 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Bell className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notification Center</h1>
          <p className="text-sm text-text-muted">Manage your alerts across all connected platforms.</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        <NotificationFilter />
        <div className="flex-1 min-w-0 h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
