import React from 'react';
import { Contributor } from '@/lib/github/types';
import { GitCommit, GitPullRequest, Eye } from 'lucide-react';
import { getInitials } from '@/lib/string-utils';
import { motion, useReducedMotion } from 'framer-motion';

export const ContributorGrid = ({ contributors }: { contributors: Contributor[] }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contributors.map((contributor, i) => (
        <motion.div
          key={contributor.login}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : Math.min(i * 0.05, 0.2) }}
          className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 relative"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full object-cover border border-border flex items-center justify-center font-bold text-white text-lg shrink-0"
                style={{ backgroundColor: `hsl(${contributor.login.length * 40}, 70%, 50%)` }}
              >
                {getInitials(contributor.login)}
              </div>
              <div>
                <h3 className="font-semibold text-base">{contributor.login}</h3>
                <span className="text-xs text-text-muted flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${contributor.status === 'online' ? 'bg-success' : 'bg-muted-foreground'}`} />
                  {contributor.status === 'online' ? 'Active now' : 'Offline'}
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center border-4 border-muted" title="Activity Score">
              <span className="text-xs font-bold text-primary">{contributor.activityScore}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
            <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
              <GitCommit className="w-4 h-4 text-text-muted mb-1" />
              <span className="font-semibold text-sm">{contributor.contributions}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
              <GitPullRequest className="w-4 h-4 text-text-muted mb-1" />
              <span className="font-semibold text-sm">{contributor.pullRequests}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
              <Eye className="w-4 h-4 text-text-muted mb-1" />
              <span className="font-semibold text-sm">{contributor.reviews}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
