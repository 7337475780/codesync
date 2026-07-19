import React from 'react';
import { DeploymentStatus } from '@/store/deployment-store';
import { CheckCircle2, Loader2, XCircle, Clock, X } from 'lucide-react';

export const StatusBadge = ({ status }: { status: DeploymentStatus }) => {
  switch (status) {
    case 'READY':
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-success/10 text-success rounded-full text-xs font-medium border border-success/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Ready
        </span>
      );
    case 'BUILDING':
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Building
        </span>
      );
    case 'ERROR':
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-destructive/10 text-destructive rounded-full text-xs font-medium border border-destructive/20">
          <XCircle className="w-3.5 h-3.5" />
          Error
        </span>
      );
    case 'QUEUED':
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-muted text-text-secondary rounded-full text-xs font-medium border border-border">
          <Clock className="w-3.5 h-3.5" />
          Queued
        </span>
      );
    case 'CANCELED':
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-muted text-text-secondary rounded-full text-xs font-medium border border-border">
          <X className="w-3.5 h-3.5" />
          Canceled
        </span>
      );
    default:
      return null;
  }
};
