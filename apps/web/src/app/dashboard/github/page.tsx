"use client";

import React, { useEffect } from 'react';
import { useGithubStore } from '@/store/github-store';
import { useRepositoryStore } from '@/store/repository-store';
import { GithubLoading } from '@/components/github/github-loading';
import { GithubEmptyState } from '@/components/github/github-empty-state';
import { RepositoryGrid } from '@/components/github/repository-grid';
import { BookMarked, TrendingUp, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function GithubDashboardPage() {
  const { account, isLoading: isAuthLoading } = useGithubStore();
  const { repositories, fetchRepositories, isLoading: isReposLoading } = useRepositoryStore();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  if (isAuthLoading || isReposLoading) {
    return <GithubLoading text="Loading GitHub dashboard..." />;
  }

  if (!account) {
    return (
      <GithubEmptyState 
        icon={BookMarked}
        title="Connect GitHub"
        description="Connect your GitHub account to import repositories and manage your workspaces."
        actionText="Connect Account"
        onAction={() => window.location.href = '/dashboard/github/connect'}
      />
    );
  }

  const activeRepos = repositories.filter(r => r.deploymentStatus === 'success' || r.deploymentStatus === 'building').length;

  return (
    <div className="flex flex-col space-y-8 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Overview</h2>
          <p className="text-text-muted">Welcome back, {account.username}. Here's what's happening across your repositories.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="bg-card border border-border rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Total Repositories</h3>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <BookMarked className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-bold">{repositories.length}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="bg-card border border-border rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Active Deployments</h3>
            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
          </div>
          <p className="text-3xl font-bold">{activeRepos}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.3 }}
          className="bg-card border border-border rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Contributions</h3>
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-500" />
            </div>
          </div>
          <p className="text-3xl font-bold">2,451</p>
          <p className="text-xs text-text-muted mt-2 text-success flex items-center">+12% from last week</p>
        </motion.div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight">Recent Repositories</h3>
        {repositories.length > 0 ? (
          <RepositoryGrid repositories={repositories.slice(0, 4)} />
        ) : (
          <GithubEmptyState 
            icon={BookMarked}
            title="No repositories found"
            description="You don't have any repositories connected yet."
          />
        )}
      </div>
    </div>
  );
}
