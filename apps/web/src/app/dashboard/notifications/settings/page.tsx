'use client';

import React from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 'ai', name: 'AI Assistant', description: 'Code reviews, suggestions, and optimizations' },
  { id: 'github', name: 'GitHub', description: 'Pull requests, commits, and branch updates' },
  { id: 'deployments', name: 'Deployments', description: 'Build status, rollbacks, and domain verification' },
  { id: 'team', name: 'Team & Collaboration', description: 'Mentions, invitations, and role changes' },
  { id: 'billing', name: 'Billing & Usage', description: 'Invoices, plan upgrades, and usage limits' },
];

export default function NotificationSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notification Settings</h2>
          <p className="text-muted-foreground mt-1">Configure how and when you receive alerts.</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 border-border/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
                </div>
                <div className="flex gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                      Browser Push
                    </label>
                    <select className="bg-background border border-border rounded-md px-2 py-1 text-xs w-full">
                      <option>Instant</option>
                      <option>Hourly</option>
                      <option>Never</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                      Email
                    </label>
                    <select className="bg-background border border-border rounded-md px-2 py-1 text-xs w-full">
                      <option>Instant</option>
                      <option>Daily Digest</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        <div className="flex justify-end pt-4">
          <Button>Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}
