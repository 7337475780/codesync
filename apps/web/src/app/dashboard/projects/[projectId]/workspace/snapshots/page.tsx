"use client";

import React from 'react';
import { Clock, DownloadCloud, Trash2, ArrowRightLeft, Camera } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

interface Snapshot {
  id: string;
  name: string;
  createdAt: string;
  size: string;
  trigger: 'manual' | 'auto';
}

const MOCK_SNAPSHOTS: Snapshot[] = [
  { id: 'snap-1', name: 'Before npm update', createdAt: '2026-07-18T10:00:00Z', size: '1.2 GB', trigger: 'manual' },
  { id: 'snap-2', name: 'Daily Backup', createdAt: '2026-07-17T00:00:00Z', size: '1.1 GB', trigger: 'auto' },
  { id: 'snap-3', name: 'Initial Setup', createdAt: '2026-07-16T12:30:00Z', size: '950 MB', trigger: 'auto' },
];

export default function SnapshotsPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Snapshots</h2>
          <p className="text-muted-foreground mt-1">Manage workspace backups and historical states.</p>
        </div>
        <Button>
          <Camera className="w-4 h-4 mr-2" /> Take Snapshot
        </Button>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Snapshot Name</th>
                <th className="px-6 py-3 font-medium">Created At</th>
                <th className="px-6 py-3 font-medium">Size</th>
                <th className="px-6 py-3 font-medium">Trigger</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SNAPSHOTS.map((snap) => (
                <tr key={snap.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-3 text-muted-foreground" />
                    {snap.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(snap.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{snap.size}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium capitalize ${
                      snap.trigger === 'manual' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-text-muted'
                    }`}>
                      {snap.trigger}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <DownloadCloud className="w-4 h-4 mr-2" /> Restore
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Compare">
                      <ArrowRightLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {MOCK_SNAPSHOTS.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Camera className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-sm font-medium">No snapshots available</p>
                      <p className="text-xs opacity-70 mt-1">Take a snapshot to backup your workspace state.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
