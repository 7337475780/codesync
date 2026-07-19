import React from 'react';

export function SettingsHeader({ title, description }: { title: string, description?: string }) {
  return (
    <div className="pb-6 border-b border-border/50 mb-8">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {description && <p className="text-muted-foreground mt-2">{description}</p>}
    </div>
  );
}
