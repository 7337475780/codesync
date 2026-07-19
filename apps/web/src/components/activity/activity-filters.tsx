import React from 'react';
import { Input } from '@codesync/ui/components/ui/input';
import { Button } from '@codesync/ui/components/ui/button';
import { ActivityType } from './activity-data';
import { Search } from 'lucide-react';

interface ActivityFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: ActivityType | 'all';
  setActiveFilter: (filter: ActivityType | 'all') => void;
}

export function ActivityFilters({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
}: ActivityFiltersProps) {
  const filters: { label: string; value: ActivityType | 'all' }[] = [
    { label: 'All Activity', value: 'all' },
    { label: 'GitHub', value: 'github' },
    { label: 'Deployments', value: 'deployment' },
    { label: 'AI Activity', value: 'ai' },
    { label: 'Team', value: 'team' },
    { label: 'Workspace', value: 'workspace' },
    { label: 'Project', value: 'project' },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setActiveFilter(filter.value)}
            className="rounded-full transition-all duration-200"
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search activity..."
          className="pl-9 bg-background"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
