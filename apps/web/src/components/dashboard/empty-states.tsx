import React from 'react';
import { Button } from '@codesync/ui/components/ui/button';
import { FolderX, Plus, Code2 } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; href: string };
}

export const EmptyState = ({ icon, title, description, primaryAction, secondaryAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl border-border/60 bg-muted/20">
    <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground max-w-md mb-8">{description}</p>
    
    <div className="flex space-x-4">
      {primaryAction && (
        <Button onClick={primaryAction.onClick}>
          <Plus className="mr-2 h-4 w-4" />
          {primaryAction.label}
        </Button>
      )}
      {secondaryAction && (
        <Button variant="outline" asChild>
          <Link href={secondaryAction.href}>
            {secondaryAction.label}
          </Link>
        </Button>
      )}
    </div>
  </div>
);

export const EmptyProjectsState = ({ onCreateProject }: { onCreateProject: () => void }) => (
  <EmptyState
    icon={<FolderX className="h-8 w-8" />}
    title="No projects found"
    description="Get started by creating a new project or importing an existing repository from GitHub."
    primaryAction={{ label: "Create Project", onClick: onCreateProject }}
    secondaryAction={{ label: "View Documentation", href: "/docs/getting-started" }}
  />
);
