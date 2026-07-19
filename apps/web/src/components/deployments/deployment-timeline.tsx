import React from 'react';
import { Deployment } from '@/store/deployment-store';
import { CheckCircle2, CircleDashed, Loader2, Play } from 'lucide-react';

export const DeploymentTimeline = ({ deployment }: { deployment: Deployment }) => {
  
  const steps = [
    { label: 'Deployment Queued', completed: !!deployment.createdAt, current: false },
    { label: 'Building', completed: !!deployment.buildingAt, current: deployment.status === 'BUILDING' },
    { label: 'Assigning Domains', completed: !!deployment.readyAt, current: false },
    { label: 'Completed', completed: deployment.status === 'READY', current: false, error: deployment.status === 'ERROR', canceled: deployment.status === 'CANCELED' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, index) => (
        <div key={step.label} className="flex gap-4 relative">
          {/* Timeline connecting line */}
          {index < steps.length - 1 && (
            <div className={`absolute left-2.5 top-6 bottom-[-16px] w-0.5 ${step.completed ? 'bg-primary' : 'bg-border'}`} />
          )}
          
          <div className="mt-1 shrink-0 relative z-10 bg-background">
            {step.error ? (
              <CircleDashed className="w-5 h-5 text-destructive" />
            ) : step.canceled ? (
              <CircleDashed className="w-5 h-5 text-text-muted" />
            ) : step.current ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : step.completed ? (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            ) : (
              <CircleDashed className="w-5 h-5 text-text-muted" />
            )}
          </div>
          
          <div className="flex-1 pb-4">
            <span className={`text-sm font-medium ${step.current || step.completed || step.error || step.canceled ? 'text-text-primary' : 'text-text-muted'}`}>
              {step.label}
            </span>
            {step.error && <p className="text-xs text-destructive mt-1">Build failed. Check logs for details.</p>}
            {step.canceled && <p className="text-xs text-text-muted mt-1">Deployment was canceled by user.</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
