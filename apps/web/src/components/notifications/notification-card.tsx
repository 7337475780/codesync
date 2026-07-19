import React from 'react';
import { Notification } from '@/lib/notifications/types';
import { useNotificationStore } from '@/store/notification-store';
import { getInitials } from '@/lib/string-utils';
import { motion, useReducedMotion } from 'framer-motion';
import { Bell, Check, Trash2, Archive, MessageSquare, Bot, Rocket, Folder, Users, Github } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

export const NotificationCard = ({ notification, style }: { notification: Notification; style?: React.CSSProperties }) => {
  const { markAsRead, archive, delete: deleteNotif } = useNotificationStore();
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = React.useState(false);

  const getIcon = () => {
    switch (notification.category) {
      case 'Mentions': return <MessageSquare className="w-4 h-4" />;
      case 'AI': return <Bot className="w-4 h-4" />;
      case 'Deployments': return <Rocket className="w-4 h-4" />;
      case 'Projects': return <Folder className="w-4 h-4" />;
      case 'Team': return <Users className="w-4 h-4" />;
      case 'GitHub': return <Github className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = () => {
    switch (notification.priority) {
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'high': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-text-muted border-border';
    }
  };

  const isUnread = notification.status === 'unread';

  return (
    <div style={style} className="px-4 py-1">
      <motion.div 
        layout={!shouldReduceMotion}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
        className={`group relative p-4 rounded-xl border transition-all ${isUnread ? 'bg-card border-primary/20 shadow-sm' : 'bg-transparent border-transparent hover:bg-muted/30'}`}
      >
        {isUnread && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
        )}
        
        <div className="flex gap-4">
          {notification.actor ? (
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-white text-sm"
              style={{ backgroundColor: `hsl(${notification.actor.name.length * 40}, 70%, 50%)` }}
              title={notification.actor.name}
            >
              {getInitials(notification.actor.name)}
            </div>
          ) : (
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${getPriorityColor()}`}>
              {getIcon()}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={`text-sm ${isUnread ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>
                  {notification.message}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                  <span className="capitalize">{notification.category}</span>
                  <span>•</span>
                  <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                  {notification.priority !== 'low' && (
                    <>
                      <span>•</span>
                      <span className="uppercase font-medium">{notification.priority}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0">
                {isUnread && (
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-muted hover:text-primary" onClick={() => markAsRead(notification.id)} title="Mark as read">
                    <Check className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-muted hover:text-text-primary" onClick={() => archive(notification.id)} title="Archive">
                  <Archive className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-muted hover:text-destructive" onClick={() => deleteNotif(notification.id)} title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {notification.actions && notification.actions.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                {notification.actions.map((action, i) => (
                  <Button key={i} size="sm" variant={action.type === 'primary' ? 'default' : 'secondary'} className="h-7 text-xs">
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
