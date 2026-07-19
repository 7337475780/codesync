import React from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { ActivityEvent } from './activity-data';
import { Activity, GitCommit, Rocket, Users } from 'lucide-react';

interface ActivityStatsProps {
  activities: ActivityEvent[];
}

export function ActivityStats({ activities }: ActivityStatsProps) {
  // Simple stats calculation based on the mock data
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  
  const todaysActivities = activities.filter(a => a.timestamp.getTime() >= startOfDay).length;
  const githubActivities = activities.filter(a => a.type === 'github').length;
  const deployments = activities.filter(a => a.type === 'deployment').length;
  const aiInteractions = activities.filter(a => a.type === 'ai').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium tracking-tight">Today's Activity</h3>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-2xl font-bold">{todaysActivities}</div>
          <p className="text-xs text-muted-foreground">
            +12% from yesterday
          </p>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium tracking-tight">Commits</h3>
          <GitCommit className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-2xl font-bold">{githubActivities}</div>
          <p className="text-xs text-muted-foreground">
            Across all repositories
          </p>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium tracking-tight">Deployments</h3>
          <Rocket className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-2xl font-bold">{deployments}</div>
          <p className="text-xs text-muted-foreground">
            94% success rate
          </p>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium tracking-tight">AI Assisted</h3>
          <Users className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-2xl font-bold">{aiInteractions}</div>
          <p className="text-xs text-muted-foreground">
            Code generation & reviews
          </p>
        </div>
      </Card>
    </div>
  );
}

