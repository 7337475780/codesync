'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ActivityEvent } from './activity-data';
import { ActivityItem } from './activity-item';
import { Card } from '@codesync/ui/components/ui/card';
import { Loader2 } from 'lucide-react';

interface ActivityFeedProps {
  activities: ActivityEvent[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: activities.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 10,
  });

  if (!isClient) {
    return (
      <Card className="flex items-center justify-center min-h-[600px] border-border/50">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center min-h-[600px] border-border/50 bg-muted/10">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Loader2 className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No activity found</h3>
        <p className="text-muted-foreground">Adjust your filters or search query.</p>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
      <div 
        ref={parentRef} 
        className="h-[600px] overflow-auto custom-scrollbar p-6"
        style={{ contain: 'strict' }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const activity = activities[virtualRow.index];
            const isLast = virtualRow.index === activities.length - 1;
            
            return (
              <div
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="pr-4 pb-2">
                  <ActivityItem activity={activity} isLast={isLast} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
