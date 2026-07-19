import React from 'react';
import { MoreVertical, Github, Cloud, Sparkles, Pin } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';
import type { Project } from '@prisma/client';
import Link from 'next/link';

interface ProjectCardProps {
  project: Partial<Project> & {
    framework?: string;
    runtime?: string;
    gitStatus?: 'clean' | 'dirty' | 'syncing';
    deploymentStatus?: 'success' | 'building' | 'failed';
    collaboratorsCount?: number;
    isPinned?: boolean;
    tags?: string[];
  };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group relative border rounded-xl bg-card hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      <div className="p-5 border-b border-border/50 bg-muted/20">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
              {project.icon || project.name?.charAt(0)}
            </div>
            <div>
              <Link href={`/projects/${project.slug}`} className="font-semibold text-lg hover:underline decoration-primary">
                {project.name}
              </Link>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                <span>Updated 2h ago</span>
                <span>•</span>
                <span>{project.framework || 'React'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {project.isPinned && <Pin className="w-4 h-4 text-orange-500 fill-orange-500/20" />}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {project.description && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col justify-end">
        <div className="flex items-center justify-between text-sm">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1 text-muted-foreground" title="Git Status">
              <Github className="w-4 h-4" />
              <span className={project.gitStatus === 'dirty' ? 'text-yellow-500' : ''}>
                {project.gitStatus === 'dirty' ? 'Uncommitted changes' : 'Synced'}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground" title="Deployment Status">
              <Cloud className="w-4 h-4" />
              <span className={project.deploymentStatus === 'building' ? 'text-blue-500 animate-pulse' : project.deploymentStatus === 'failed' ? 'text-red-500' : 'text-green-500'}>
                {project.deploymentStatus === 'building' ? 'Building...' : project.deploymentStatus === 'failed' ? 'Failed' : 'Production'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {project.isAiEnabled && (
              <div className="p-1.5 rounded-full bg-blue-500/10 text-blue-500" title="AI Enabled">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}
            {project.collaboratorsCount && project.collaboratorsCount > 1 && (
              <div className="flex -space-x-2">
                {[...Array(Math.min(project.collaboratorsCount, 3))].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-card bg-muted" />
                ))}
                {project.collaboratorsCount > 3 && (
                  <div className="w-6 h-6 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold">
                    +{project.collaboratorsCount - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
