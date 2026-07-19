import React from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { CheckCircle2, Zap } from 'lucide-react';

export function PlanOverview() {
  return (
    <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-background to-secondary/20">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Zap className="h-48 w-48 text-primary" />
      </div>
      
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">Pro Plan</h2>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Active
            </span>
          </div>
          <p className="text-muted-foreground mt-2 max-w-xl">
            You are currently on the Pro plan. Your next billing cycle starts on <strong className="text-foreground">August 1, 2026</strong>.
          </p>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Unlimited public & private repos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Advanced AI Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Priority Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Up to 10 Team Members</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-4xl font-extrabold tracking-tight">$20</span>
            <span className="text-muted-foreground font-medium">/ user / mo</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button variant="outline" className="w-full sm:w-auto">Cancel Plan</Button>
            <Button className="w-full sm:w-auto">Upgrade to Enterprise</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
