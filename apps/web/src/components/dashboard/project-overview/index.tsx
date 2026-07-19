import React, { Suspense } from 'react';
import { Button } from '@codesync/ui/components/ui/button';
import { Play } from 'lucide-react';
import { ActivitySkeleton } from '../skeletons';

// In a real app, these would be React.lazy() dynamically imported components
const RepoSection = () => <div className="p-6 bg-card border rounded-xl h-64 flex items-center justify-center text-muted-foreground">Repository Insights (Suspended)</div>;
const MembersSection = () => <div className="p-6 bg-card border rounded-xl h-48 flex items-center justify-center text-muted-foreground">Members (Suspended)</div>;
const ActivitySection = () => <div className="p-6 bg-card border rounded-xl h-96 flex items-center justify-center text-muted-foreground">Activity Feed (Suspended)</div>;
const DeploymentsSection = () => <div className="p-6 bg-card border rounded-xl h-48 flex items-center justify-center text-muted-foreground">Deployments (Suspended)</div>;

export const ProjectOverview = ({ projectId }: { projectId: string }) => {
  return (
    <div className="space-y-8">
      {/* Header & Primary CTA */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">codesync-web</h1>
          <p className="text-muted-foreground mt-1">A high performance React application.</p>
        </div>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg group">
          <Play className="mr-2 w-5 h-5 fill-white" />
          <span className="font-semibold tracking-wide">Open in Editor</span>
        </Button>
      </div>

      {/* Modular Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-xl" />}>
            <RepoSection />
          </Suspense>

          <Suspense fallback={<ActivitySkeleton />}>
            <ActivitySection />
          </Suspense>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <Suspense fallback={<div className="h-48 bg-muted animate-pulse rounded-xl" />}>
            <DeploymentsSection />
          </Suspense>
          
          <Suspense fallback={<div className="h-48 bg-muted animate-pulse rounded-xl" />}>
            <MembersSection />
          </Suspense>
        </div>

      </div>
    </div>
  );
};
