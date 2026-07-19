'use client';

import React, { useState } from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { Search, MoreHorizontal, Shield, User, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_MEMBERS = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'Owner', status: 'Online', lastActive: 'Just now' },
  { id: 2, name: 'Sarah Connor', email: 'sarah@example.com', role: 'Admin', status: 'Offline', lastActive: '2h ago' },
  { id: 3, name: 'Mike Ross', email: 'mike@example.com', role: 'Developer', status: 'Online', lastActive: '5m ago' },
];

export default function MembersPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Members</h2>
          <p className="text-muted-foreground mt-1">Manage organization members and their access levels.</p>
        </div>
      </div>
      
      <Card className="p-0 border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-center bg-secondary/10">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search members..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="bg-background border border-border rounded-md px-3 py-2 text-sm">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Developer</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {MOCK_MEMBERS.map((member, i) => (
                <motion.tr 
                  key={member.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 p-2 rounded-full flex-shrink-0">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{member.name}</div>
                        <div className="text-muted-foreground text-xs">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/50 border border-border/50">
                      {member.role === 'Owner' && <Shield className="h-3 w-3 text-amber-500" />}
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Circle className={`h-2 w-2 fill-current ${member.status === 'Online' ? 'text-emerald-500' : 'text-gray-500'}`} />
                      <span className="text-muted-foreground">{member.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{member.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
