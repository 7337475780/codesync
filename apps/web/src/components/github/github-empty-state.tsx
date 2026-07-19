import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

interface GithubEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const GithubEmptyState = ({ icon: Icon, title, description, actionText, onAction }: GithubEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl border-dashed bg-muted/10 min-h-[300px]">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction}>{actionText}</Button>
      )}
    </div>
  );
};
