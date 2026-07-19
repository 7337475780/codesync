import React from 'react';
import { ActivityEvent } from './activity-data';
import { GitCommit, Rocket, Sparkles, Users, Briefcase, FolderGit2 } from 'lucide-react';
import { cn } from '@codesync/ui/utils/cn';

interface ActivityItemProps {
  activity: ActivityEvent;
  isLast: boolean;
}

export function ActivityItem({ activity, isLast }: ActivityItemProps) {
  const getIcon = () => {
    switch (activity.type) {
      case 'github': return <GitCommit className="h-4 w-4 text-emerald-500" />;
      case 'deployment': return <Rocket className={cn("h-4 w-4", activity.metadata?.status === 'failure' ? 'text-destructive' : 'text-blue-500')} />;
      case 'ai': return <Sparkles className="h-4 w-4 text-purple-500" />;
      case 'team': return <Users className="h-4 w-4 text-orange-500" />;
      case 'workspace': return <Briefcase className="h-4 w-4 text-slate-500" />;
      case 'project': return <FolderGit2 className="h-4 w-4 text-indigo-500" />;
    }
  };

  const getBackground = () => {
    switch (activity.type) {
      case 'github': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'deployment': return activity.metadata?.status === 'failure' ? 'bg-destructive/10 border-destructive/20' : 'bg-blue-500/10 border-blue-500/20';
      case 'ai': return 'bg-purple-500/10 border-purple-500/20';
      case 'team': return 'bg-orange-500/10 border-orange-500/20';
      case 'workspace': return 'bg-slate-500/10 border-slate-500/20';
      case 'project': return 'bg-indigo-500/10 border-indigo-500/20';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="relative pl-8 py-4 group">
      {!isLast && (
        <div className="absolute left-[11px] top-[40px] bottom-[-20px] w-px bg-border group-hover:bg-primary/20 transition-colors duration-300" />
      )}
      <div className={cn(
        "absolute left-0 top-5 h-6 w-6 rounded-full border flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110",
        getBackground()
      )}>
        {getIcon()}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold tracking-tight">{activity.title}</h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDate(activity.timestamp)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{activity.description}</p>
          
          {/* Metadata Rendering */}
          {activity.metadata && (
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(activity.metadata).map(([key, value]) => (
                <span key={key} className="inline-flex items-center rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-border/50 text-secondary-foreground">
                  {key}: {value}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {activity.user && (
          <div className="flex items-center gap-2 flex-shrink-0 bg-background/50 p-1.5 rounded-full border border-border/50">
            {activity.user.avatar ? (
              <img 
                src={activity.user.avatar} 
                alt={activity.user.name}
                width={24}
                height={24}
                loading="lazy"
                className="rounded-full bg-secondary object-cover w-6 h-6"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary">
                {activity.user.name.charAt(0)}
              </div>
            )}
            <span className="text-xs font-medium pr-2">{activity.user.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
