import React, { useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Notification } from '@/lib/notifications/types';
import { NotificationCard } from './notification-card';
import { NotificationEmptyState } from './notification-empty-state';

// Helper to determine the group label for a date
const getGroupLabel = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 7) return 'Previous 7 Days';
  if (diffDays <= 30) return 'Previous 30 Days';
  return 'Older';
};

type VirtualItemData = 
  | { type: 'header'; label: string; id: string }
  | { type: 'notification'; notification: Notification; id: string };

export const NotificationList = ({ notifications }: { notifications: Notification[] }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const flatItems = useMemo(() => {
    const items: VirtualItemData[] = [];
    let currentGroup = '';

    notifications.forEach(notif => {
      const groupLabel = getGroupLabel(notif.createdAt);
      if (groupLabel !== currentGroup) {
        items.push({ type: 'header', label: groupLabel, id: `header-${groupLabel}` });
        currentGroup = groupLabel;
      }
      items.push({ type: 'notification', notification: notif, id: notif.id });
    });

    return items;
  }, [notifications]);

  const rowVirtualizer = useVirtualizer({
    count: flatItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => flatItems[index].type === 'header' ? 48 : 100,
    overscan: 10,
    getItemKey: (index) => flatItems[index].id,
  });

  if (notifications.length === 0) {
    return <NotificationEmptyState />;
  }

  return (
    <div 
      ref={parentRef} 
      className="h-[calc(100vh-12rem)] overflow-auto scrollbar-thin rounded-xl border border-border bg-card shadow-sm"
    >
      <div
        className="w-full relative"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const item = flatItems[virtualRow.index];

            return (
              <div
                key={virtualRow.key}
                className="absolute top-0 left-0 w-full"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {item.type === 'header' ? (
                  <div className="px-6 py-2 bg-muted/80 backdrop-blur-md sticky top-0 z-10 text-xs font-bold uppercase tracking-wider text-text-secondary border-y border-border first:border-t-0 flex items-center h-full">
                    {item.label}
                  </div>
                ) : (
                  <NotificationCard notification={item.notification} />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
