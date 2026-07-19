import React from 'react';
import { Bell } from 'lucide-react';

export const NotificationEmptyState = ({ title = "No notifications", description = "You're all caught up! Check back later for new alerts and updates." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-[400px]">
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
        <Bell className="w-8 h-8 text-text-muted" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-text-muted max-w-sm">{description}</p>
    </div>
  );
};
