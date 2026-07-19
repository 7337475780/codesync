'use client';

import React, { useState } from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { Mail, Clock, Send, Trash, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_INVITES = [
  { id: 1, email: 'newdev@example.com', role: 'Developer', status: 'Pending', sentAt: '2 hours ago' },
  { id: 2, email: 'designer@example.com', role: 'Designer', status: 'Expired', sentAt: '8 days ago' },
];

export default function InvitationsPage() {
  const [isInviting, setIsInviting] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invitations</h2>
          <p className="text-muted-foreground mt-1">Manage pending invites and invite new members.</p>
        </div>
        <Button onClick={() => setIsInviting(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Members
        </Button>
      </div>

      {isInviting && (
        <Card className="p-6 mb-8 border-primary/20 bg-primary/5">
          <h3 className="text-lg font-bold mb-4">Send New Invitation</h3>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium">Email Address</label>
              <input type="email" placeholder="colleague@company.com" className="w-full bg-background border border-border rounded-md px-4 py-2 text-sm" />
            </div>
            <div className="space-y-2 w-full sm:w-48">
              <label className="text-sm font-medium">Role</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm">
                <option>Developer</option>
                <option>Admin</option>
                <option>Viewer</option>
              </select>
            </div>
            <Button onClick={() => setIsInviting(false)}>Send Invite</Button>
          </div>
        </Card>
      )}
      
      <Card className="p-0 border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
              <tr>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Sent</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {MOCK_INVITES.map((invite, i) => (
                <motion.tr 
                  key={invite.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {invite.email}
                  </td>
                  <td className="px-6 py-4">{invite.role}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${invite.status === 'Pending' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                      {invite.status === 'Pending' ? <Clock className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {invite.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{invite.sentAt}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="sm">
                      <Send className="mr-2 h-3 w-3" />
                      Resend
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash className="mr-2 h-3 w-3" />
                      Cancel
                    </Button>
                  </td>
                </motion.tr>
              ))}
              {MOCK_INVITES.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No pending invitations.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
