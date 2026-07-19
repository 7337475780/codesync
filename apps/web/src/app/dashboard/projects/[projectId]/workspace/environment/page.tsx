"use client";

import React, { useState } from 'react';
import { Search, Eye, EyeOff, Plus, Trash2, ShieldAlert } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';
import { Input } from '@codesync/ui/components/ui/input';

interface EnvVar {
  id: string;
  key: string;
  value: string;
  type: 'public' | 'secret';
}

const MOCK_ENV_VARS: EnvVar[] = [
  { id: '1', key: 'NEXT_PUBLIC_API_URL', value: 'https://api.codesync.dev', type: 'public' },
  { id: '2', key: 'DATABASE_URL', value: 'postgresql://user:pass@db:5432/codesync', type: 'secret' },
  { id: '3', key: 'STRIPE_SECRET_KEY', value: 'sk_test_123456789', type: 'secret' },
];

export default function EnvironmentPage({ params }: { params: { projectId: string } }) {
  const [vars, setVars] = useState<EnvVar[]>(MOCK_ENV_VARS);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());

  const toggleVisibility = (id: string) => {
    const next = new Set(visibleSecrets);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setVisibleSecrets(next);
  };

  const filteredVars = vars.filter(v => 
    v.key.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (visibleSecrets.has(v.id) && v.value.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Environment Variables</h2>
          <p className="text-muted-foreground mt-1">Manage runtime configuration and secrets.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add Variable
        </Button>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search variables..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Key</th>
                <th className="px-6 py-3 font-medium">Value</th>
                <th className="px-6 py-3 font-medium w-32">Type</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVars.map((v) => (
                <tr key={v.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4 font-mono font-medium">{v.key}</td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">
                    {v.type === 'secret' && !visibleSecrets.has(v.id) ? '••••••••••••••••' : v.value}
                  </td>
                  <td className="px-6 py-4">
                    {v.type === 'secret' ? (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-500">
                        <ShieldAlert className="w-3 h-3 mr-1" /> Secret
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-500">
                        Public
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {v.type === 'secret' && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleVisibility(v.id)}>
                        {visibleSecrets.has(v.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredVars.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground italic">
                    No variables found.
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
