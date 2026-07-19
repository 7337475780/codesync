'use client';

import React from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { ShieldAlert, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const ROLES = [
  { name: 'Owner', description: 'Full access to all organization settings and billing.', isSystem: true, members: 1 },
  { name: 'Admin', description: 'Can manage members, teams, and workspace settings.', isSystem: true, members: 2 },
  { name: 'Developer', description: 'Can manage projects, deployments, and write code.', isSystem: true, members: 5 },
  { name: 'Viewer', description: 'Read-only access to projects and organization data.', isSystem: true, members: 4 },
];

const PERMISSIONS = [
  'workspace:create', 'workspace:delete', 'workspace:settings',
  'billing:manage', 'billing:view',
  'member:invite', 'member:remove', 'member:roles',
  'project:create', 'project:delete', 'project:deploy'
];

export default function RolesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Roles & Permissions</h2>
          <p className="text-muted-foreground mt-1">Configure access levels and granular permissions.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Custom Role
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4 space-y-4">
          <h3 className="font-semibold text-lg mb-4">Roles</h3>
          {ROLES.map((role, i) => (
            <motion.div 
              key={role.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`p-4 cursor-pointer transition-all hover:border-primary ${i === 1 ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{role.name}</span>
                    {role.isSystem && (
                      <span className="text-[10px] uppercase tracking-wider bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">System</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{role.members} members</span>
                </div>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="md:col-span-8">
          <Card className="p-6 h-full border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  Admin Permissions
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Permissions granted to the Admin role.</p>
              </div>
              <Button variant="outline">Edit Permissions</Button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {PERMISSIONS.map((perm, i) => (
                <div key={perm} className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="font-mono text-sm">{perm}</span>
                  <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
