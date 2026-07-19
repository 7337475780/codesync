import React from 'react';
import { Repository } from '@/lib/github/types';
import { Star, GitFork, Eye, CircleDot, Clock, Box } from 'lucide-react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export const RepositoryCard = ({ repo }: { repo: Repository }) => {
  const shouldReduceMotion = useReducedMotion();
  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000 / 60 / 60);
    return diff < 24 ? `${diff}h ago` : `${Math.floor(diff / 24)}d ago`;
  };

  const statusColors = {
    success: 'bg-green-500',
    building: 'bg-yellow-500 animate-pulse',
    failed: 'bg-red-500',
    none: 'bg-muted-foreground'
  };

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between bg-card hover:bg-muted/20 border border-border rounded-xl p-5 shadow-sm transition-colors"
    >
      <Link href={`/dashboard/github/repositories/${encodeURIComponent(repo.fullName)}`} className="absolute inset-0" aria-label={`View ${repo.name} repository`} />
      
      <div>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <img src={repo.owner.avatarUrl} alt="" className="w-5 h-5 rounded-md object-cover" />
            <h3 className="font-semibold text-text-primary text-base truncate pr-2">{repo.name}</h3>
          </div>
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase tracking-wide ${repo.private ? 'border-warning/30 text-warning bg-warning/10' : 'border-success/30 text-success bg-success/10'}`}>
            {repo.private ? 'Private' : 'Public'}
          </span>
        </div>
        <p className="text-sm text-text-muted line-clamp-2 h-10 mb-4">{repo.description || 'No description provided.'}</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 text-xs text-text-secondary">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              {repo.language}
            </div>
          )}
          {repo.framework && (
            <div className="flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5" />
              {repo.framework}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {repo.stargazersCount}</span>
            <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> {repo.forksCount}</span>
            <span className="flex items-center gap-1"><CircleDot className="w-3.5 h-3.5" /> {repo.openIssuesCount}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <div className="flex items-center gap-1" title={`Deployment status: ${repo.deploymentStatus}`}>
              <span className={`w-2 h-2 rounded-full ${statusColors[repo.deploymentStatus]}`} />
            </div>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo(repo.updatedAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
