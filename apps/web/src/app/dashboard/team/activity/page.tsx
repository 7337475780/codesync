'use client';

import React from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { Activity, Shield, UserPlus, FileEdit, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_ACTIVITY = [
  { id: 1, user: 'Alex Johnson', action: 'changed role of', target: 'Mike Ross', to: 'Developer', icon: Shield, time: '2 hours ago' },
  { id: 2, user: 'Sarah Connor', action: 'invited', target: 'newdev@example.com', icon: UserPlus, time: '5 hours ago' },
  { id: 3, user: 'System', action: 'automatically deployed', target: 'production', icon: Activity, time: '1 day ago' },
  { id: 4, user: 'Alex Johnson', action: 'updated', target: 'billing settings', icon: Settings, time: '2 days ago' },
  { id: 5, user: 'Mike Ross', action: 'created project', target: 'frontend-v2', icon: FileEdit, time: '3 days ago' },
];

export default function ActivityPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audit Log</h2>
          <p className="text-muted-foreground mt-1">Review organization activity and security events.</p>
        </div>
      </div>
      
      <Card className="p-6 border-border/50">
        <div className="relative border-l border-border/50 ml-4 space-y-8 pb-4">
          {MOCK_ACTIVITY.map((log, i) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8"
            >
              <div className="absolute -left-4 top-0 bg-background border border-border p-1.5 rounded-full">
                <log.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-sm">
                  <span className="font-bold text-foreground">{log.user}</span>{' '}
                  <span className="text-muted-foreground">{log.action}</span>{' '}
                  <span className="font-medium text-foreground">{log.target}</span>
                  {log.to && (
                    <>
                      {' '}to <span className="font-medium text-foreground">{log.to}</span>
                    </>
                  )}
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {log.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
