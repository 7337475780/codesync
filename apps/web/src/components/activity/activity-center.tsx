'use client';

import React, { useState, useMemo } from 'react';
import { ActivityFeed } from './activity-feed';
import { ActivityFilters } from './activity-filters';
import { ActivityStats } from './activity-stats';
import { mockActivities, ActivityType } from './activity-data';
import { Download, FileText } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

export function ActivityCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ActivityType | 'all'>('all');

  const filteredActivities = useMemo(() => {
    return mockActivities.filter((activity) => {
      const matchesFilter = activeFilter === 'all' || activity.type === activeFilter;
      const matchesSearch = 
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.user?.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enterprise Activity Center</h1>
          <p className="text-muted-foreground mt-1">
            Real-time insights across your entire organization.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <FileText className="mr-2 h-4 w-4" />
            Audit Logs
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <ActivityStats activities={mockActivities} />
      
      <div className="space-y-4">
        <ActivityFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <ActivityFeed activities={filteredActivities} />
      </div>
    </div>
  );
}
