'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { toast } from 'sonner';
import { Key, Copy, Plus } from 'lucide-react';

export default function ApiKeysSettingsPage() {
  const [keys, setKeys] = useState([
    { id: '1', name: 'Production API Key', prefix: 'cs_live_...', created: '2026-07-01' },
    { id: '2', name: 'Development API Key', prefix: 'cs_test_...', created: '2026-07-15' },
  ]);

  const handleCreate = () => {
    toast.success('API Key created successfully');
  };

  const handleCopy = () => {
    toast.success('API Key copied to clipboard');
  };

  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="API Keys" 
        description="Manage keys for programmatic access to the CodeSync API."
      />
      
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Generate New Key
          </Button>
        </div>

        <Card className="p-0 overflow-hidden border-border/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Key Prefix</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {keys.map((key) => (
                  <tr key={key.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      {key.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-muted-foreground">{key.prefix}</td>
                    <td className="px-6 py-4 text-muted-foreground">{key.created}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={handleCopy}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive ml-2">Revoke</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
