import React from 'react';

export const ProjectGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="h-48 bg-muted rounded-xl border border-border/50"></div>
    ))}
  </div>
);

export const WizardSkeleton = () => (
  <div className="w-full max-w-3xl mx-auto space-y-6 animate-pulse">
    <div className="h-12 bg-muted rounded-lg w-full"></div>
    <div className="h-96 bg-muted rounded-xl w-full"></div>
    <div className="flex justify-between">
      <div className="h-10 bg-muted rounded-lg w-24"></div>
      <div className="h-10 bg-muted rounded-lg w-24"></div>
    </div>
  </div>
);

export const ImportSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto flex space-x-6 animate-pulse">
    <div className="w-1/3 h-[500px] bg-muted rounded-xl"></div>
    <div className="w-2/3 h-[500px] bg-muted rounded-xl"></div>
  </div>
);

export const TemplateSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="h-64 bg-muted rounded-xl"></div>
    ))}
  </div>
);

export const ActivitySkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-muted"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);
