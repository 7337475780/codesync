'use client';

import React, { useState } from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DangerAction {
  title: string;
  description: string;
  buttonText: string;
  actionFn: () => Promise<{ success: boolean; message: string }>;
}

export function DangerZone({ actions }: { actions: DangerAction[] }) {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleAction = async (index: number) => {
    // In a real app we would use a confirmation dialog here first
    if (!window.confirm(`Are you sure you want to perform this action? This cannot be undone.`)) return;
    
    setLoadingIndex(index);
    try {
      const result = await actions[index].actionFn();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message || 'Action failed');
      }
    } catch (e) {
      toast.error('An error occurred');
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <Card className="border-destructive/50 bg-destructive/5 overflow-hidden mt-12">
      <div className="p-6 border-b border-destructive/20 bg-destructive/10">
        <h3 className="text-lg font-semibold text-destructive flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Danger Zone
        </h3>
        <p className="text-sm text-destructive/80 mt-1">
          Irreversible actions. Proceed with caution.
        </p>
      </div>
      <div className="divide-y divide-destructive/20">
        {actions.map((action, i) => (
          <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-medium">{action.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
            </div>
            <Button 
              variant="destructive" 
              onClick={() => handleAction(i)}
              disabled={loadingIndex !== null}
            >
              {loadingIndex === i ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing</>
              ) : (
                action.buttonText
              )}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
