'use client';

import React, { useEffect, useMemo } from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { Bell, Archive, CheckCircle2, MoreVertical, Zap, Github, ShieldAlert, Users, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '@/store/notification-store';
import { useVirtualizer } from '@tanstack/react-virtual';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'AI': <Zap className="h-4 w-4 text-purple-500" />,
  'GITHUB': <Github className="h-4 w-4 text-slate-700 dark:text-slate-300" />,
  'DEPLOYMENTS': <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  'TEAM': <Users className="h-4 w-4 text-blue-500" />,
  'BILLING': <CreditCard className="h-4 w-4 text-amber-500" />,
  'SECURITY': <ShieldAlert className="h-4 w-4 text-red-500" />
};

export default function NotificationsPage() {
  const { 
    notifications, 
    activeCategory, 
    searchQuery, 
    markAsRead, 
    archive, 
    markAllAsRead,
    initialize
  } = useNotificationStore();

  useEffect(() => {
    if (notifications.length === 0) {
      initialize();
    }
  }, [notifications.length, initialize]);

  const filtered = useMemo(() => {
    return notifications.filter(n => {
      // Status filter
      if (n.status === 'archived') return false;

      // Category filter
      if (activeCategory === 'Unread') {
        if (n.status !== 'unread') return false;
      } else if (activeCategory !== 'All') {
        if (n.category !== activeCategory) return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return n.title.toLowerCase().includes(query) || n.message.toLowerCase().includes(query);
      }
      
      return true;
    });
  }, [notifications, activeCategory, searchQuery]);

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // estimated row height
    overscan: 5,
  });

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex items-center justify-between space-y-2 mb-6 shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Inbox
            {notifications.filter(n => n.status === 'unread').length > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {notifications.filter(n => n.status === 'unread').length}
              </span>
            )}
          </h2>
          <p className="text-text-muted mt-1">Review your latest activity and alerts.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </div>
      
      <Card className="flex-1 border-border/50 overflow-hidden flex flex-col bg-surface min-h-0">
        <div 
          ref={parentRef}
          className="flex-1 overflow-y-auto custom-scrollbar relative"
        >
          {filtered.length > 0 ? (
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const n = filtered[virtualRow.index];
                return (
                  <div
                    key={n.id}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <div className={`p-4 border-b border-border/50 hover:bg-muted/30 transition-colors flex gap-4 ${n.status === 'unread' ? 'bg-primary/5' : ''}`}>
                      <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${n.status === 'unread' ? 'bg-primary' : 'bg-transparent'}`} />
                      <div className="bg-background border border-border p-2 rounded-lg flex-shrink-0 self-start">
                        {CATEGORY_ICONS[n.category.toUpperCase()] || <Bell className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h4 className={`text-sm truncate ${n.status === 'unread' ? 'font-bold' : 'font-medium'}`}>
                              {n.title}
                              {n.priority === 'high' && <span className="ml-2 text-[10px] uppercase tracking-wider bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full shrink-0">High Priority</span>}
                            </h4>
                            <p className="text-sm text-text-muted mt-1 break-words line-clamp-1">{n.message}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-text-muted whitespace-nowrap">{new Date(n.createdAt).toLocaleDateString()}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          {n.status === 'unread' && (
                            <Button variant="outline" size="sm" onClick={() => markAsRead(n.id)} className="h-7 text-xs">Mark as read</Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => archive(n.id)} className="h-7 text-xs">Archive</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-text-muted p-12">
              <Archive className="h-12 w-12 mb-4 opacity-20" />
              <p>You're all caught up!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
