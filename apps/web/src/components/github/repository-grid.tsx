import React from 'react';
import { Repository } from '@/lib/github/types';
import { RepositoryCard } from './repository-card';
import { motion, useReducedMotion } from 'framer-motion';

export const RepositoryGrid = ({ repositories }: { repositories: Repository[] }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {repositories.map((repo, i) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : Math.min(i * 0.05, 0.3) }}
        >
          <RepositoryCard repo={repo} />
        </motion.div>
      ))}
    </div>
  );
};
